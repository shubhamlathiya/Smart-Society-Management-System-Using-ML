import logo from './logo.svg';
import './App.css';
import CardView from "./components/CardVIew/cardView";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Table from "./components/Table";
import ComplaintForm from "./components/Forms/ComplaintForm";

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

    return (<div className="App">
        {/*<ComplaintForm/>*/}
        {/*<Table columns={columns} data={complaintData}/>*/}
        {/*<Table/>*/}
        {/*<AdminDashboard/>*/}
        {/*<Login/>*/}
        {/*<CardView click="shubham" title="Shubham" description="Shubham"/>*/}
        {/*<CardView click="shubham 123" title="Shubham 123" description="Shubham 123"/>*/}
    </div>);
}

export default App;
