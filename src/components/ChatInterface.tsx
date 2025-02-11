"use client"

import React, { useState, useEffect, useRef } from "react"
import "./ChatInterface.css"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
}

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages.length]) // Scroll when messages update

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
  
    // Add user's message to chat
    const userMessage: Message = { id: Date.now(), text: input, sender: "user" }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
  
    try {
      const response = await fetch("https://medbot-7.onrender.com/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      })
  
      if (!response.ok) throw new Error("Failed to fetch response")
  
      const data = await response.json()
  
      // 🛠️ Extract text response properly from "data.answer.result"
      const aiMessage: Message = { 
        id: Date.now(), 
        text: data?.answer?.result || "No response received.", 
        sender: "ai" 
      }
  
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: "Error: Unable to fetch response.", sender: "ai" },
      ])
    }
  }
  

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a medical question..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInterface
