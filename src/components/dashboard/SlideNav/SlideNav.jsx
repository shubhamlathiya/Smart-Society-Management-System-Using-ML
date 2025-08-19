import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SlideNav.css"; // your custom CSS

import {
  HouseDoor,
  FileText,
  People,
  Activity,
  InfoCircle,
  Wrench,
  List,
} from "react-bootstrap-icons"; 
import PATHS from "../../utils/constants/Path";

function SlideNav() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("SlideNav-collapsed")) || false
  );

  useEffect(() => {
    localStorage.setItem("SlideNav-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const menuItems = [
    { title: "Dashboard", icon: <HouseDoor />, path: "/" },
    { title: "Notice", icon: <FileText />, path: PATHS.NOTICE },
    { title: "Housing", icon: <People />, path: PATHS.HOUSING },
    { title: "Amenities", icon: <Activity />, path: PATHS.FACILITY },
    { title: "Service", icon: <Wrench />, path: PATHS.SERVICE },
    { title: "About", icon: <InfoCircle />, path: PATHS.ABOUT },
  ];

  return (
    <div
      className={`SlideNav ${collapsed ? "collapsed" : ""}`}
    >
      {/* Toggle Button */}
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        <List />
      </button>

      {/* Menu */}
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path} className="menu-item">
            <Link
              to={item.path}
              className={`menu-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="text">{item.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SlideNav;
