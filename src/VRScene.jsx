// import "aframe";
// import { useEffect } from "react";

// const VRScene = () => {
//     useEffect(() => {
//         console.log("A-Frame VR Scene Loaded!");

//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//         const requestMotionPermission = async () => {
//             if (
//                 typeof DeviceMotionEvent !== "undefined" &&
//                 typeof DeviceMotionEvent.requestPermission === "function"
//             ) {
//                 try {
//                     const response = await DeviceMotionEvent.requestPermission();
//                     if (response === "granted") {
//                         console.log("Motion permission granted");
//                         if (isMobile) {
//                             openFullscreenWindow();
//                         }
//                     } else {
//                         alert("Motion permission is required for immersive experience.");
//                     }
//                 } catch (err) {
//                     console.error("Motion permission error:", err);
//                 }
//             } else {
//                 // Android or other devices that don't require permission
//                 if (isMobile) {
//                     openFullscreenWindow();
//                 }
//             }
//         };

//         requestMotionPermission();

//         // Show sky only after GLB model is loaded (in embedded mode)
//         const onModelLoaded = () => {
//             const sky = document.querySelector("#sky-bg");
//             if (sky) sky.setAttribute("visible", "true");
//         };

//         const model = document.querySelector("#room-model");
//         if (model) {
//             model.addEventListener("model-loaded", onModelLoaded);
//         }

//         return () => {
//             if (model) {
//                 model.removeEventListener("model-loaded", onModelLoaded);
//             }
//         };
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
//                         <a-sky id="sky-bg" src="/environmentMaps/view.jpg" rotation="0 150 -2" visible="false"></a-sky>

//                         <a-entity
//                             id="room-model"
//                             gltf-model="/bedroom.glb"
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

//                     <script>
//                         document.getElementById("close-btn").onclick = () => {
//                             window.close();
//                         };

//                         const model = document.querySelector("#room-model");
//                         const sky = document.querySelector("#sky-bg");
//                         if (model && sky) {
//                             model.addEventListener("model-loaded", () => {
//                                 sky.setAttribute("visible", "true");
//                             });
//                         }
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
//                     {/* Sky is initially hidden until model loads */}
//                     <a-sky id="sky-bg" src="/environmentMaps/view.jpg" rotation="0 150 -2" visible="false"></a-sky>

//                     <a-entity
//                         id="room-model"
//                         gltf-model="/bedroom.glb"
//                         position="0 0 0"
//                         scale="1 1 1"
//                         rotation="0 180 0"
//                         shadow="receive: true; cast: true"
//                     ></a-entity>

//                     <a-light type="ambient" intensity="0.8"></a-light>
//                     <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>

//                     <a-entity id="camera-rig" position="0 1.6 3">
//                         <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
//                             <a-cursor></a-cursor>
//                         </a-camera>
//                     </a-entity>
//                 </a-scene>

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
//             </div>
//         </>
//     );
// };

// export default VRScene;





































import "aframe";
import { useEffect } from "react";

const VRScene = () => {
    useEffect(() => {
        console.log("A-Frame VR Scene Loaded!");

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            openFullscreenWindow();
        }

        // Show sky only after GLB model is loaded (in embedded mode)
        const onModelLoaded = () => {
            const sky = document.querySelector("#sky-bg");
            if (sky) sky.setAttribute("visible", "true");
        };

        const model = document.querySelector("#room-model");
        if (model) {
            model.addEventListener("model-loaded", onModelLoaded);
        }

        return () => {
            if (model) {
                model.removeEventListener("model-loaded", onModelLoaded);
            }
        };
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
                    </style>
                </head>
                <body>
                    <button id="close-btn">✖</button>
                    <a-scene embedded renderer="antialias: true; colorManagement: true" vr-mode-ui="enabled: false">
                        <a-sky id="sky-bg" src="/environmentMaps/view.jpg" rotation="0 150 -2" visible="false"></a-sky>

                        <a-entity
                            id="room-model"
                            gltf-model="/bedroom1.glb"
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

                        const model = document.querySelector("#room-model");
                        const sky = document.querySelector("#sky-bg");
                        if (model && sky) {
                            model.addEventListener("model-loaded", () => {
                                sky.setAttribute("visible", "true");
                            });
                        }
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
                    {/* Sky is initially hidden until model loads */}
                    <a-sky id="sky-bg" src="/environmentMaps/view.jpg" rotation="0 150 -2" visible="false"></a-sky>

                    <a-entity
                        id="room-model"
                        gltf-model="/bedroom1.glb"
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
            </div>
        </>
    );
};

export default VRScene;
















