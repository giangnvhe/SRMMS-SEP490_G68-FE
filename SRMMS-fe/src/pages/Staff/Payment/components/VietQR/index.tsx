import { useEffect, useState } from "react";

interface VietQRProps {
  qrUrl: string;
}

const VietQR = ({ qrUrl }: VietQRProps) => {
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    setQrData(qrUrl);
  }, [qrUrl]);

  return (
    <div className="flex justify-center">
      {qrData ? (
        <img src={qrData} alt="QR Code" style={{ maxWidth: "256px" }} />
      ) : (
        <p>Đang tạo QR...</p>
      )}
    </div>
  );
};

export default VietQR;
