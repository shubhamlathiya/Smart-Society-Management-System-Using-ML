import CardView from "../../components/CardVIew/cardView";
import PageHeader from "../../layout/PageHeader";
import InfoCard from "../../components/CardVIew/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import PATHS from "../../utils/constants/Path";

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
    ]


    return (<>
        <div className="container">
            <PageHeader PageTitle={"Admin Dashboard"}/>
            <div className="row">
                <div className="col-3">
                    <InfoCard
                        title="Doctors 123"
                        count={247}
                        change="+95%"
                        changeColor="success"
                        icon="bi-calendar-heart"
                        period="in last 7 days"
                    />
                </div>
                <div className="col-3">
                    <InfoCard
                        title="Doctors 123"
                        count={247}
                        change="+95%"
                        changeColor="success"
                        icon="bi-calendar-heart"
                        period="in last 7 days"
                    />
                </div>

                <div className="col-3">
                    <InfoCard
                        title="Doctors 123"
                        count={247}
                        change="+95%"
                        changeColor="success"
                        icon="bi-calendar-heart"
                        period="in last 7 days"
                    />
                </div>

                <div className="col-3">
                    <InfoCard
                        title="Doctors 123"
                        count={247}
                        change="+95%"
                        changeColor="success"
                        icon="bi-calendar-heart"
                        period="in last 7 days"
                    />
                </div>

            </div>

            <div className="row mt-4 mb-4">
                <div className="col-2">
                    <CardView title="Dashboard 123" description="Dashboard" click="/dashboard"/>
                </div>
                <div className="col-2">
                    <CardView title="service" description="Service" click="/service"/>
                </div>
                <div className="col-2">
                    <CardView title="Notice" description="Home" click={PATHS.NOTICE}/>
                </div>
                <div className="col-2">
                    <CardView title="About" description="About" click="/about"/>
                </div>
            </div>

            <RecentTransactions
                title="Recent Transactions"
                periodOptions={["Weekly", "Monthly", "Yearly"]}
                transactions={transactions}
            />

        </div>
    </>)
}

export default AdminDashboard;