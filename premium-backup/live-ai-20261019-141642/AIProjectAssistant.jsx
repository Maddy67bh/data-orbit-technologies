import { useState } from "react";
import "./AIProjectAssistant.css";

const suggestions = [
  "What services do you offer?",
  "How does pricing work?",
  "What is your project process?",
  "I want to discuss a project"
];

function getGuidedAnswer(text) {
  const q = text.toLowerCase();

  if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("pricing")) {
    return "Every project is scoped individually. Cost depends on the required features, integrations, data complexity and delivery scope. Share your requirements and budget range to prepare a more useful project brief. No fixed price is quoted by this guided preview.";
  }

  if (q.includes("service") || q.includes("offer") || q.includes("analytics") || q.includes("dashboard")) {
    return "Data Orbit's showcased service areas are Data & Analytics, Artificial Intelligence, and Digital Experiences. These can include business intelligence dashboards, data insights, machine-learning concepts and modern web experiences. The exact deliverables depend on your needs.";
  }

  if (q.includes("process") || q.includes("step") || q.includes("work together")) {
    return "A typical project can start with understanding your goals, defining the scope, proposing an approach, building a prototype, reviewing feedback and preparing delivery. The actual process will depend on the project and will be agreed before work begins.";
  }

  if (q.includes("time") || q.includes("timeline") || q.includes("how long") || q.includes("deadline")) {
    return "Delivery time depends on scope, complexity, integrations and feedback cycles. Tell me what you want to build and your preferred deadline; the team can then assess a realistic timeline.";
  }

  if (q.includes("project") || q.includes("brief") || q.includes("start") || q.includes("requirement") || q.includes("need")) {
    return "Let's outline your project. In your next message, include: (1) your business or industry, (2) what you want to build, (3) the main problem it should solve, (4) your preferred budget range if decided, and (5) your target launch date. You can then copy the conversation into a project enquiry. This preview does not send or save it to a company inbox.";
  }

  if (q.includes("contact") || q.includes("human") || q.includes("team") || q.includes("email")) {
    return "You can describe your enquiry here and copy the conversation for your records. A live contact channel has not been configured in this preview, so your message is not automatically delivered to the company.";
  }

  return "I'm the Data Orbit guided Project Assistant preview. I can explain the showcased services, general project process, pricing factors and timeline considerations. For a specific question, please add a little context or choose one of the suggested questions below. Live AI responses are not connected yet.";
}

export default function AIProjectAssistant({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to Data Orbit Technologies. I'm your guided Project Assistant. I can help you explore services, understand the project process and outline your requirements. What would you like to discuss?"
    }
  ]);
  const [draft, setDraft] = useState("");

  if (!open) return null;

  function sendMessage(value) {
    const text = value.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text },
      { role: "assistant", text: getGuidedAnswer(text) }
    ]);
    setDraft("");
  }

  const transcript = messages
    .map((message) => `${message.role === "user" ? "Client" : "Data Orbit Assistant"}: ${message.text}`)
    .join("\n\n");

  async function copyTranscript() {
    try {
      await navigator.clipboard.writeText(transcript);
      window.alert("Conversation copied. You can paste it into your project enquiry.");
    } catch {
      window.prompt("Copy your conversation:", transcript);
    }
  }

  return (
    <div className="do-assistant-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="do-assistant-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="do-assistant-title"
      >
        <header className="do-assistant-header">
          <div className="do-assistant-brand">
            <span className="do-assistant-orb" aria-hidden="true">
              <span />
            </span>
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
            <div
              className={`do-assistant-message ${message.role === "user" ? "is-user" : "is-assistant"}`}
              key={`${index}-${message.role}`}
            >
              <span className="do-assistant-message-label">
                {message.role === "user" ? "YOU" : "PROJECT ASSISTANT"}
              </span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="do-assistant-suggestions">
          {suggestions.map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>
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
          />
          <button type="submit" disabled={!draft.trim()} aria-label="Send message">↑</button>
        </form>

        <div className="do-assistant-footer">
          <span>Guided preview · Not connected to live AI</span>
          <button type="button" onClick={copyTranscript}>Copy conversation</button>
        </div>
      </section>
    </div>
  );
}
