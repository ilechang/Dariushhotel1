import "aframe";
import { useEffect } from "react";

const ViewScene = () => {
    useEffect(() => {
        console.log("HDRI ViewScene Loaded!");
    }, []);

    return (
        <a-scene
            embedded
            renderer="antialias: true; colorManagement: true"
            vr-mode-ui="enabled: false"
        >
            <a-sky
                src="/environmentMaps/illovo_beach_balcony_8k.jpg"
                rotation="0 -90 0"
            ></a-sky>
            <a-entity id="camera-rig" position="0 1.6 0">
                <a-camera wasd-controls="acceleration: 15" look-controls>
                    <a-cursor></a-cursor>
                </a-camera>
            </a-entity>
        </a-scene>
    );
};

export default ViewScene;
