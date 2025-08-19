import React, { useEffect, useState, useRef } from "react";
import "./TestimonialCarousel.css";

const testimonials = [
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/sssss.png",
    text: "I sleep easier at night knowing the Techwarezen team is in my corner. Supporting my business and keeping my systems in Tip-Top shape",
    name: "Nikhil Nanda",
    role: "Director of",
    university: "HS Svengaard Limited",
    link: "https://www.svendgaard.com/",
    color: "#0057a9",
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/dddd.png",
    text: "Techwarezen are always accommodating our diverse needs and we feel like they are a part of our Company",
    name: "Dr Yash Gulati",
    university: "Dryashgulati",
    link: "https://dryashgulati.com/",
    color: "#0894d8",
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/asssas.png",
    text: "Being a managed services client has improved our pptime, increased our productivity and systematized our software updates",
    name: "Vishal Sharma",
    university: "Pureyog",
    link: "https://pureyog.com/",
    color: "#e60d2d",
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/asaasss.png",
    text: "I sleep easier at night knowing the NanoSoft team is in my corner. Supporting my business and keeping my systems in Tip-Top shape",
    name: "John H",
    university: "Some Company",
    link: "https://homealarms4u.com/",
    color: "#1975d2",
  },
];

export default function TestimonialCarousel() {
  const containerRef = useRef(null);
  // Initializing state with window.innerWidth to provide a sensible starting point.
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use a ResizeObserver to get the true, real-time width of the container.
  // The empty dependency array ensures this runs once after the initial render
  // when the ref is guaranteed to be attached.
  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    
    // Start observing the container element
    ro.observe(containerRef.current);

    // Cleanup the observer on component unmount
    return () => ro.disconnect();
  }, []);

  // --- Breakpoints logic is now based on containerWidth, not windowWidth ---
  let cardsPerPage;
  let requestedDots;
  let paginationStep;

  if (containerWidth <= 479) {
    cardsPerPage = 1;
    requestedDots = testimonials.length;
    paginationStep = 1;
  } else if (containerWidth <= 768) {
    cardsPerPage = 2;
    requestedDots = 2;
    paginationStep = 2;
  } else if (containerWidth <= 979) {
    cardsPerPage = 3;
    requestedDots = 2;
    paginationStep = 1;
  } else if (containerWidth <= 1199) {
    cardsPerPage = 4;
    requestedDots = 0;
    paginationStep = 1;
  } else { // For containerWidth > 1199
    cardsPerPage = 3;
    requestedDots = 2;
    paginationStep = 1;
  }
  
  const totalSlides = Math.max(testimonials.length - cardsPerPage + 1, 1);
  const visibleDots = requestedDots === 0 ? 0 : Math.min(requestedDots, totalSlides);

  // Reset index when cardsPerPage changes
  const prevCPP = useRef(cardsPerPage);
  useEffect(() => {
    if (prevCPP.current !== cardsPerPage) {
      prevCPP.current = cardsPerPage;
      setCurrentIndex(0);
    }
  }, [cardsPerPage]);

  // Clamp index if dots/slides shrink
  useEffect(() => {
    if (visibleDots === 0) {
      setCurrentIndex(0);
      return;
    }
    const maxIndexByDots = (visibleDots - 1) * paginationStep;
    const maxIndexBySlides = totalSlides - 1;
    const maxIndex = Math.min(maxIndexByDots, maxIndexBySlides);
    setCurrentIndex((idx) => Math.min(idx, maxIndex));
  }, [visibleDots, paginationStep, totalSlides]);

  const gapSize = 1.25; // Define the gap size
  const numberOfGaps = cardsPerPage > 1 ? cardsPerPage - 1 : 0;
  
  // Adjusted calculation to prevent horizontal scrollbar
  const flexBasis = cardsPerPage === 1
    ? '100%'
    : `calc((100% - ${numberOfGaps * gapSize}rem) / ${cardsPerPage})`;

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
          }}
        >
          {testimonials.map((t, index) => (
            <div
              className="slide"
              key={index}
              style={{ flexBasis }}
            >
              <div className="card" style={{ borderTop: `4px solid ${t.color}` }}>
                <img src={t.logo} alt={t.name} className="card-logo" />
                <p className="card-text">“{t.text}”</p>
                <h4 className="card-name">{t.name}</h4>
                <p className="card-role">
                  {t.role && t.role + " "}
                  <a href={t.link}>{t.university}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleDots > 0 && (
        <div className="carousel-pagination">
          {Array.from({ length: visibleDots }).map((_, i) => (
            <button
              key={i}
              className={`dot ${currentIndex === i * paginationStep ? "active" : ""}`}
              onClick={() => setCurrentIndex(i * paginationStep)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
