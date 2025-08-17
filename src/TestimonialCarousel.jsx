import React, { useEffect, useState } from "react";
import "./TestimonialCarousel.css";

const testimonials = [
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/sssss.png",
    text: "I sleep easier at night knowing the Techwarezen team is in my corner. Supporting my business and keeping my systems in Tip-Top shape",
    name: "Nikhil Nanda",
    role: "Director of",
    university: "HS Svengaard Limited",
    link: "https://www.svendgaard.com/",
    color: "#0057a9"
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/dddd.png",
    text: "Techwarezen are always accommodating our diverse needs and we feel like they are a part of our Company",
    name: "Dr Yash Gulati",
    university: "Dryashgulati",
    link: "https://dryashgulati.com/",
    color: "#0894d8"
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/asssas.png",
    text: "Being a managed services client has improved our pptime, increased our productivity and systematized our software updates",
    name: "Vishal Sharma",
    university: "Pureyog",
    link: "https://pureyog.com/",
    color: "#e60d2d"
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/asaasss.png",
    text: "I sleep easier at night knowing the NanoSoft team is in my corner. Supporting my business and keeping my systems in Tip-Top shape",
    name: "John H",
    university: "Some Company",
    link: "https://homealarms4u.com/",
    color: "#1975d2"
  }
];

export default function TestimonialCarousel() {
  // Window width for responsive rules
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Index of the first visible card
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Breakpoint rules (cardsPerPage, dots, step) derived from windowWidth ---
  let cardsPerPage = 3;
  let requestedDots = 2;     // how many rectangles to show (before clamping)
  let paginationStep = 1;    // how many cards to move per dot

  if (windowWidth <= 479) {
    cardsPerPage = 1;
    paginationStep = 1;      // move 1
    // Requirement: show 4 rectangles (with 4 items, this equals totalSlides)
    requestedDots = testimonials.length; // 4
  } else if (windowWidth >= 480 && windowWidth <= 768) {
    cardsPerPage = 2;
    requestedDots = 2;
    paginationStep = 2;      // move 2
  } else if (windowWidth >= 769 && windowWidth <= 979) {
    cardsPerPage = 3;
    requestedDots = 2;
    paginationStep = 1;      // move 1
  } else if (windowWidth >= 980 && windowWidth <= 1199) {
    cardsPerPage = 4;
    requestedDots = 0;       // hide pagination
    paginationStep = 1;      // irrelevant
  } else {
    cardsPerPage = 3;
    requestedDots = 2;
    paginationStep = 1;      // move 1
  }

  // Total full-card slides available (never shows half cards)
  const totalSlides = Math.max(testimonials.length - cardsPerPage + 1, 1);

  // Final dot count shown (clamped so dots map to valid slide indices)
  const visibleDots = requestedDots === 0
    ? 0
    : Math.min(requestedDots, totalSlides);

  // Clamp currentIndex whenever layout rules change
  useEffect(() => {
    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (visibleDots === 0) {
      setCurrentIndex(0);
      return;
    }
    // The last dot maps to index = (visibleDots - 1) * paginationStep
    const maxIndexByDots = (visibleDots - 1) * paginationStep;
    const maxIndexBySlides = totalSlides - 1;
    const maxIndex = Math.min(maxIndexByDots, maxIndexBySlides);
    setCurrentIndex((idx) => Math.min(idx, maxIndex));
  }, [visibleDots, paginationStep, totalSlides]);

  return (
    <div className="carousel-container">
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{
            // Move exactly one "card width" (or two) per click depending on paginationStep.
            // Translate step is always based on one card width: 100 / cardsPerPage.
            transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`
          }}
        >
          {testimonials.map((t) => (
            <div
              className="slide"
              key={t.name}
              style={{ flexBasis: `${100 / cardsPerPage}%` }}
            >
              <div className="card" style={{ borderTop: `4px solid ${t.color}` }}>
                <img src={t.logo} alt={t.name} className="card-logo" />
                <p className="card-text">“{t.text}”</p>
                <h4 className="card-name">{t.name}</h4>
                <p className="card-role">
                  {t.role && t.role + " - "}
                  <a href={t.link}>{t.university}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleDots > 0 && (
        <div className="pagination">
          {Array.from({ length: visibleDots }).map((_, i) => {
            const targetIndex = Math.min(i * paginationStep, totalSlides - 1);
            const isActive = currentIndex === targetIndex;
            return (
              <div
                key={i}
                onClick={() => setCurrentIndex(targetIndex)}
                className={`bar ${isActive ? "active" : ""}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
