import React from "react";
import CardView from "../../components/CardVIew/cardView";

function AdminDashboard() {
    return (
        <>
            <div className="container">
                <div className="row m-10 p-5">
                    <CardView  title="Dashboard 123"  description="Dashboard" click="/dashboard"/>
                    {/*<CardView  title="service" description="Service" click="/service"/>*/}
                    {/*<CardView  title="Home" description="Home" click="/home"/>*/}
                    {/*<CardView  title="About" description="About" click="/about"/>*/}
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;