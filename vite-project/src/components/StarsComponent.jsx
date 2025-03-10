import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
const StarsBackground = () => {
  return (
    <div
      className="absolute top-0 left-0 inset-0 -z-10"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: "100vw", height: "100vh", background: "black" }}
      >
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default StarsBackground;
