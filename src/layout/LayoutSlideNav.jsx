// Layout.jsx
import React from "react";
import SlideNav from "../components/dashboard/SlideNav/SlideNav";

export default function LayoutSlideNav({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}> {/* Full screen height */}
     
        <SlideNav />

      {/* Main page content */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}
