"use client"

import  React from "react"
import { useState, useEffect, useRef } from "react"
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

  useEffect(scrollToBottom, []) // Updated dependency array

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now(), text: input, sender: "user" }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = { id: Date.now(), text: mockAIResponse(input), sender: "ai" }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    }, 1000)
  }

  const mockAIResponse = (query: string) => {
    // This is a mock function. In a real application, you would call your AI service here.
    return `Here's a medical response to "${query}". Please note that this is a simulated response and should not be considered as professional medical advice.`
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

