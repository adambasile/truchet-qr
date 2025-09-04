const QRCode = require("qrcode");

export type QrModules = {
  data: Record<number, boolean>;
  reserved: Record<number, boolean>;
  size: number;
};

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export default function generateQRCode(
  text: string,
  errorCorrectionLevel: ErrorCorrectionLevel = "H",
): QrModules {
  const { modules } = QRCode.create(text, { errorCorrectionLevel });
  const { data, size, reservedBit } = modules;
  let dataOut: Record<number, boolean> = {};
  let reservedOut: Record<number, boolean> = {};
  for (let i = 0; i <= size * size; i++) {
    dataOut[i] = data[i] == 1;
    reservedOut[i] = reservedBit[i] == 1;
  }
  return { data: dataOut, size, reserved: reservedOut };
}
