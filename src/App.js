// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/error/NotFoundPage";
// import PATHS from "./utils/constants/Path";
// import CardView from "./components/CardVIew/cardView";
// import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import Table from "./components/Table";
// import ComplaintForm from "./components/Forms/ComplaintForm";
import NoticeView from "./pages/admin/NoticeView";
import PATHS from "./utils/constants/Path";

function App() {
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
      {show404 ? (
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      ) : (

          <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path={PATHS.NOTICE} element={<NoticeView />} />
      </Routes>
    </Router>
        // <ComplaintForm/>
        //   <Table columns={columns} data={complaintData}/>
        //   <Table/>
        //    <AdminDashboard/>
        //   <Login/>
        // <NoticeView />
        //   <CardView click="shubham" title="Shubham" description="Shubham"/>
        //   <CardView click="shubham 123" title="Shubham 123" description="Shubham 123"/>
      )}
    </div>
  );
}

export default App;
