const frameCount = 100;
const img = document.getElementById("sequence");
const messageSection = document.querySelector(".message-section");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;
  const animationSection = document.querySelector(".animation-section");
  const start = animationSection.offsetTop;
  const end = start + animationSection.offsetHeight - window.innerHeight;

  if (scrollTop >= start && scrollTop <= end) {
    const progress = (scrollTop - start) / (end - start);
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(progress * frameCount)
    );

    img.src = `Frames/0001.png${String(frameIndex + 1).padStart(4, '0')}.png`;
  }

  // Show message when animation selesai
  if (scrollTop > end) {
    messageSection.style.opacity = 1;
  }

});

