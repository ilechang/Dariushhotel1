

// import "aframe";
// import { useEffect } from "react";

// const VRScene = () => {
//     useEffect(() => {
//         console.log("A-Frame Scene Loaded!");
//     }, []);

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
//                 </head>
//                 <body style="margin:0; overflow:hidden;">
//                     <a-scene embedded>
//                         <a-entity
//                             gltf-model="/3.glb"
//                             position="0 0 0"
//                             scale="1 1 1"
//                             rotation="0 180 0"
//                             shadow="receive: true; cast: true"
//                         ></a-entity>
//                         <a-light type="ambient" intensity="0.8"></a-light>
//                         <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>
//                         <a-entity id="camera-rig" position="0 1.6 3">
//                             <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
//                                 <a-cursor></a-cursor>
//                             </a-camera>
//                         </a-entity>
//                     </a-scene>
//                 </body>
//                 </html>
//             `);

//             newWindow.document.close();

//             // 嘗試自動全螢幕
//             newWindow.onload = () => {
//                 if (newWindow.document.documentElement.requestFullscreen) {
//                     newWindow.document.documentElement.requestFullscreen();
//                 }
//             };
//         }
//     };

//     return (
//         <>
//             <a-scene
//                 embedded
//                 xr-mode-ui="enabled: false"
//                 renderer="antialias: true; colorManagement: true"
//             >
//                 <a-entity
//                     gltf-model="/3.glb"
//                     position="0 0 0"
//                     scale="1 1 1"
//                     rotation="0 180 0"
//                     shadow="receive: true; cast: true"
//                 ></a-entity>

//                 <a-light type="ambient" intensity="0.8"></a-light>
//                 <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>

//                 <a-entity id="camera-rig" position="0 1.6 3">
//                     <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
//                         <a-cursor></a-cursor>
//                     </a-camera>
//                 </a-entity>
//             </a-scene>

//             <button
//                 onClick={openFullscreenWindow}
//                 style={{
//                     position: "absolute",
//                     top: "60px",
//                     left: "95%",
//                     transform: "translateX(-50%)",
//                     width: "40px",  // 限制按鈕大小
//                     height: "40px", 
//                     padding: "0", // 移除預設 padding
//                     fontSize: "24px", // 讓圖標看起來清晰
//                     lineHeight: "1", // 確保內部沒有多餘空間
//                     background: "rgba(255, 255, 255, 0.5)",
//                     color: "black",
//                     border: "none",
//                     cursor: "pointer",
//                     zIndex: 1000,
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "6px", // 讓按鈕有點圓角
//                 }}
//             >
//               ⛶
//             </button>
//         </>
//     );
// };

// export default VRScene;

























import "aframe";
import { useEffect } from "react";

const VRScene = () => {
    useEffect(() => {
        console.log("A-Frame Scene Loaded!");
    }, []);

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
                        <a-entity
                            gltf-model="/3.glb"
                            position="0 0 0"
                            scale="1 1 1"
                            rotation="0 180 0"
                            shadow="receive: true; cast: true"
                        ></a-entity>
                        <a-light type="ambient" intensity="0.8"></a-light>
                        <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>
                        <a-entity id="camera-rig" position="0 1.6 3">
                            <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
                                <a-cursor></a-cursor>
                            </a-camera>
                        </a-entity>
                    </a-scene>

                    <script>
                        document.getElementById("close-btn").onclick = () => {
                            window.close();
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

    return (
        <>
            <a-scene
                embedded
                xr-mode-ui="enabled: false"
                renderer="antialias: true; colorManagement: true"
            >
                <a-entity
                    gltf-model="/3.glb"
                    position="0 0 0"
                    scale="1 1 1"
                    rotation="0 180 0"
                    shadow="receive: true; cast: true"
                ></a-entity>

                <a-light type="ambient" intensity="0.8"></a-light>
                <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>

                <a-entity id="camera-rig" position="0 1.6 3">
                    <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
                        <a-cursor></a-cursor>
                    </a-camera>
                </a-entity>
            </a-scene>

            {/* ⛶ Open New Window Fullscreen */}
            <button
                onClick={openFullscreenWindow}
                style={{
                    position: "absolute",
                    top: "60px",
                    left: "95%",
                    transform: "translateX(-50%)",
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
        </>
    );
};

export default VRScene;
