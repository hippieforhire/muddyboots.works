// Import GSAP for animations
import { gsap } from "gsap";

// Initialize AOS Library for Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // AOS Initialization
  AOS.init({
    duration: 1000, // Animation duration (ms)
    once: true, // Run animation only once
    offset: 100, // Offset to trigger animations
  });

  console.log("AOS initialized");

  // GSAP Animation for Hero Text
  const heroTextSpans = document.querySelectorAll(".hero-text span");
  console.log("Hero text spans:", heroTextSpans);

  // Ensure spans exist before animating
  if (heroTextSpans.length > 0) {
    console.log("Animating hero text spans");
    gsap.from(heroTextSpans, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.3,
    });
  } else {
    console.log("No hero text spans found");
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});