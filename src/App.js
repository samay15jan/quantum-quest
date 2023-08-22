import { useState } from "react"
import { useUserContext } from './components/UserContext'
import './App.css';
import Header from './components/header/Header'
import Tasks from './components/main/Tasks'
import AddTask from './components/main/AddTask'
import Main from './components/main/PopupMenuButton'

function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Meet Karan',
        note: 'at Amanujan Hospital,Jamsherpur',
        reminder: true,
        imageUrl: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
    },
    {
        id: 2,
        text: 'Alina Is Waiting',
        note: 'At Car Parking',
        reminder: true,
        imageUrl: 'https://media.sproutsocial.com/uploads/2022/05/sprout-social-tiktok-logo-lockups-header-image.svg',
    },
       {
        id: 3,
        text: 'Met Joseph On Yacht',
        note: 'Get Sweets',
        reminder: false,
        imageUrl: '',
    }
  ])

  // Add Task 
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
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
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={reminderTask}/> : 'No current tasks set'}
      <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

    </div>
  );
}

export default App;