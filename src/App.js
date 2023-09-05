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
  const [tasks, setTasks] = useState([]);
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
  useEffect(() => { getData(); }, [])

  // Get Data
  const getData = () => {
    // User Check
    if (!userId) {
      return;
    }
    // Getting from firebase
    const menu = 'todo';
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
            taskText: decryptedText,
            taskNote: decryptedNote,
            taskLocation: task.taskLocation,
            reminder: task.taskReminder,
            ImageUrl: decryptedImageUrl
          };
          getTasks.push(taskData);
        });
        // Output Tasks
        if (getTasks.length > 0) {
          const finalTasks = getTasks.map(tasks => ({
            id: tasks.id,
            text: tasks.taskText,
            note: tasks.taskNote,
            imageUrl: tasks.ImageUrl,
            reminder: tasks.reminder,
            taskLocation: tasks.taskLocation
          }));
          setTasks([...tasks, ...finalTasks]);
        }
      })
  };

  // Delete Task
  const deleteTask = (id, taskLocation) => {
    setTasks(tasks.filter((task) => task.id !== id))
    const menu = taskLocation
    const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}/${id}`);
    remove(taskRef)
  }

  // Reminder Task
  const reminderTask = (id, taskLocation) => {
    const updatedNewTasks = tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    );
    setTasks(updatedNewTasks);
    const updatedTasks = tasks.reduce((changes, task) => {
      if (task.id === id) {
        const encryptedText = encryptData(task.text, key);
        const encryptedNote = encryptData(task.note, key);
        const encryptImageUrl = encryptData(task.imageUrl, key);
        changes[task.id] = {
          ...task,
          text: encryptedText,
          note: encryptedNote,
          imageUrl: encryptImageUrl,
          reminder: !task.reminder
        };
      } else {
        changes[task.id] = task;
      }
      return changes;
    }, {});
    const menu = taskLocation
    const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}/`)
    update(taskRef, updatedTasks)
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
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={reminderTask} />
      ) : (
        <div className="text-center text-xl">No current tasks</div>
      )}
      <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    </div>
  );
}
export default App;