// Layout.jsx
import React from "react";
import SlideNav from "../components/dashboard/SlideNav/SlideNav";

export default function LayoutSlideNav({ children }) {
  return (
    <div style={{ display: "flex" }}>
      {/* SlideNav stays on left */}
      <SlideNav />

      {/* Main page content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}