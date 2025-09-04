import { QrModules } from "@/app/_components/generate-qr-code";

type Props = {
  qr: QrModules;
  scale?: number; // pixels per module
  margin?: number; // modules of quiet zone
  className?: string;
};

export default function QrSvg({ qr, scale = 8, margin = 4, className }: Props) {
  const { size, data } = qr;
  const totalSize = size * scale + margin * 2 * scale;

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
            const idx = row + col * size;
            const isDark = data[idx];
            return (
              <Tile
                key={`${col}-${row}`}
                x={col * scale}
                y={row * scale}
                width={scale}
                height={scale}
                isDark={isDark}
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
  width: number;
  height: number;
  isDark: boolean;
};

function Tile({ x, y, width, height, isDark }: TileProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={isDark ? "#000" : "#FFF"}
    />
  );
}
