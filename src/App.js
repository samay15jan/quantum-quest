import { useState } from "react"
import { useUserContext } from './components/UserContext'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Main from './components/Main'

function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at school ',
        day: 'sat 6th at 1:30pm',
        reminder: true,
    },
       {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 4:30pm',
        reminder: false,
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
      <Main onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={reminderTask}/> : 'No current tasks set'}
    </div>
  );
}

export default App;