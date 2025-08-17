import React, {useEffect, useState} from "react";
import HousingTable from "../../components/TableView/HousingTable";
import {housingApi} from "../../services/api";
import {unitTypes} from "../../utils/constants/appConstants";
import AddHousingBlockForm from "../../components/Forms/HousingBlock/addHousingBlockForm";
import PageHeader from "../../layout/PageHeader";
import Sidebar from "../../components/dashboard/Slidebar";

function HousingView() {

    const [housingData, setHousingData] = useState([]);

    useEffect(() => {
        async function fetchHousingData() {
            try {
                const response = await housingApi.getHousing();
                console.log(response)// assuming this returns axios response
                setHousingData(response); // set the data for the table
            } catch (error) {
                console.error("Error fetching housing data:", error);
            }
        }

        fetchHousingData().then();
    }, []);

    const housingColumns = [
        {header: "ID", accessor: "id"},
        {header: "Block Name", accessor: "block_number"},
        {header: "Unit No", accessor: "unit_number"},
        {header: "Type", accessor: "type", type: "select", options: unitTypes},
    ]
    return (
        <div className="d-flex">
            <Sidebar/>
            <div className="container">
                <PageHeader PageTitle={"Housing"}/>
                <div className="row">
                    <div className="col-12">
                        <AddHousingBlockForm/>
                    </div>
                    <div className="col-12 mt-3">
                        <HousingTable data={housingData} columns={housingColumns}/>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default HousingView;