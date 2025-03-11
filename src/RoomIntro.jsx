import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";

const RoomIntro = () => {
  const navigate = useNavigate(); // ✅ Use for navigation

  const rooms = [
    { img: "/image3.png", title: "Opulent penthouse suite with breathtaking sea views" },
    { img: "/placeholder1.jpg", title: "A short description of the room, including the 3D visuals" },
    { img: "/placeholder2.jpg", title: "A short description of the room, including the 3D visuals" },
    { img: "/placeholder3.jpg", title: "A short description of the room, including the 3D visuals" },
    { img: "/placeholder4.jpg", title: "A short description of the room, including the 3D visuals" },
  ];

  const [mainImage, setMainImage] = useState("/image3.png"); // Default main image

  return (
    <div className="ps-3">
      <br />
      <div className="container-fluid w-100 py-5 room-intro position-relative mt-5 ps-5">
        <div className="mx-5">
          <div className="libre-caslon-text-regular d-flex justify-content-between align-items-center ps-5 mx-5 mb-5">
            <p className="small-text fw-bold mb-0">Name of the room</p>
            <p className="room-description mb-0">
              <span className="fw-bold">About the room</span> <br />
              Short but catchy description of the hotel room including the AR experience
            </p>
            <p className="mb-0 fw-bold">Room: 224</p>
          </div>
        </div>

        <div className="row ps-5">
          {/* Left Column: Room Image */}
          <div className="col-md-6 position-relative ps-5">
            <div className="d-flex align-items-end gap-3">
              {/* Main Image */}
              <img
                src={mainImage}
                alt="Room"
                className="ms-5 img w-75"
                style={{ position: "relative", zIndex: "1000" }}
              />
              {/* Button and List Container */}
              <div className="d-flex ms-5 align-items-end gap-5">
                <button 
                  className="btn btn-outline-dark libre-caslon-text-regular rounded-0"
                  onClick={() => navigate("/room-details")} // ✅ Navigate to RoomDetails
                >
                  Learn More
                </button>
                <ul className="mb-0 libre-caslon-text-regular text-nowrap">
                  <li>it’s amenities</li>
                  <li>what makes it special</li>
                  <li>features</li>
                  <li>unique selling points</li>
                </ul>
              </div>
            </div>

            {/* Small Images Below */}
            <div className="d-flex justify-content-center gap-3 mt-3 w-75 ms-5">
              {rooms.map((room, index) => (
                <div key={index} className="sm-img-col" style={{ cursor: "pointer" }}>
                  <img
                    src={room.img}
                    alt={`Room ${index + 1}`}
                    className="sm-img img-fluid border"
                    style={{ width: "115px", height: "auto" }}
                    onClick={() => setMainImage(room.img)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomIntro;































// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import { Container } from "react-bootstrap";

// const RoomIntro = () => {
//   const rooms = [
//     { img: "/image3.png", title: "Opulent penthouse suite with breathtaking sea views" },
//     { img: "/placeholder1.jpg", title: "A short description of the room, including the 3D visuals" },
//     { img: "/placeholder2.jpg", title: "A short description of the room, including the 3D visuals" },
//     { img: "/placeholder3.jpg", title: "A short description of the room, including the 3D visuals" },
//     { img: "/placeholder4.jpg", title: "A short description of the room, including the 3D visuals" },
//   ];

//   const [mainImage, setMainImage] = useState("/image3.png"); // Default main image

//   return (
//     <div className="ps-3">
//       <br />

//       <div className="container-fluid w-100 py-5 room-intro position-relative mt-5 ps-5">
//         <div className="mx-5">
//           <div className="libre-caslon-text-regular d-flex justify-content-between align-items-center ps-5 mx-5 mb-5">
//             <p className="small-text fw-bold mb-0">Name of the room</p>
//             <p className="room-description mb-0">
//               <span className="fw-bold">About the room</span> <br />
//               Short but catchy description of the hotel room including the AR experience
//             </p>
//             <p className="mb-0 fw-bold">Room: 224</p>
//           </div>
//         </div>

//         <div className="row ps-5">
//           {/* Left Column: Room Image */}
//           <div className="col-md-6 position-relative ps-5">
//             <div className="d-flex align-items-end gap-3">
//               {/* Main Image */}
//               <img
//                 src={mainImage}
//                 alt="Room"
//                 className="ms-5 img w-75"
//                 style={{ position: "relative", zIndex: "1000" }}
//               />
//               {/* Button and List Container */}
//               <div className="d-flex ms-5 align-items-end gap-5">
//                 <button className="btn btn-outline-dark libre-caslon-text-regular rounded-0">
//                   Learn More
//                 </button>
//                 <ul className="mb-0  libre-caslon-text-regular text-nowrap">
//                   <li>it’s amenities</li>
//                   <li>what makes it special</li>
//                   <li>features</li>
//                   <li>unique selling points</li>
//                 </ul>
//               </div>

//             </div>


//             {/* Small Images Below */}
//             <div className="d-flex justify-content-center gap-3 mt-3 w-75 ms-5 ">
//               {rooms.map((room, index) => (
//                 <div key={index} className="sm-img-col " style={{ cursor: "pointer" }}>
//                   <img
//                     src={room.img}
//                     alt={`Room ${index + 1}`}
//                     className="sm-img img-fluid border "
//                     style={{ width: "115px", height: "auto" }}
//                     onClick={() => setMainImage(room.img)}
//                   />
//                 </div>
//               ))}


//             </div>

//             {/* <div className="d-flex justify-content-between align-items-center mt-3">
//               <span className="nav-arrow">←</span>
//               <span className="image-count">1/20</span>
//               <span className="nav-arrow">→</span>
//             </div> */}
//           </div>

//           {/* Right Column: Room Details */}
//           <Container fluid>

//             <h1 className="libre-caslon-text-regular" style={{ position: "absolute", top: "12%", left: "23%" }}>
//               KING-SIZE BED <br />
//               <span style={{ whiteSpace: "nowrap", position: "absolute", left: "55%" }}>SEA-VIEW <br />
//                 ROOM</span>
//             </h1>

//             <div className="col-md-8 d-flex flex-column justify-content-between">


//             </div>
//           </Container>
//         </div>
//       </div>
 
//       <br />
//       <br />
//       <br />
//     </div>

//   );
// };

// export default RoomIntro;
