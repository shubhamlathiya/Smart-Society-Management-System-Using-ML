import CardView from "../../components/CardVIew/cardView";

function AdminDashboard() {

    // to navigATE other page without route

//     const [showNotice, setShowNotice] = useState(false);

//      if (showNotice) {
//     return <NoticeView />;
//   }

    return (
        <>
            <div className="container">
                <div className="row m-10 p-5">
                    <CardView  title="Dashboard"  description="Dashboard" click="/dashboard"/>
                    <CardView  title="service" description="Service" click="/service"/>
                    {/* <CardView  title="Notice" description="Home" click={() => setShowNotice(true)}/> */}
                    <CardView  title="Notice" description="Home" click="/notice"/>
                    <CardView  title="About" description="About" click="/about"/>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;