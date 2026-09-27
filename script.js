const products=[
["Trendy Everyday Outfit","Fashion","👗","TRENDING"],
["Minimal Beauty Essentials","Beauty","✨","POPULAR"],
["Cute Home Organizer","Home","🏠","TRENDING"],
["Everyday Fashion Accessory","Accessories","👜","POPULAR"],
["Festive Special Collection","Fashion","🌸","TRENDING"],
["Glow Care Pick","Beauty","💫","POPULAR"],
["Smart Storage Find","Home","🧺","TRENDING"],
["Daily Style Essential","Accessories","🕶️","POPULAR"]
];
let cat="All";
const grid=document.querySelector("#products");
const search=document.querySelector("#search");
const clearSearch=document.querySelector("#clearSearch");
function render(){
  const q=search.value.trim().toLowerCase();
  const list=products.filter(p=>(cat==="All"||p[1]===cat)&&p[0].toLowerCase().includes(q));
  grid.innerHTML=list.map(p=>`
    <article class="card">
      <div class="pic"><span class="badge ${p[3]==="POPULAR"?"popular":""}">${p[3]} ✦</span><span class="pic-emoji">${p[2]}</span></div>
      <div class="info"><span class="tag">${p[1]}</span><h3>${p[0]}</h3><div class="price">Coming Soon</div><a class="deal" href="coming-soon.html">View Deal <span>↗</span></a></div>
    </article>`).join("");
  document.querySelector("#empty").style.display=list.length?"none":"block";
  requestAnimationFrame(()=>document.querySelectorAll(".card").forEach((el,i)=>setTimeout(()=>el.classList.add("visible"),i*55)));
}
document.querySelectorAll(".chips button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelector(".chips .active")?.classList.remove("active");
  b.classList.add("active"); cat=b.dataset.cat; render();
}));
search.addEventListener("input",()=>{
  clearSearch.classList.toggle("show",!!search.value); render();
});
clearSearch.addEventListener("click",()=>{search.value="";clearSearch.classList.remove("show");render();search.focus()});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const target=document.querySelector(a.getAttribute("href")); if(!target)return;
  e.preventDefault(); target.scrollIntoView({behavior:"smooth",block:"start"});
}));
render();