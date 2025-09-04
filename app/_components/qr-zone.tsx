"use client";

import generateQRCode, {
  ErrorCorrectionLevel,
} from "@/app/_components/generate-qr-code";
import QrSvg from "@/app/_components/render-qr-code";
import React from "react";

export default function QrZone() {
  const [text, setText] = React.useState("Truchet tiling");
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    React.useState<ErrorCorrectionLevel>("L");
  return (
    <>
      <div>
        {text ? (
          <QrSvg qr={generateQRCode(text, errorCorrectionLevel)} />
        ) : (
          <p>No text entered</p>
        )}
      </div>
      <input
        value={text} // ...force the input's value to match the state variable...
        onChange={(e) => setText(e.target.value)}
      />
      <select
        value={errorCorrectionLevel}
        onChange={(e) =>
          setErrorCorrectionLevel(e.target.value as ErrorCorrectionLevel)
        }
      >
        <option value="L">Level L (Low)</option>
        <option value="M">Level M (Medium)</option>
        <option value="Q">Level Q (Quartile)</option>
        <option value="H">Level H (High)</option>
      </select>
    </>
  );
}
