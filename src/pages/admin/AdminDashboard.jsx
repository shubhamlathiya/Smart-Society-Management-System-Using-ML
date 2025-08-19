import CardView from "../../components/CardVIew/cardView";
import PageHeader from "../../layout/PageHeader";
import InfoCard from "../../components/CardVIew/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import PATHS from "../../utils/constants/Path";
import Sidebar from "../../components/dashboard/Slidebar";

function AdminDashboard() {
    const transactions = [
        {
            icon: "assets/img/icons/stripe.svg",
            title: "General Check-up",
            invoice: "#INV5889",
            amount: "+ $234",
        },
        {
            icon: "assets/img/icons/paypal.svg",
            title: "Online Consultation",
            invoice: "#INV7874",
            amount: "+ $234",
        },
    ];

    return (
        <div className="d-flex">

            <Sidebar/>
            <div className="container-fluid p-4 bg-light">
                {/* Page Title */}
                <PageHeader PageTitle={"Admin Dashboard"}/>

                {/* Top Stats */}
                <div className="row g-4 mt-2">
                    <div className="col-md-3 col-6">
                        <InfoCard
                            title="Residents"
                            count={245}
                            change="+12%"
                            changeColor="success"
                            icon="bi-people"
                            period="in last 7 days"
                        />
                    </div>
                    <div className="col-md-3 col-6">
                        <InfoCard
                            title="Complaints"
                            count={68}
                            change="-5%"
                            changeColor="danger"
                            icon="bi-exclamation-circle"
                            period="this week"
                        />
                    </div>
                    <div className="col-md-3 col-6">
                        <InfoCard
                            title="Visitors"
                            count={134}
                            change="+20%"
                            changeColor="success"
                            icon="bi-person-badge"
                            period="today"
                        />
                    </div>
                    <div className="col-md-3 col-6">
                        <InfoCard
                            title="Payments"
                            count={"₹56,000"}
                            change="+10%"
                            changeColor="success"
                            icon="bi-currency-rupee"
                            period="this month"
                        />
                    </div>
                </div>

                {/* Quick Access Cards */}
                <div className="row g-4 mt-4">
                    <div className="col-6 col-md-2">
                        <CardView title="Dashboard" description="Overview" click="/dashboard"/>
                    </div>
                    <div className="col-6 col-md-2">
                        <CardView title="Service" description="Requests" click="/service"/>
                    </div>
                    <div className="col-6 col-md-2">
                        <CardView title="Housing" description="Houses" click={PATHS.HOUSING}/>
                    </div>
                    <div className="col-6 col-md-2">
                        <CardView title="Notice" description="Notices" click={PATHS.NOTICE}/>
                    </div>
                    <div className="col-6 col-md-2">
                        <CardView title=" Add Eminities" description="Eminities" click={PATHS.FACILITY}/>
                    </div>
                    <div className="col-6 col-md-2">
                        <CardView title="About" description="About Us" click="/about"/>
                    </div>
                </div>

                {/* Transactions Section */}
                <div className="row mt-5">
                    <div className="col-lg-8">
                        <RecentTransactions
                            title="Recent Transactions"
                            periodOptions={["Weekly", "Monthly", "Yearly"]}
                            transactions={transactions}
                        />
                    </div>

                    {/* Example chart placeholder */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-header bg-white fw-bold">
                                Usage Overview
                            </div>
                            <div className="card-body text-center">
                                <img
                                    src="/chart-placeholder.png"
                                    alt="Chart"
                                    className="img-fluid"
                                />
                                <p className="text-muted mt-2">Water & Electricity Usage</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
