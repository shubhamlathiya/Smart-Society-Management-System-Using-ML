import React, {useEffect, useState} from "react";
import CardView from "../../components/CardVIew/cardView";
import PageHeader from "../../layout/PageHeader";
import InfoCard from "../../components/CardVIew/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import IncomeBy from "../../components/dashboard/IncomeBy";
import Top5Owners from "../../components/dashboard/Top5Owners";
import AddHousingBlockForm from "../../components/Forms/HousingBlock/addHousingBlockForm";
import {housingApi} from "../../services/api";
import Table from "../../components/TableView/Table";
import {unitTypes} from "../../utils/constants/appConstants";
import ComplaintForm from "../../components/Forms/ComplaintForm";
import IncomeReport from "./IncomeReport";
import StatsCard from "../../components/CardVIew/StatsCard";

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

    const [housingData, setHousingData] = useState([]);
    const housingColumns = [
        {header: 'ID', accessor: 'id'},
        {header: 'Block Number', accessor: 'block_number'},
        {header: 'Flat No', accessor: 'unit_number'},
        {header: 'Type', accessor: 'type', type: 'select', options: unitTypes},]

    const HousingFetchData = async () => {
        try {
            const result = await housingApi.getHousing();
            setHousingData(result); // Make sure to use result.data if your API wraps the response
        } catch (error) {
            console.error('Error fetching housing data:', error);
        }
    };


    useEffect(() => {
        HousingFetchData();
    }, []);

    // const handleSave = () => {
    //     console.log("Saving changes...");
    // };

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
                    <CardView title="Home" description="Home" click="/home"/>
                </div>
                <div className="col-2">
                    <CardView title="About" description="About" click="/about"/>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <RecentTransactions
                        title="Recent Transactions"
                        periodOptions={["Weekly", "Monthly", "Yearly"]}
                        transactions={transactions}/>
                </div>
                <div className="col-4">
                    <IncomeBy/>
                </div>
                <div className="col-4">
                    <Top5Owners/>
                </div>

                <div className="col-8">
                    <AddHousingBlockForm/>
                </div>
                <div className="col-12 mt-4">
                    <Table data={housingData} columns={housingColumns}/>
                </div>
                <div className="col-12 mt-4">
                    <ComplaintForm/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">

                    <StatsCard
                        title="Active Users"
                        value="1,248"
                        icon="ti-users"
                        trendText = " from last month"
                        trendPercentage={-2.3}
                        trendPositive={false}
                    />
                </div>
                <div className="col-3">
                    <StatsCard
                        title="Total Income"
                        value="$125,150"
                        icon="arrow-up-right-circle"
                        trendPercentage={2.3}
                        trendText=" from last month"
                        trendPositive={true}
                    />
                </div>
            </div>


            <IncomeReport/>

        </div>
    </>)
}

export default AdminDashboard;