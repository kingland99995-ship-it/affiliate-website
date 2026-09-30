const products = [
  {
    name: "Trendy Everyday Outfit",
    category: "Fashion",
    image: "images/trendy-everyday-outfit.png",
    status: "soon"
  },
  {
    name: "Minimal Makeup Essentials",
    category: "Beauty",
    image: "images/minimal-makeup-essentials.png",
    status: "live",
    link: "https://link.amazon/B0fj06OnN",
    video: "media/product-2.mp4",
    description: "A beauty-focused pick presented in the supplied product creative. Explore the full product details, availability and current information through the product link.",
    highlights: ["Beauty & skincare focused", "Product-focused visual showcase", "View the current listing through the provided link"]
  },
  {
    name: "Cute Home Organizer",
    category: "Home",
    image: "images/cute-home-organizer.png",
    status: "soon"
  },
  {
    name: "Everyday Fashion Accessory",
    category: "Accessories",
    image: "images/everyday-fashion-accessory.png",
    status: "soon"
  },
  {
    name: "Glow Care Pick",
    category: "Beauty",
    image: "images/glow-care-pick.png",
    status: "live",
    link: "https://link.amazon/B0brKHgMz",
    video: "media/product-1.mp4",
    description: "A skincare pick featuring CeraVe Moisturising Cream in the supplied creative. The product packaging highlights use for dry to very dry skin and lists essential ceramides and hyaluronic acid.",
    highlights: ["CeraVe Moisturising Cream", "For dry to very dry skin", "Packaging highlights ceramides & hyaluronic acid"]
  },
  {
    name: "Smart Storage Find",
    category: "Home",
    image: "images/smart-storage-find.png",
    status: "soon"
  },

];

let cat = 'All';
const grid = document.querySelector('#products');
const search = document.querySelector('#search');

function productUrl(product) {
  return product.status === 'live' ? `product.html?id=${encodeURIComponent(product.name)}` : 'coming-soon.html';
}

function render() {
  const q = search.value.toLowerCase().trim();
  const visible = products.filter(p =>
    (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q)
  );

  grid.innerHTML = visible.map(p => `
    <article class="card reveal">
      <div class="pic">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span>${p.status === 'live' ? 'AVAILABLE' : 'COMING SOON'}</span>
      </div>
      <div class="info">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <a class="deal" href="${productUrl(p)}">${p.status === 'live' ? 'View Product ↗' : 'Coming Soon →'}</a>
      </div>
    </article>
  `).join('');

  document.querySelector('#empty').style.display = visible.length ? 'none' : 'block';
  observe();
}

document.querySelectorAll('.chips button').forEach(button => {
  button.onclick = () => {
    document.querySelector('.chips .active').classList.remove('active');
    button.classList.add('active');
    cat = button.dataset.cat;
    render();
  };
});

search.oninput = render;

const ob = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('show');
    ob.unobserve(entry.target);
  }
}), { threshold: .08 });

function observe() {
  document.querySelectorAll('.reveal:not(.show)').forEach(element => ob.observe(element));
}

render();
observe();
