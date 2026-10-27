"use strict";

const slides = Array.from(document.querySelectorAll(".slide"));

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const currentSlideNumber = document.getElementById(
  "currentSlideNumber"
);

const totalSlideNumber = document.getElementById(
  "totalSlideNumber"
);

const currentSlideTitle = document.getElementById(
  "currentSlideTitle"
);

const progressBar = document.getElementById("progressBar");

const progressTrack = document.querySelector(
  ".progress-track"
);

const fullscreenButton = document.getElementById(
  "fullscreenButton"
);

const floatingFullscreenButton = document.getElementById(
  "floatingFullscreenButton"
);

const keyboardHint = document.getElementById("keyboardHint");

let activeSlideIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let hintTimer = null;

const formatSlideNumber = (number) => {
  return String(number).padStart(2, "0");
};

const getHashSlideIndex = () => {
  const match = window.location.hash.match(/^#slide-(\d+)$/);

  if (!match) {
    return null;
  }

  const requestedIndex = Number(match[1]) - 1;

  if (
    Number.isInteger(requestedIndex) &&
    requestedIndex >= 0 &&
    requestedIndex < slides.length
  ) {
    return requestedIndex;
  }

  return null;
};

const updateHash = () => {
  const nextHash = `#slide-${activeSlideIndex + 1}`;

  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash);
  }
};

const updatePresentation = (previousIndex = activeSlideIndex) => {
  slides.forEach((slide, index) => {
    const isActive = index === activeSlideIndex;

    slide.classList.toggle("active", isActive);
    slide.classList.remove("exit-left");

    slide.setAttribute(
      "aria-hidden",
      String(!isActive)
    );

    if (!isActive && index < activeSlideIndex) {
      slide.classList.add("exit-left");
    }
  });

  const visibleSlide = slides[activeSlideIndex];
  const title =
    visibleSlide.dataset.slideTitle || "Presentation";

  currentSlideNumber.textContent = formatSlideNumber(
    activeSlideIndex + 1
  );

  totalSlideNumber.textContent = formatSlideNumber(
    slides.length
  );

  currentSlideTitle.textContent = title;

  const percentage =
    ((activeSlideIndex + 1) / slides.length) * 100;

  progressBar.style.width = `${percentage}%`;

  progressTrack.setAttribute(
    "aria-valuemax",
    String(slides.length)
  );

  progressTrack.setAttribute(
    "aria-valuenow",
    String(activeSlideIndex + 1)
  );

  previousButton.disabled = activeSlideIndex === 0;
  nextButton.disabled = activeSlideIndex === slides.length - 1;

  document.title = `${title} | LLM Advanced Beginner`;

  updateHash();

  if (previousIndex !== activeSlideIndex) {
    visibleSlide.scrollTop = 0;
  }
};

const goToSlide = (nextIndex) => {
  const safeIndex = Math.max(
    0,
    Math.min(nextIndex, slides.length - 1)
  );

  if (safeIndex === activeSlideIndex) {
    return;
  }

  const previousIndex = activeSlideIndex;
  activeSlideIndex = safeIndex;

  updatePresentation(previousIndex);
};

const goToNextSlide = () => {
  goToSlide(activeSlideIndex + 1);
};

const goToPreviousSlide = () => {
  goToSlide(activeSlideIndex - 1);
};

const showKeyboardHint = () => {
  if (!keyboardHint) {
    return;
  }

  keyboardHint.classList.add("visible");

  window.clearTimeout(hintTimer);

  hintTimer = window.setTimeout(() => {
    keyboardHint.classList.remove("visible");
  }, 1800);
};

const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen mode is not available.", error);
  }
};

previousButton.addEventListener(
  "click",
  goToPreviousSlide
);

nextButton.addEventListener(
  "click",
  goToNextSlide
);

document.querySelectorAll("[data-go-next]").forEach((button) => {
  button.addEventListener("click", goToNextSlide);
});

document.querySelectorAll("[data-go-slide]").forEach((button) => {
  button.addEventListener("click", () => {
    const slideIndex = Number(button.dataset.goSlide);

    if (Number.isInteger(slideIndex)) {
      goToSlide(slideIndex);
    }
  });
});

document.addEventListener("keydown", (event) => {
  const target = event.target;

  const isInteractiveElement =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target?.isContentEditable;

  if (isInteractiveElement) {
    return;
  }

  switch (event.key) {
    case "ArrowRight":
    case "PageDown":
    case " ":
      event.preventDefault();
      goToNextSlide();
      showKeyboardHint();
      break;

    case "ArrowLeft":
    case "PageUp":
      event.preventDefault();
      goToPreviousSlide();
      showKeyboardHint();
      break;

    case "Home":
      event.preventDefault();
      goToSlide(0);
      break;

    case "End":
      event.preventDefault();
      goToSlide(slides.length - 1);
      break;

    case "f":
    case "F":
      event.preventDefault();
      toggleFullscreen();
      break;

    default: {
      const numericSlide = Number(event.key);

      if (
        Number.isInteger(numericSlide) &&
        numericSlide >= 1 &&
        numericSlide <= Math.min(slides.length, 9)
      ) {
        goToSlide(numericSlide - 1);
      }
    }
  }
});

document.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];

    const differenceX = touch.clientX - touchStartX;
    const differenceY = touch.clientY - touchStartY;

    const minimumSwipeDistance = 60;
    const isHorizontalSwipe =
      Math.abs(differenceX) > Math.abs(differenceY);

    if (
      isHorizontalSwipe &&
      Math.abs(differenceX) >= minimumSwipeDistance
    ) {
      if (differenceX < 0) {
        goToNextSlide();
      } else {
        goToPreviousSlide();
      }
    }
  },
  { passive: true }
);

if (fullscreenButton) {
  fullscreenButton.addEventListener(
    "click",
    toggleFullscreen
  );
}

if (floatingFullscreenButton) {
  floatingFullscreenButton.addEventListener(
    "click",
    toggleFullscreen
  );
}

document.addEventListener("fullscreenchange", () => {
  const isFullscreen = Boolean(document.fullscreenElement);

  if (fullscreenButton) {
    fullscreenButton.textContent = isFullscreen
      ? "Exit fullscreen"
      : "Enter fullscreen";
  }

  if (floatingFullscreenButton) {
    floatingFullscreenButton.setAttribute(
      "aria-label",
      isFullscreen
        ? "Exit fullscreen"
        : "Enter fullscreen"
    );
  }
});

window.addEventListener("hashchange", () => {
  const requestedSlide = getHashSlideIndex();

  if (
    requestedSlide !== null &&
    requestedSlide !== activeSlideIndex
  ) {
    goToSlide(requestedSlide);
  }
});

const initialSlideIndex = getHashSlideIndex();

if (initialSlideIndex !== null) {
  activeSlideIndex = initialSlideIndex;
}

updatePresentation();