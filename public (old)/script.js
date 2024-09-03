document.addEventListener('DOMContentLoaded', function() {
  console.log('Depop Clone Loaded');
  // Add interactivity here
});

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".listing-img");
  console.log('hi');
  images.forEach(function(img) {
      img.onerror = function() {
          this.style.backgroundColor = "#ccc"; // Set gray background
          this.style.width = "100%"; // Ensure it takes up the full width
          this.style.height = "300px"; // Fixed height
          this.src = ""; // Remove the broken image icon
      };
  });
});