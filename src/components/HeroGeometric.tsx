"use client";

import { useEffect, useRef } from "react";

export default function HeroGeometric() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width || 400;
      height = canvas.height = rect.height || 400;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tilt (minimal & subtle)
    const mouse = {
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left - rect.width / 2;
      const rawY = e.clientY - rect.top - rect.height / 2;
      mouse.targetX = (rawY / rect.height) * 0.35; // Gentle tilt
      mouse.targetY = (rawX / rect.width) * 0.35;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const parentElem = containerRef.current;
    if (parentElem) {
      parentElem.addEventListener("mousemove", handleMouseMove);
      parentElem.addEventListener("mouseleave", handleMouseLeave);
    }

    let rotX = 0;
    let rotY = 0;
    let time = 0;

    // Render loop - Minimalistic geometric concentric structure
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.004; // Very slow, calm motion

      // Smooth ease for mouse tilt
      rotX += (mouse.targetX - rotX) * 0.04;
      rotY += (mouse.targetY - rotY) * 0.04;

      const center = { x: width / 2, y: height / 2 };
      const baseRadius = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(center.x, center.y);

      // Subtle ambient background ring gradient
      const bgGradient = ctx.createRadialGradient(0, 0, 5, 0, 0, baseRadius * 1.4);
      bgGradient.addColorStop(0, "rgba(34, 211, 238, 0.06)");
      bgGradient.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Ring 1: Outer subtle dashed ring
      ctx.save();
      ctx.rotate(time * 0.5 + rotY * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.25, baseRadius * 0.5, Math.PI / 6 + rotX * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.restore();

      // Ring 2: Main clean geometric ring
      ctx.save();
      ctx.rotate(-time * 0.35 + rotX * 0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 1.0, baseRadius * 0.7, -Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Ring 3: Inner offset ring
      ctx.save();
      ctx.rotate(time * 0.6 + rotY * 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, baseRadius * 0.7, baseRadius * 0.35, Math.PI / 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(129, 140, 248, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Core Minimalistic Geometric Polyhedron / Diamond (8 clean points)
      const coreSize = baseRadius * 0.45;
      const vertices = [
        { x: 0, y: -coreSize, z: 0 },
        { x: coreSize, y: 0, z: 0 },
        { x: 0, y: coreSize, z: 0 },
        { x: -coreSize, y: 0, z: 0 },
        { x: 0, y: 0, z: coreSize },
        { x: 0, y: 0, z: -coreSize },
      ];

      const currentRotX = time * 0.4 + rotX;
      const currentRotY = time * 0.5 + rotY;

      // Project core vertices
      const proj = vertices.map((v) => {
        // Rotate Y
        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        let x1 = v.x * cosY + v.z * sinY;
        let z1 = -v.x * sinY + v.z * cosY;

        // Rotate X
        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        let y2 = v.y * cosX - z1 * sinX;
        let z2 = v.y * sinX + z1 * cosX;

        return { x: x1, y: y2, z: z2 };
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Middle square ring
        [0, 4], [1, 4], [2, 4], [3, 4], // Top pyramid
        [0, 5], [1, 5], [2, 5], [3, 5], // Bottom pyramid
      ];

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(34, 211, 238, 0.5)";

      edges.forEach(([a, b]) => {
        const pA = proj[a];
        const pB = proj[b];
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      });

      // Minimal vertex dots
      proj.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (parentElem) {
        parentElem.removeEventListener("mousemove", handleMouseMove);
        parentElem.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] flex items-center justify-center pointer-events-auto"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
