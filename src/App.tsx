import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Suspense fallback={<div>Loading 3D Scene...</div>}>
            <Canvas camera={{ position: [3, 3, 3] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />

              <mesh rotation={[0.5, 0.5, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
              </mesh>

              <OrbitControls />
            </Canvas>
          </Suspense>
        </div>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;