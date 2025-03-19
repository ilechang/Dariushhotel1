

import { useNavigate } from "react-router-dom";
import React, { useState,  useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { BiBed, BiBuilding, BiTv, BiBath, BiAccessibility, BiDish } from "react-icons/bi"; // Serious icons
import { BsChevronRight, BsInfoCircle } from "react-icons/bs"; // Chevron icon
import { FaCheck } from "react-icons/fa"; // ✅ Checkmark icon
import VRScene from "./VRScene";

const roomDetails = [
    { icon: <BiBed size={24} className="me-3" />, title: "Bed Room", description: "1 bed room & meeting room" },
    { icon: <BiBuilding size={24} className="me-3" />, title: "Bed Type & Others", description: "Dabble bed, sofa, table & more" },
    { icon: <BiTv size={24} className="me-3" />, title: "Technology", description: "TV, Freeze, AC, Coffee maker" },
    { icon: <BiBath size={24} className="me-3" />, title: "Bathroom", description: "1 big attached Bathroom" },
    { icon: <BiAccessibility size={24} className="me-3" />, title: "Accessibility", description: "1 six mm balcony, Free WiFi" },
    { icon: <BiDish size={24} className="me-3" />, title: "Kitchen", description: "1 mini Kitchen" },
];
const bookingOptions = [
    {
        id: "flight",
        title: "Flight + Hotel",
        subtitle: "Bundle and Save",
        price: "$1499.00",
        badge: "hot deal",
        badgeColor: "#FFC107", // Yellow
    },
    {
        id: "hotel",
        title: "Hotel Room Only",
        subtitle: "Flexible Booking",
        price: "$599.00",
        badge: null, // No badge
    },
];


const RoomDetails = () => {
    const [selectedRange, setSelectedRange] = useState([]); // 存儲選取的日期範圍
    const [selectedOption, setSelectedOption] = useState("flight");

    // 選擇日期範圍
    const handleDateClick = (date) => {
        if (selectedRange.length === 0) {
            setSelectedRange([date]); // 設定起始日期
        } else if (selectedRange.length === 1) {
            setSelectedRange([selectedRange[0], date]); // 設定結束日期
        } else {
            setSelectedRange([date]); // 重置範圍
        }
    };

//讓頁面從最上方開始顯示
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);



    const [showVR, setShowVR] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowVR = () => {
        setLoading(true); // 先顯示 Loading
        setShowVR(true);
    };


    return (
        <Container className="py-3 mt-5 roboto400">
            <br />
            <div className="d-flex justify-content-between align-items-center roboto500">
                <h3>Room View and Details</h3>
                <p>Room No: 244</p>
            </div>
            {/* Top Row: Room Image & Rooms Section */}
            <Row className="mb-4">




                {/* 
純圖片 */}

                {/* Room Image (col-8) */}
                {/* <Col md={8} className="d-flex justify-content-center">
                    <div className="position-relative w-100">
                        <img src="/roombig.png" alt="Room" className="img-fluid w-100 h-auto" />
                        <button
                            className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-4 shadow"
                            style={{ width: "50px", height: "40px" }}
                        >
                            <img src="/vr.png" alt="VR Icon" className="w-75 h-75 mb-2" />
                        </button>
                    </div>
                </Col> */}











                {/* 
這段程式會把圖片改成3d scene   尺寸跟圖片一樣 */}

                <Col md={8} className="d-flex justify-content-center">
                    <div className="position-relative w-100">
                        {!showVR ? (
                            <>
                                <img src="/roombig.png" alt="Room" className="img-fluid w-100 h-auto" />
                                <button
                                    className="position-absolute top-0 end-0 m-2 border-0 bg-white rounded-4 shadow"
                                    style={{ width: "50px", height: "40px" }}
                                    onClick={handleShowVR}
                                >
                                    <img src="/vr.png" alt="VR Icon" className="w-75 h-75 mb-2" />
                                </button>
                            </>
                        ) : (
                            <>
                                {loading && (
                                    <div style={{top: "60%"}} className="position-absolute start-50 translate-middle bg-white py-1 px-5 rounded-3 shadow">
                                        <h4 className="mt-1">Loading...</h4>
                                    </div>
                                )}
                                <VRScene setLoading={setLoading} />
                                <button
                                    className="position-absolute top-0 end-0 m-2 border-0 "
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        left: "95%",
                                        transform: "translateX(-50%)",
                                        width: "40px",  // 限制按鈕大小
                                        height: "40px", 
                                        padding: "0", // 移除預設 padding
                                        fontSize: "24px", // 讓圖標看起來清晰
                                        lineHeight: "1", // 確保內部沒有多餘空間
                                        background: "rgba(255, 255, 255, 0.5)",
                                        color: "black",
                                        border: "none",
                                        cursor: "pointer",
                                        zIndex: 1000,
                                        display: "flex", 
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "6px", // 讓按鈕有點圓角
                                    }}
                                    onClick={() => setShowVR(false)}
                                >
                                    ✖ 
                                </button>
                            </>
                        )}
                    </div>
                </Col>














                <Col md={4}>
                    <Card
                        className="p-3 rounded-4 border-0"
                        style={{ background: "linear-gradient(to bottom, #EAE3DA, #FFE7C6)" }}
                    >
                        <Card.Title className="fw-bold ms-2 mt-2 pb-2 border-bottom">Rooms</Card.Title>
                        <ListGroup variant="flush" className="mt-3">
                            {roomDetails.map((room, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex justify-content-between align-items-center border-0 py-1"
                                    style={{ background: "transparent" }} // ✅ Removes any white background
                                >
                                    <div className="d-flex align-items-center">
                                        {room.icon}
                                        <div className="ms-1">
                                            <div className="mb-1 lh-sm">{room.title}</div>
                                            <div className="text-muted small mb-3 lh-sm">{room.description}</div>
                                        </div>
                                    </div>
                                    <BsChevronRight />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>

                </Col>

            </Row>

            {/* Bottom Row: Descriptions, Calendar, Booking */}
            <Row>
                {/* Descriptions & Others (col-5) */}
                <Col md={5}>
                    <Card className="p-3 border-0 rounded-4 bg-transparent">
                        <Card.Title className="fw-bold pb-2 border-bottom">Descriptions & Others</Card.Title>

                        {/* Row to Align List Group & Calendar */}
                        <Row className="align-items-start text-dark  " style={{ backgroundColor: "#fff1de" }}>
                            {/* Room Overview List */}

                            <Col md={6}>
                                <p className="border-0 text-dark mx-0 px-0 fw-bold pt-0 mb-0 mt-0" style={{ backgroundColor: "#fff1de", fontSize: "20px" }}>
                                    Room Overview
                                </p>
                                <ListGroup variant="flush" className="text-darkmx-0 px-0" style={{ backgroundColor: "#fff1de" }}>
                                    {/* Title */}


                                    {/* Room Details using .map() */}
                                    {[
                                        { label: "Room Name", value: "Deluxe King Room" },
                                        { label: "Type", value: "Ocean View Suite" },
                                        { label: "Capacity", value: "2 Adults, 1 Child" },
                                        { label: "Size", value: "400 sq. ft" }
                                    ].map((item, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            className="border-0 text-dark mx-0 px-0 py-0"
                                            style={{ backgroundColor: "#fff1de" }}
                                        >
                                            {item.label}: {item.value}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={6} className="d-flex justify-content-center mt-3">
                                <Card className="w-100 text-dark border-0 " style={{ backgroundColor: "#fff1de" }}>
                                    <Card.Title className="fw-bold mb-0 text-dark">Calendar</Card.Title>
                                    <div className="calendar-container p-2">
                                        <Calendar
                                            className="custom-calendar"
                                            locale="en-US"
                                            calendarType="gregory"
                                            showNeighboringMonth={false}
                                            prev2Label={null}
                                            next2Label={null}
                                            onClickDay={handleDateClick} // ✅ 點選時更新
                                            tileClassName={({ date }) => {
                                                if (selectedRange.length === 1 && date.getTime() === selectedRange[0].getTime()) {
                                                    return "selected-start"; // ✅ 起始日期變色
                                                }
                                                if (selectedRange.length === 2) {
                                                    const start = selectedRange[0];
                                                    const end = selectedRange[1];
                                                    if (start && end && date >= start && date <= end) {
                                                        return "selected-range"; // ✅ 讓範圍內的日期變色
                                                    }
                                                }
                                                return "";
                                            }}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>


                        {/* Details & Others */}
                        <div>
                            <strong className="pb-2 px-0">Details & Others</strong>
                            <p className="border-top lh-base mb-0 pb-0 pt-2 m-0">
                                Unwind in our spacious Deluxe King Room, featuring a luxurious king-size bed with premium linens,
                                a cozy seating area, and modern decor that blends comfort with style.
                                Enjoy breathtaking city skyline views through floor-to-ceiling windows, along with amenities like
                                high-speed Wi-Fi, a 55-inch Smart TV, and complimentary breakfast.
                            </p>
                        </div>

                    </Card>

                </Col>



                <Col md={3} className="">
                    <div
                        className="w-100 rounded-4 p-3  justify-content-center align-items-center"
                        style={{
                            background: "linear-gradient(to bottom, #EAE3DA, #FFE7C6)",
                            // height: "100%",
                        }}
                    >
                        <img src="/breakfirst.png" alt="Complimentary Breakfast" className="img-fluid rounded-4" />
                        <h6 className="mt-4 mb-5 lh-base roboto400 ">We serve Complimentary breakfast with this room</h6>
                    </div>
                </Col>


                {/* Booking Section (col-4) */}
                <Col md={4}>
                    <Card className="p-3 rounded-4 border-0" style={{ background: "linear-gradient(to bottom, #EAE3DA, #FFE7C6)" }}>
                        {/* Booking Title */}
                        <div className="d-flex justify-content-between align-items-center">
                            <Card.Title className="fw-bold mb-0">Booking</Card.Title>
                            <BsInfoCircle className="text-muted" size={18} />
                        </div>

                        {/* Booking Options */}
                        <ListGroup variant="flush" className="mt-3">
                            {bookingOptions.map((option) => (
                                <ListGroup.Item
                                    key={option.id}
                                    className={`border rounded-0 p-3 mb-2 ${selectedOption === option.id ? "border border-1 border-secondary" : ""}`}
                                    style={{
                                        background: "transparent",
                                        borderColor: selectedOption === option.id ? "#555" : "#CCC",

                                    }}
                                    onClick={() => setSelectedOption(option.id)} // ✅ Click to select
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="text-muted">{option.subtitle}</div>
                                            <div className="d-flex align-items-center">
                                                <h4 className="fw-bold">{option.title}</h4>
                                                {option.badge && (
                                                    <span className="badge text-white ms-2 mb-2" style={{ backgroundColor: option.badgeColor, borderRadius: "10px" }}>
                                                        {option.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-muted">{option.price}</div>
                                        </div>
                                        {/* ✅ Green circle with checkmark */}
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle border"
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                backgroundColor: selectedOption === option.id ? "#07756C" : "transparent",
                                                borderColor: "#07756C",
                                                opacity: "100%", // ✅ Ensure full opacity for checkmark
                                            }}
                                        >
                                            {selectedOption === option.id && <FaCheck size={12} color="white" />} {/* ✅ Checkmark */}
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        {/* Booking Buttons */}
                        <Card.Body className="text-center">
                            <Button variant="outline-dark" className="me-3 rounded-pill px-5" style={{ borderColor: "#07756C", color: "#07756C" }}>
                                Compare
                            </Button>
                            <Button className="rounded-pill px-5" style={{ backgroundColor: "#07756C", borderColor: "#07756C" }}>
                                Book Now
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Back Button */}
            {/* <div className="text-center mt-4">
                <Button variant="primary" onClick={() => navigate("/")}>Go Back</Button>
            </div> */}
            <br />
            <br />
        </Container>
    );
};

export default RoomDetails;




























