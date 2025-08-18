import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import "./Slidebar.css"; // make sure to import this

import {
    HouseDoor,
    FileText,
    People,
    InfoCircle,
    Wrench,
    List
} from "react-bootstrap-icons";

function Sidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {title: "Dashboard", icon: <HouseDoor/>, path: "/"},
        {title: "Notice", icon: <FileText/>, path: "/notice"},
        {title: "Housing", icon: <People/>, path: "/housing"},
        {title: "About", icon: <InfoCircle/>, path: "/about"},
        {title: "Service", icon: <Wrench/>, path: "/service"},
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
