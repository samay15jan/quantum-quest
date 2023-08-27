import React, { useState, useEffect } from "react";
import { useUserContext } from './components/UserContext';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
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

  useEffect(() => {
    getData();
  }, []);

  // Add Task
  const addTask = (task) => {
    // Local Sync

    //Firebase Sync
    const encryptedText = encryptData(task.text, key);
    const encryptedNote = encryptData(task.note, key);
    const encryptImageUrl = encryptData(task.imageUrl, key);
    const db = getDatabase();
    const tasksRef = ref(db, `quantum-quest/tasks/${userId}/menu1`);
    const newTaskRef = push(tasksRef);
    const taskId = newTaskRef.key;
    const newTask = { taskId, ...task };
    setTasks([...tasks, newTask])
    const data = {
      taskId: taskId,
      taskText: encryptedText,
      taskNote: encryptedNote,
      taskReminder: task.reminder,
      taskImageUrl: encryptImageUrl
    };
    set(newTaskRef, data);
  };

  const getData = () => {
    if (!userId) {
      return;
    }
    const db = getDatabase();
    const menu = 'menu1';
    const tasksRef = ref(db, `quantum-quest/tasks/${userId}/${menu}`);
    const decryptedTasks = [];
    onValue(tasksRef, snapshot => {
      snapshot.forEach(childSnapshot => {
        const task = childSnapshot.val();
        const decryptedText = decryptData(task.taskText, key);
        const decryptedNote = decryptData(task.taskNote, key);
        const decryptedImageUrl = decryptData(task.taskImageUrl, key);
        const taskData = {
          id: task.taskId,
          taskText: decryptedText,
          taskNote: decryptedNote,
          taskImageUrl: decryptedImageUrl,
          reminder: task.taskReminder
        };
        decryptedTasks.push(taskData);
        });
        setTasks(tasks => [...tasks, ...decryptedTasks]);
      });
    };




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


  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Reminder Task
  const reminderTask = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  // Theme
  const { finalTheme } = useUserContext();
  const getTheme = (value) => {
    const finalValue = value.finalTheme;
    return finalValue
  };
  const finalDisplayTheme = getTheme(finalTheme);
  
  return (
    <div className={finalDisplayTheme === 'Light' ? 'theme-light' : 'theme-dark'}>
      <Header />
      {showAddTask && <AddTask onAdd={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={reminderTask} />
      ) : (
        <div className="text-center"> No current tasks</div>
      )}
      <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
    </div>
  );
}

export default App;