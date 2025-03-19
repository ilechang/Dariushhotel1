import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Optional for styling

const Room = () => {
    const rooms = [
        { img: "/room1.png", title: "Opulent penthouse suite with breathtaking sea views" },
        { img: "/room2.png", title: "Lavish beachfront villa with panoramic sunset vistas" },
        { img: "/room3.png", title: "Elegant royal suite with stunning skyline panoramas" },
        { img: "/room4.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room5.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room1.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room2.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room3.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room4.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room5.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room1.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room2.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room3.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room4.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room5.png", title: "A short description of the room, including the 3D visuals" },
        { img: "/room3.png", title: "A short description of the room, including the 3D visuals" },

    ];

    // Group rooms into slides (4 per slide)
    const slides = [];
    for (let i = 0; i < rooms.length; i += 4) {
        slides.push(rooms.slice(i, i + 4));
    }

    const [index, setIndex] = useState(0);

    // Handle manual slide control with simulated infinite scroll
    const handleSelect = (selectedIndex) => {
        if (selectedIndex >= slides.length) {
            setIndex(0); // Reset to first slide
        } else if (selectedIndex < 0) {
            setIndex(slides.length - 1); // Go to last slide if scrolling backward
        } else {
            setIndex(selectedIndex);
        }
    };

    return (
        <div className="ps-5">
            <br />
      <br />
      <br />
        <div className="ps-5 ms-5">
        <div className="container-fluid ps-5 py-5">
          <h2 className="libre-caslon-text-regular mb-4 py-2 ms-2">Rooms and Suites</h2>
      
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            indicators={true}
            controls={true}
            interval={null} // Prevent Bootstrap's default auto-scroll
            wrap={true} // Allow manual infinite scroll simulation
          >
            {slides.map((slide, idx) => (
              <Carousel.Item key={idx}>
                <div className="row">
                  {slide.map((room, roomIdx) => (
                    <div key={roomIdx} className="col-lg-3 col-md-6 col-sm-12 mb-3">
                      <div className="room-card text-center">
                        <img src={room.img} alt={`Room ${roomIdx + 1}`} className="img-fluid w-100 p-2" />
                        <div className="mt-3">
                          <div className="d-flex justify-content-between align-items-center text-start px-2 mt-3">
                            <p className="col-8 mb-0">{room.title}</p>
                            <Button variant="outline-dark" className="rounded-0 text-nowrap">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <br />
      <br />
      <br />
      </div>
    );
};

export default Room;
