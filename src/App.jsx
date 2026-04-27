import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Model from './component/Model';
import Section1 from './component/Section1';
import Section2 from './component/Section2';
import Section3 from './component/Section3';
import Section4 from './component/Section4';
import Section5 from './component/Section5';

function App() {
  const canvasRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* 3D Canvas – always fixed in background */}
      <Canvas
        ref={canvasRef}
        style={{ position: "fixed", height: "100vh", width: "100vw", top: "0px", left: "0px", zIndex: "1" }}
      >
        <Model scrollProgress={scrollProgress} onLoad={() => setModelLoaded(true)} />
      </Canvas>



      {/* Sections – only shown after model has fully loaded */}
      {modelLoaded && (
        <div style={{ position: "relative", zIndex: "2" }}>
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
        </div>
      )}
    </main>
  );
}

export default App;