const products = [
  {name:"Trendy Everyday Outfit",category:"Fashion",price:"₹499",emoji:"👗",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Minimal Beauty Essentials",category:"Beauty",price:"₹299",emoji:"✨",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Cute Home Organizer",category:"Home",price:"₹199",emoji:"🏠",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Everyday Fashion Accessory",category:"Accessories",price:"₹249",emoji:"👜",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Classic Casual Wear",category:"Fashion",price:"₹599",emoji:"👚",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Glow Care Pick",category:"Beauty",price:"₹349",emoji:"💫",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Smart Storage Find",category:"Home",price:"₹399",emoji:"🧺",image:"",link:"YOUR_AFFILIATE_LINK_HERE"},
  {name:"Daily Style Essential",category:"Accessories",price:"₹299",emoji:"🕶️",image:"",link:"YOUR_AFFILIATE_LINK_HERE"}
];

const grid=document.getElementById("productGrid");
const empty=document.getElementById("emptyState");
const search=document.getElementById("search");
let active="All";

function render(){
  const term=search.value.trim().toLowerCase();
  const filtered=products.filter(p=>
    (active==="All" || p.category===active) &&
    p.name.toLowerCase().includes(term)
  );

  grid.innerHTML=filtered.map(p=>{
    const visual=p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
      : `<span class="placeholder">${p.emoji}</span>`;

    return `<article class="product">
      <div class="product-img">${visual}</div>
      <div class="product-info">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <a class="shop-btn" href="${p.link}" target="_blank" rel="nofollow sponsored noopener">View deal →</a>
      </div>
    </article>`;
  }).join("");

  empty.style.display=filtered.length ? "none" : "block";
}

document.querySelectorAll(".chip").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelector(".chip.active").classList.remove("active");
    btn.classList.add("active");
    active=btn.dataset.category;
    render();
  });
});

search.addEventListener("input",render);
render();