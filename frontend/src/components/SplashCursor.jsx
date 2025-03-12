import { useEffect, useRef } from "react";

export function SplashCursor() {
  const canvasRef = useRef(null);
  const splashesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const createSplash = (x, y, isClick = false) => {
      const splash = {
        x,
        y,
        radius: 0,
        maxRadius: isClick ? 100 : 40,
        speed: isClick ? 8 : 4,
        opacity: 0.4,
        color: "#A294F9",
      };
      splashesRef.current.push(splash);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseRef.current = { x: clientX, y: clientY };

      const dx = clientX - prevMouseRef.current.x;
      const dy = clientY - prevMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 20) {
        createSplash(clientX, clientY);
        prevMouseRef.current = { x: clientX, y: clientY };
      }
    };

    const handleClick = (e) => {
      createSplash(e.clientX, e.clientY, true);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      splashesRef.current = splashesRef.current.filter((splash) => {
        splash.radius += splash.speed;
        splash.opacity *= 0.95;

        ctx.beginPath();
        ctx.arc(splash.x, splash.y, splash.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${splash.color}${Math.round(splash.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return splash.opacity > 0.01 && splash.radius < splash.maxRadius;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
