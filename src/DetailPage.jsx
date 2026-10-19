import React from "react";
import "./DetailPage.css";

const pages = {
  "/portfolio/business-intelligence": {
    type: "PORTFOLIO / 01",
    eyebrow: "CLARITY THROUGH DATA",
    title: "Business Intelligence",
    accent: "that moves business forward.",
    intro: "Turn disconnected business data into a clear, decision-ready view of performance. Explore how a modern analytics experience can bring revenue, customer behaviour and operational KPIs together.",
    tag: "Analytics & Reporting",
    stats: [
      ["01", "Unified reporting", "One view of key business metrics"],
      ["02", "KPI monitoring", "Track performance with context"],
      ["03", "Decision support", "Move from reports to action"]
    ],
    features: [
      ["Executive dashboards", "A clean overview of business performance, trends and priority metrics."],
      ["Revenue analysis", "Explore sales patterns, product performance and changes over time."],
      ["Customer insights", "Understand segments, retention patterns and customer value."],
      ["Interactive reporting", "Create a natural path from high-level KPIs to detailed analysis."]
    ],
    steps: ["Connect data sources", "Model and validate data", "Design meaningful KPIs", "Deliver interactive insights"],
    visual: "dashboard"
  },
  "/portfolio/predictive-insights": {
    type: "PORTFOLIO / 02",
    eyebrow: "SEE WHAT COULD COME NEXT",
    title: "Predictive Insights",
    accent: "built on meaningful signals.",
    intro: "Use historical patterns and machine learning to explore possible future outcomes. Build a responsible prediction workflow with clear evaluation, understandable outputs and human-led decisions.",
    tag: "Machine Learning",
    stats: [
      ["01", "Data preparation", "Build a dependable modelling dataset"],
      ["02", "Model evaluation", "Measure performance beyond accuracy"],
      ["03", "Actionable forecasts", "Translate predictions into next steps"]
    ],
    features: [
      ["Predictive modelling", "Evaluate suitable models against the problem and available data."],
      ["Risk and churn signals", "Identify patterns that may indicate changing customer or business outcomes."],
      ["Model evaluation", "Use appropriate validation and performance measures before relying on results."],
      ["Explainable outputs", "Communicate key signals, limitations and uncertainty to decision-makers."]
    ],
    steps: ["Define the prediction goal", "Prepare representative data", "Train and evaluate models", "Monitor results and limitations"],
    visual: "prediction"
  },
  "/portfolio/intelligent-experiences": {
    type: "PORTFOLIO / 03",
    eyebrow: "DESIGNED AROUND PEOPLE",
    title: "Intelligent Experiences",
    accent: "where AI feels intuitive.",
    intro: "Bring thoughtful user experience and practical AI capabilities together. From conversational interfaces to guided workflows, design digital experiences that help people complete meaningful tasks.",
    tag: "AI & Digital Products",
    stats: [
      ["01", "Human-centred UX", "Make complex tasks feel simpler"],
      ["02", "Useful AI", "Support workflows with relevant intelligence"],
      ["03", "Product thinking", "Design around real user needs"]
    ],
    features: [
      ["Conversational interfaces", "Create guided interactions that help users find information and take action."],
      ["AI-assisted workflows", "Bring useful automation into existing processes with appropriate oversight."],
      ["Responsive experiences", "Design for clear navigation across desktop and mobile screens."],
      ["Responsible AI patterns", "Make limitations visible and keep users in control of important decisions."]
    ],
    steps: ["Understand the user", "Map the journey", "Prototype the experience", "Test and refine"],
    visual: "experience"
  },
  "/services/data-analytics": {
    type: "SERVICES / 01",
    eyebrow: "MAKE DATA WORK HARDER",
    title: "Data Analytics",
    accent: "from raw data to clarity.",
    intro: "Build a dependable analytics foundation with data preparation, exploratory analysis, dashboards and reporting that help teams understand what is happening and why.",
    tag: "Analytics Services",
    stats: [
      ["01", "Data quality", "More reliable reporting foundations"],
      ["02", "Clear dashboards", "Metrics designed around your goals"],
      ["03", "Useful insights", "Analysis that supports action"]
    ],
    features: [
      ["Data cleaning and preparation", "Improve consistency, handle missing values and document assumptions."],
      ["Exploratory data analysis", "Discover patterns, anomalies and relationships worth investigating."],
      ["Business dashboards", "Present meaningful KPIs through clear, interactive reporting."],
      ["Reporting automation", "Reduce repetitive manual steps where the workflow allows it."]
    ],
    steps: ["Discover business needs", "Audit and prepare data", "Build analysis and dashboards", "Review and improve"],
    visual: "dashboard"
  },
  "/services/artificial-intelligence": {
    type: "SERVICES / 02",
    eyebrow: "PRACTICAL INTELLIGENCE",
    title: "Artificial Intelligence",
    accent: "engineered for real problems.",
    intro: "Explore machine learning, language technologies and AI-assisted workflows with a focus on practical use cases, evaluation and responsible implementation.",
    tag: "AI & Machine Learning",
    stats: [
      ["01", "Problem first", "Start with a measurable objective"],
      ["02", "Tested models", "Evaluate before deployment"],
      ["03", "Human oversight", "Keep outcomes understandable"]
    ],
    features: [
      ["Machine learning", "Develop and evaluate models for relevant classification, prediction or ranking tasks."],
      ["NLP and language tools", "Organise, search and analyse text using suitable language techniques."],
      ["AI-assisted workflows", "Identify repetitive tasks where carefully designed AI assistance can help."],
      ["Evaluation and safeguards", "Assess errors, limitations, privacy considerations and human review needs."]
    ],
    steps: ["Identify the use case", "Assess data and feasibility", "Prototype and evaluate", "Plan deployment and monitoring"],
    visual: "prediction"
  },
  "/services/digital-experiences": {
    type: "SERVICES / 03",
    eyebrow: "DIGITAL, WITH PURPOSE",
    title: "Digital Experiences",
    accent: "crafted to feel effortless.",
    intro: "Create polished digital touchpoints with clear information architecture, responsive layouts and purposeful interactions that help customers navigate with confidence.",
    tag: "Web & Product Experiences",
    stats: [
      ["01", "Clear structure", "Navigation that makes sense"],
      ["02", "Responsive design", "Experiences across screen sizes"],
      ["03", "Polished details", "Consistent, purposeful interactions"]
    ],
    features: [
      ["Website experiences", "Build modern page structures aligned with brand and business objectives."],
      ["Interface design", "Use visual hierarchy, typography and spacing to guide attention."],
      ["Responsive layouts", "Keep core content and actions accessible across device sizes."],
      ["Interaction design", "Add thoughtful motion and feedback without compromising usability."]
    ],
    steps: ["Discover and define", "Plan the user journey", "Design and build", "Test and refine"],
    visual: "experience"
  }
};

function VisualPreview({ type }) {
  if (type === "experience") {
    return (
      <div className="dp-product dp-experience-dashboard">
        <div className="dp-exp-head">
          <div>
            <span className="dp-overline">EXPERIENCE ANALYTICS</span>
            <h3>Product overview</h3>
          </div>
          <span className="dp-status"><i /> Live concept</span>
        </div>

        <div className="dp-exp-toolbar">
          <span className="dp-exp-workspace"><b>D.</b> Workspace / Analytics</span>
          <span className="dp-exp-period">Last 30 days <span>⌄</span></span>
        </div>

        <div className="dp-exp-kpis">
          <div className="dp-exp-kpi">
            <span>ENGAGEMENT</span>
            <strong>84.6%</strong>
            <small><b>↗ 12.8%</b> vs previous period</small>
            <div className="dp-exp-spark dp-spark-one"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="dp-exp-kpi">
            <span>ACTIVE USERS</span>
            <strong>2,840</strong>
            <small><b>↗ 8.2%</b> vs previous period</small>
            <div className="dp-exp-spark dp-spark-two"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="dp-exp-kpi">
            <span>CONVERSION</span>
            <strong>6.24%</strong>
            <small><b>↗ 2.4%</b> vs previous period</small>
            <div className="dp-exp-spark dp-spark-three"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>

        <div className="dp-exp-chart-grid">
          <div className="dp-exp-chart-card">
            <div className="dp-exp-chart-heading">
              <div><span>PERFORMANCE</span><strong>Engagement over time</strong></div>
              <span className="dp-exp-chart-key"><i /> Engagement</span>
            </div>
            <div className="dp-exp-line-area">
              <div className="dp-exp-ylabels"><span>100</span><span>75</span><span>50</span><span>25</span></div>
              <svg viewBox="0 0 400 135" preserveAspectRatio="none" className="dp-exp-line-svg" role="img" aria-label="Illustrative animated engagement trend">
                <defs>
                  <linearGradient id="dpExpFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5d8868" stopOpacity=".24" />
                    <stop offset="100%" stopColor="#5d8868" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="dp-exp-area" d="M0 108 C28 96 38 101 62 82 S98 91 125 68 S164 80 190 56 S228 68 252 43 S293 57 320 30 S365 39 400 12 L400 135 L0 135 Z" fill="url(#dpExpFill)" />
                <path className="dp-exp-line" d="M0 108 C28 96 38 101 62 82 S98 91 125 68 S164 80 190 56 S228 68 252 43 S293 57 320 30 S365 39 400 12" fill="none" stroke="#477b5c" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="320" cy="30" r="4" fill="#477b5c" stroke="#f8f8f1" strokeWidth="2" />
              </svg>
            </div>
            <div className="dp-exp-xlabels"><span>01 OCT</span><span>06 OCT</span><span>11 OCT</span><span>16 OCT</span><span>19 OCT</span></div>
          </div>

          <div className="dp-exp-chart-card dp-exp-bar-card">
            <div className="dp-exp-chart-heading">
              <div><span>CHANNELS</span><strong>Traffic sources</strong></div>
              <span className="dp-exp-menu">•••</span>
            </div>
            <div className="dp-exp-bars">
              <div><span>Direct</span><i><b style={{width:"82%"}} /></i><strong>82</strong></div>
              <div><span>Organic</span><i><b style={{width:"67%"}} /></i><strong>67</strong></div>
              <div><span>Social</span><i><b style={{width:"48%"}} /></i><strong>48</strong></div>
              <div><span>Referral</span><i><b style={{width:"34%"}} /></i><strong>34</strong></div>
            </div>
            <div className="dp-exp-insight"><span>↗</span><p><b>Organic is growing</b><br />Explore channel performance</p></div>
          </div>
        </div>

        <div className="dp-exp-footer">
          <span><i /> Illustrative dashboard concept</span>
          <span>DATA ORBIT <b> / </b> PRODUCT INTELLIGENCE</span>
        </div>
      </div>
    );
  }

  if (type === "prediction") {
    return (
      <div className="dp-chart-preview">
        <div className="dp-preview-top"><div><span className="dp-overline">MODEL OVERVIEW</span><h3>Signals & patterns</h3></div><span className="dp-status">● Illustrative</span></div>
        <div className="dp-chart-area">
          <div className="dp-chart-grid"><i /><i /><i /><i /></div>
          <svg viewBox="0 0 480 190" preserveAspectRatio="none" className="dp-line-chart" aria-label="Illustrative prediction chart">
            <defs><linearGradient id="dpLineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6b9c7c" stopOpacity=".3" /><stop offset="100%" stopColor="#6b9c7c" stopOpacity="0" /></linearGradient></defs>
            <path d="M0,155 C35,140 52,150 85,119 S135,130 170,94 S220,105 255,78 S310,96 345,51 S405,63 480,20 L480,190 L0,190 Z" fill="url(#dpLineFill)" />
            <path d="M0,155 C35,140 52,150 85,119 S135,130 170,94 S220,105 255,78 S310,96 345,51 S405,63 480,20" fill="none" stroke="#477b5c" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="dp-legend"><span>Historical signal</span><span>Potential trend · illustrative</span></div>
        <div className="dp-preview-bottom"><span>Model output depends on data quality and evaluation.</span></div>
      </div>
    );
  }

  return (
    <div className="dp-dashboard">
      <div className="dp-preview-top"><div><span className="dp-overline">BUSINESS OVERVIEW</span><h3>Performance snapshot</h3></div><span className="dp-period">Overview ↗</span></div>
      <div className="dp-kpis">
        <div><span>Revenue</span><strong>Analysis</strong><small>Explore trends</small></div>
        <div><span>Customers</span><strong>Segments</strong><small>Understand value</small></div>
        <div><span>Performance</span><strong>KPIs</strong><small>Track progress</small></div>
      </div>
      <div className="dp-bars">
        {[42, 65, 50, 78, 57, 87, 68, 95, 72, 82, 60, 90].map((height, i) => <div key={i} style={{ height: `${height}%` }} />)}
      </div>
      <div className="dp-legend"><span>Illustrative reporting preview</span><span>Sample visual only</span></div>
      <div className="dp-table-row"><span>Revenue analysis</span><span>Customer insights</span><span>KPI monitoring</span></div>
    </div>
  );
}

export default function DetailPage() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const page = pages[path];

  if (!page) {
    return <main className="dp-not-found"><h1>Page not found</h1><a href="/">Return home ↗</a></main>;
  }

  return (
    <main className="dp-page">
      <div className="dp-grain" />
      <header className="dp-nav">
        <a href="/" className="dp-brand"><span className="dp-brand-mark">D<span>.</span></span><span>DATA ORBIT <small>TECHNOLOGIES</small></span></a>
        <nav><a href="/#services">Services</a><a href="/#portfolio">Portfolio</a><a href="/#contact" className="dp-nav-cta">Let's talk <span>↗</span></a></nav>
      </header>

      <section className="dp-hero">
        <div className="dp-hero-copy">
          <div className="dp-breadcrumb"><a href="/">Home</a><span>/</span><span>{page.type}</span></div>
          <div className="dp-eyebrow"><span className="dp-dot" />{page.eyebrow}</div>
          <h1>{page.title}<br /><em>{page.accent}</em></h1>
          <p className="dp-intro">{page.intro}</p>
          <div className="dp-hero-actions"><a className="dp-button" href="/#contact">Discuss your project <span>↗</span></a><a href="/#portfolio" className="dp-text-link">Explore our work <span>↓</span></a></div>
          <div className="dp-tag"><span>✳</span> {page.tag}</div>
        </div>
        <div className="dp-visual"><VisualPreview type={page.visual} /><div className="dp-visual-caption"><span>DATA ORBIT / STUDIO</span><span>DESIGNED WITH INTENTION</span></div></div>
        <div className="dp-hero-foot"><span>STRATEGY <b>·</b> DESIGN <b>·</b> TECHNOLOGY</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="dp-value">
        <div className="dp-section-intro"><span className="dp-overline">THE BIGGER PICTURE</span><h2>Better systems.<br /><em>Clearer decisions.</em></h2></div>
        <div className="dp-stat-grid">
          {page.stats.map(([number, title, description]) => <article className="dp-stat" key={number}><span className="dp-stat-num">{number}</span><h3>{title}</h3><p>{description}</p><span className="dp-stat-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="dp-features">
        <div className="dp-feature-heading"><div><span className="dp-overline">WHAT WE FOCUS ON</span><h2>Thoughtful work.<br /><em>Purposeful outcomes.</em></h2></div><p>Every engagement starts with the problem to solve. We shape the approach around the goal, the data and the people who will use the result.</p></div>
        <div className="dp-feature-grid">
          {page.features.map(([title, description], index) => <article key={title} className="dp-feature"><span className="dp-feature-index">0{index + 1}</span><h3>{title}</h3><p>{description}</p><span className="dp-feature-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="dp-process">
        <div><span className="dp-overline">A CLEARER PROCESS</span><h2>From first question<br />to <em>meaningful progress.</em></h2><p>Structured collaboration keeps the work focused, transparent and aligned with your objectives.</p></div>
        <div className="dp-steps">{page.steps.map((step, index) => <div className="dp-step" key={step}><span>0{index + 1}</span><strong>{step}</strong><i>↗</i></div>)}</div>
      </section>

      <section className="dp-cta">
        <div className="dp-cta-orb" />
        <span className="dp-overline">HAVE A CHALLENGE IN MIND?</span>
        <h2>Let's make something<br /><em>meaningful together.</em></h2>
        <p>Tell us what you want to improve. We'll start with the problem, explore the options and shape a practical next step.</p>
        <a className="dp-button dp-button-light" href="/#contact">Start a conversation <span>↗</span></a>
      </section>

      <footer className="dp-footer"><a href="/" className="dp-brand"><span className="dp-brand-mark">D<span>.</span></span><span>DATA ORBIT <small>TECHNOLOGIES</small></span></a><span>Clarity in data. Purpose in technology.</span><a href="/">Back to homepage ↑</a></footer>
    </main>
  );
}

