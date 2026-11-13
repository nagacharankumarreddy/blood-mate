import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

// Spread onto any element with the "tilt" class: it leans toward the pointer in 3D
// and a soft highlight follows the cursor. The CSS reads the --rx/--ry/--mx/--my variables.
const MAX_TILT = 9;
export const tilt = {
  onPointerMove: (event) => {
    if (prefersReducedMotion() || !canHover()) return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    el.style.setProperty("--ry", `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  },
  onPointerLeave: (event) => {
    const el = event.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  },
};

// Fades and lifts its children into place the first time they scroll into view.
export const Reveal = ({ as = "div", delay = 0, className = "", children, ...rest }) => {
  const Tag = as;
  const ref = useRef(null);
  const [shown, setShown] = useState(prefersReducedMotion);

  useEffect(() => {
    if (shown || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`} style={{ "--delay": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
};

// Counts from 0 up to `target` once `active` turns true.
export const useCountUp = (target, active, duration = 900) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
};
