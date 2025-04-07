



























import "aframe";
import { useEffect } from "react";

const ViewScene = () => {
    useEffect(() => {
        console.log("HDRI ViewScene Loaded!");

        // 如果是手機裝置，直接開新視窗顯示全景圖
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            openFullscreenWindow();
        }
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
                        #motion-tip {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: rgba(255, 255, 255, 0.9);
                            color: black;
                            font-size: 18px;
                            padding: 16px 24px;
                            border-radius: 8px;
                            z-index: 9998;
                            font-family: sans-serif;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <button id="close-btn">✖</button>
                    <div id="motion-tip">Tap the screen to enable motion control.</div>
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
                        };

                        // 加入 iOS 感應器授權邏輯
                        function requestDeviceOrientationPermission() {
                            if (
                                typeof DeviceOrientationEvent !== "undefined" &&
                                typeof DeviceOrientationEvent.requestPermission === "function"
                            ) {
                                DeviceOrientationEvent.requestPermission().then((response) => {
                                    if (response === "granted") {
                                        console.log("使用者已授權感應器");
                                    }
                                }).catch(console.error);
                            }
                        }

                        // 使用者首次點擊畫面時觸發授權 + 移除提示
                        document.body.addEventListener("click", () => {
                            requestDeviceOrientationPermission();
                            const tip = document.getElementById("motion-tip");
                            if (tip) tip.remove();
                        }, { once: true });
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
            {/* 桌機版仍顯示內嵌 <a-scene>，手機已自動開新視窗 */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "60vh",
                    overflow: "hidden",
                }}
            >
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

                {/* ⛶ 手動開啟全螢幕視窗按鈕（主要給桌機使用） */}
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
        </>
    );
};

export default ViewScene;




























// import "aframe";
// import { useEffect } from "react";

// const ViewScene = () => {
//     useEffect(() => {
//         console.log("HDRI ViewScene Loaded!");

//         // 如果是手機裝置，直接開新視窗顯示全景圖
//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//         if (isMobile) {
//             openFullscreenWindow();
//         }
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
//         <>
//             {/* 桌機版仍顯示內嵌 <a-scene>，手機已自動開新視窗 */}
//             <div
//                 style={{
//                     position: "relative",
//                     width: "100%",
//                     height: "60vh",
//                     overflow: "hidden",
//                 }}
//             >
//                 <a-scene
//                     embedded
//                     renderer="antialias: true; colorManagement: true"
//                     vr-mode-ui="enabled: false"
//                     webxr="optional: false"
//                     style={{ width: "100%", height: "100%" }}
//                 >
//                     <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
//                     <a-entity id="camera-rig" position="0 1.6 0">
//                         <a-camera wasd-controls="acceleration: 15" look-controls>
//                             <a-cursor></a-cursor>
//                         </a-camera>
//                     </a-entity>
//                 </a-scene>

//                 {/* ⛶ 手動開啟全螢幕視窗按鈕（主要給桌機使用） */}
//                 <button
//                     onClick={openFullscreenWindow}
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
//                         borderRadius: "6px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         zIndex: 1000,
//                         cursor: "pointer",
//                     }}
//                 >
//                     ⛶
//                 </button>
//             </div>
//         </>
//     );
// };

// export default ViewScene;















