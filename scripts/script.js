document.querySelector("#hamburger").addEventListener("click", ()=>{
    document.querySelector(".menu-items").classList.toggle("hidden")
    document.querySelector(".menu-items").classList.add("mt-20")
});

// My Products 
const products = [
  {
    id: 1,
    name: "سماعة بلوتوث",
    company: "TechSound",
    image: "images/speaker.webp",
    price: "4200 ريال قديم",
    rating: 3,
    description: "سماعة صوت عالية الجودة بتقنية البلوتوث."
  },
  {
    id: 2,
    name: "ساعة ذكية",
    company: "SmartTime",
    image: "images/watch.jpeg",
    price: "5000 ريال قديم",
    rating: 4,
    description: "ساعة ذكية لقياس اللياقة والتنبيهات."
  },
  {
    id: 3,
    name: "كاميرا مراقبة",
    company: "SecureCam",
    image: "images/camera.jpeg",
    price: "2000 ريال سعودي",
    rating: 2,
    description: "كاميرا أمان منزلية بجودة عالية ورؤية ليلية."
  },
  {
    id: 4,
    name: "لوحة مفاتيح",
    company: "KeyTech",
    image: "images/keyboard.jpeg",
    price: "7000 ريال قعيطي",
    rating: 5,
    description: "لوحة مفاتيح ميكانيكية بإضاءة خلفية."
  },
  {
    id: 5,
    name: "لابتوب",
    company: "Dell",
    image: "images/computer.webp",
    price: "350000 ريال قديم",
    rating: 5,
    description: "لابتوب عرطة وارد امريكي الجيل الثامن فضي نحيف وشاشة لمس"
  },
  {
    id: 6,
    name: "ماوس",
    company: "KeyTech",
    image: "images/mouse.png",
    price: "3000 ريال قعيطي",
    rating: 1,
    description: "ماوس واير ليس تعمل على بعد 10 متر "
  },
  {
    id: 7,
    name: "جوال",
    company: "Redmi Not 12R",
    image: "images/mobile.jpeg",
    price: "300000 ريال قديم",
    rating: 5,
    description:"جوال عررررطه العرطات بطارية 5000 وذاكره داخليه 256"
  },
  {
    id: 8,
    name: "ماسح ضوئي",
    company: "Lenevo",
    image: "images/scanner.jpg",
    price: "20000 ريال قديم",
    rating: 4,
    description:"ماسح ضوئي سريع جدا يعمل 24 ساعه "
  },
  {
    id: 9,
    name: "تابليت",
    company: "Samsung",
    image: "images/tablet.webp",
    price: "23000 ريال قديم",
    rating: 3,
    description:"تابليت اخر صيحة  بذاكره داخليه 16جيجابايت"
  }
];

const slider = document.getElementById("productSlider");
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
let autoSlideInterval;
let currentIndex = 0;

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="${i <= rating ? 'text-yellow-500' : 'text-gray-300'}">★</span>`;
  }
  return stars;
}

function updateCards() {
  slider.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "w-[250px] flex-shrink-0 bg-white p-4 shadow rounded cursor-pointer mx-2 transition-transform duration-300";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded mb-2" />
      <h3 class="text-lg font-bold mb-1">${product.name}</h3>
      <p class="text-green-600 font-semibold mb-1">${product.price}</p>
      <div data-rating>${renderStars(product.rating)}</div>
    `;
    card.onclick = () => showModal(product, index);
    slider.appendChild(card);
  });
}

function scrollToCard(index) {
  const cardWidth = slider.querySelector("div").offsetWidth + 16; // +margin
  const scrollPosition = index * cardWidth;
  slider.scrollTo({
    left: scrollPosition,
    behavior: "smooth"
  });
}

// تخصيص المودال ياخذ قيم عناصر من المنتج الذي عنده الاندكس 
function showModal(product, index) {
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalCompany").textContent = product.company;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalPrice").textContent = product.price;

  const starsContainer = document.getElementById("modalStars");
  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "★";
    star.className = i <= product.rating ? "text-yellow-500 text-2xl cursor-pointer" : "text-gray-300 text-2xl cursor-pointer";
    star.onclick = () => {
      products[index].rating = i;
      updateCards();
      showModal(products[index], index);
    };
    starsContainer.appendChild(star);
  }

  modal.classList.remove("hidden");
  stopAutoSlider();
}

closeModal.onclick = () => {
  modal.classList.add("hidden");
  startAutoSlider();
};

//  التحكم في الحركة التلقائية
function startAutoSlider() {
  stopAutoSlider(); // لمنع التكرار
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % products.length;
    scrollToCard(currentIndex);
  }, 3000);
}

function stopAutoSlider() {
  clearInterval(autoSlideInterval);
}

//  أزرار التنقل لليمن ولليسار
document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % products.length;
  scrollToCard(currentIndex);
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  scrollToCard(currentIndex);
};

//  بدء العمل
updateCards();
startAutoSlider();