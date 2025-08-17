import React, { useState } from "react";
import "./TestimonialCarousel.css"; // custom CSS

const testimonials = [
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/sssss.png",
    text: "I sleep easier at night knowing the Techwarezen team is in my corner...",
    name: "Nikhil Nanda",
    role: "Director of",
    university: "HS Svengaard Limited",
    link: "https://www.svendgaard.com/",
    color: "#0057a9"
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/dddd.png",
    text: "Techwarezen are always accommodating our diverse needs...",
    name: "Dr Yash Gulati",
    university: "Dryashgulati",
    link: "https://dryashgulati.com/",
    color: "#0894d8"
  },
  {
    logo: "https://techwarezen.com/wp-content/uploads/2021/10/asssas.png",
    text: "Being a managed services client has improved our uptime...",
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
  },
];

export default function TestimonialCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 3;
  const totalSlides = testimonials.length - cardsPerPage + 1;
//   const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  return (
   <div className="carousel-container">
      {/* Cards */}
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentPage * (100 / cardsPerPage)}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, pageIndex) => {
            const startIndex = pageIndex * cardsPerPage;
            const pageCards = testimonials.slice(
              startIndex,
              startIndex + cardsPerPage
            );
            return (
              <div className="carousel-page" key={pageIndex}>
                {pageCards.map((t) => (
                  <div className="card" key={t.name} style={{ borderTop: `4px solid ${t.color}` }}>
                    <img src={t.logo} alt={t.name} className="card-logo" />
                    <p className="card-text">“{t.text}”</p>
                    <h4 className="card-name">{t.name}</h4>
                    <p className="card-role">{t.role && t.role + " - "}
                        <a href={t.link}>{t.university}</a>
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`bar ${i === currentPage ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
