import "aframe";
import { useEffect } from "react";

const ViewScene = () => {
    useEffect(() => {
        console.log("HDRI ViewScene Loaded!");
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
                </head>
                <body style="margin:0; overflow:hidden;">
                    <a-scene embedded renderer="antialias: true; colorManagement: true" vr-mode-ui="enabled: false">
                        <a-sky src="/environmentMaps/view.jpg" rotation="0 -90 0"></a-sky>
                        <a-entity id="camera-rig" position="0 1.6 0">
                            <a-camera wasd-controls="acceleration: 15" look-controls>
                                <a-cursor></a-cursor>
                            </a-camera>
                        </a-entity>
                    </a-scene>
                </body>
                </html>
            `);

            newWindow.document.close();

            newWindow.onload = () => {
                if (newWindow.document.documentElement.requestFullscreen) {
                    newWindow.document.documentElement.requestFullscreen();
                }
            };
        }
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

            {/* ⛶ 全裝置顯示開新視窗 */}
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
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                }}
            >
                ⛶
            </button>
        </>
    );
};

export default ViewScene;
