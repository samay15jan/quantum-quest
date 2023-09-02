import React, { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from '../firebase'
import CryptoJS from 'crypto-js';

const ChatGPT = () => {
  async function response() {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = "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"
    const userId = localStorage.getItem('userId');
    var input
    // Get Data only once 
    // Get Data
    const getData = () => {
      // User Check
      if (!userId) {
        return;
      }
      // Getting from firebase
      const menu = 'menu1';
      const taskRef = ref(database, `quantum-quest/tasks/${userId}/${menu}`);
      onValue(taskRef, (snapshot) => {
          const getTasks = [];
          snapshot.forEach((taskSnapshot) => {
            const task = taskSnapshot.val();
            // Decrypting Data
            const decryptedText = decryptData(task.taskText, key);
            const decryptedNote = decryptData(task.taskNote, key);
            const taskData = {
              taskText: decryptedText,
              taskNote: decryptedNote,
            };
            getTasks.push(taskData);
          });
          // Output Tasks
          if (getTasks.length > 0) {
            const finalTasks = {
              text: getTasks[0].taskText,
              note: getTasks[0].taskNote,
            };
          input ='Task:' + finalTasks.text + '. Id:' + finalTasks.taskNote
          }
        })
    };
    console.log(input)
    getData()
  }
response()

  // Function to decrypt data using AES
  const key = localStorage.getItem('key')
  function decryptData(data, key) {
    const decryptedData = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  return (
    <div>

    </div>
  )
}

export default ChatGPT;