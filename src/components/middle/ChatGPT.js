import React from 'react'

const ChatGPT = () => {
    async function response() {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = "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"
      
        const input = document.getElementById('area').value;
      
        const requestBody = {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: 'You are just a task summerizer. First greet with my username which would be provided, then you need to provide a idea or thought related to some task which would be provided. Please write all these under 30 words. And do this all in a fun way' }, { role: 'user', content: input }],
          temperature: 0.5,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
        };
      
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        });
      
        const data = await response.json();
        const message = data.choices[0].message.content;

        var i = 0;
        var txt = "Elena: " + message;
        var speed = 25;
        function typeWriter() {
          if (i < txt.length) {
            const output = document.getElementById("AI-response");
            let x = document.getElementById("theme");
            if (x.className === 'light-theme'){
              output.className = "animate-3 bg-white text-black rounded-xl p-2 mt-4 lg:ml-20 lg:ml-64 mx-10 w-4/5 lg:w-2/3 textarea drop-shadow-xl h-2/5";    
              output.innerHTML += txt.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
            }
            else {
              output.className = "animate-3 bg-slate-800 text-white rounded-xl p-2 mt-4 lg:ml-20 lg:ml-64 mx-10 w-4/5 lg:w-2/3 textarea drop-shadow-xl h-2/5";    
              output.innerHTML += txt.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
            }}
          } 
        typeWriter()
    }
        
  return (
    <div>

    </div>
  )
}

export default ChatGPT