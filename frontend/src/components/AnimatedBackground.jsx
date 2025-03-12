import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let mousePosition = { x: 0, y: 0 };
    let hue = 260; // Purple hue for the particles

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Track mouse position
    const handleMouseMove = (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 18000),
        90
      );

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background - subtle gradient overlay on top of CSS gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(162, 148, 249, 0.03)");
      gradient.addColorStop(1, "rgba(251, 248, 239, 0.03)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle hexagon pattern
      const hexSize = 40;
      const hexHeight = hexSize * Math.sqrt(3);
      ctx.strokeStyle = "rgba(49, 54, 63, 0.07)";
      ctx.lineWidth = 0.5;

      // Draw hexagons
      for (let y = -hexHeight; y < canvas.height + hexHeight; y += hexHeight) {
        for (
          let x = -hexSize * 1.5;
          x < canvas.width + hexSize * 1.5;
          x += hexSize * 3
        ) {
          const offsetX = (Math.floor(y / hexHeight) % 2) * hexSize * 1.5;
          drawHexagon(x + offsetX, y, hexSize);
          drawHexagon(x + offsetX + hexSize * 1.5, y + hexHeight / 2, hexSize);
        }
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Calculate distance from mouse
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Particles react to mouse - gently attracted to cursor
        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          particle.x += Math.cos(angle) * 0.2;
          particle.y += Math.sin(angle) * 0.2;
        }

        // Draw particle - vary color between purple and darker purple
        const particleHue = hue + Math.sin(Date.now() * 0.001 + index) * 10;
        const particleColor = `hsla(${particleHue}, 70%, 70%, ${particle.opacity})`;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles that are close with gradient lines
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              // Create gradient line between particles
              const gradient = ctx.createLinearGradient(
                particle.x,
                particle.y,
                otherParticle.x,
                otherParticle.y
              );
              gradient.addColorStop(
                0,
                `hsla(${particleHue}, 70%, 70%, ${0.15 * (1 - distance / 100)})`
              );
              gradient.addColorStop(
                1,
                `hsla(${particleHue + 10}, 70%, 70%, ${
                  0.05 * (1 - distance / 100)
                })`
              );

              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.6;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });
    };

    // Helper to draw hexagons
    function drawHexagon(x, y, size) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const pointX = x + size * Math.cos(angle);
        const pointY = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Animation loop
    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
  );
}
