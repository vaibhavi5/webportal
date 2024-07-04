import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './Chatbot.css';
import botAvatar from '../assets/chatbot.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);
  const [chatVisible, setChatVisible] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    setMessages([{ message: "Hello! How can I help you today?", className: "chatbot-incoming" }]);
  }, []);

  const createChatLi = (message, className) => {
    return { message, className };
  };

  const scrollToBottom = () => {
    chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
  };

  const generateResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a professional adviser with experience and knowledge of menstruation. You are very kindly, friendly, like to answer the questions and sometimes will give some suggestions." },
            { role: "user", content: userMessage }
          ],
          temperature: 0.5,
          max_tokens: 2048,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        }
      );
      setMessages(prevMessages => [...prevMessages, createChatLi(response.data.choices[0].message.content.trim(), 'chatbot-incoming')]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, createChatLi("Oops! Something went wrong. Please try again.", 'chatbot-error')]);
    } finally {
      scrollToBottom();
    }
  };

  const handleChat = () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, createChatLi(userMessage, 'chatbot-outgoing')];
      setTimeout(scrollToBottom, 100); // 确保滚动到新添加的消息
      return updatedMessages;
    });
    setInput('');

    setTimeout(() => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, createChatLi("Thinking...", 'chatbot-incoming')];
        scrollToBottom(); // 滚动到“Thinking...”消息
        return updatedMessages;
      });
      generateResponse(userMessage);
    }, 600);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const toggleChatbox = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div className="chatbot-wrapper">
      <div className={`chatbot-container ${chatVisible ? 'visible' : 'hidden'}`}>
        <div className="chatbot-header">
          Chat with GPT
          <span className="chatbot-close-btn" onClick={toggleChatbox}>×</span>
        </div>
        <ul className="chatbot-chatbox" ref={chatboxRef}>
          {messages.map((msg, index) => (
            <li key={index} className={`chatbot-chat ${msg.className}`}>
              {msg.className === 'chatbot-incoming' && (
                <img src={botAvatar} alt="bot avatar" className="chatbot-avatar" />
              )}
              <p>{msg.message}</p>
            </li>
          ))}
        </ul>
        <div className="chatbot-input">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <span onClick={handleChat}>Send</span>
        </div>
      </div>
      {!chatVisible && (
        <button className="chatbot-toggler" onClick={toggleChatbox}>
          Chat
        </button>
      )}
    </div>
  );
};

export default Chatbot;
