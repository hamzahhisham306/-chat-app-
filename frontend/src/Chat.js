import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import cookies from 'react-cookies';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  const hadlerlogin=()=>{
    cookies.remove('user')
    window.location.reload(false);
  }

  return (
    <>
    <>
<button onClick={hadlerlogin} style={{textAlign:'right', padding:'30px'}}>Logout</button>
   {showMessage&&
    <div className="chat-window">
      <div className="chat-header">
        <p> Chat online</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,index) => {
            return (
              <div
               key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="write..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button  style={{backgroundColor:"#81C6E8"}} onClick={sendMessage}>Send</button>
      </div>
      <button style={{padding:'15px'}} onClick={()=>setShowMessage(!showMessage)}>hide message</button>
    </div>
}</>
{!showMessage&&
<div>
   <h1 style={{backgroundColor:'#5DA7DB', padding:'10px'}}> username : {username}</h1>
   <div className="showmessage">
      <button style={{backgroundColor:'#81C6E8', color:'black', padding:'15px', fontSize:'25px' }} onClick={()=>setShowMessage(!showMessage)}>
        show message
      </button>
   </div>
</div>
}
</>
  );
}

export default Chat;