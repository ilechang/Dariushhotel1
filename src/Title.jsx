import { useState, useEffect } from "react";

const Title = () => {
  const sections = [
    { name: "Home", id: "home" },
    { name: "Rooms & Suites", id: "rooms" },
    { name: "Hotel Experiences", id: "hotel-experiences" },
    { name: "City Experiences", id: "city-experiences" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "home";
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top libre-caslon-text-regular" style={{ background: "#fff1de" }}>
      <div className="container-fluid mx-5 mt-3">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src="/logo.svg" alt="Logo" width="50" />
        </a>

        {/* Hamburger toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {sections.map(({ name, id }) => (
              <li className="nav-item" key={id}>
                <a
                  className={`nav-link mx-3 ${activeSection === id ? "active-section" : ""}`}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveSection(id);
                  }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Title;
















// import { useState } from "react";

// const Title = () => {
//   const sections = [
//     { name: "Home", id: "home" },
//     { name: "Rooms & Suites", id: "rooms" },
//     { name: "Hotel Experiences", id: "hotel-experiences" },
//     { name: "City Experiences", id: "city-experiences" },
//   ];

//   const [activeSection, setActiveSection] = useState("Home");

//   const handleScroll = (id) => {
//     setActiveSection(id);
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg libre-caslon-text-regular">
//       <div className="container-fluid mx-5 mt-3">
//         <a className="navbar-brand" href="/">
//           <img src="/logo.svg" alt="Logo" width="50" />
//         </a>
//         <ul className="navbar-nav ms-auto">
//           {sections.map(({ name, id }) => (
//             <li className="nav-item" key={id}>
//               <a
//                 className={`nav-link mx-3 ${activeSection === id ? "active" : ""}`}
//                 href={`#${id}`} // Prevents default jump-to behavior
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleScroll(id);
//                 }}
//               >
//                 {name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Title;

