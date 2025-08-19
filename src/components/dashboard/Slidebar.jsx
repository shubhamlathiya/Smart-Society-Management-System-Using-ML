import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Slidebar.css"; // make sure to import this

import {
    HouseDoor,
    FileText,
    People,
    InfoCircle,
    Wrench,
    List
} from "react-bootstrap-icons";
import PATHS from "../../utils/constants/Path";

function Sidebar() {
    const location = useLocation();
    // const [collapsed, setCollapsed] = useState(false);

    // Use local storage to use sidebar collapsed state between page refreshes
    const [collapsed, setCollapsed] = useState(
      () => JSON.parse(localStorage.getItem("sidebar-collapsed")) || false
    ); 


    useEffect(() => {
        localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
     }, [collapsed]);

    const menuItems = [
        {title: "Dashboard", icon: <HouseDoor/>, path: "/"},
        {title: "Notice", icon: <FileText/>, path: PATHS.NOTICE},
        {title: "Housing", icon: <People/>, path: PATHS.HOUSING},
        {title: "Eminities", icon: <People/>, path: PATHS.FACILITY},
        {title: "Service", icon: <Wrench/>, path: PATHS.SERVICE},  
        {title: "About", icon: <InfoCircle/>, path: PATHS.ABOUT},
    ];

    return (
        <div
            className={`d-flex flex-column vh-100 p-3 sidebar ${
                collapsed ? "collapsed" : ""
            }`}
            style={{
                width: collapsed ? "70px" : "220px",
                transition: "0.3s",
                backgroundColor: "white",
                borderRight: "1px solid #ddd"
            }}
        >
            {/* Toggle Button */}
            <button
                className="btn btn-sm btn-outline-dark mb-3 align-self-end"
                onClick={() => setCollapsed(!collapsed)}
            >
                <List/>
            </button>

            {/* Menu */}
            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item) => (
                    <li key={item.path} className="nav-item">
                        <Link
                            to={item.path}
                            className={`nav-link d-flex align-items-center gap-2 sidebar-link ${
                                location.pathname === item.path ? "active" : ""
                            }`}
                        >
                            <span>{item.icon}</span>
                            {!collapsed && <span>{item.title}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
