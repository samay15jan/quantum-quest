import React, { useEffect, useState } from "react";
import AILOGO from '../../images/ai.jpg'

const ChatGPT = ({ tasks }) => {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(true);
    }, 5000); 
  }, []);
  useEffect(() => {
    if (showComponent) {
    function fetchData() {
      const userId = localStorage.getItem('userId');
        // User Check
        if (!tasks || !userId) {
          const output = document.querySelector(".outputLocation");
          output.className = "ml-4 mt-4 text-xl"
          output.innerHTML = "Kindly Login Via Your Google Account !!";
          return ;
        }
        const output = document.querySelector(".outputLocation");
        output.innerHTML = "";
        const username = localStorage.getItem('username')
        const todoTasks = tasks.todo.length;
        const progressTasks = tasks.progress.length;
        const doneTasks = tasks.done.length;
        const description = `Hi, ${username}. You currently have ${todoTasks} todo tasks, ${progressTasks} tasks in progress and ${doneTasks} completed tasks. Have a productive day!`;
        //Typing effect
        var i = 0;
        var speed = 20;
        var txt=description
        function typeWriter() {
          if (i < txt.length) {
            const output = document.querySelector(".outputLocation");
            output.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }}
        typeWriter()
    }
    fetchData();
  }
  }, [showComponent, tasks])

  return (
    <div className="flex  justify-center">
    <div className="mt-24 hidden lg:block  drop-shadow-xl bg-opacity-50 bg-white rounded-xl text-black text-medium w-1/2 mb-5 p-2">
      <div className="flex">
        <div>
          <img className="w-14 rounded-full pt-1" src={AILOGO} alt='logo' />
        </div>
        <div className=" ml-4 outputLocation"></div>
      </div>
    </div>
    </div>
  );
}

export default ChatGPT;
