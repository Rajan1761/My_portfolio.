// ═══════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
animRing();
document.querySelectorAll('a,button,.btn,.skill-tab,.chat-sug,.social-btn,.contact-link,.project-card,.about-card,.edu-card,.timeline-card,.bento-card,.value-item,.stat-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-grow'));
});


// ═══════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════
const themeBtn=document.getElementById('themeToggle');
themeBtn.addEventListener('click',()=>{
  const html=document.documentElement;
  const isDark=html.dataset.theme==='dark';
  html.dataset.theme=isDark?'light':'dark';
  themeBtn.innerHTML=isDark?'<i class="fa fa-sun"></i>':'<i class="fa fa-moon"></i>';
});

// ═══════════════════════════════════════
// REVEAL ON SCROLL
// ═══════════════════════════════════════
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.skill-bar-fill').forEach(b=>{
        b.style.transform=`scaleX(${b.style.getPropertyValue('--w')||0.8})`;
        b.classList.add('animated');
      });
    }
  });
},{threshold:0.15});
reveals.forEach(r=>observer.observe(r));
// Also animate skill bars on tab switch
document.querySelectorAll('.skill-bar-fill').forEach(b=>{
  b.style.transform='scaleX(0)';
});

// ═══════════════════════════════════════
// SKILL TABS
// ═══════════════════════════════════════
function switchTab(name){
  document.querySelectorAll('.skill-tab').forEach((t,i)=>{
    const tabs=['technical','marketing','tools','soft'];
    t.classList.toggle('active',tabs[i]===name);
  });
  document.querySelectorAll('.skills-panel').forEach(p=>{p.classList.remove('active');});
  const panel=document.getElementById('tab-'+name);
  panel.classList.add('active');
  // Re-reveal and animate
  panel.querySelectorAll('.skill-bar-fill').forEach(b=>{
    b.style.transform='scaleX(0)';
    setTimeout(()=>{
      b.style.transform=`scaleX(${b.style.getPropertyValue('--w')||0.8})`;
    },50);
  });
  panel.querySelectorAll('.reveal').forEach(r=>{
    r.classList.remove('visible');
    setTimeout(()=>r.classList.add('visible'),50);
  });
}

// ═══════════════════════════════════════
// CONTACT FORM (with localStorage "database")
// ═══════════════════════════════════════
// function submitForm(){
//   const name=document.getElementById('cf-name').value.trim();
//   const email=document.getElementById('cf-email').value.trim();
//   const subject=document.getElementById('cf-subject').value;
//   const message=document.getElementById('cf-message').value.trim();
//   const status=document.getElementById('form-status');
//   if(!name||!email||!subject||!message){
//     status.className='status-error';
//     status.style.display='block';
//     status.textContent='⚠️ Please fill in all fields before submitting.';
//     return;
//   }
//   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
//     status.className='status-error';
//     status.style.display='block';
//     status.textContent='⚠️ Please enter a valid email address.';
//     return;
//   }
//   // Save to localStorage (simulated database)
//   const submissions=JSON.parse(localStorage.getItem('rajan_contact')||'[]');
//   submissions.push({name,email,subject,message,date:new Date().toISOString()});
//   localStorage.setItem('rajan_contact',JSON.stringify(submissions));
//   status.className='status-success';
//   status.style.display='block';
//   status.textContent=`✅ Message saved! Thanks ${name}, Rajan will reply to ${email} soon.`;
//   document.getElementById('cf-name').value='';
//   document.getElementById('cf-email').value='';
//   document.getElementById('cf-subject').value='';
//   document.getElementById('cf-message').value='';
// }
function submitForm() {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value.trim();
  const status = document.getElementById('form-status');

  if (!name || !email || !subject || !message) {
    status.className = 'status-error';
    status.style.display = 'block';
    status.textContent = '⚠️ Please fill in all fields before submitting.';
    return;
  }

  // YOUR WHATSAPP NUMBER
  const phoneNumber = "917010021761";

  // Message format
  const whatsappMessage =
`New Contact Form Message

👤 Name: ${name}
📧 Email: ${email}
📌 Subject: ${subject}
💬 Message: ${message}`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Open WhatsApp
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

  // Success message
  status.className = 'status-success';
  status.style.display = 'block';
  status.textContent = `✅ Redirecting to WhatsApp...`;

  // Clear form
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-subject').value = '';
  document.getElementById('cf-message').value = '';
}

// ═══════════════════════════════════════
// AI CHATBOT
// ═══════════════════════════════════════
const RAJAN_CONTEXT = `You are an AI assistant for Rajan G's portfolio website. You ONLY answer questions about Rajan G based on his profile. Keep answers concise (2-4 sentences max), friendly, and professional. Here is everything about Rajan:

NAME: Rajan G
LOCATION: Chennai, Tamil Nadu, India
EMAIL: rr731147@gmail.com
PHONE: +91 7010021761
LINKEDIN: linkedin.com/in/rajan-g-873352156

EDUCATION:
- Master of Engineering (M.E.) in Computer Science, DMI College of Engineering, Anna University (Aug 2025 – Mar 2027) - CURRENTLY STUDYING
- Bachelor of Engineering (B.E.) in Computer Science, Anna University (2021–2024)
- Diploma in Computer Engineering, Sri Nallalaghu Nadar Polytechnic College (Aug 2018 – May 2021)

CURRENT JOB: Social Media Manager at Facebook, Chennai (Sep 2024 – Present)

PAST EXPERIENCE:
- Video Editor at Dan jr vlogs YouTube channel, Chennai (Sep 2024 – Jun 2025)
- Remote YouTube Editor (Nov 2022 – Oct 2023)
- Lab Instructor at Academic institution, Chennai

TECHNICAL SKILLS: Python, SQL, AI/ML, Cloud Data Analytics, Software Engineering, C Programming, Blockchain Security, Cloud Technologies

MARKETING SKILLS: Digital Marketing, Social Media Management, Content Creation, Brand Strategy (Audi, Mercedes-Benz), Campaign Analytics, Community Engagement

TOOLS: Video Editing (YouTube, Dan jr vlogs), Blockchain Security, Cloud Technologies, Facebook Business Suite

PROJECT: Blockchain-based Electronic Health Records Authentication — developed a secure system to improve data transparency in healthcare using blockchain technology

SUMMARY: Results-driven CS Engineer and Digital Marketing professional. Expert in bridging the gap between technical data analytics (Python, SQL) and creative brand growth. Passionate about AI/ML and data-driven solutions.`;

let chatOpen=false;
function toggleChat(){
  chatOpen=!chatOpen;
  const panel=document.getElementById('chatbot-panel');
  panel.classList.toggle('open',chatOpen);
  if(chatOpen)document.getElementById('chatInput').focus();
}

function addMsg(role,text){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');
  div.className=`msg ${role}`;
  div.innerHTML=`<div class="msg-avatar">${role==='bot'?'<i class="fa fa-robot" style="font-size:0.65rem;"></i>':'<i class="fa fa-user" style="font-size:0.65rem;"></i>'}</div><div class="msg-bubble">${text}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
}

function showTyping(){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');
  div.className='msg bot';div.id='typing-indicator';
  div.innerHTML=`<div class="msg-avatar"><i class="fa fa-robot" style="font-size:0.65rem;"></i></div><div class="msg-bubble msg-typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}
function hideTyping(){const t=document.getElementById('typing-indicator');if(t)t.remove();}

async function callClaude(userMsg){
  showTyping();
  document.getElementById('chatSuggestions').style.display='none';
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:RAJAN_CONTEXT,
        messages:[{role:'user',content:userMsg}]
      })
    });
    const data=await res.json();
    hideTyping();
    const reply=data.content?.map(c=>c.text||'').join('')||'Sorry, I could not get a response right now.';
    addMsg('bot',reply);
  }catch(e){
    hideTyping();
    addMsg('bot','⚠️ Connection issue. Please try again or contact Rajan directly at rr731147@gmail.com');
  }
}

function sendChat(){
  const input=document.getElementById('chatInput');
  const msg=input.value.trim();
  if(!msg)return;
  addMsg('user',msg);
  input.value='';
  callClaude(msg);
}
function generateReply(userMsg){
  const msg = userMsg.toLowerCase();

  if(msg.includes('name')) return "My name is Rajan G, a Computer Science Engineer and Digital Marketing professional.";

  if(msg.includes('location')) return "Rajan is based in Chennai, Tamil Nadu, India.";

  if(msg.includes('skill')) return "Rajan has skills in Python, SQL, AI/ML, Digital Marketing, and Blockchain Security.";

  if(msg.includes('project')) return "Rajan built a Blockchain-based Electronic Health Records Authentication system for secure healthcare data.";

  if(msg.includes('education')) return "Rajan completed B.E. in Computer Science and is currently pursuing M.E. at Anna University.";

  if(msg.includes('contact') || msg.includes('email')) return "You can contact Rajan at rr731147@gmail.com or via WhatsApp.";

  if(msg.includes('job') || msg.includes('work')) return "Rajan is currently working as a Social Media Manager at Facebook, Chennai.";

  return "I'm here to help you know about Rajan G. Ask me about his skills, projects, education, or experience!";
}

function callClaude(userMsg){
  showTyping();
  document.getElementById('chatSuggestions').style.display='none';

  setTimeout(()=>{
    hideTyping();
    const reply = generateReply(userMsg);
    addMsg('bot', reply);
  }, 800);
}

function sendSuggestion(msg){
  addMsg('user',msg);
  callClaude(msg);
}

// Initial skill bar animation on page load
setTimeout(()=>{
  document.querySelectorAll('#tab-technical .skill-bar-fill').forEach(b=>{
    b.style.transform=`scaleX(${b.style.getPropertyValue('--w')||0.8})`;
  });
},800);

//////
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant for Rajan G portfolio. Answer only about Rajan briefly."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 120
      })
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content || "No response from AI";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
////
async function callClaude(userMsg){
  showTyping();
  document.getElementById('chatSuggestions').style.display='none';

  try{
    const res = await fetch('/api/chat', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ message: userMsg })
    });

    const data = await res.json();

    hideTyping();
    addMsg('bot', data.reply);

  }catch(e){
    hideTyping();
    addMsg('bot','⚠️ AI not responding. Try again later.');
  }
}
