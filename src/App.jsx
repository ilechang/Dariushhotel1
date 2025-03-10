// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import Title from "./Title";
// import Landing from "./Landing";
// import Second from "./Second";
// import Room from "./Room";
// import RoomIntro from "./RoomIntro";  
// import Experience from "./Experience";  
// import Footer from "./Footer";  

// function App() {
//   return (
//     <>
//       <Title />
//       <Landing />
//       <Second/>
//       <Room/>
//       <RoomIntro/>
//       <Experience/>
//       <Footer/>

//     </>
//   );
// }

// export default App;








import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Title from "./Title";
import Landing from "./Landing";
import Second from "./Second";
import Room from "./Room";
import RoomIntro from "./RoomIntro";  
import Experience from "./Experience";  
import Footer from "./Footer";  

function App() {
  return (
    <>
      <Title />
      <div id="home"><Landing /></div>
      <div id="rooms"><Second /></div>
      <div id="hotel-experiences"><Room /></div>
      <div id="city-experiences"><RoomIntro /></div>
      <div id="experience"><Experience /></div>
      <Footer />
    </>
  );
}

export default App;
