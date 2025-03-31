import "aframe";
import { useEffect } from "react";

const ViewScene = () => {
    useEffect(() => {
        console.log("HDRI ViewScene Loaded!");
    }, []);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const enterFullscreen = () => {
        const el = document.querySelector("a-scene").parentElement;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); // Safari
        else if (el.msRequestFullscreen) el.msRequestFullscreen(); // IE11
    };

    return (
        <>
            <a-scene
                embedded
                renderer="antialias: true; colorManagement: true"
                vr-mode-ui="enabled: false"
                webxr="optional: false"
            >
                <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
                <a-entity id="camera-rig" position="0 1.6 0">
                    <a-camera wasd-controls="acceleration: 15" look-controls>
                        <a-cursor></a-cursor>
                    </a-camera>
                </a-entity>
            </a-scene>

            {/* ⛶ 自訂按鈕：只在手機上顯示 */}
            {isMobile && (
                <button
                    onClick={enterFullscreen}
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "95%",
                        transform: "translateX(-50%)",
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
                    }}
                >
                    ⛶
                </button>
            )}
        </>
    );
};

export default ViewScene;
