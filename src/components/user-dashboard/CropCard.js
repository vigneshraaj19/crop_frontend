import React from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

export default function App() {
    const { user } = useSelector((state) => state.auth);

  return (
    <div className="col-xxl-12">
      <QRCode value={user?.email}size="250" />
    </div>
    
  );
}
