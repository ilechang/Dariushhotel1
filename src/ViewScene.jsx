import "aframe";
import { useEffect } from "react";

const ViewScene = ({ setShowView, style = {} }) => {
    useEffect(() => {
        console.log("HDRI ViewScene Loaded!");

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            openFullscreenWindow();
        }

        const handleMessage = (event) => {
            if (event.data === "exit-view") {
                setShowView(false);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [setShowView]);

    const openFullscreenWindow = () => {
        const newWindow = window.open(
            "",
            "_blank",
            `width=${screen.width},height=${screen.height},top=0,left=0`
        );

        if (newWindow) {
            newWindow.document.write(`
                <html>
                <head>
                    <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
                    <style>
                        body {
                            margin: 0;
                            overflow: hidden;
                            background: black;
                        }
                        #close-btn {
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            width: 40px;
                            height: 40px;
                            font-size: 24px;
                            background: transparent;
                            color: black;
                            border: none;
                            border-radius: 6px;
                            z-index: 9999;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <button id="close-btn">✖</button>
                    <a-scene embedded renderer="antialias: true; colorManagement: true" vr-mode-ui="enabled: false">
                        <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
                        <a-entity id="camera-rig" position="0 1.6 0">
                            <a-camera wasd-controls="acceleration: 15" look-controls>
                                <a-cursor></a-cursor>
                            </a-camera>
                        </a-entity>
                    </a-scene>

                    <script>
                        document.getElementById("close-btn").onclick = () => {
                            window.close();
                            if (window.opener) {
                                window.opener.postMessage("exit-view", "*");
                            }
                        };
                    </script>
                </body>
                </html>
            `);

            newWindow.document.close();

            newWindow.onload = () => {
                const el = newWindow.document.documentElement;
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
            };
        }
    };

    const containerStyle = {
        position: "relative",
        width: "100%",
        height: style?.height || "60vh",
        overflow: "hidden",
        ...style,
    };

    return (
        <div style={containerStyle}>
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

            <button
                onClick={openFullscreenWindow}
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
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    cursor: "pointer",
                }}
            >
                ⛶
            </button>
        </div>
    );
};

export default ViewScene;



























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
















