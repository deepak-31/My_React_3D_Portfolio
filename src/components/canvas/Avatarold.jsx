import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const MyAvatarWork = ({ isMobile, AvatarAnimation = "hellow" }) => {

    console.log(AvatarAnimation);

    const myAvatar = useGLTF("./models/mainModel.glb");

    return (
        <mesh>
            <hemisphereLight intensity={1} groundColor='black' />
            <spotLight
                position={[50, 50, 10]}
                angle={0.9}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={1} />
            <primitive
                object={myAvatar.scene}
                scale={isMobile ? 8 : 10}
                position={isMobile ? [0, -10, 0] : [0, -6, 0]}
                rotation={[0, 0.7, 0]}
            />
        </mesh>
    );
};

const Avatar = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop='demand'
            shadows
            dpr={[1, 2]}
            // camera={{ position: [20, 0, 50], fov: 50 }}
            camera={{ position: [30, 30, 30], fov: 30 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <MyAvatarWork isMobile={isMobile} />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default Avatar;
