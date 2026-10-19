import { useState } from "react";
import "./CompanyDetails.css";

const services = [
  {
    number: "01",
    title: "Data Analytics & Power BI",
    description:
      "Turn business data into understandable reports, interactive dashboards, and decision-support insights.",
    tags: ["Power BI", "Reporting", "Data Visualization"],
  },
  {
    number: "02",
    title: "AI & Machine Learning",
    description:
      "Explore practical AI and machine-learning solutions for prediction, classification, and business workflows.",
    tags: ["Predictive Analytics", "ML", "AI Solutions"],
  },
  {
    number: "03",
    title: "Website Design & Development",
    description:
      "Create polished, responsive websites that communicate your brand clearly and guide visitors toward action.",
    tags: ["Responsive UI", "Web Development", "UX"],
  },
  {
    number: "04",
    title: "Business Automation",
    description:
      "Identify repetitive processes and plan digital workflows that can reduce manual effort and improve consistency.",
    tags: ["Workflow Design", "Process Improvement"],
  },
  {
    number: "05",
    title: "Data Engineering",
    description:
      "Plan data preparation, transformation, and pipeline workflows to help make business data easier to use.",
    tags: ["Data Preparation", "ETL Concepts", "Data Workflows"],
  },
  {
    number: "06",
    title: "Consulting & Reporting",
    description:
      "Clarify business requirements, define useful KPIs, and structure reports around practical business questions.",
    tags: ["KPI Planning", "Business Reporting"],
  },
];

const capabilities = [
  {
    number: "01",
    title: "Business Intelligence",
    description:
      "Dashboard and KPI reporting concepts for monitoring sales, operations, and business performance.",
  },
  {
    number: "02",
    title: "Customer & Sales Analytics",
    description:
      "Analytical approaches for understanding customer behaviour, sales patterns, and retention questions.",
  },
  {
    number: "03",
    title: "Predictive Analytics",
    description:
      "Machine-learning use cases such as forecasting, classification, and risk analysis, subject to data suitability.",
  },
  {
    number: "04",
    title: "Digital Experiences",
    description:
      "Modern web experiences designed around usability, clear messaging, and responsive layouts.",
  },
];

function CompanyDetails() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Data Analytics & Power BI",
    budget: "",
    message: "",
  });
  const [notice, setNotice] = useState("");

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setNotice("");
  }

  async function copyInquiry(event) {
    event.preventDefault();

    const inquiry = [
      "DATA ORBIT TECHNOLOGIES — PROJECT INQUIRY",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "Not provided"}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget || "Not specified"}`,
      "",
      "Project details:",
      form.message,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(inquiry);
      setNotice(
        "Inquiry copied. Save it and send it when an official business contact channel is available."
      );
    } catch {
      setNotice(
        "Clipboard access was unavailable. Please copy your details manually before leaving this page."
      );
    }
  }

  return (
    <div className="company-details">
      <section className="co-section co-about" id="company-profile">
        <div className="co-eyebrow">DATA ORBIT TECHNOLOGIES / COMPANY PROFILE</div>

        <div className="co-about-grid">
          <div>
            <h2>
              Technology with
              <span> purpose and clarity.</span>
            </h2>
            <p className="co-company-subtitle">
              DATA ANALYTICS · AI · DIGITAL SOLUTIONS
            </p>
          </div>

          <div className="co-about-copy">
            <p>
              Data Orbit Technologies focuses on practical technology services
              for small businesses and startups. The service areas include
              business intelligence, data analytics, artificial intelligence,
              website development, business automation, and data workflows.
            </p>
            <p>
              Every project should begin with an understanding of the client's
              needs, the available resources, the expected deliverables, and
              the intended business outcome.
            </p>
            <div className="co-location">
              <span className="co-location-dot" />
              Hyderabad, India
            </div>
          </div>
        </div>

        <div className="co-values">
          <article>
            <span>OUR MISSION</span>
            <h3>Make technology more useful</h3>
            <p>
              Help businesses explore data and digital tools through clear,
              practical, and appropriately scoped solutions.
            </p>
          </article>
          <article>
            <span>OUR VISION</span>
            <h3>Turn information into insight</h3>
            <p>
              Encourage better-informed decisions by making business
              information easier to understand and use.
            </p>
          </article>
          <article>
            <span>OUR VALUES</span>
            <h3>Clarity and accountability</h3>
            <p>
              Set transparent expectations, communicate limitations, and
              agree on scope before beginning project work.
            </p>
          </article>
        </div>
      </section>

      <section className="co-section" id="services-detail">
        <div className="co-section-heading">
          <div>
            <div className="co-eyebrow">WHAT WE CAN HELP WITH</div>
            <h2>Services built around your goals.</h2>
          </div>
          <p>
            Select a service to start a conversation about your requirements,
            timeline, and preferred outcome.
          </p>
        </div>

        <div className="co-services-grid">
          {services.map((service) => (
            <article className="co-service-card" key={service.number}>
              <div className="co-card-top">
                <span>{service.number}</span>
                <span className="co-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="co-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="co-section co-work" id="capabilities">
        <div className="co-eyebrow">AREAS OF FOCUS</div>
        <div className="co-section-heading">
          <h2>Ideas shaped around business problems.</h2>
          <p>
            These are capability areas, not claims of completed client projects.
            Scope and feasibility are confirmed for each inquiry.
          </p>
        </div>

        <div className="co-capability-list">
          {capabilities.map((item) => (
            <article className="co-capability" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="co-capability-mark" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="co-section co-process" id="our-approach">
        <div className="co-eyebrow">OUR APPROACH</div>
        <h2>A clear path from question to solution.</h2>
        <div className="co-process-grid">
          <article>
            <span>STEP 01</span>
            <h3>Understand</h3>
            <p>Discuss your goals, users, constraints, and existing data or systems.</p>
          </article>
          <article>
            <span>STEP 02</span>
            <h3>Define</h3>
            <p>Agree on scope, priorities, deliverables, timeline, and success criteria.</p>
          </article>
          <article>
            <span>STEP 03</span>
            <h3>Build</h3>
            <p>Develop and review the agreed solution in manageable stages.</p>
          </article>
          <article>
            <span>STEP 04</span>
            <h3>Improve</h3>
            <p>Review feedback and identify sensible next steps or refinements.</p>
          </article>
        </div>
      </section>

      <section className="co-section co-contact" id="project-inquiry">
        <div className="co-contact-grid">
          <div>
            <div className="co-eyebrow">START A CONVERSATION</div>
            <h2>Have a business challenge in mind?</h2>
            <p>
              Share a few details about your project. This form prepares an
              inquiry for you to copy; it does not send data to a server.
              An official email or phone number can be added once provided.
            </p>
            <div className="co-contact-facts">
              <div>
                <span>LOCATION</span>
                <strong>Hyderabad, India</strong>
              </div>
              <div>
                <span>PRICING</span>
                <strong>Request a Quote</strong>
              </div>
            </div>
          </div>

          <form className="co-inquiry-form" onSubmit={copyInquiry}>
            <label>
              Your name *
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Enter your name"
              />
            </label>

            <label>
              Your email *
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                required
                maxLength={200}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>

            <label>
              Company / organisation
              <input
                name="company"
                value={form.company}
                onChange={updateField}
                maxLength={150}
                autoComplete="organization"
                placeholder="Company name (optional)"
              />
            </label>

            <label>
              Service you are interested in *
              <select name="service" value={form.service} onChange={updateField}>
                {services.map((service) => (
                  <option key={service.number} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Estimated budget
              <select name="budget" value={form.budget} onChange={updateField}>
                <option value="">Prefer to discuss</option>
                <option value="Under $300">Under $300</option>
                <option value="$300–$600">$300–$600</option>
                <option value="$600–$1,000">$600–$1,000</option>
                <option value="Over $1,000">Over $1,000</option>
              </select>
            </label>

            <label>
              Tell us about your project *
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                required
                maxLength={3000}
                rows={4}
                placeholder="Your goals, requirements, and preferred timeline..."
              />
            </label>

            <button className="co-submit" type="submit">
              COPY PROJECT INQUIRY <span aria-hidden="true">↗</span>
            </button>

            {notice && (
              <p className="co-form-notice" role="status">{notice}</p>
            )}
            <p className="co-form-privacy">
              This form does not transmit or store your details. It only
              attempts to copy your inquiry to your clipboard.
            </p>
          </form>
        </div>
      </section>

      <footer className="co-footer">
        <div>
          <strong>DATA ORBIT TECHNOLOGIES</strong>
          <p>Data Analytics | AI & Machine Learning | Digital Solutions</p>
        </div>
        <span>Hyderabad, India</span>
      </footer>
    </div>
  );
}

export default CompanyDetails;

