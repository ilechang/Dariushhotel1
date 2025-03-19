


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Button } from "react-bootstrap";

function Landing() {
  return (
<>
<br />
<br />
<br />

<div className="hero-container container d-flex justify-content-center position-relative">

  <h1 style={{ top: "2%" }} className="position-absolute ">Dariush <span className="dancing-script ">Grand</span> Hotel</h1>
  <div className="d-flex justify-content-center position-reletive">
    <img src="/Element.png" alt="Hero" className="elememt mt-5 position-absolute start-0 " style={{ top: "15%" }}/>
    {/* Image Column */}
    <div className="col-5 d-flex">

    <div className="d-flex flex-column flex-md-row align-items-md-end">
{/* Image Column */}
<img src="/heroimage.png" alt="Hero" className="img-fluid w-100 mt-5" />

{/* Text & Button - Stacks below image on md and smaller */}
<div className="col-8 d-flex flex-column align-items-start px-4 mt-3 mt-md-0">
<p className="libre-caslon-text-regular mb-2">
Step into a world where Persian artistry meets modern indulgence, where every detail whispers
elegance, and every moment lingers like a timeless memory.
</p>
<Button className="book-btn rounded-0 text-white libre-caslon-text-regular border-0 py-2 px-5">
Book Now
</Button>
</div>
</div>

    </div>

  </div>
</div>


    </>
  );
}

export default Landing;
