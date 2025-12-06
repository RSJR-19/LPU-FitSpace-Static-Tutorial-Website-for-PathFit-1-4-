// ACTIVITY SLIDES
const activities = [
  {
    title: "Movement Competency Training",
    category: "PathFit 1",
    imageUrl:
      "./assets/images/graphic-box/pf1B.png",
  },
  {
    title: "Group Fitness Training",
    category: "PathFit 2",
    imageUrl:
      "./assets/images/graphic-box/pf2D.png",
  },
  {
    title: "Applied Physical Activities",
    category: "PathFit 3 & 4",
    imageUrl:
      "./assets/images/graphic-box/pf3A.png",
  },
  {
    title: "LPU Cavite Campus",
    category: "PathFit Modules for LPU-Cavite",
    imageUrl: "./assets/images/table_of_index/LPU_landscape.svg",
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
  bar.offsetHeight; 
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
