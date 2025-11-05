import React, { useState, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// --- Constants & Helper Functions ---
const GLOBE_RADIUS = 2.5;

const latLngToVec3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
};

const generateCityLights = () => {
  const cities = [];
  const cityCount = 2000;

  for (let i = 0; i < cityCount; i++) {
    const lat = (Math.random() - 0.5) * 180;
    const lng = (Math.random() - 0.5) * 360;
    const position = latLngToVec3(lat, lng, GLOBE_RADIUS * 1.002);
    cities.push(position);
  }

  return cities;
};

const CityLights = () => {
  const points = useMemo(() => generateCityLights(), []);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flat());
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.008}
        color="#ffdd88"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const DATA = [
  {
    id: 1,
    lat: 43.6,
    lng: 7.0,
    name: "Killian Hayes",
    details: "Detroit Pistons / NBA",
    location: "Monaco",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    lat: 36.5,
    lng: 36.3,
    name: "Faouzi Ghoulam",
    details: "Hatayspor / Super Lig",
    location: "Algeria",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    lat: 34.0,
    lng: -118.0,
    name: "Marcus Johnson",
    details: "Los Angeles Lakers / NBA",
    location: "Los Angeles",
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    lat: 51.5,
    lng: -0.1,
    name: "James Sterling",
    details: "Chelsea FC / Premier League",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=300&fit=crop",
  },
];

const EarthGlobe = () => {
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0a1929";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "#0d2847");
    gradient.addColorStop(1, "#061220");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1a3a2e";

    ctx.beginPath();
    ctx.ellipse(300, 400, 180, 200, 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(400, 650, 120, 180, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(1000, 350, 140, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(1050, 550, 150, 200, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(1500, 400, 280, 220, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(1650, 750, 100, 90, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(42, 82, 62, 0.3)";
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <Sphere args={[GLOBE_RADIUS, 64, 64]} rotation={[0, Math.PI, 0]}>
      <meshStandardMaterial
        map={earthTexture}
        roughness={0.8}
        metalness={0.1}
        emissive="#0a1929"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
};

const Atmosphere = () => {
  return (
    <Sphere args={[GLOBE_RADIUS * 1.01, 64, 64]}>
      <meshBasicMaterial
        color="#4a9eff"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </Sphere>
  );
};

const Marker = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const position = useMemo(
    () => latLngToVec3(data.lat, data.lng, GLOBE_RADIUS * 1.001),
    [data]
  );

  const pinRef = useRef();

  useFrame((state) => {
    if (pinRef.current && hovered) {
      pinRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 3) * 0.05 + 0.15;
    } else if (pinRef.current) {
      pinRef.current.position.y = 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.075, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
        <meshBasicMaterial color={hovered ? "#ff6b35" : "#ff4500"} />
      </mesh>

      <mesh
        ref={pinRef}
        position={[0, 0.15, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ff6b35" : "#ff4500"} />
      </mesh>

      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color="#ff4500"
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </mesh>

      {hovered && (
        <Html
          distanceFactor={8}
          position={[0.3, 0.3, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="info-card">
            <div className="card-image-wrapper">
              <img src={data.image} alt={data.name} className="card-image" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <h3 className="card-name">{data.name}</h3>
              <p className="card-details">{data.details}</p>
              <div className="card-location">
                <span className="location-icon">📍</span>
                <span>{data.location}</span>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const Rotator = ({ children }) => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });
  return <group ref={ref}>{children}</group>;
};

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#4488ff" />

      <Rotator>
        <EarthGlobe />
        <Atmosphere />
        <CityLights />
        {DATA.map((data) => (
          <Marker key={data.id} data={data} />
        ))}
      </Rotator>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={8}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const globeTransform = Math.min(scrollY * 0.5, 400);

  return (
    <div className="app-container">
      {/* Hero Section with Globe */}
      <div
      // className="hero-section"
      // style={{ transform: `translateY(-${globeTransform}px)` }}
      >
        {/* <h1 className="header-title">Global Dynamic Assets Tracker</h1>
        <p className="header-subtitle">
          Transforming Athletes into Digital Assets
        </p> */}

        <div className="canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <GlobeScene />
          </Canvas>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="content-wrapper">
        {/* Ecosystem Section */}
        <section className="section ecosystem-section">
          <div className="section-content">
            <h2>🌎 ECOSYSTEM</h2>
            <p>
              We bridge sports, gaming, and lifestyle by transforming
              collectibles into dynamic, cross-platform assets across mobile
              games.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="section features-section">
          <div className="section-content">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎮</div>
                <h3>Gaming Integration</h3>
                <p>
                  Seamlessly integrate your digital assets across multiple
                  gaming platforms and experiences.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3>Athlete Tracking</h3>
                <p>
                  Real-time tracking of athlete performance and their digital
                  asset valuations worldwide.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Analytics Dashboard</h3>
                <p>
                  Comprehensive analytics and insights into your portfolio's
                  performance and growth.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔗</div>
                <h3>Cross-Platform</h3>
                <p>
                  Your assets work everywhere - from mobile games to desktop
                  applications seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section stats-section">
          <div className="section-content">
            <h2>Global Impact</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Athletes Tracked</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Digital Assets</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Game Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section how-it-works-section">
          <div className="section-content">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">01</div>
                <h3>Select Athletes</h3>
                <p>
                  Browse our global database of athletes from various sports and
                  leagues.
                </p>
              </div>
              <div className="step-connector">→</div>
              <div className="step">
                <div className="step-number">02</div>
                <h3>Acquire Assets</h3>
                <p>
                  Convert athlete profiles into dynamic digital collectibles.
                </p>
              </div>
              <div className="step-connector">→</div>
              <div className="step">
                <div className="step-number">03</div>
                <h3>Use Everywhere</h3>
                <p>
                  Deploy your assets across games, platforms, and experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="section-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Join thousands of users already transforming sports into digital
              experiences.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Start Now</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Global Assets Tracker</h4>
              <p>
                Bridging sports, gaming, and lifestyle through dynamic digital
                assets.
              </p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Athletes</li>
                <li>Games</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Global Dynamic Assets Tracker. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          padding: 0;
          background: #000000;
          overflow-x: hidden;
        }

        .app-container {
          min-height: 100vh;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            sans-serif;
          background: #000000;
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.1s ease-out;
        }

        .header-title {
          padding: 30px 20px 10px;
          margin: 0;
          text-align: center;
          font-weight: 300;
          font-size: 2.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff 0%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          z-index: 10;
        }

        .header-subtitle {
          text-align: center;
          color: #888;
          font-size: 1.1rem;
          margin: 0 0 20px 0;
          letter-spacing: 1px;
        }

        .canvas-wrapper {
          height: 100vh;
          width: 100%;
          position: relative;
          max-height: 700px;
          background: radial-gradient(
            circle at center,
            #0a0a0a 0%,
            #000000 100%
          );
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #888;
          font-size: 0.9rem;
          animation: bounce 2s infinite;
        }

        .scroll-arrow {
          font-size: 2rem;
          color: #ff4500;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          background: linear-gradient(
            180deg,
            #000000 0%,
            #0a0a0a 50%,
            #000000 100%
          );
        }

        .section {
          padding: 80px 20px;
          width: 100%;
        }

        .section-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 50px;
          font-weight: 400;
          letter-spacing: 2px;
        }

        .ecosystem-section {
          text-align: center;
          border-top: 1px solid rgba(255, 69, 0, 0.2);
        }

        .ecosystem-section p {
          color: #cccccc;
          line-height: 1.8;
          font-size: 1.1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .features-section {
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .feature-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(255, 69, 0, 0.2);
          border-radius: 15px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 69, 0, 0.5);
          box-shadow: 0 10px 40px rgba(255, 69, 0, 0.2);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #fff;
        }

        .feature-card p {
          color: #aaa;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .stats-section {
          background: radial-gradient(
            circle at center,
            #ff450020 0%,
            transparent 70%
          );
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-top: 50px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: #ff4500;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .how-it-works-section {
          background: #000000;
        }

        .steps-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 60px;
          flex-wrap: wrap;
        }

        .step {
          flex: 1;
          min-width: 250px;
          text-align: center;
          padding: 30px;
        }

        .step-number {
          font-size: 3rem;
          font-weight: 700;
          color: #ff4500;
          margin-bottom: 20px;
          opacity: 0.3;
        }

        .step h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #fff;
        }

        .step p {
          color: #aaa;
          line-height: 1.6;
        }

        .step-connector {
          font-size: 2rem;
          color: #ff4500;
          opacity: 0.5;
        }

        .cta-section {
          text-align: center;
          padding: 100px 20px;
          background: radial-gradient(
            circle at center,
            #ff450030 0%,
            transparent 70%
          );
        }

        .cta-section h2 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .cta-section p {
          font-size: 1.2rem;
          color: #aaa;
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 15px 40px;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .btn-primary {
          background: #ff4500;
          color: white;
        }

        .btn-primary:hover {
          background: #ff6b35;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 69, 0, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #ff4500;
          border: 2px solid #ff4500;
        }

        .btn-secondary:hover {
          background: rgba(255, 69, 0, 0.1);
          transform: translateY(-3px);
        }

        .footer {
          background: #0a0a0a;
          border-top: 1px solid rgba(255, 69, 0, 0.2);
          padding: 60px 20px 20px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section h4 {
          color: #ff4500;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .footer-section p {
          color: #888;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          color: #888;
          margin-bottom: 10px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .footer-section ul li:hover {
          color: #ff4500;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 69, 0, 0.1);
          color: #666;
          font-size: 0.9rem;
        }

        :global(.info-card) {
          background: rgba(15, 15, 15, 0.95);
          border: 1px solid rgba(255, 69, 0, 0.3);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(255, 69, 0, 0.3),
            0 0 20px rgba(255, 69, 0, 0.2);
          width: 240px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease-out;
          pointer-events: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.card-image-wrapper) {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }

        :global(.card-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        :global(.card-overlay) {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(15, 15, 15, 1), transparent);
        }

        :global(.card-content) {
          padding: 15px;
        }

        :global(.card-name) {
          margin: 0 0 8px 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
        }

        :global(.card-details) {
          margin: 0 0 10px 0;
          font-size: 0.85rem;
          color: #aaaaaa;
          line-height: 1.4;
        }

        :global(.card-location) {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #ff4500;
          margin-top: 8px;
        }

        :global(.location-icon) {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 1.8rem;
          }

          .header-subtitle {
            font-size: 0.95rem;
          }

          .canvas-wrapper {
            height: 100vh;
          }

          .section {
            padding: 60px 20px;
          }

          .section h2 {
            font-size: 2rem;
          }

          .steps-container {
            flex-direction: column;
          }

          .step-connector {
            transform: rotate(90deg);
          }

          .cta-section h2 {
            font-size: 2rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
