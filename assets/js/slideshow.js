// ACTIVITY SLIDES (replace images later)
const activities = [
  {
    title: "Movement Competency Training",
    category: "PathFit 1",
    imageUrl:
      "https://images.unsplash.com/photo-1485727749690-d091e8284ef3?q=80&w=1080",
  },
  {
    title: "Group Fitness Training",
    category: "PathFit 2",
    imageUrl:
      "https://images.unsplash.com/photo-1630415188550-9e454489ce3a?q=80&w=1080",
  },
  {
    title: "Applied Physical Activities",
    category: "PathFit 3 & 4",
    imageUrl:
      "https://images.unsplash.com/photo-1760879946121-893199733851?q=80&w=1080",
  },
  {
    title: "Healthy Lifestyle Education",
    category: "All PathFit Levels",
    imageUrl:
      "https://images.unsplash.com/photo-1660789983911-9473f197be9c?q=80&w=1080",
  },
  {
    title: "LPU Cavite Campus",
    category: "All PathFit Modules from LPU-Cavite",
    imageUrl: "",
  },
];

const slideshow = document.getElementById("slideshow");
let currentIndex = 0;
let intervalId;

// Create slides dynamically
activities.forEach((activity, i) => {
  const slide = document.createElement("div");
  slide.className = `slide ${i === 0 ? "active" : ""}`;
  slide.innerHTML = `
                <img src="${activity.imageUrl}" alt="${activity.title}" class="slide-image">
                <div class="slide-overlay"></div>
                <div class="slide-content">
                    <h3>${activity.title}</h3>
                    <p>${activity.category}</p>
                </div>
                <div class="progress-bar"></div>
            `;
  slideshow.appendChild(slide);
});

// Indicators
const indicatorsContainer = document.createElement("div");
indicatorsContainer.className = "slide-indicators";
slideshow.appendChild(indicatorsContainer);

activities.forEach((_, i) => {
  const indicator = document.createElement("div");
  indicator.className = `indicator ${i === 0 ? "active" : ""}`;
  indicator.onclick = () => goToSlide(i);
  indicatorsContainer.appendChild(indicator);
});

const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

function goToSlide(i) {
  slides[currentIndex].classList.remove("active");
  slides[currentIndex].classList.add("exit");
  indicators[currentIndex].classList.remove("active");

  currentIndex = i;

  slides[currentIndex].classList.add("active");
  slides[currentIndex].classList.remove("exit");
  indicators[currentIndex].classList.add("active");

  // Reset progress bar
  const bar = slides[currentIndex].querySelector(".progress-bar");
  bar.style.animation = "none";
  bar.offsetHeight; // forces reflow (fixes animation reset)
  bar.style.animation = "progress 4s linear";

  clearInterval(intervalId);
  startAutoSlide();
}

function nextSlide() {
  goToSlide((currentIndex + 1) % activities.length);
}

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 4000);
}

startAutoSlide();
