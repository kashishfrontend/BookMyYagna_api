import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles, Star } from 'lucide-react';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const floatingElements = [
    { icon: '🕉️', delay: '0s', duration: '6s' },
    { icon: '🪔', delay: '1s', duration: '8s' },
    { icon: '🌸', delay: '2s', duration: '7s' },
    { icon: '🙏', delay: '3s', duration: '9s' },
    { icon: '💫', delay: '4s', duration: '5s' },
    { icon: '🌺', delay: '5s', duration: '10s' },
  ];

  return (
    <>
      {/* Bootstrap CSS Link */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className=" overflow-hidden d-flex align-items-center justify-content-center ," style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fff7ed 100%)', marginTop:"8%"
      }}>

        {/* Animated Background Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="position-absolute rounded-circle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: '4px',
              height: '4px',
              backgroundColor: '#fb923c',
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              animation: 'pulse 2s infinite'
            }}
          />
        ))}

        {/* Floating Hindu Elements */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className="position-absolute user-select-none mt-5"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 3) * 20}%`,
              fontSize: '2.5rem',
              opacity: 0.2,
              pointerEvents: 'none',
              animationDelay: element.delay,
              animationDuration: element.duration,
              animation: 'bounce 2s infinite'
            }}
          >
            {element.icon}
          </div>
        ))}

        {/* Mouse Follow Effect */}
        <div
          className="position-fixed rounded-circle"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            width: '24px',
            height: '24px',
            backgroundColor: '#fb923c',
            opacity: 0.3,
            pointerEvents: 'none',
            transition: 'all 0.3s ease-out',
            transform: 'scale(1.5)',
            zIndex: 10
          }}
        />

        {/* Main Content */}
        <div className="container text-center position-relative" style={{ zIndex: 20, maxWidth: '800px' }}>

          {/* Animated 404 Text */}
          <div className="position-relative  overflow-visible">
            <div
              className="position-absolute top-0 start-50 translate-middle-x fw-bold text-warning opacity-50"
              style={{
                fontSize: 'clamp(6rem, 15vw, 12rem)',
                animation: 'pulse 2s infinite'
              }}
            >
              404
            </div>
            <div
              className="position-relative fw-bold"
              style={{
                fontSize: 'clamp(5rem, 12vw, 10rem)',
                background: 'linear-gradient(45deg, #ea580c, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'bounce 2s infinite'
              }}
            >
              404
            </div>

            {/* Glowing Effect */}
            <div
              className="position-absolute top-50 start-50 translate-middle rounded-circle"
              style={{
                width: '128px',
                height: '128px',
                backgroundColor: '#fb923c',
                opacity: 0.2,
                animation: 'ping 2s infinite'
              }}
            ></div>
          </div>

          {/* Sacred Symbol Animation */}
          <div className=" position-relative">
            <div
              className="d-inline-block mb-4"
              style={{
                fontSize: 'clamp(3rem, 8vw, 4rem)',
                animation: 'pulse 3s infinite'
              }}
            >
              🕉️
            </div>
            <div
              className="position-absolute top-0 start-50 translate-middle-x rounded-circle border border-warning opacity-25"
              style={{
                width: '80px',
                height: '80px',
                borderWidth: '2px',
                animation: 'pulse 2s infinite'
              }}
            ></div>
            <div
              className="position-absolute start-50 translate-middle-x rounded-circle border border-warning opacity-25"
              style={{
                top: '8px',
                width: '64px',
                height: '64px',
                borderWidth: '2px',
                animation: 'ping 2s infinite'
              }}
            ></div>
          </div>

          {/* Main Message */}
          <div className="mb-5">
            <h1
              className="display-3 fw-bold text-dark mb-4"
              style={{ animation: 'fadeInUp 1s ease-out' }}
            >
              Divine Path Not Found
            </h1>
            <p
              className="lead text-muted mx-auto mb-3"
              style={{
                maxWidth: '600px',
                animation: 'fadeInUp 1s ease-out 0.2s both'
              }}
            >
              It seems you've wandered off the spiritual path. The page you're looking for has transcended to a higher dimension.
            </p>
            <p
              className="text-muted fst-italic"
              style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}
            >
              "सत्यमेव जयते" - Truth alone triumphs
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5"
            style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}
          >
            <Link
              to="/"
              className="btn btn-lg px-4 py-3 text-white fw-semibold d-flex align-items-center gap-2 text-decoration-none position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(45deg, #ea580c, #fb923c)',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              <Home size={20} />
              <span>Return to Sanctuary</span>
            </Link>

           
          </div>

          {/* Quick Links */}
          <div
            className="row g-3 justify-content-center"
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              animation: 'fadeInUp 1s ease-out 1s both'
            }}
          >

            <div className="col-6 col-md-3">
              <Link
                to="/contact"
                className="card h-100 text-decoration-none border-warning-subtle"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#fb923c';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              >
                <div className="card-body text-center p-3">
                  <div className="fs-1 mb-2">📞</div>
                  <div className="small fw-medium text-dark">Contact</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Floating Action Button */}
          <div className="position-fixed  end-0 m-4" style={{ zIndex: 30 ,bottom:"10%"}}>
            <Link
              to="/"
              className="btn btn-lg rounded-circle text-white d-flex align-items-center justify-content-center text-decoration-none position-relative overflow-hidden"
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(45deg, #ea580c, #fb923c)',
                border: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                animation: 'bounce 2s infinite'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 8px 15px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
            >
              <ArrowLeft size={24} />
            </Link>
          </div>

          {/* Decorative Elements */}
          <div
            className="position-absolute"
            style={{
              top: '80px',
              left: '40px',
              animation: 'float 3s ease-in-out infinite'
            }}
          >
            <Sparkles size={32} className="text-warning opacity-50" />
          </div>
          <div
            className="position-absolute"
            style={{
              top: '160px',
              right: '80px',
              animation: 'float 3s ease-in-out infinite 1s'
            }}
          >
            <Star size={24} className="text-warning opacity-50" />
          </div>
          <div
            className="position-absolute"
            style={{
              bottom: '128px',
              left: '80px',
              animation: 'float 3s ease-in-out infinite 2s'
            }}
          >
            <Sparkles size={40} className="text-warning opacity-50" />
          </div>

        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(-20%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
              transform: translateY(0);
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default NotFoundPage;