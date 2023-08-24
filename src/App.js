import React from "react"
import { useState } from "react"
import { useUserContext } from './components/UserContext'
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import CryptoJS from 'crypto-js';
import './App.css';
import Header from './components/header/Header'
import Tasks from './components/main/Tasks'
import AddTask from './components/main/NewTask'
import Main from './components/main/PopupMenuButton'

function App() {
  const [ showAddTask, setShowAddTask ] = useState(false)
  const [ tasks, setTasks ] = useState()
  const userId = localStorage.getItem('userId')
  // Firebase Get
  const dbRef = ref(getDatabase());
  var getid, gettext, getnote, getreminder, getimageUrl

  const getData= async () => {
  if (!userId) {
      return;
  }
  try {
  // Getting userdata from firebase
  const taskSnapshot = await get(child(dbRef, `quantum-quest/tasks/${userId}/menu1/key`));
      if (taskSnapshot.exists()) {
        const userData = taskSnapshot.val();
        getid = userData.taskId;
        gettext = userData.taskText;
        getnote = userData.taskNote;
        getreminder = userData.taskReminder;
        getimageUrl = userData.taskImageUrl;
    }}
    catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error appropriately
  }
};

  getData()

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
  

  // Add Task 
  const addTask = (task) => {
    // Encryption of data
    const encryptedText = encryptData(task.text, key);
    const encryptedNote = encryptData(task.note, key);
    const encryptImageUrl = encryptData(task.imageUrl, key);
    // Firebase Post 
    const db = getDatabase();
    const tasksRef = ref(db, `quantum-quest/tasks/${userId}/menu1`);
    const newTaskRef = push(tasksRef);
    const taskId = newTaskRef.key;
    const newTask = { taskId, ...task }
    setTasks([...tasks, newTask])
    set(newTaskRef, {
      taskId: taskId,
      taskText: encryptedText,
      taskNote: encryptedNote,
      taskReminder: task.reminder,
      taskImageUrl: encryptImageUrl
  })}

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
    <div className={ finalDisplayTheme === 'Light' ? 'theme-light' : 'theme-dark' }>
      <Header />
      {showAddTask && <AddTask onAdd={addTask}/>}

      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={reminderTask}/> : <div className="text-center"> No current tasks</div>}
      <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

    </div>
  );
}

export default App;