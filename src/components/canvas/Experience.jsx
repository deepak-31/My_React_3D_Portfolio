import React, { Suspense, useState, useEffect } from "react";
import { ContactShadows, Environment, OrbitControls, Preload } from "@react-three/drei";
import { Avatar } from "./Avatar";
import CanvasLoader from "../Loader";
import { Canvas } from "@react-three/fiber";


const Experience = () => {

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
        <>
            <Canvas
                frameloop='demand'
                shadows
                dpr={[1, 2]}
                camera={{ position: [2, 0, 5], fov: 30 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        enableDamping={true}
                        dampingFactor={0.05}
                        enableZoom={false}

                        // 34
                        // maxAzimuthAngle={Math.PI / 9 * (17 / 6)}
                        // minAzimuthAngle={-Math.PI / 9 * (17 / 6)}

                        // 35 
                        maxAzimuthAngle={Math.PI / 9 * (7 / 4)}
                        minAzimuthAngle={-Math.PI / 9 * (7 / 4)}

                        //  40 
                        // maxAzimuthAngle={Math.PI / 9 * 2}
                        // minAzimuthAngle={-Math.PI / 9 * 2}

                        // 30 
                        // maxAzimuthAngle={Math.PI / 6}
                        // minAzimuthAngle={-Math.PI / 6}

                        // 45
                        // maxAzimuthAngle={Math.PI / 4}
                        // minAzimuthAngle={-Math.PI / 4}

                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />

                    <Environment preset="sunset" />
                    <group
                        position={isMobile ? [0, -0.5, 0] : [0, -0.5, 0]}
                        rotation={[-1.5, 0, 0]}
                    // rotation={[0, 0, 0]}
                    // position-y={-1}
                    >
                        <ContactShadows
                            opacity={0.42}
                            scale={10}
                            blur={1}
                            far={10}
                            resolution={256}
                            color="#000000"
                        />
                        <Avatar animation={"Standing"} />
                    </group>
                </Suspense>
                <Preload all />
            </Canvas>
        </>

    )
}

export default Experience