// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  const mobileNav = document.getElementById("mobile-nav");
  mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function changeSlide(step) {
  currentSlide = (currentSlide + step + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Automatic slide change every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);

// Initialize the first slide
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
});


// Sample Data for Thumbnails
const thumbnails = [
  {
    title: "Bhoomi",
    type: "movies",
    categories: ["action", "thriller", "sad"],
    language: "hindi",
    videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://i.ytimg.com/vi/7WS9SOuPeGI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCi9_HpmLd9APJ_ABNC8JWDGjUv2Q"
  },
  {
    title: "Rana Naidu",
    type: "series",
    categories: ["action", "thriller", "romantic"],
    language: "hindi",
    videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://i.ytimg.com/vi/bm9jJxf1wIU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAASeovlNphYwicciILxMZhiL-ELQ"
  },
  {
    title: "Venom",
    type: "movies",
    categories: "action",
    language: "english",
    videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://wallpapers.com/images/featured/venom-pictures-fy7adc0g6sv3v73n.jpg"
  },
    {
    title: "Joker",
    type: "movies",
    categories: "thriller",
    language: "english",
    videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://www.antraktsinema.com/images/pimages/201909/vizyon4_1568496282.jpg"
  },
  
      {
    title: "Life",
    type: "series",
    categories: "thriller",
    language: "english",
    videoLink: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://thumbnails.cbsig.net/CBS_Production_Entertainment_VMS/2024/01/09/2298136643710/LIFE_US_2017_SA_16x9_1920x1080_2588610_1920x1080.jpg"
  },
  // Add more thumbnails as needed...
];

// Populate Thumbnails
function populateThumbnails() {
  const container = document.getElementById('thumbnailContainer');
  container.innerHTML = '';
  thumbnails.forEach((thumb) => {
    const div = document.createElement('div');
    div.className = 'thumbnail';
    div.onclick = () => openPopup(thumb.videoLink, thumb.image);
    div.innerHTML = `<img src="${thumb.image}" alt="${thumb.title}">`;
    container.appendChild(div);
  });
}

 // Open Video Popup
  function openPopup(videoUrl, thumbnailUrl) {
    const popup = document.getElementById('videoPopup');
    const player = document.getElementById('videoPlayer');
    const thumbnail = document.getElementById('videoThumbnail');

    thumbnail.src = thumbnailUrl; // Set thumbnail
    player.src = videoUrl; // Set video source
    popup.style.display = 'block'; // Show popup
  }

  // Close Video Popup
  function closePopup() {
    const popup = document.getElementById('videoPopup');
    const player = document.getElementById('videoPlayer');
    
    player.src = ''; // Stop the video
    popup.style.display = 'none'; // Hide popup
  }

  // Close popup when clicking outside of it
  window.onclick = function(event) {
    const popup = document.getElementById('videoPopup');
    if (event.target == popup) {
      closePopup();
    }
  }

// Play Video
function playVideo() {
  const player = document.getElementById('videoPlayer');
  player.style.display = 'block'; // Show the player
}

// Filter Thumbnails Based on Selections
function filterThumbnails() {
  const type = document.getElementById('typeSelector').value;
  const category = document.getElementById('categorySelector').value;
  const language = document.getElementById('languageSelector').value;

    const filteredThumbnails = thumbnails.filter(thumb => {
    const matchesType = !type || thumb.type === type;
    const matchesCategory = !category || thumb.categories.includes(category); // Check if category is in categories array
    const matchesLanguage = !language || thumb.language === language;

    return matchesType && matchesCategory && matchesLanguage;
  });

  const container = document.getElementById('thumbnailContainer');
  container.innerHTML = '';
  filteredThumbnails.forEach((thumb) => {
    const div = document.createElement('div');
    div.className = 'thumbnail';
    div.onclick = () => openPopup(thumb.videoLink, thumb.image);
    div.innerHTML = `<img src="${thumb.image}" alt="${thumb.title}">`;
    container.appendChild(div);
  });
}

// Event Listeners for Selectors
document.getElementById('typeSelector').addEventListener('change', filterThumbnails);
document.getElementById('categorySelector').addEventListener('change', filterThumbnails);
document.getElementById('languageSelector').addEventListener('change', filterThumbnails);

// Populate initial thumbnails
populateThumbnails();

