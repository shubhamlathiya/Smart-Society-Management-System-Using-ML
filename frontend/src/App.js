// import logo from './logo.svg';
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/error/NotFoundPage";
// import PATHS from "./utils/constants/Path";
// import CardView from "./components/CardVIew/cardView";
// import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import Table from "./components/Table";
// import ComplaintForm from "./components/Forms/ComplaintForm";
import NoticeView from "./pages/admin/NoticeView";
import PATHS from "./utils/constants/Path";
import AboutView from "./pages/admin/About/AboutView";

import HousingView from "./pages/admin/HousingView";
import {useEffect, useState} from "react";
import Aos from "aos";
import LayoutSlideNav from "./layout/LayoutSlideNav";
import AddFacility from "./pages/admin/AddFacility";
import FaceDetection from "./pages/admin/FaceDetection";
import Login from "./pages/auth/Login";
import ResidenceDashboard from "./pages/residence/ResidenceDashboard";
import FacilityResidence from "./pages/residence/FacilityResidence";
import PreRegister from "./pages/residence/PreRegister";
import AddComplaint from "./pages/residence/AddComplaints";
import Service from "./pages/admin/Service";
import ViewComplaints from "./pages/admin/ComplaintView";
import ComplaintCharts from "./components/Complaints/ComplaintsChart";
import StaffManagementPage from "./pages/admin/StaffManagementPage";
import HousingMemberManagement from "./pages/admin/HousingMemberManagement";
import HousingBlockPage from "./pages/admin/BlockPage";
import UtilityUsageView from "./pages/admin/UtilityUsageView";

function App() {
    const [role, setRole] = useState(null); // 'admin' or 'resident'

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);

    // const complaintData = [{
    //     id: 1,
    //     category: 'Plumbing',
    //     description: 'Leaking tap in kitchen',
    // }, {id: 2, category: 'Security', description: 'Main gate camera not working'}]
    //
    // const columns = [{header: 'ID', accessor: 'id'}, {header: 'Category', accessor: 'category'}, {
    //     header: 'Description',
    //     accessor: 'description'
    // }, {header: 'Actions', accessor: 'actions'}]
    // //
    const show404 = false;
    return (
        <div className="App">


            <Router>

                {show404 ? (
                    <Router>
                        <Routes>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </Router>
                ) : !role ? (
                    <Login onSelectRole={handleRoleSelect}/>
                ) : role === "admin" ?

                    (
                        <Routes>
                            <Route path='/' element={<LayoutSlideNav role={role}><AdminDashboard/></LayoutSlideNav>}/>
                            <Route path={PATHS.BLOCK}
                                   element={<LayoutSlideNav role={role}><HousingBlockPage/></LayoutSlideNav>}/>
                            <Route path={PATHS.HOUSING}
                                   element={<LayoutSlideNav role={role}><HousingView/></LayoutSlideNav>}/>
                            <Route path={PATHS.ADDFACILITY}
                                   element={<LayoutSlideNav role={role}><AddFacility/></LayoutSlideNav>}/>
                            <Route path={PATHS.STAFF}
                                   element={<LayoutSlideNav role={role}><StaffManagementPage/></LayoutSlideNav>}/>
                            <Route path={PATHS.HOUSING_MEMBERS}
                                   element={<LayoutSlideNav role={role}><HousingMemberManagement/></LayoutSlideNav>}/>

                            <Route path={PATHS.NOTICE}
                                   element={<LayoutSlideNav role={role}><NoticeView/></LayoutSlideNav>}/>
                            <Route path={PATHS.UTILITYUSAGE}
                                   element={<LayoutSlideNav role={role}><UtilityUsageView/></LayoutSlideNav>}/>
                            <Route path={PATHS.SERVICE}
                                   element={<LayoutSlideNav role={role}><Service/></LayoutSlideNav>}/>
                            <Route path={PATHS.ABOUT}
                                   element={<LayoutSlideNav role={role}><AboutView/></LayoutSlideNav>}/>
                            <Route path={PATHS.FACED}
                                   element={<LayoutSlideNav role={role}><FaceDetection/></LayoutSlideNav>}/>
                            <Route path={PATHS.VIEWCOMPLAINT}
                                   element={<LayoutSlideNav role={role}><ViewComplaints/></LayoutSlideNav>}/>
                            <Route path={PATHS.COMPLAINTCHART}
                                   element={<LayoutSlideNav role={role}><ComplaintCharts/></LayoutSlideNav>}/>

                        </Routes>
                    ) : (
                        <Routes>
                            <Route path='/'
                                   element={<LayoutSlideNav role={role}><ResidenceDashboard/></LayoutSlideNav>}/>
                            <Route path={PATHS.FACILITY}
                                   element={<LayoutSlideNav role={role}><FacilityResidence/></LayoutSlideNav>}/>
                            <Route path={PATHS.PREREGISTER}
                                   element={<LayoutSlideNav role={role}><PreRegister/></LayoutSlideNav>}/>
                            <Route path={PATHS.COMPLAINT}
                                   element={<LayoutSlideNav role={role}><AddComplaint/></LayoutSlideNav>}/>
                        </Routes>
                    )}
            </Router>
            {/*// <ComplaintForm/>*/}
            {/*//   <HousingTable columns={columns} data={complaintData}/>*/}
            {/*//   <HousingTable/>*/}
            {/*//    <AdminDashboard/>*/}
            {/*//   <Login/>*/}
            {/*// <NoticeView />*/}
            {/*//   <CardView click="shubham" title="Shubham" description="Shubham"/>*/}
            {/*//   <CardView click="shubham 123" title="Shubham 123" description="Shubham 123"/>*/}


        </div>
    );

}

export default App;
