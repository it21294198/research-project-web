import { motion } from "framer-motion";

type LinesProps = {
  lineCount: number;
};

export default function ReturnLines({ returnLineCount }: LinesProps) {
  const width = 500;
  const height = 200;
  const count = returnLineCount;

  return (
    <svg
    width="100%"
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    style={{ transform: "rotate(-180deg)" }}
    >
      <defs>
        <mask id="curveMask">
          {Array.from({ length: count }).map((_, i) => {
            const x = i * (width / (count - 1));
            return (
              <path
                key={i}
                d={`M${x},0 C${x},150 ${width / 2},75 ${width / 2},200`}
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
            );
          })}
        </mask>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <motion.stop
            stopColor="rgba(0,0,0,0.5)"
            animate={{ offset: ["-150%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            stopColor="transparent"
            animate={{ offset: ["-20%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            stopColor="aquamarine"
            animate={{ offset: ["-12%", "108%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            stopColor="rgba(0,0,0,0.5)"
            animate={{ offset: ["-8%", "112%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </linearGradient>
      </defs>
      <g mask="url(#curveMask)">
        <rect x="0" y="0" width={width} height={height} fill="#333" />
        <rect x="0" y="0" width={width} height={height} fill="url(#gradient)" />
      </g>
    </svg>
  );
}