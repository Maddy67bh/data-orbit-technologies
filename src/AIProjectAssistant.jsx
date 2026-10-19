import { useState } from "react";
import "./AIProjectAssistant.css";

const suggestions = [
  "What services do you offer?",
  "How does pricing work?",
  "What is your project process?",
  "I want to discuss a project"
];

function makeConversationId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 3 | 8)).toString(16);
  });
}

export default function AIProjectAssistant({ open, onClose }) {
  const [conversationId] = useState(makeConversationId);
  const [messages, setMessages] = useState([{
    role: "assistant",
    text: "Welcome to Data Orbit Technologies. I'm your AI Project Consultant. Tell me about your business, the problem you want to solve, or the product you want to build."
  }]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  async function sendMessage(value) {
    const text = value.trim();
    if (!text || isLoading) return;

    const conversation = [...messages, { role: "user", text }];
    setMessages([...conversation, { role: "assistant", text: "Thinking..." }]);
    setDraft("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          messages: conversation.map((message) => ({
            role: message.role,
            content: message.text
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "AI request failed.");

      setMessages((previous) => {
        const next = [...previous];
        next[next.length - 1] = { role: "assistant", text: data.reply };
        return next;
      });
    } catch (error) {
      setMessages((previous) => {
        const next = [...previous];
        next[next.length - 1] = {
          role: "assistant",
          text: error.message || "Connection failed. Please try again."
        };
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  }

  const transcript = messages
    .map((message) => `${message.role === "user" ? "Client" : "Data Orbit Assistant"}: ${message.text}`)
    .join("\n\n");

  async function copyTranscript() {
    try {
      await navigator.clipboard.writeText(transcript);
      window.alert("Conversation copied.");
    } catch {
      window.prompt("Copy your conversation:", transcript);
    }
  }

  return (
    <div className="do-assistant-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="do-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="do-assistant-title">
        <header className="do-assistant-header">
          <div className="do-assistant-brand">
            <span className="do-assistant-orb" aria-hidden="true"><span /></span>
            <div>
              <h2 id="do-assistant-title">Project Assistant</h2>
              <p><span className="do-assistant-status" /> DATA ORBIT TECHNOLOGIES</p>
            </div>
          </div>
          <button className="do-assistant-close" type="button" onClick={onClose} aria-label="Close assistant">×</button>
        </header>

        <div className="do-assistant-intro">
          <span className="do-assistant-eyebrow">LET'S BUILD WITH PURPOSE</span>
          <p>Explore our services or tell us about the challenge you're trying to solve.</p>
        </div>

        <div className="do-assistant-messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`do-assistant-message ${message.role === "user" ? "is-user" : "is-assistant"}`} key={`${index}-${message.role}`}>
              <span className="do-assistant-message-label">{message.role === "user" ? "YOU" : "PROJECT ASSISTANT"}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="do-assistant-suggestions">
          {suggestions.map((suggestion) => (
            <button type="button" key={suggestion} disabled={isLoading} onClick={() => sendMessage(suggestion)}>
              {suggestion} <span>↗</span>
            </button>
          ))}
        </div>

        <form className="do-assistant-compose" onSubmit={(event) => {
          event.preventDefault();
          sendMessage(draft);
        }}>
          <input
            aria-label="Your project question"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Describe your project or ask a question..."
            maxLength={1500}
            disabled={isLoading}
          />
          <button type="submit" disabled={!draft.trim() || isLoading} aria-label="Send message">↑</button>
        </form>

        <div className="do-assistant-footer">
          <span>AI-assisted chat. Messages may be stored so Data Orbit can review project enquiries. Please don't share passwords or sensitive personal data.</span>
          <button type="button" onClick={copyTranscript}>Copy conversation</button>
        </div>
      </section>
    </div>
  );
}
