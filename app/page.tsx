import { Metadata } from "next";
import React from "react";
import QrZone from "@/app/_components/qr-zone";

export const metadata: Metadata = {
  title: "Truchet Tiled QR code generator",
};

export default function Home() {
  return (
    <main>
      <h1>Truchet tiled QR code generator</h1>
      <QrZone />
    </main>
  );
}
