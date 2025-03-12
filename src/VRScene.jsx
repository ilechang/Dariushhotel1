














import "aframe";
import { useEffect } from "react";

const VRScene = () => {
    useEffect(() => {
        console.log("A-Frame Scene Loaded!");
    }, []);

    return (
        <a-scene
            embedded
            xr-mode-ui="enabled: false"
            renderer="antialias: true; colorManagement: true" // ⬅️ 刪除 physicallyCorrectLights
        >
            {/* 3D模型 */}
            <a-entity
                gltf-model="/hotel.glb"
                position="0 0 0"
                scale="1 1 1"
                rotation="0 180 0"
                shadow="receive: true; cast: true"
            ></a-entity>

            {/* 燈光 */}
            <a-light type="ambient" intensity="0.8"></a-light>
            <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>

            {/* 相機 */}
            <a-entity id="camera-rig" position="0 1.6 3">
                <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
                    <a-cursor></a-cursor>
                </a-camera>
            </a-entity>
        </a-scene>
    );
};

export default VRScene;



















// import "aframe";
// import { useEffect, useRef } from "react";

// const VRScene = ({ setLoading }) => {
//     const sceneRef = useRef(null);

//     useEffect(() => {
//         const sceneEl = sceneRef.current;

//         if (sceneEl) {
//             sceneEl.addEventListener("loaded", () => {
//                 setLoading(false); // 當 3D 場景載入完成，隱藏 Loading
//             });
//         }

//         return () => {
//             if (sceneEl) {
//                 sceneEl.removeEventListener("loaded", () => setLoading(false));
//             }
//         };
//     }, [setLoading]);

//     return (
//         <a-scene ref={sceneRef} embedded xr-mode-ui="enabled: false" renderer="antialias: true; colorManagement: true">
//             {/* 3D 模型 */}
//             <a-entity
//                 gltf-model="/hotel.glb"
//                 position="0 0 0"
//                 scale="1 1 1"
//                 rotation="0 180 0"
//                 shadow="receive: true; cast: true"
//             ></a-entity>

//             {/* 燈光 */}
//             <a-light type="ambient" intensity="0.8"></a-light>
//             <a-light type="directional" intensity="0.6" position="5 10 5"></a-light>

//             {/* 相機 */}
//             <a-entity id="camera-rig" position="0 1.6 3">
//                 <a-camera wasd-controls="acceleration: 15" look-controls position="0 1.6 0">
//                     <a-cursor></a-cursor>
//                 </a-camera>
//             </a-entity>
//         </a-scene>
//     );
// };

// export default VRScene;
