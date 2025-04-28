import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
import { Container, Row, Col, Button, ListGroup, Card, Form } from "react-bootstrap";
import { BiBed, BiBuilding, BiTv, BiBath, BiAccessibility, BiDish } from "react-icons/bi"; // Serious icons
import { BsChevronRight, BsInfoCircle } from "react-icons/bs"; // Chevron icon
import { FaCheck } from "react-icons/fa"; // ✅ Checkmark icon
import VRScene from "./VRScene";
import ViewScene from "./ViewScene";
import Footer from "./Footer";


const menuItems = [
    {
        img: "/adasi.png",
        title: "Adasi",
        desc: "Iranian lentil stew, served warm with flatbread and lemon, a comforting start to your breakfast."
    },
    {
        img: "/sarsheer.png",
        title: "Sarsheer",
        desc: "Rich, creamy clotted cream, traditionally served with honey and warm bread, a decadent treat."
    },
    {
        img: "/honey.png",
        title: "Natural Honey",
        desc: "Adds a touch of natural sweetness, perfectly pairing with warm bread or garnish the Sarsheer."
    },
    {
        img: "/Barbari.png",
        title: "Barbari",
        desc: "A traditional Iranian flatbread, crisp on the outside, soft within, served warm for a refined, artisanal touch."
    },
    {
        img: "/persian_tea.png",
        title: "Persian Tea",
        desc: "Deeply aromatic and served in delicate glassware, offers a soothing, refined sip to nurture you."
    },
    {
        img: "/omelette.png",
        title: "Omelette",
        desc: "A savoury blend of eggs and spiced tomatoes, served warm—simple yet full of flavour."
    },
    {
        img: "/cheese.png",
        title: "Feta",
        desc: "Creamy, tangy, and crumbly, perfect with fresh herbs, bread, and tea for a classic breakfast."
    },
    {
        img: "/walnuts.png",
        title: "Walnuts",
        desc: "Rich and earthy, add the perfect crunch to your bread, cheese, and tomato-cucumber wrap. A timeless touch of flavour and tradition."
    },
    {
        img: "/tomato_and_cucumber.png",
        title: "Tomato & Cucumber",
        desc: "Fresh tomato and cucumber slices, light and crisp—perfect with bread, cheese, and a warm cup of tea."
    },
    {
        img: "/dates.png",
        title: "Dates",
        desc: "Naturally sweet and tender, offer a rich burst of flavour, an indulgent, wholesome treat."
    },
    {
        img: "/jam.png",
        title: "Jam",
        desc: "Fragrant and fruity, made from seasonal ingredients, adds a delicate sweetness to bread for a refined breakfast delight."
    },
    {
        img: "/butter.png",
        title: "Butter",
        desc: "Rich and creamy with a subtle tang, melts perfectly over warm bread, bringing a touch of tradition."
    },
];









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
    const [date, setDate] = useState(new Date());

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
    const [showView, setShowView] = useState(false); // ← 新增這行
    const [loading, setLoading] = useState(false);

    const handleShowVR = () => {
        setLoading(true);
        setShowVR(true);
        setShowView(false); // 確保 "See View" 被關閉
    };

    const handleShowView = () => {
        setShowVR(false);   // 確保 "See Room" 被關閉
        setShowView(true);
    };

    // 每次關閉 VR 或 View 後修正畫面佈局
    useEffect(() => {
        if (!showVR && !showView) {
            const container = document.querySelector("a-scene")?.parentElement;
            if (container) container.style.height = "auto";
        }
    }, [showVR, showView]);

    // 頁面載入時自動滾回頂部
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCloseScene = () => {
        setShowVR(false);
        setShowView(false);
        // 延遲滾動，讓 React 有時間卸載 <a-scene>
        setTimeout(() => {
            document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };



    const cardRef = useRef(null);
    const [leftHeight, setLeftHeight] = useState("auto");

    useEffect(() => {
        const resize = () => {
            if (cardRef.current) {
                setLeftHeight(cardRef.current.offsetHeight + "px");
            }
        };
        resize(); // 初始設一次
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);


    const [selectedPeople, setSelectedPeople] = useState(""); // ✅ 人數
    const [selectedDeparture, setSelectedDeparture] = useState(""); // ✅ 出發地

    const [showCalendar, setShowCalendar] = useState(false); // ✅ 控制日曆開關
    return (
        <div>
            <Container className="p-0 py-3 mt-5 roboto400 px-2 px-md-5 ">
                <br />
                <br />
                {/* Top Row: Room Image & Rooms Section */}



                <Row className="w-100 m-0  mb-4 ">
                    {/* 左邊圖片或3D區塊 */}
                    {/* 右邊 Room details 卡片（小螢幕時放上面） */}
                    <Col
                        xs={12}
                        md={4}
                        className="pe-md-0 px-0 py-2 px-sm-3 py-sm-2 order-1 order-md-2"
                    >
                        <div
                            ref={cardRef}
                            className="d-flex flex-column align-items-start ps-4"
                            style={{ minHeight: "50vh" }}
                        >
                            <img className="w-50 mt-4" src="/Suite.png" alt="Suite" />
                            <p
                                className="mt-5 lh-base"
                                style={{ position: "relative", zIndex: 2 }}
                            >
                                <b>Perspolis suite</b>, discover timeless elegance and Persian grandeur in Perspolis suite. A sanctuary, crafted for comfort, designed for distinction. Immerse yourself in the room by clicking on “in your space”.
                            </p>
                        </div>
                    </Col>

                    {/* 左邊圖片或3D區塊 */}
                    <Col
                        xs={12}
                        md={8}
                        className="ps-md-0 px-0 py-2 px-sm-2 py-sm-2 order-2 order-md-1"
                    >
                        <div id="scroll-anchor"></div>
                        <div
                            className="position-relative w-100 overflow-hidden rounded-4"
                            style={{ height: leftHeight }}
                        >
                            {!showVR && !showView ? (
                                <>
                                    <img
                                        src="/roombig.jpg"
                                        alt="Room"
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                                        <button
                                            className="border-0 bg-white rounded-3 shadow"
                                            style={{
                                                width: "160px",
                                                height: "48px",
                                                whiteSpace: "nowrap", // ✅ Make text stay in one line
                                                color: "#1f1f1f"
                                            }}
                                            onClick={handleShowVR}
                                        >
                                            <img src="/vr.png" alt="VR Icon" className="mb-2 me-1 w-25" />
                                            In your space
                                        </button>

                                        <button
                                            className="border-0 bg-white rounded-3 shadow"
                                            style={{
                                                width: "160px",
                                                height: "48px",
                                                whiteSpace: "nowrap", // ✅ Make text stay in one line
                                                color: "#1f1f1f"
                                            }}
                                            onClick={handleShowView}
                                        >
                                            <img src="/vr.png" alt="VR Icon" className="mb-2 me-1 w-25" />
                                            Window view
                                        </button>

                                    </div>
                                </>
                            ) : showVR ? (
                                <>
                                    {loading && (
                                        <div
                                            style={{ top: "60%" }}
                                            className="position-absolute start-50 translate-middle bg-white py-1 px-5 shadow"
                                        >
                                            <h4 className="mt-1">Loading...</h4>
                                        </div>
                                    )}
                                    <VRScene
                                        setLoading={setLoading}
                                        setShowVR={setShowVR}
                                        style={{ height: leftHeight }}
                                    />
                                    <button
                                        onClick={() => {
                                            setShowVR(false);
                                            setShowView(false);
                                            document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="position-absolute"
                                        style={{
                                            top: "10px",
                                            right: "10px", // ✅ 貼緊右上角
                                            width: "40px",
                                            height: "40px",
                                            background: "rgba(255, 255, 255, 0.5)",
                                            border: "none",
                                            borderRadius: "10px",
                                            fontSize: "24px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            zIndex: 1000,
                                            color: "#1f1f1f",
                                            padding: "0",
                                            // ✅ 注意這裡不要再寫 transform: translateX(-50%)
                                        }}
                                    >
                                        ×
                                    </button>
                                </>
                            ) : (
                                <>
                                    <ViewScene
                                        setShowView={setShowView}
                                        style={{ height: leftHeight }}
                                    />
                                    <button
                                        onClick={() => {
                                            setShowVR(false);
                                            setShowView(false);
                                            document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="position-absolute"
                                        style={{
                                            top: "10px",
                                            right: "10px", // ✅ 貼緊右上角
                                            width: "40px",
                                            height: "40px",
                                            background: "rgba(255, 255, 255, 0.5)",
                                            border: "none",
                                            borderRadius: "10px",
                                            fontSize: "24px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            zIndex: 1000,
                                            color: "#1f1f1f",
                                            padding: "0",
                                            // ✅ 注意這裡不要再寫 transform: translateX(-50%)
                                        }}
                                    >
                                        ×
                                    </button>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>







                <br /><br />


                <br />






                <Row className="w-100 m-0 mb-4 align-items-start">
                    {/* 左邊圖片 taress.png */}
                    <Col
                        xs={12}
                        md={8}
                        className="ps-md-0 px-0 py-2 px-sm-2 py-sm-2 order-2 order-md-1"
                    >
                        <div className="position-relative w-100 overflow-hidden rounded-4" style={{ height: "auto" }}>
                            <img
                                src="/taress.png"
                                alt="Terrace"
                                className="img-fluid"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </Col>

                    {/* 右邊圖片 security.png + 文字 */}
                    <Col
                        xs={12}
                        md={4}
                        className="d-flex flex-column align-items-start pe-md-0 px-0 py-2 px-sm-3 py-sm-2 order-1 order-md-2"
                    >
                        <div className="d-flex flex-column align-items-start ps-4 w-100">
                            {/* 標題圖 security.png */}
                            <img
                                src="/security.png"
                                alt="Security Title"
                                className="img-fluid"
                                style={{
                                    width: "70%",     // 可以自己調整大小
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            {/* 下面文字 */}
                            <p
                                className="mt-4 lh-base"
                                style={{ position: "relative", zIndex: 2 }}
                            >
                                A private terrace with a serene sunken tub, offering panoramic views of the Persian Gulf.
                            </p>
                        </div>
                    </Col>
                </Row>




                <br /><br />

                <br />





                <Row className="w-100 m-0 mb-4 align-items-start">
                    {/* 左邊圖片 roomeat.png */}
                    <Col
                        xs={12}
                        md={8}
                        className="ps-md-0 px-0 py-2 px-sm-2 py-sm-2 order-2 order-md-1"
                    >
                        <div className="position-relative w-100 overflow-hidden rounded-4" style={{ height: "auto" }}>
                            <img
                                src="/roomeat.png"
                                alt="Room Eat"
                                className="img-fluid"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </Col>

                    {/* 右邊圖片 and.png + 文字 */}
                    <Col
                        xs={12}
                        md={4}
                        className="d-flex flex-column align-items-start pe-md-0 px-0 py-2 px-sm-3 py-sm-2 order-1 order-md-2"
                    >
                        <div className="d-flex flex-column align-items-start ps-4 w-100">
                            {/* 標題圖 and.png */}
                            <img
                                src="/and.png"
                                alt="And Title"
                                className="img-fluid"
                                style={{
                                    width: "70%",     // 可以自己調整大小
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            {/* 下面文字 */}
                            <p
                                className="mt-4 lh-base"
                                style={{ position: "relative", zIndex: 2 }}
                            >
                                This expansive retreat features a king-sized canopy bed draped in fine linens, a marble-clad bathroom with a deep soaking tub.
                            </p>
                        </div>
                    </Col>
                </Row>















                <br /><br />

                <br />








                <Row className="w-100 m-0 mb-4 align-items-start">
                    {/* 左邊圖片 break.png */}
                    <Col
                        xs={12}
                        md={8}
                        className="ps-md-0 px-0 py-2 px-sm-2 py-sm-2 order-2 order-md-1"
                    >
                        <div className="position-relative w-100 overflow-hidden rounded-4" style={{ height: "auto" }}>
                            <img
                                src="/break.png"
                                alt="Break"
                                className="img-fluid"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </Col>

                    {/* 右邊圖片 nut.png + 文字 */}
                    <Col
                        xs={12}
                        md={4}
                        className="d-flex flex-column align-items-start pe-md-0 px-0 py-2 px-sm-3 py-sm-2 order-1 order-md-2"
                    >
                        <div className="d-flex flex-column align-items-start ps-4 w-100">
                            {/* 標題圖 nut.png */}
                            <img
                                src="/nut.png"
                                alt="Nut Title"
                                className="img-fluid"
                                style={{
                                    width: "70%",     // 可以自己調整大小
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                            {/* 下面文字 */}
                            <p
                                className="mt-4 lh-base"
                                style={{ position: "relative", zIndex: 2 }}
                            >
                                <b>Perspolis suite</b>, discover timeless elegance and Persian grandeur in Perspolis suite. A sanctuary, crafted for comfort, designed for distinction. Immerse yourself in the room by clicking on “in your space”.
                            </p>
                        </div>
                    </Col>
                </Row>


                <br /><br /><br />





















            </Container>






            <Container
                fluid
                className="roboto400"
                style={{
                    margin: "0",
                    padding: "0",
                }}
            >
                {/* 標題區 */}
                <div
                    className="px-5 d-flex align-items-center mb-4 flex-wrap"
                    style={{ rowGap: "1rem" }}
                >
                    <img
                        src="/feel.png"
                        className="me-4"
                        alt="Feel"
                        style={{
                            height: "90px",
                            objectFit: "contain",
                        }}
                    />
                    <h2

                        style={{
                            color: "#0C756E",
                            fontWeight: 300,
                            fontSize: "70px",
                            whiteSpace: "nowrap", // 保持一行，避免亂換行
                        }}
                    >
                        Nurtured
                    </h2>
                </div>

                {/* Menu標題 */}
                <div className="mb-5">
                    <h3 className="mb-5 px-5" style={{ fontWeight: 400 }}>
                        Menu
                    </h3>
                </div>

                {/* 跑馬燈區 */}
                <div
                    style={{
                        overflow: "hidden",
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            animation: "scroll-marquee 120s linear infinite",
                            width: "fit-content",
                        }}
                    >
                        {[...menuItems, ...menuItems].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    flex: "0 0 auto",
                                    width: "190px",        // ✅ 小螢幕版改小
                                    marginRight: "3rem",   // ✅ 小間距
                                }}
                            >
                                <div
                                    className="shadow"
                                    style={{
                                        aspectRatio: "1/1",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="img-fluid w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <h2
                                    style={{
                                        color: "#F9A825",
                                        fontWeight: 300,
                                        fontSize: "24px",
                                    }}
                                    className="mt-3 "
                                >
                                    {item.title}
                                </h2>
                                <p
                                    className="text-muted "
                                    style={{ lineHeight: "1.4", fontWeight: 400, fontSize: "14px" }}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 動畫 Keyframes */}
                <style>{`
    @keyframes scroll-marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
            </Container>







            <br /><br /><br />


            <Container fluid className="px-1 px-md-5 py-5 roboto400" >
                {/* 標題區 */}
                <div className="d-flex align-items-center flex-wrap mb-4 px-3">
                    <h1 style={{ color: "#0C756E", fontWeight: 300, fontSize: "50px", margin: 0 }}>
                        perspolis suit
                    </h1>
                    <img
                        src="/booking.png"
                        alt="Booking"
                        style={{
                            height: "80px",
                            objectFit: "contain",
                            marginLeft: "1rem",
                            marginTop: "1.5rem",
                        }}

                    />
                </div>
                <Row className="align-items-end g-4 px-3 mt-2">
                    {/* 人數選擇 */}
                    <Col xs={12} md={3}>
                        <Form.Group className="position-relative">
                            <Form.Label style={{ fontSize: "0.9rem", color: "gray" }}>
                                Number of Adult / Children
                            </Form.Label>
                            <Form.Select
                                className="border-0 border-bottom rounded-0"
                                style={{
                                    backgroundColor: "#ebece7",
                                    color: "#0C756E",
                                    fontWeight: 400,
                                    fontSize: "1.2rem",
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    outline: "none",
                                    boxShadow: "none",
                                }}
                            >
                                <option value="">Select</option>
                                <option>1 Person</option>
                                <option>2 People</option>
                                <option>3 People</option>
                                <option>4 People</option>
                            </Form.Select>

                            {/* 🔥 自己加一條假的深綠色線 */}
                            <div
                                style={{
                                    height: "1px",
                                    backgroundColor: "#0C756E",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    pointerEvents: "none", // 不影響點擊
                                }}
                            ></div>
                        </Form.Group>
                    </Col>

                    {/* 日期選擇 */}
                    <Col xs={12} md={3}>
                        <Form.Group className="position-relative">
                            <Form.Label style={{ fontSize: "0.9rem", color: "gray" }}>
                                Date
                            </Form.Label>
                            <div
                                style={{
                                    backgroundColor: "#ebece7",
                                    fontSize: "1.2rem",
                                    fontWeight: 400,
                                    color: "#0C756E",
                                    paddingLeft: "0",
                                    cursor: "pointer",
                                }}
                                onClick={() => setShowCalendar(prev => !prev)}
                            >
                                {date instanceof Date
                                    ? `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
                                        .getDate()
                                        .toString()
                                        .padStart(2, "0")}/${date.getFullYear()}`
                                    : "Select Date"}
                            </div>

                            {showCalendar && (
                                <Calendar
                                    onChange={(selectedDate) => {
                                        setDate(selectedDate);
                                        setShowCalendar(false);
                                    }}
                                    value={date}
                                />
                            )}

                            {/* 🔥 一樣加假的底線 */}
                            <div
                                style={{
                                    height: "1px",
                                    backgroundColor: "#0C756E",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    pointerEvents: "none",
                                }}
                            ></div>
                        </Form.Group>
                    </Col>

                    {/* 出發地 */}
                    <Col xs={12} md={3}>
                        <Form.Group className="position-relative">
                            <Form.Label style={{ fontSize: "0.9rem", color: "gray" }}>
                                From / Departure
                            </Form.Label>
                            <Form.Select
                                className="border-0 border-bottom rounded-0"
                                style={{
                                    backgroundColor: "#ebece7",
                                    color: "#0C756E",
                                    fontWeight: 400,
                                    fontSize: "1.2rem",
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    outline: "none",
                                    boxShadow: "none",
                                }}
                            >
                                <option value="">Select</option>
                                <option>Toronto - YYZ</option>
                                <option>Toronto - YTZ</option>
                                <option>Toronto (any)</option>
                                <option>Other...</option>
                            </Form.Select>

                            {/* 🔥 一樣加假的底線 */}
                            <div
                                style={{
                                    height: "1px",
                                    backgroundColor: "#0C756E",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    pointerEvents: "none",
                                }}
                            ></div>
                        </Form.Group>
                    </Col>

                    {/* 按鈕 */}
                    <Col xs={12} md={3} className="text-md-end">
                        <button
                            style={{
                                border: "1px solid #0C756E",
                                background: "transparent",
                                padding: "0rem 2.5rem",
                                borderRadius: "0.5rem",
                                color: "#0C756E",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            view booking →
                        </button>
                    </Col>
                </Row>


            </Container>
            <br /><br /><br /><br /><br /><br />
            <Footer />

        </div>
    );
};

export default RoomDetails;




































































// good old code  reuse this



// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // Import default calendar styles
// import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
// import { BiBed, BiBuilding, BiTv, BiBath, BiAccessibility, BiDish } from "react-icons/bi"; // Serious icons
// import { BsChevronRight, BsInfoCircle } from "react-icons/bs"; // Chevron icon
// import { FaCheck } from "react-icons/fa"; // ✅ Checkmark icon
// import VRScene from "./VRScene";
// import ViewScene from "./ViewScene";


// const roomDetails = [
//     { icon: <BiBed size={24} className="me-3" />, title: "Bed Room", description: "1 bed room & meeting room" },
//     { icon: <BiBuilding size={24} className="me-3" />, title: "Bed Type & Others", description: "Dabble bed, sofa, table & more" },
//     { icon: <BiTv size={24} className="me-3" />, title: "Technology", description: "TV, Freeze, AC, Coffee maker" },
//     { icon: <BiBath size={24} className="me-3" />, title: "Bathroom", description: "1 big attached Bathroom" },
//     { icon: <BiAccessibility size={24} className="me-3" />, title: "Accessibility", description: "1 six mm balcony, Free WiFi" },
//     { icon: <BiDish size={24} className="me-3" />, title: "Kitchen", description: "1 mini Kitchen" },
// ];
// const bookingOptions = [
//     {
//         id: "flight",
//         title: "Flight + Hotel",
//         subtitle: "Bundle and Save",
//         price: "$1499.00",
//         badge: "hot deal",
//         badgeColor: "#FFC107", // Yellow
//     },
//     {
//         id: "hotel",
//         title: "Hotel Room Only",
//         subtitle: "Flexible Booking",
//         price: "$599.00",
//         badge: null, // No badge
//     },
// ];


// const RoomDetails = () => {
//     const [selectedRange, setSelectedRange] = useState([]); // 存儲選取的日期範圍
//     const [selectedOption, setSelectedOption] = useState("flight");

//     // 選擇日期範圍
//     const handleDateClick = (date) => {
//         if (selectedRange.length === 0) {
//             setSelectedRange([date]); // 設定起始日期
//         } else if (selectedRange.length === 1) {
//             setSelectedRange([selectedRange[0], date]); // 設定結束日期
//         } else {
//             setSelectedRange([date]); // 重置範圍
//         }
//     };

//     //讓頁面從最上方開始顯示
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);



//     const [showVR, setShowVR] = useState(false);
//     const [showView, setShowView] = useState(false); // ← 新增這行
//     const [loading, setLoading] = useState(false);

//     const handleShowVR = () => {
//         setLoading(true);
//         setShowVR(true);
//         setShowView(false); // 確保 "See View" 被關閉
//     };

//     const handleShowView = () => {
//         setShowVR(false);   // 確保 "See Room" 被關閉
//         setShowView(true);
//     };

//     // 每次關閉 VR 或 View 後修正畫面佈局
//     useEffect(() => {
//         if (!showVR && !showView) {
//             const container = document.querySelector("a-scene")?.parentElement;
//             if (container) container.style.height = "auto";
//         }
//     }, [showVR, showView]);

//     // 頁面載入時自動滾回頂部
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleCloseScene = () => {
//         setShowVR(false);
//         setShowView(false);
//         // 延遲滾動，讓 React 有時間卸載 <a-scene>
//         setTimeout(() => {
//             document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//     };



//     const cardRef = useRef(null);
//     const [leftHeight, setLeftHeight] = useState("auto");

//     useEffect(() => {
//         const resize = () => {
//             if (cardRef.current) {
//                 setLeftHeight(cardRef.current.offsetHeight + "px");
//             }
//         };
//         resize(); // 初始設一次
//         window.addEventListener("resize", resize);
//         return () => window.removeEventListener("resize", resize);
//     }, []);



//     return (
//         <Container className="p-0 py-3 mt-5 roboto400 ">
//             <br />
//             <div className="d-flex justify-content-between align-items-center roboto500">
//                 <h3>Room View and Details</h3>
//                 <p>Room No: 244</p>
//             </div>
//             {/* Top Row: Room Image & Rooms Section */}



//             <Row className="w-100 m-0  mb-4 ">
//                 {/* 左邊圖片或3D區塊 */}
//                 <Col md={8} className="ps-md-0 px-0 py-2 px-sm-2 py-sm-2">
//                     <div id="scroll-anchor"></div>
//                     <div
//                         className="position-relative w-100 overflow-hidden  rounded-4"
//                         style={{ height: leftHeight }}
//                     >
//                         {!showVR && !showView ? (
//                             <>
//                                 <img
//                                     src="/roombig.jpg"
//                                     alt="Room"
//                                     className="w-100 h-100 "
//                                     style={{ objectFit: "cover" }}
//                                 />
//                                 <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
//                                     <button
//                                         className="border-0 bg-white rounded-pill shadow"
//                                         style={{ width: "150px", height: "40px" }}
//                                         onClick={handleShowVR}
//                                     >
//                                         <img src="/vr.png" alt="VR Icon" className="mb-2 me-2" />
//                                         See Room
//                                     </button>

//                                     <button
//                                         className="border-0 bg-white rounded-pill shadow"
//                                         style={{ width: "150px", height: "40px" }}
//                                         onClick={handleShowView}
//                                     >
//                                         <img src="/vr.png" alt="VR Icon" className="mb-2 me-2" />
//                                         See View
//                                     </button>
//                                 </div>
//                             </>
//                         ) : showVR ? (
//                             <>
//                                 {loading && (
//                                     <div
//                                         style={{ top: "60%" }}
//                                         className="position-absolute start-50 translate-middle bg-white py-1 px-5 shadow"
//                                     >
//                                         <h4 className="mt-1">Loading...</h4>
//                                     </div>
//                                 )}
//                                 <VRScene setLoading={setLoading} setShowVR={setShowVR} style={{ height: leftHeight }} />
//                                 <button
//                                     onClick={() => {
//                                         setShowVR(false);
//                                         setShowView(false);
//                                         document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
//                                     }}
//                                     className="position-absolute"
//                                     style={{
//                                         top: "10px",
//                                         left: "95%",
//                                         transform: "translateX(-50%)",
//                                         width: "40px",
//                                         height: "40px",
//                                         background: "rgba(255, 255, 255, 0.5)",
//                                         border: "none",
//                                         borderRadius: "6px",
//                                         fontSize: "24px",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         cursor: "pointer",
//                                         zIndex: 1000,
//                                     }}
//                                 >
//                                     ✖
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                <ViewScene setShowView={setShowView} style={{ height: leftHeight }} />

//                                 <button
//                                     onClick={() => {
//                                         setShowVR(false);
//                                         setShowView(false);
//                                         document.getElementById("scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
//                                     }}
//                                     className="position-absolute"
//                                     style={{
//                                         top: "10px",
//                                         left: "95%",
//                                         transform: "translateX(-50%)",
//                                         width: "40px",
//                                         height: "40px",
//                                         background: "rgba(255, 255, 255, 0.5)",
//                                         border: "none",
//                                         borderRadius: "6px",
//                                         fontSize: "24px",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         cursor: "pointer",
//                                         zIndex: 1000,
//                                     }}
//                                 >
//                                     ✖
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </Col>

//                 {/* 右邊 Room details 卡片 */}
//                 <Col md={4} className="pe-md-0 px-0 py-2 px-sm-3 py-sm-2">
//                     <Card
//                         ref={cardRef}
//                         className="p-3 rounded-4 border-0 h-100 "
//                         style={{ background: "linear-gradient(to bottom, #EAE3DA, #FFE7C6)" }}
//                     >
//                         <Card.Title className="fw-bold ms-2 mt-2 pb-2 border-bottom">Rooms</Card.Title>
//                         <ListGroup variant="flush" className="mt-3">
//                             {roomDetails.map((room, index) => (
//                                 <ListGroup.Item
//                                     key={index}
//                                     className="d-flex justify-content-between align-items-center border-0 py-1"
//                                     style={{ background: "transparent" }}
//                                 >
//                                     <div className="d-flex align-items-center">
//                                         {room.icon}
//                                         <div className="ms-1">
//                                             <div className="mb-1 lh-sm">{room.title}</div>
//                                             <div className="text-muted small mb-3 lh-sm">{room.description}</div>
//                                         </div>
//                                     </div>
//                                     <BsChevronRight />
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                     </Card>
//                 </Col>
//             </Row>
















//             {/* Bottom Row: Descriptions, Calendar, Booking */}
//             <Row>
//                 {/* Descriptions & Others (col-5) */}
//                 <Col md={5}>
//                     <Card className="p-3 border-0 rounded-4 bg-transparent">
//                         <Card.Title className="fw-bold pb-2 border-bottom">Descriptions & Others</Card.Title>

//                         {/* Row to Align List Group & Calendar */}
//                         <Row className="align-items-start text-dark  " style={{ backgroundColor: "#fff1de" }}>
//                             {/* Room Overview List */}

//                             <Col md={6}>
//                                 <p className="border-0 text-dark mx-0 px-0 fw-bold pt-0 mb-0 mt-0" style={{ backgroundColor: "#fff1de", fontSize: "20px" }}>
//                                     Room Overview
//                                 </p>
//                                 <ListGroup variant="flush" className="text-darkmx-0 px-0" style={{ backgroundColor: "#fff1de" }}>
//                                     {/* Title */}


//                                     {/* Room Details using .map() */}
//                                     {[
//                                         { label: "Room Name", value: "Deluxe King Room" },
//                                         { label: "Type", value: "Ocean View Suite" },
//                                         { label: "Capacity", value: "2 Adults, 1 Child" },
//                                         { label: "Size", value: "400 sq. ft" }
//                                     ].map((item, index) => (
//                                         <ListGroup.Item
//                                             key={index}
//                                             className="border-0 text-dark mx-0 px-0 py-0"
//                                             style={{ backgroundColor: "#fff1de" }}
//                                         >
//                                             {item.label}: {item.value}
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             </Col>
//                             <Col md={6} className="d-flex justify-content-center mt-3">
//                                 <Card className="w-100 text-dark border-0 " style={{ backgroundColor: "#fff1de" }}>
//                                     <Card.Title className="fw-bold mb-0 text-dark">Calendar</Card.Title>
//                                     <div className="calendar-container p-2">
//                                         <Calendar
//                                             className="custom-calendar"
//                                             locale="en-US"
//                                             calendarType="gregory"
//                                             showNeighboringMonth={false}
//                                             prev2Label={null}
//                                             next2Label={null}
//                                             onClickDay={handleDateClick}
//                                             formatShortWeekday={(locale, date) =>
//                                                 date.toLocaleDateString("en-GB", { weekday: "short" }).slice(0, 2)
//                                             }
//                                             tileClassName={({ date }) => {
//                                                 if (
//                                                     selectedRange.length === 1 &&
//                                                     date.getTime() === selectedRange[0].getTime()
//                                                 ) {
//                                                     return "selected-start";
//                                                 }
//                                                 if (selectedRange.length === 2) {
//                                                     const [start, end] = selectedRange;
//                                                     if (start && end && date >= start && date <= end) {
//                                                         return "selected-range";
//                                                     }
//                                                 }
//                                                 return "";
//                                             }}
//                                         />

//                                     </div>
//                                 </Card>
//                             </Col>
//                         </Row>


//                         {/* Details & Others */}
//                         <div>
//                             <strong className="pb-2 px-0">Details & Others</strong>
//                             <p className="border-top lh-base mb-0 pb-0 pt-2 m-0">
//                                 Unwind in our spacious Deluxe King Room, featuring a luxurious king-size bed with premium linens,
//                                 a cozy seating area, and modern decor that blends comfort with style.
//                                 Enjoy breathtaking city skyline views through floor-to-ceiling windows, along with amenities like
//                                 high-speed Wi-Fi, a 55-inch Smart TV, and complimentary breakfast.
//                             </p>
//                         </div>

//                     </Card>

//                 </Col>



//                 <Col md={3} className="">
//                     <div
//                         className="w-100 rounded-4 p-3  justify-content-center align-items-center"
//                         style={{
//                             background: "linear-gradient(to bottom, #EAE3DA, #FFE7C6)",
//                             // height: "100%",
//                         }}
//                     >
//                         <img src="/breakfirst.png" alt="Complimentary Breakfast" className="img-fluid rounded-4" />
//                         <h6 className="mt-4 mb-5 lh-base roboto400 ">We serve Complimentary breakfast with this room</h6>
//                     </div>
//                 </Col>


//                 {/* Booking Section (col-4) */}
//                 <Col md={4}>
//                     <Card className="p-3 rounded-4 border-0" style={{ background: "linear-gradient(to bottom, #EAE3DA, #FFE7C6)" }}>
//                         {/* Booking Title */}
//                         <div className="d-flex justify-content-between align-items-center">
//                             <Card.Title className="fw-bold mb-0">Booking</Card.Title>
//                             <BsInfoCircle className="text-muted" size={18} />
//                         </div>

//                         {/* Booking Options */}
//                         <ListGroup variant="flush" className="mt-3">
//                             {bookingOptions.map((option) => (
//                                 <ListGroup.Item
//                                     key={option.id}
//                                     className={`border rounded-0 p-3 mb-2 ${selectedOption === option.id ? "border border-1 border-secondary" : ""}`}
//                                     style={{
//                                         background: "transparent",
//                                         borderColor: selectedOption === option.id ? "#555" : "#CCC",

//                                     }}
//                                     onClick={() => setSelectedOption(option.id)} // ✅ Click to select
//                                 >
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <div>
//                                             <div className="text-muted">{option.subtitle}</div>
//                                             <div className="d-flex align-items-center">
//                                                 <h4 className="fw-bold">{option.title}</h4>
//                                                 {option.badge && (
//                                                     <span className="badge text-white ms-2 mb-2" style={{ backgroundColor: option.badgeColor, borderRadius: "10px" }}>
//                                                         {option.badge}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <div className="text-muted">{option.price}</div>
//                                         </div>
//                                         {/* ✅ Green circle with checkmark */}
//                                         <div
//                                             className="d-flex align-items-center justify-content-center rounded-circle border"
//                                             style={{
//                                                 width: "24px",
//                                                 height: "24px",
//                                                 backgroundColor: selectedOption === option.id ? "#07756C" : "transparent",
//                                                 borderColor: "#07756C",
//                                                 opacity: "100%", // ✅ Ensure full opacity for checkmark
//                                             }}
//                                         >
//                                             {selectedOption === option.id && <FaCheck size={12} color="white" />} {/* ✅ Checkmark */}
//                                         </div>
//                                     </div>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>

//                         {/* Booking Buttons */}
//                         <Card.Body className="text-center">
//                             <div className="d-flex flex-column align-items-center mt-3" style={{ gap: "12px" }}>
//                                 <Button
//                                     variant="outline-dark"
//                                     className="rounded-pill text-nowrap fw-semibold"
//                                     style={{
//                                         borderColor: "#07756C",
//                                         color: "#07756C",
//                                         width: "200px",
//                                         padding: "10px 0",
//                                     }}
//                                 >
//                                     Compare
//                                 </Button>

//                                 <Button
//                                     className="rounded-pill text-nowrap fw-semibold"
//                                     style={{
//                                         backgroundColor: "#07756C",
//                                         borderColor: "#07756C",
//                                         color: "white",
//                                         width: "200px",
//                                         padding: "10px 0",
//                                     }}
//                                 >
//                                     Book Now
//                                 </Button>
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>


//             <br />
//             <br />
//         </Container>
//     );
// };

// export default RoomDetails;




























