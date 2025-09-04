import { QrModules } from "@/app/_components/generate-qr-code";

type Props = {
  qr: QrModules;
  totalSize?: number; // total pixel size of the QR code
  margin?: number; // modules of quiet zone
  className?: string;
};

export default function QrSvg({
  qr,
  totalSize = 500,
  margin = 4,
  className,
}: Props) {
  const { size, data, reserved } = qr;
  const totalMemberSize = size + margin * 2;
  const scale = totalSize / totalMemberSize;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={totalSize}
      height={totalSize}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      className={className}
      role="img"
      aria-label="qr code"
      shapeRendering="crispEdges"
    >
      <rect x={0} y={0} width={totalSize} height={totalSize} fill="#FFF" />

      <g transform={`translate(${margin * scale}, ${margin * scale})`}>
        {Array.from({ length: size }).map((_, col) =>
          Array.from({ length: size }).map((__, row) => {
            // pixel at column j (col), row x (row) is stored at data[row + col * size]
            const idx = col + row * size;
            const isDark = data[idx];
            return (
              <Tile
                key={`${col}-${row}`}
                x={col * scale}
                y={row * scale}
                scale={scale}
                isDark={isDark}
                even={idx % 2 === 0}
                plain={reserved[idx]}
              />
            );
          }),
        )}
      </g>
    </svg>
  );
}

type TileProps = {
  x: number;
  y: number;
  scale: number;
  isDark: boolean;
  even: boolean;
  plain?: boolean;
};

function Tile({ x, y, scale, isDark, even, plain = false }: TileProps) {
  const main = isDark ? "#000" : "#FFF";
  const highlight = isDark ? "#FFF" : "#000";
  const quarters: Quarter[] =
    even != isDark
      ? ["top-left", "bottom-right"]
      : ["top-right", "bottom-left"];
  return (
    <>
      <rect x={x} y={y} width={scale} height={scale} fill={main} />
      {!plain &&
        quarters.map((q, i) => (
          <QuarterCircle
            key={i}
            position={q}
            x={x}
            y={y}
            scale={scale}
            fill={highlight}
          />
        ))}
    </>
  );
}

type Quarter = "top-left" | "top-right" | "bottom-right" | "bottom-left";

interface QuarterCircleProps {
  position: Quarter;
  x: number;
  y: number;
  scale: number;
  fill?: string;
}

export function QuarterCircle({
  position,
  x,
  y,
  scale,
  fill,
}: QuarterCircleProps) {
  const r = scale / 2;
  const centerX = x + r;
  const centerY = y + r;

  // base path = top-left quarter
  const d = `M${x + r} ${y} A${r} ${r} 0 0 1 ${x} ${y + r} L${x} ${y} Z`;

  const rotationMap: Record<Quarter, number> = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };

  const rotation = rotationMap[position];

  return (
    <path
      d={d}
      fill={fill}
      transform={`rotate(${rotation} ${centerX} ${centerY})`}
    />
  );
}
