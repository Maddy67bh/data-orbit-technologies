import PremiumHero from './PremiumHero.jsx';
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, ArrowUpRight, BrainCircuit, ChartNoAxesCombined, Code2, Menu, X, Sparkles, Send, Activity } from "lucide-react";
import * as THREE from "three";
import "./style.css";

function Water() {
  useEffect(() => {
    const canvas = document.querySelector("#water");
    let renderer, scene, camera, material, geometry, raf, resize;
    let alive = true;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(innerWidth, innerHeight);
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, resolution: { value: new THREE.Vector2(innerWidth, innerHeight) } },
        vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
        fragmentShader: `
          precision mediump float;
          varying vec2 vUv;
          uniform float time;
          uniform vec2 resolution;
          void main(){
            vec2 p=vUv*2.0-1.0;
            p.x*=resolution.x/resolution.y;
            float w=sin(p.x*2.7+p.y*1.6+time*.23);
            w+=cos(p.y*3.3-p.x*.8-time*.19);
            w+=sin(length(p-vec2(-.3,.2))*8.0-time*.3);
            w+=cos(length(p+vec2(.5,.3))*11.0-time*.24);
            w*=.25;
            float shine=smoothstep(.28,.9,w);
            float vignette=1.0-smoothstep(.25,1.65,length(p));
            vec3 c=mix(vec3(.008,.022,.015),vec3(.025,.24,.12),.48+w*.35);
            c=mix(c,vec3(.2,.57,.34),shine*.22);
            c*=vignette;
            gl_FragColor=vec4(c,.95);
          }`
      });
      scene.add(new THREE.Mesh(geometry, material));
      resize = () => {
        renderer.setSize(innerWidth, innerHeight);
        material.uniforms.resolution.value.set(innerWidth, innerHeight);
      };
      window.addEventListener("resize", resize);
      const tick = t => {
        if (!alive) return;
        raf = requestAnimationFrame(tick);
        material.uniforms.time.value = t * .001;
        renderer.render(scene, camera);
      };
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) raf = requestAnimationFrame(tick);
      else { renderer.render(scene, camera); }
    } catch (e) {
      canvas.style.display = "none";
      console.warn("WebGL unavailable; CSS fallback active.");
    }
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      geometry?.dispose(); material?.dispose(); renderer?.dispose();
    };
  }, []);
  return <canvas id="water" aria-hidden="true" />;
}

function Orb() {
  return <div className="orb-scene" aria-label="Abstract animated glass orb">
    <div className="orb-halo" />
    <div className="orbit o1"><i /></div><div className="orbit o2"><i /></div><div className="orbit o3"><i /></div>
    <div className="orb"><div className="orb-light"/><div className="orb-inner"/><div className="orb-wave"/></div>
    <span className="orb-label">◉ &nbsp; DATA IN MOTION</span>
  </div>;
}

function Birds() {
  return <div className="birds" aria-hidden="true">{[0,1,2,3,4,5].map(n =>
    <svg key={n} className={"bird bird"+n} viewBox="0 0 50 24"><path d="M2 5 Q13 3 25 18 Q37 3 48 5 Q37 0 25 12 Q13 0 2 5Z"/></svg>
  )}</div>;
}

const services = [
  { n:"01", icon:ChartNoAxesCombined, title:"Data Analytics & BI", text:"Turn complex business data into useful dashboards, actionable insights and confident decisions.", tags:"Power BI · SQL · Python" },
  { n:"02", icon:BrainCircuit, title:"AI Solutions & Automation", text:"Explore predictive models, AI-powered workflows and automation built around real business needs.", tags:"Machine Learning · GenAI" },
  { n:"03", icon:Code2, title:"Web & Software Development", text:"Build modern, responsive websites and digital products with thoughtful user experiences.", tags:"React · APIs · Web Apps" }
];

const projects = [
  { type:"BUSINESS INTELLIGENCE", title:"Business Performance Analytics", text:"An illustrative dashboard concept for sales, customer trends and performance indicators.", icon:ChartNoAxesCombined },
  { type:"ARTIFICIAL INTELLIGENCE", title:"Predictive Intelligence", text:"A concept exploring how structured data can support model-driven predictions.", icon:BrainCircuit },
  { type:"DIGITAL PRODUCTS", title:"Intelligent Web Experiences", text:"A modern product interface concept built around clarity, usability and speed.", icon:Code2 }
];

function App() {
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({name:"",email:"",message:""});
  const nav = [["Services","#services"],["Work","#work"],["About","#about"],["Contact","#contact"]];
  function submit(e) {
    e.preventDefault();
    setNotice("Demo mode: your message has not been sent. Connect an email service to receive enquiries.");
  }
  return <>
    <Water />
    <header className="header">
      <a className="brand" href="#home"><span className="logo">◉</span><span>DATA ORBIT <b>TECHNOLOGIES</b></span></a>
      <button className="menu-btn" aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? "nav open" : "nav"}>{nav.map(([n,h])=><a key={n} href={h} onClick={()=>setMenu(false)}>{n}</a>)}<a className="nav-cta" href="#contact" onClick={()=>setMenu(false)}>Let's talk <ArrowUpRight size={15}/></a></nav>
    </header>

    <main>
      <PremiumHero />

      <div className="strip"><span>THOUGHTFUL TECHNOLOGY</span><i/><span>MEASURABLE INSIGHT</span><i/><span>HUMAN-CENTERED DESIGN</span></div>

      <section className="section" id="services">
        <div className="section-head"><div><div className="eyebrow">01 / WHAT WE DO</div><h2>Technology with<br/><span>purpose.</span></h2></div><p>From the first question to the final product, we focus on solutions that make complex things easier to understand and use.</p></div>
        <div className="service-grid">{services.map(({n,icon:Icon,title,text,tags})=><article className="service glass" key={n}>
          <div className="service-top"><span>{n}</span><Icon size={24}/></div><h3>{title}</h3><p>{text}</p><span className="tags">{tags}</span><a href="#contact" className="text-link">Discuss a project <ArrowRight size={15}/></a>
        </article>)}</div>
      </section>

      <section className="section work" id="work">
        <div className="section-head"><div><div className="eyebrow">02 / SELECTED CONCEPTS</div><h2>Ideas into<br/><span>experiences.</span></h2></div><p>Illustrative project concepts showing the types of problems we can explore. These are concepts, not claims of client work.</p></div>
        <div className="project-grid">{projects.map(({type,title,text,icon:Icon},i)=><article className="project" key={title}>
          <div className={"project-art art"+i}>{i===0?<div className="dashboard"><small>PERFORMANCE OVERVIEW <b>DEMO</b></small><div className="bars">{[35,52,43,75,60,89,66,100,73].map((h,j)=><i key={j} style={{height:h+"%"}}/>)}</div><small>ILLUSTRATIVE DATA</small></div>:i===1?<div className="network"><Icon size={36}/>{Array.from({length:8},(_,j)=><i key={j} style={{"--i":j}}/>)}</div>:<div className="code-window"><small>01 / PRODUCT CONCEPT</small><p>const insight = await</p><b>analyze(data);</b><p>return clarity;</p><i/></div>}</div>
          <div className="project-meta">{type}<span>CONCEPT 0{i+1}</span></div><h3>{title}</h3><p>{text}</p><a className="text-link" href="#contact">Discuss a similar idea <ArrowRight size={15}/></a>
        </article>)}</div>
      </section>

      <section className="about" id="about"><div className="about-mark"><span>DO</span><i/><i/><i/></div><div><div className="eyebrow">03 / OUR APPROACH</div><h2>Clear thinking.<br/><span>Meaningful building.</span></h2><p>Great technology starts with understanding the problem. We connect analytical thinking, practical engineering and considered design to turn ideas into useful digital experiences.</p><a className="text-link" href="#contact">Tell us what you're building <ArrowRight size={15}/></a></div></section>

      <section className="contact section" id="contact">
        <div><div className="eyebrow">04 / GET IN TOUCH</div><h2>Have a challenge?<br/><span>Let's explore it.</span></h2><p>Tell us a little about your idea, data challenge or digital product.</p><div className="contact-note"><Sparkles size={17}/> Good questions lead to better solutions.</div></div>
        <form className="contact-form glass" onSubmit={submit}>
          <label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="How should we address you?"/></label>
          <label>Work email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@company.com"/></label>
          <label>What are you working on?<textarea required rows="4" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your project..."/></label>
          <button className="btn primary" type="submit">Review message <Send size={15}/></button>
          {notice && <p className="notice" role="status">{notice}</p>}<small className="legal">Demo form only. No information is sent or stored.</small>
        </form>
      </section>
    </main>
    <footer><a className="brand" href="#home"><span className="logo">◉</span><span>DATA ORBIT <b>TECHNOLOGIES</b></span></a><p>Turning Data Into Intelligence.</p><small>© {new Date().getFullYear()} Data Orbit Technologies</small></footer>
  </>;
}

createRoot(document.getElementById("root")).render(<App/>);

