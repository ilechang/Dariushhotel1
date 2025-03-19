import { useState, useEffect } from "react";

const Title = () => {
  const sections = [
    { name: "Home", id: "home" },
    { name: "Rooms & Suites", id: "rooms" },
    { name: "Hotel Experiences", id: "hotel-experiences" },
    { name: "City Experiences", id: "city-experiences" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll behavior to detect active section
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "home"; // Default section

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
    <nav className="navbar navbar-expand-lg libre-caslon-text-regular fixed-top  " style={{background:"#fff1de"}}>
      <div className="container-fluid mx-5 mt-3">
        <a className="navbar-brand" href="/">
          <img src="/logo.svg" alt="Logo" width="50" />
        </a>
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

