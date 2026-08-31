const $=s=>document.querySelector(s);
const scrollToId=id=>document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"});
let count=Number(localStorage.getItem("smartkit-use")||0); updateUsage();

const tools={
resume:{title:"Resume Bullet Improver",desc:"Paste a simple responsibility and get stronger resume-style wording.",form:`
<div class="field"><label>Your basic sentence</label><textarea id="a" placeholder="Example: I made Power BI dashboards and cleaned data in Excel"></textarea></div>
<div class="field"><label>Role / skill focus</label><input id="b" placeholder="Data Analyst, Power BI, SQL"></div>
<button class="btn primary" onclick="generate('resume')">Improve Bullet</button>`},
linkedin:{title:"LinkedIn Post Maker",desc:"Create a professional job-search or project post.",form:`
<div class="field"><label>Your goal</label><select id="a"><option>Looking for a job</option><option>Sharing a project</option><option>Completed a course</option></select></div>
<div class="field"><label>Details</label><textarea id="b" placeholder="Data Analyst fresher, Mumbai, SQL, Python, Power BI..."></textarea></div>
<button class="btn primary" onclick="generate('linkedin')">Create Post</button>`},
caption:{title:"Caption + Hashtags",desc:"Quick captions for reels, gaming, vlogs and project posts.",form:`
<div class="field"><label>Topic</label><input id="a" placeholder="BGMI clutch / mini vlog / Power BI dashboard"></div>
<div class="field"><label>Style</label><select id="b"><option>Clean</option><option>Funny</option><option>Energetic</option><option>Professional</option></select></div>
<button class="btn primary" onclick="generate('caption')">Generate</button>`},
interview:{title:"Interview Answer Builder",desc:"Structured answers that sound natural for fresher interviews.",form:`
<div class="field"><label>Question</label><input id="a" placeholder="Tell me about yourself"></div>
<div class="field"><label>Your details</label><textarea id="b" placeholder="BSc IT, 6 month internship, SQL, Python, Power BI..."></textarea></div>
<button class="btn primary" onclick="generate('interview')">Build Answer</button>`},
budget:{title:"Monthly Budget Split",desc:"A simple percentage-based monthly plan.",form:`
<div class="field"><label>Monthly income (₹)</label><input id="a" type="number" min="0" placeholder="25000"></div>
<div class="field"><label>Main goal</label><select id="b"><option>Balanced</option><option>Save more</option><option>Clear debt</option></select></div>
<button class="btn primary" onclick="generate('budget')">Create Budget</button>`},
cleaner:{title:"Text Cleaner",desc:"Clean spacing and punctuation without sending text anywhere.",form:`
<div class="field"><label>Paste text</label><textarea id="a" placeholder="Paste messy text here..."></textarea></div>
<button class="btn primary" onclick="generate('cleaner')">Clean Text</button>`}
};

function openTool(id){ const t=tools[id]; $("#toolTitle").textContent=t.title; $("#toolDesc").textContent=t.desc; $("#formArea").innerHTML=t.form; $("#workspace").dataset.tool=id; $("#workspace").classList.add("active"); clearResult(); setTimeout(()=>$("#workspace").scrollIntoView({behavior:"smooth",block:"center"}),50)}
function closeTool(){ $("#workspace").classList.remove("active") }
function val(id){return (document.getElementById(id)?.value||"").trim()}
function result(t){let r=$("#result");r.textContent=t;r.classList.toggle("empty",!t)}
function generate(type){
  let a=val("a"),b=val("b"),out="";
  if(!a){toast("Add some details first");return}
  if(type==="resume"){let action=a.replace(/^i\s+/i,"").replace(/[.]+$/,""); out=`• ${cap(action)}, applying ${b||"relevant tools and analytical skills"} to support accurate, efficient and insight-driven outcomes.\n\nTip: Add a real number if possible, e.g. “reduced reporting time by 20%”.`}
  if(type==="linkedin"){out=`🚀 ${a}\n\n${b}\n\nI’m focused on learning, building practical skills and connecting with opportunities where I can contribute from day one.\n\n#OpenToWork #Career #Jobs #Learning #Growth`}
  if(type==="caption"){let style=b||"Clean";out=`${style==="Funny"?"😂":style==="Energetic"?"🔥":style==="Professional"?"📊":"✨"} ${a} — small moment, big energy.\n\n#${slug(a).split("_").slice(0,2).join("")} #reels #creator #trending #content #india`}
  if(type==="interview"){out=`A strong way to answer “${a}”:\n\n“I’m at the beginning of my career and I’ve been building practical skills through my education and hands-on work. ${b} I’m a quick learner, I enjoy solving problems, and I’m looking for a role where I can contribute while continuing to grow.”\n\nKeep it around 45–60 seconds and add one real project example.`}
  if(type==="budget"){let n=Number(a),mode=b; if(!n||n<1){toast("Enter a valid income");return} let p=mode==="Save more"?[50,30,10,10]:mode==="Clear debt"?[50,20,20,10]:[55,25,10,10]; out=`Monthly plan for ₹${fmt(n)}\n\nNeeds — ${p[0]}%: ₹${fmt(n*p[0]/100)}\nSavings — ${p[1]}%: ₹${fmt(n*p[1]/100)}\nGrowth / debt — ${p[2]}%: ₹${fmt(n*p[2]/100)}\nFun — ${p[3]}%: ₹${fmt(n*p[3]/100)}\n\nAdjust based on rent, family costs and debt.`}
  if(type==="cleaner"){out=a.replace(/\s+/g," ").replace(/\s+([,.!?;:])/g,"$1").replace(/([,.!?;:])([A-Za-z])/g,"$1 $2").trim()}
  result(out); count++;localStorage.setItem("smartkit-use",count);updateUsage()
}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}
function fmt(n){return Math.round(n).toLocaleString("en-IN")}
function clearResult(){result("");$("#result").textContent="Your result will appear here.";$("#result").classList.add("empty")}
async function copyResult(){let t=$("#result").textContent;if($("#result").classList.contains("empty"))return; await navigator.clipboard.writeText(t);toast("Copied")}
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1600)}
function updateUsage(){$("#usage").textContent=`${count} tool${count===1?"":"s"} used on this device`}
function buyPro(){
  const PAYMENT_LINK="YOUR_RAZORPAY_PAYMENT_PAGE_LINK";
  if(PAYMENT_LINK.startsWith("YOUR_")){toast("Add your payment link before launch");return}
  location.href=PAYMENT_LINK
}
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));