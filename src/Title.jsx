// import { useState } from "react";

// const Title = () => {
//   const sections = ["Home", "Rooms & Suites", "Hotel Experiences", "City Experiences"];
//   const [activeSection, setActiveSection] = useState("Home");

//   return (
//     <nav className="navbar navbar-expand-lg libre-caslon-text-regular ">
//       <div className="container-fluid mx-5 mt-3">
//         <a className="navbar-brand" href="/">
//           <img src="/logo.svg" alt="Logo" width="50" />
//         </a>
//         <ul className="navbar-nav ms-auto ">
//           {sections.map((section) => (
//             <li className="nav-item" key={section}>
//               <a
//                 className={`nav-link mx-3 ${activeSection === section ? "active" : ""}`}
//                 href="#"
//                 onClick={() => setActiveSection(section)}
//               >
//                 {section}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Title;








import { useState } from "react";

const Title = () => {
  const sections = [
    { name: "Home", id: "home" },
    { name: "Rooms & Suites", id: "rooms" },
    { name: "Hotel Experiences", id: "hotel-experiences" },
    { name: "City Experiences", id: "city-experiences" },
  ];

  const [activeSection, setActiveSection] = useState("Home");

  const handleScroll = (id) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg libre-caslon-text-regular">
      <div className="container-fluid mx-5 mt-3">
        <a className="navbar-brand" href="/">
          <img src="/logo.svg" alt="Logo" width="50" />
        </a>
        <ul className="navbar-nav ms-auto">
          {sections.map(({ name, id }) => (
            <li className="nav-item" key={id}>
              <a
                className={`nav-link mx-3 ${activeSection === id ? "active" : ""}`}
                href={`#${id}`} // Prevents default jump-to behavior
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(id);
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

