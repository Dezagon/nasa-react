import Particles from "./ReactBits/Particles/Particles";
import { SolarSystem } from "./SolarSystem";
{
  /* RESTART AND TRY TO IMPLEMENT GSAP. IF THAT DOES NOT WORK TRY THREE JS */
}

function App() {
  return (
    <main className="w-full h-full">
      <div style={{ width: "100vw", height: "100vh", position: "absolute", zIndex: -1 }}>
        {/* Background */}
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={70}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <SolarSystem />
    </main>
  );
}

export default App;
