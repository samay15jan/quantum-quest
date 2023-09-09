import React, { useEffect, useState } from "react";
import AILOGO from '../../images/ai.jpg'

const ChatGPT = ({ tasks }) => {
  const [chatResponse, setChatResponse] = useState(null);

  useEffect(() => {
    function fetchData() {
        const todoTasks = tasks.todo.length;
        const progressTasks = tasks.progress.length;
        const doneTasks = tasks.done.length;
        const description = `You currently have ${todoTasks} todo tasks, ${progressTasks} tasks in progress and ${doneTasks} completed tasks. Keep grinding !!`;
        setChatResponse(description);
    }
    fetchData();
  }, [tasks]);

  return (
    <div style={{width:700}} className=" bg-opacity-50 bg-white rounded-xl text-slate-700 text-medium ml-80 mb-5 p-2">
      <div className="flex">
        <div>
          <img className="w-14 rounded-full" src={AILOGO} />
        </div>
        <div className=" ml-4">{chatResponse}</div>
        <div className="animate-spin"> </div> 
      </div>
    </div>
  );
}

export default ChatGPT;
