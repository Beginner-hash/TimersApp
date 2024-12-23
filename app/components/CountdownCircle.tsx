import { motion } from "framer-motion";

export const CountdownCircle = ({
  width,
  timeLeft,
  duration,
  className,
  radiusRatio,
}) => {
  const radius = (width / 2) * radiusRatio;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (circumference * timeLeft) / duration;

  return (
    <svg
      width={width}
      height={width}
      style={{ transform: "rotate(-90deg)" }}
      className={className}
    >
      <circle
        className="text-neutral-content"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx={width / 2}
        cy={width / 2}
      />
      <motion.circle
        className="text-primary"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx={width / 2}
        cy={width / 2}
        strokeDasharray={circumference}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1 }}
        strokeLinecap="round"
      />
    </svg>
  );
};
