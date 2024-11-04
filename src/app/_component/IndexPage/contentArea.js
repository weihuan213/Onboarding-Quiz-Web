import React from "react";

export default function ContentArea({ children, style }) {
  return (
    <div style={{ padding: "0 24px", minHeight: 280, ...style }}>
      {children}
    </div>
  );
}
