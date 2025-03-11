import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom"; // ✅ No BrowserRouter here
import "./App.css";
import Title from "./Title";
import Landing from "./Landing";
import Second from "./Second";
import Room from "./Room";
import RoomIntro from "./RoomIntro";  
import Experience from "./Experience";  
import Footer from "./Footer"; 
import RoomDetails from "./RoomDetails"; // The new page 


function App() {
  return (
    <>
      <Title />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <div id="home"><Landing /></div>
            <div id="rooms"><Second /></div>
            <div id="hotel-experiences"><Room /></div>
            <div id="city-experiences"><RoomIntro /></div>
            <div id="experience"><Experience /></div>
            <Footer />
          </>
        } />

        {/* Room Details Page */}
        <Route path="/room-details" element={<RoomDetails />} />
      </Routes>
    </>
  );
}

export default App;

















// import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";
// import Title from "./Title";
// import Landing from "./Landing";
// import Second from "./Second";
// import Room from "./Room";
// import RoomIntro from "./RoomIntro";  
// import Experience from "./Experience";  
// import Footer from "./Footer"; 
// import RoomDetails from "./RoomDetails"; // The new page 

// function App() {
//   return (
//     <>
//       <Title />
//       <div id="home"><Landing /></div>
//       <div id="rooms"><Second /></div>
//       <div id="hotel-experiences"><Room /></div>
//       <div id="city-experiences"><RoomIntro /></div>
//       <div id="experience"><Experience /></div>
//       <Footer />
//     </>
//   );
// }

// export default App;
