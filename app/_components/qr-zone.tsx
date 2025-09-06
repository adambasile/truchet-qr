"use client";

import generateQRCode, {
  ErrorCorrectionLevel,
} from "@/app/_components/generate-qr-code";
import QrSvg, { QrKind } from "@/app/_components/render-qr-code";
import React, { useDeferredValue } from "react";

export default function QrZone() {
  const [text, setText] = React.useState("Truchet tiling");
  const deferredText = useDeferredValue(text);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    React.useState<ErrorCorrectionLevel>("L");
  const [qrKind, setQrKind] = React.useState<QrKind>("truchet");
  return (
    <>
      <div style={{ height: 500, width: 500 }}>
        {deferredText ? (
          <QrSvg
            qr={generateQRCode(deferredText, errorCorrectionLevel)}
            kind={qrKind}
          />
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
      <select
        value={qrKind}
        onChange={(e) => setQrKind(e.target.value as QrKind)}
      >
        <option value={"full-truchet"}>Full truchet</option>
        <option value={"truchet"}>Truchet</option>
        <option value={"plain"}>Plain</option>
      </select>
    </>
  );
}
