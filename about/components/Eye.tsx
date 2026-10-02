import { useEffect, useRef, useState } from "react";

type EyesProps = { className?: string };
type PupilMotion = { x: number; y: number; angle: number };
const centeredPupils: PupilMotion[] = [{ x: 0, y: 0, angle: 0 }, { x: 0, y: 0, angle: 0 }];

export default function Eyes({ className = "" }: EyesProps) {
  const eyeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pupils, setPupils] = useState<PupilMotion[]>(centeredPupils);

  useEffect(() => {
    let frame = 0;
    const returnPupilsToCenter = () => {
      cancelAnimationFrame(frame);
      setPupils(centeredPupils);
    };

    const followPointer = (event: PointerEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPupils(eyeRefs.current.map((eye) => {
          if (!eye) return { x: 0, y: 0, angle: 0 };
          const bounds = eye.getBoundingClientRect();
          const dx = event.clientX - (bounds.left + bounds.width / 2);
          const dy = event.clientY - (bounds.top + bounds.height / 2);
          const distance = Math.hypot(dx, dy) || 1;
          const travel = bounds.width * 0.08;
          const scale = Math.min(1, distance / (bounds.width * 0.75));
          return {
            x: (dx / distance) * travel * scale,
            y: (dy / distance) * travel * scale,
            angle: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
          };
        }));
      });
    };
    const resetWhenPointerLeavesPage = (event: PointerEvent) => {
      if (!event.relatedTarget) returnPupilsToCenter();
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    window.addEventListener("pointerout", resetWhenPointerLeavesPage, { passive: true });
    window.addEventListener("blur", returnPupilsToCenter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("pointerout", resetWhenPointerLeavesPage);
      window.removeEventListener("blur", returnPupilsToCenter);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`flex items-center justify-center ${className}`}>
      {pupils.map((pupil, eyeIndex) => (
        <div
          key={eyeIndex}
          ref={(node) => { eyeRefs.current[eyeIndex] = node; }}
          className="about-eye relative grid shrink-0 place-items-center rounded-full border-2 border-[#21212144] bg-[#f4f4f4]"
        >
          <span className="about-pupil absolute left-1/2 top-1/2 rounded-full bg-[#212121]" style={{ transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))` }} />
          <span
            className="about-glint absolute rounded-full bg-[#f4f4f4]"
            style={{
              left: `calc(50% + ${pupil.x}px)`,
              top: `calc(50% + ${pupil.y}px)`,
              transform: `translate(-50%, -50%) rotate(${pupil.angle}deg) translateY(-23cqw)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
