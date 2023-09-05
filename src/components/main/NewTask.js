import { useState } from "react";
import SelectTask from "./SelectTask";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [reminder, setReminder] = useState(false);
  const [todo, setTodo] = useState(false);
  const [inprogress, setProgress] = useState(false);
  const [done, setDone] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleTodoClick = () => setTodo(!todo);
  const handleProgressClick = () => setProgress(!inprogress);
  const handleDoneClick = () => setDone(!done);


  const onSaveClick = () => {
    if (!text) {
      var location = document.getElementById("main");
      location.className = "p-1 bg-red-200 rounded-md";
      return;
    }

    onAdd({ text, note, reminder, todo, inprogress, done, imageUrl });

    setText("");
    setNote("");
    setImageUrl("");
    setReminder(false);
  };

  return (
    <div
      className="bg-slate-200 rounded-xl border p-5 absolute left-20 justify w-96 shadow-2xl"
    >
      <div className="text-xl">Add New Task</div>
      <div className="my-6">
        <input
          id="main"
          className="p-1 bg-slate-100 rounded-md"
          type="text"
          placeholder="Add Task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="my-6">
        <input
          className="p-1 bg-slate-100 rounded-md"
          type="text"
          placeholder="Add Note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div>
        <label className="text-slate-600">Reminder</label>
        <input
          className="ml-5"
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <div className="flex ml-2 mt-4">
        <SelectTask className='py-2 m-2' text="Todo" CaughtClick={handleTodoClick} />
        <SelectTask className='py-2 m-2' text="In-Progress" CaughtClick={handleProgressClick} />
        <SelectTask className='py-2 m-2' text="Done" CaughtClick={handleDoneClick} />
      </div>
      <div className="my-6">
        <input
          className="p-1 bg-slate-100 rounded-md"
          type="text"
          placeholder="Add Image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <img className="w-72 pt-2 text-slate-600 text-center text-sm" src={imageUrl} alt="No Image Added !" />
      </div>
      <button
        onClick={onSaveClick}
        className="text-slate-900 bg-slate-300 p-2 rounded-md hover:bg-green-600 hover:text-white backdrop-blur-md "
      >
        Save Task
      </button>
    </div>
  );
};

export default AddTask;
