import "aframe";
import { useEffect, useState, useRef } from "react";

const ViewScene = ({ setShowView, style = {} }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null); // 新增一個 ref 指向外層 div

    useEffect(() => {
        console.log("HDRI ViewScene Loaded!");

        const handleMessage = (event) => {
            if (event.data === "exit-view") {
                setShowView(false);
            }
        };
        window.addEventListener("message", handleMessage);

        const handleFullscreenChange = () => {
            const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
            setIsFullscreen(!!fsElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

        // 自動請求 device motion 權限
        const requestMotionPermission = async () => {
            if (
                typeof DeviceMotionEvent !== "undefined" &&
                typeof DeviceMotionEvent.requestPermission === "function"
            ) {
                try {
                    const response = await DeviceMotionEvent.requestPermission();
                    if (response === "granted") {
                        console.log("Device motion permission granted!");
                    } else {
                        console.warn("Device motion permission denied.");
                    }
                } catch (error) {
                    console.error("Device motion permission error:", error);
                }
            }
        };
        requestMotionPermission();

        return () => {
            window.removeEventListener("message", handleMessage);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
        };
    }, [setShowView]);

    const containerStyle = {
        position: "relative",
        width: "100%",
        height: style?.height || "60vh",
        overflow: "hidden",
        ...style,
    };

    const enterFullscreen = () => {
        const el = containerRef.current;
        if (!el) return;

        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    };

    return (
        <div ref={containerRef} style={containerStyle}>
            <a-scene
                embedded
                renderer="antialias: true; colorManagement: true"
                vr-mode-ui="enabled: false"
                webxr="optional: false"
                style={{ width: "100%", height: "100%" }}
            >
                <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>

                <a-entity id="camera-rig" position="0 1.6 0">
                    <a-camera wasd-controls="acceleration: 15" look-controls>
                        <a-cursor></a-cursor>
                    </a-camera>
                </a-entity>
            </a-scene>

            {/* 進入全螢幕按鈕 */}
            {!isFullscreen && window.innerWidth >= 800 && (
    <button
        onClick={enterFullscreen}
        style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "40px",
            height: "40px",
            padding: "0",
            fontSize: "24px",
            background: "rgba(255, 255, 255, 0.5)",
            color: "black",
            border: "none",
            cursor: "pointer",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
        }}
    >
        ⛶
    </button>
)}

            {/* {isFullscreen && (
                <button
                    onClick={exitFullscreen}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "40px",
                        height: "40px",
                        padding: "0",
                        fontSize: "24px",
                        background: "rgba(255, 255, 255, 0.5)",
                        color: "black",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                    }}
                >
                    ✖
                </button>
            )} */}
        </div>
    );
};

export default ViewScene;























// import "aframe";
// import { useEffect, useState } from "react";

// const ViewScene = ({ setShowView, style = {} }) => {
//     const [isFullscreen, setIsFullscreen] = useState(false);

//     useEffect(() => {
//         console.log("HDRI ViewScene Loaded!");

//         const handleMessage = (event) => {
//             if (event.data === "exit-view") {
//                 setShowView(false);
//             }
//         };
//         window.addEventListener("message", handleMessage);

//         // 監聽全螢幕變化
//         const handleFullscreenChange = () => {
//             const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
//             setIsFullscreen(!!fsElement);
//         };
//         document.addEventListener("fullscreenchange", handleFullscreenChange);
//         document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

//         // 自動請求 device motion 權限（for iOS）
//         const requestMotionPermission = async () => {
//             if (
//                 typeof DeviceMotionEvent !== "undefined" &&
//                 typeof DeviceMotionEvent.requestPermission === "function"
//             ) {
//                 try {
//                     const response = await DeviceMotionEvent.requestPermission();
//                     if (response === "granted") {
//                         console.log("Device motion permission granted!");
//                     } else {
//                         console.warn("Device motion permission denied.");
//                     }
//                 } catch (error) {
//                     console.error("Device motion permission error:", error);
//                 }
//             }
//         };
//         requestMotionPermission();

//         return () => {
//             window.removeEventListener("message", handleMessage);
//             document.removeEventListener("fullscreenchange", handleFullscreenChange);
//             document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
//         };
//     }, [setShowView]);

//     const containerStyle = {
//         position: "relative",
//         width: "100%",
//         height: style?.height || "60vh",
//         overflow: "hidden",
//         ...style,
//     };

//     const enterFullscreen = () => {
//         const el = document.documentElement;
//         if (el.requestFullscreen) el.requestFullscreen();
//         else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//         else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     };

//     const exitFullscreen = () => {
//         if (document.exitFullscreen) document.exitFullscreen();
//         else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//         else if (document.msExitFullscreen) document.msExitFullscreen();
//     };

//     return (
//         <div style={containerStyle}>
//             <a-scene
//                 embedded
//                 renderer="antialias: true; colorManagement: true"
//                 vr-mode-ui="enabled: false"
//                 webxr="optional: false"
//                 style={{ width: "100%", height: "100%" }}
//             >
//                 <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>

//                 <a-entity id="camera-rig" position="0 1.6 0">
//                     <a-camera wasd-controls="acceleration: 15" look-controls>
//                         <a-cursor></a-cursor>
//                     </a-camera>
//                 </a-entity>
//             </a-scene>

//             {/* 進入全螢幕按鈕 */}
//             {!isFullscreen && (
//                 <button
//                     onClick={enterFullscreen}
//                     style={{
//                         position: "absolute",
//                         top: "10px",
//                         left: "10px",
//                         width: "40px",
//                         height: "40px",
//                         padding: "0",
//                         fontSize: "24px",
//                         background: "rgba(255, 255, 255, 0.5)",
//                         color: "black",
//                         border: "none",
//                         cursor: "pointer",
//                         zIndex: 1000,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: "6px",
//                     }}
//                 >
//                     ⛶
//                 </button>
//             )}

//             {/* 退出全螢幕按鈕 */}
//             {isFullscreen && (
//                 <button
//                     onClick={exitFullscreen}
//                     style={{
//                         position: "absolute",
//                         top: "10px",
//                         right: "10px",
//                         width: "40px",
//                         height: "40px",
//                         padding: "0",
//                         fontSize: "24px",
//                         background: "rgba(255, 255, 255, 0.5)",
//                         color: "black",
//                         border: "none",
//                         cursor: "pointer",
//                         zIndex: 1000,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: "6px",
//                     }}
//                 >
//                     ✖
//                 </button>
//             )}
//         </div>
//     );
// };

// export default ViewScene;


























// import "aframe";
// import { useEffect } from "react";

// const ViewScene = ({ setShowView, style = {} }) => {
//     useEffect(() => {
//         console.log("HDRI ViewScene Loaded!");

//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//         if (isMobile) {
//             openFullscreenWindow();
//         }

//         const handleMessage = (event) => {
//             if (event.data === "exit-view") {
//                 setShowView(false);
//             }
//         };

//         window.addEventListener("message", handleMessage);

//         return () => {
//             window.removeEventListener("message", handleMessage);
//         };
//     }, [setShowView]);

//     const openFullscreenWindow = () => {
//         const newWindow = window.open(
//             "",
//             "_blank",
//             `width=${screen.width},height=${screen.height},top=0,left=0`
//         );

//         if (newWindow) {
//             newWindow.document.write(`
//                 <html>
//                 <head>
//                     <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
//                     <style>
//                         body {
//                             margin: 0;
//                             overflow: hidden;
//                             background: black;
//                         }
//                         #close-btn {
//                             position: absolute;
//                             top: 10px;
//                             right: 10px;
//                             width: 40px;
//                             height: 40px;
//                             font-size: 24px;
//                             background: transparent;
//                             color: black;
//                             border: none;
//                             border-radius: 6px;
//                             z-index: 9999;
//                             cursor: pointer;
//                         }
//                     </style>
//                 </head>
//                 <body>
//                     <button id="close-btn">✖</button>
//                     <a-scene embedded renderer="antialias: true; colorManagement: true" vr-mode-ui="enabled: false">
//                         <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
//                         <a-entity id="camera-rig" position="0 1.6 0">
//                             <a-camera wasd-controls="acceleration: 15" look-controls>
//                                 <a-cursor></a-cursor>
//                             </a-camera>
//                         </a-entity>
//                     </a-scene>

//                     <script>
//                         document.getElementById("close-btn").onclick = () => {
//                             window.close();
//                             if (window.opener) {
//                                 window.opener.postMessage("exit-view", "*");
//                             }
//                         };
//                     </script>
//                 </body>
//                 </html>
//             `);

//             newWindow.document.close();

//             newWindow.onload = () => {
//                 const el = newWindow.document.documentElement;
//                 if (el.requestFullscreen) el.requestFullscreen();
//                 else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//                 else if (el.msRequestFullscreen) el.msRequestFullscreen();
//             };
//         }
//     };

//     const containerStyle = {
//         position: "relative",
//         width: "100%",
//         height: style?.height || "60vh",
//         overflow: "hidden",
//         ...style,
//     };

//     return (
//         <div style={containerStyle}>
//             <a-scene
//                 embedded
//                 renderer="antialias: true; colorManagement: true"
//                 vr-mode-ui="enabled: false"
//                 webxr="optional: false"
//                 style={{ width: "100%", height: "100%" }}
//             >
//                 <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
//                 <a-entity id="camera-rig" position="0 1.6 0">
//                     <a-camera wasd-controls="acceleration: 15" look-controls>
//                         <a-cursor></a-cursor>
//                     </a-camera>
//                 </a-entity>
//             </a-scene>

//             <button
//                 onClick={openFullscreenWindow}
//                 style={{
//                     position: "absolute",
//                     top: "10px",
//                     left: "10px",
//                     width: "40px",
//                     height: "40px",
//                     padding: "0",
//                     fontSize: "24px",
//                     background: "rgba(255, 255, 255, 0.5)",
//                     color: "black",
//                     border: "none",
//                     borderRadius: "6px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     zIndex: 1000,
//                     cursor: "pointer",
//                 }}
//             >
//                 ⛶
//             </button>
//         </div>
//     );
// };

// export default ViewScene;



























// import "aframe";
// import { useEffect } from "react";

// const ViewScene = ({ setShowView }) => {
//     useEffect(() => {
//         console.log("HDRI ViewScene Loaded!");

//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//         if (isMobile) {
//             openFullscreenWindow();
//         }

//         const handleMessage = (event) => {
//             if (event.data === "exit-view") {
//                 setShowView(false);
//             }
//         };

//         window.addEventListener("message", handleMessage);

//         return () => {
//             window.removeEventListener("message", handleMessage);
//         };
//     }, [setShowView]);

//     const openFullscreenWindow = () => {
//         const newWindow = window.open(
//             "",
//             "_blank",
//             `width=${screen.width},height=${screen.height},top=0,left=0`
//         );

//         if (newWindow) {
//             newWindow.document.write(`
//                 <html>
//                 <head>
//                     <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
//                     <style>
//                         body {
//                             margin: 0;
//                             overflow: hidden;
//                             background: black;
//                         }
//                         #close-btn {
//                             position: absolute;
//                             top: 10px;
//                             right: 10px;
//                             width: 40px;
//                             height: 40px;
//                             font-size: 24px;
//                             background: transparent;
//                             color: black;
//                             border: none;
//                             border-radius: 6px;
//                             z-index: 9999;
//                             cursor: pointer;
//                         }
//                     </style>
//                 </head>
//                 <body>
//                     <button id="close-btn">✖</button>
//                     <a-scene embedded renderer="antialias: true; colorManagement: true" vr-mode-ui="enabled: false">
//                         <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
//                         <a-entity id="camera-rig" position="0 1.6 0">
//                             <a-camera wasd-controls="acceleration: 15" look-controls>
//                                 <a-cursor></a-cursor>
//                             </a-camera>
//                         </a-entity>
//                     </a-scene>

//                     <script>
//                         document.getElementById("close-btn").onclick = () => {
//                             window.close();
//                             if (window.opener) {
//                                 window.opener.postMessage("exit-view", "*");
//                             }
//                         };
//                     </script>
//                 </body>
//                 </html>
//             `);

//             newWindow.document.close();

//             newWindow.onload = () => {
//                 const el = newWindow.document.documentElement;
//                 if (el.requestFullscreen) el.requestFullscreen();
//                 else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//                 else if (el.msRequestFullscreen) el.msRequestFullscreen();
//             };
//         }
//     };

//     return (
//         <div
//             style={{
//                 position: "relative",
//                 width: "100%",
//                 height: "60vh",
//                 overflow: "hidden",
//             }}
//         >
//             <a-scene
//                 embedded
//                 renderer="antialias: true; colorManagement: true"
//                 vr-mode-ui="enabled: false"
//                 webxr="optional: false"
//                 style={{ width: "100%", height: "100%" }}
//             >
//                 <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
//                 <a-entity id="camera-rig" position="0 1.6 0">
//                     <a-camera wasd-controls="acceleration: 15" look-controls>
//                         <a-cursor></a-cursor>
//                     </a-camera>
//                 </a-entity>
//             </a-scene>

//             <button
//                 onClick={openFullscreenWindow}
//                 style={{
//                     position: "absolute",
//                     top: "10px",
//                     left: "10px",
//                     width: "40px",
//                     height: "40px",
//                     padding: "0",
//                     fontSize: "24px",
//                     background: "rgba(255, 255, 255, 0.5)",
//                     color: "black",
//                     border: "none",
//                     borderRadius: "6px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     zIndex: 1000,
//                     cursor: "pointer",
//                 }}
//             >
//                 ⛶
//             </button>
//         </div>
//     );
// };

// export default ViewScene;
















