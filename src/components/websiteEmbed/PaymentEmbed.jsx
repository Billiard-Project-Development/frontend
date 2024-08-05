import React from "react";
import "./EmbeddedWebsite.css";

const PaymentPopup = () => {
  return (
    <div className="iframe-container">
      <iframe
        src="https://example.com"
        title="Embedded Website"
        style={{ width: "100%", height: "100vh", border: "none" }}
      ></iframe>
    </div>
  );
};

export default PaymentPopup;
