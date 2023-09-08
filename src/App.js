import React, { useState, useEffect } from "react";
import { useUserContext } from './components/UserContext';
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { database } from './components/firebase'
import CryptoJS from 'crypto-js';
import './App.css';
import Header from './components/header/Header';
import Tasks from './components/main/Tasks';
import AddTask from './components/main/NewTask';
import Main from './components/main/PopupMenuButton';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState({
    todo: [],
    progress: [],
    done: [],
  });
  const userId = localStorage.getItem('userId');

  // Add Task
  const addTask = (task) => {
    // Encrypting data
    const encryptedText = encryptData(task.text, key);
    const encryptedNote = encryptData(task.note, key);
    const encryptImageUrl = encryptData(task.imageUrl, key);
    // Getting menu label
    const getMenu = () => {
      if (task.todo) {
        return "todo";
      } else if (task.inprogress) {
        return "progress";
      } else if (task.done) {
        return "done";
      }
    }
    // Firebase Realtime Database
    const menu = getMenu()
    const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}`);
    const newTaskRef = push(taskRef);
    const taskId = newTaskRef.key;
    const databaseData = {
      taskId: taskId,
      taskText: encryptedText,
      taskNote: encryptedNote,
      taskImageUrl: encryptImageUrl,
      taskReminder: task.reminder,
      taskLocation: menu
    };
    set(newTaskRef, databaseData)
      .then(() => {
        console.log("New task added successfully"); // TODO
      })
      .catch(error => {
        console.error("Error adding new post:", error); // TODO
      });
  };

  // Get Data only once 
  useEffect(() => { getData(); }, [userId])

  const getData = () => {
    // User Check
    if (!userId) {
      return;
    }
  
    // Getting from firebase
    const menus = ['todo', 'progress', 'done'];
  
    const fetchDataForMenu = (menu) => {
      const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}`);
      onValue(taskRef, (snapshot) => {
        const getTasks = [];
        snapshot.forEach((taskSnapshot) => {
          const task = taskSnapshot.val();
          // Decrypting Data
          const decryptedText = decryptData(task.taskText, key);
          const decryptedNote = decryptData(task.taskNote, key);
          const decryptedImageUrl = decryptData(task.taskImageUrl, key);
          const taskData = {
            id: task.taskId,
            text: decryptedText,
            note: decryptedNote,
            taskLocation: task.taskLocation,
            reminder: task.taskReminder,
            imageUrl: decryptedImageUrl
          };
          getTasks.push(taskData);
        });
        // Update the state for the specific section
        setTasks((tasks) => ({
          ...tasks,
          [menu]: getTasks,
        }));
      });
    };
    menus.forEach((menu) => {
      fetchDataForMenu(menu);
    });
  };

  const deleteTask = (id, taskLocation) => {
    const menu = taskLocation;
    const updatedTasks = tasks[menu].filter((task) => task.id !== id);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [menu]: updatedTasks,
    }));
      const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}/${id}`);
    remove(taskRef);
  };
  
  const reminderTask = (id, taskLocation) => {
    const menu = taskLocation;
    const updatedNewTasks = tasks[menu].map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    );
    setTasks((prevTasks) => ({
      ...prevTasks,
      [menu]: updatedNewTasks,
    }));
    const updatedTasks = tasks[menu].reduce((changes, task) => {
      if (task.id === id) {
        const encryptedText = encryptData(task.taskText, key);
        const encryptedNote = encryptData(task.taskNote, key);
        const encryptImageUrl = encryptData(task.imageUrl, key);
        changes[task.id] = {
          ...task,
          taskText: encryptedText,
          taskNote: encryptedNote,
          imageUrl: encryptImageUrl,
          taskReminder: !task.reminder,
        };
      } else {
        changes[task.id] = task;
      }
      return changes;
    }, {});
    const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}/`);
    update(taskRef, updatedTasks);
  };
  

  // Theme
  const { finalTheme } = useUserContext();
  const getTheme = (value) => {
    const finalValue = value.finalTheme;
    return finalValue
  };
  const finalDisplayTheme = getTheme(finalTheme);

  // Function to encrypt data using AES
  const key = localStorage.getItem('key')
  function encryptData(data, key) {
    const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
    return encryptedData;
  }

  // Function to decrypt data using AES
  function decryptData(data, key) {
    const decryptedData = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  return (
    <div className={finalDisplayTheme === 'Light' ? 'theme-light' : 'theme-dark'}>
      <Header />
      {showAddTask && <AddTask onAdd={addTask} />}

      <div className="flex container ml-8">     
      
      <div className="bg-white w-96 h-full mb-10 mx-10 p-5 rounded-xl">
        <label className="text-xl text-center">To Do</label>
        {Array.isArray(tasks.todo) && tasks.todo.length > 0 ? (
          tasks.todo.map((task) => (
              <Tasks sectionTasks={[task]} key={task.id} task={[task]} onDelete={deleteTask} onToggle={reminderTask} />
            ))
          ) : (
            <div className="text-center text-xl">All Set!</div>
        )}
        <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      </div>

      <div className="bg-white w-96 h-full mb-10 mx-5 p-5 rounded-xl">
        <label className="text-xl text-center">In Progress</label>
        {Array.isArray(tasks.progress) && tasks.progress.length > 0 ? (
          tasks.progress.map((task) => (
              <Tasks sectionTasks={[task]} key={task.id} tasks={[task]} onDelete={deleteTask} onToggle={reminderTask} />
            ))
          ) : (
            <div className="text-center text-xl">All Set!</div>
        )}
        <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      </div>

      <div className="bg-white w-96 h-full mb-10 mx-10 p-5 rounded-xl">
        <label className="text-xl text-center">Done</label>
        {Array.isArray(tasks.done) && tasks.done.length > 0 ? (
          tasks.done.map((task) => (
              <Tasks sectionTasks={[task]} key={task.id} tasks={[task]} onDelete={deleteTask} onToggle={reminderTask} />
            ))
          ) : (
            <div className="text-center text-xl">All Set!</div>
        )}
        <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      </div>
      </div>
    </div>
  );
}
export default App;