import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {endOfDay, format, isWithinInterval, parse, startOfDay} from "date-fns";
import {DateRangePicker} from "react-date-range";
import {enUS} from "date-fns/locale";
import colors from "../../utils/constants/color";
import NoticeForm from "../../components/Forms/NoticeForm";

function NoticeView() {
    const today = new Date();


    const [showPicker, setShowPicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: startOfDay(today),
            endDate: endOfDay(today),
            key: "selection"
        }
    ]);

    const [notices] = useState([
        {
            date: "13 Aug 2025",
            name: "Ansh",
            phone: "+91 98765 43210",
            blockNo: "A-704",
            category: "A",
            description: "Today I have party, please come"
        },
        {
            date: "12 Aug 2025",
            name: "Rohit",
            phone: "+91 91234 56789",
            blockNo: "B-203",
            category: "B",
            description: "Water supply will be off tomorrow"
        },
        {
            date: "09 Sep 2025",
            name: "Neha",
            phone: "+91 99887 77665",
            blockNo: "C-501",
            category: "Maintenance",
            description: "Lift not working, please fix"
        },
        {
            date: "14 Aug 2025",
            name: "Ansh",
            phone: "+91 98765 43210",
            blockNo: "A-704",
            category: "A",
            description: "Today I have party, please come"
        },
        {
            date: "12 Aug 2025",
            name: "Rohit",
            phone: "+91 91234 56789",
            blockNo: "B-203",
            category: "B",
            description: "Water supply will be off tomorrow"
        },
        {
            date: "13 Aug 2025",
            name: "Neha",
            phone: "+91 99887 77665",
            blockNo: "C-501",
            category: "Maintenance",
            description: "Lift not working, please fix"
        },
        {
            date: "12 Aug 2025",
            name: "Rohit",
            phone: "+91 91234 56789",
            blockNo: "B-203",
            category: "B",
            description: "Water supply will be off tomorrow"
        },
        {
            date: "09 Sep 2025",
            name: "Neha",
            phone: "+91 99887 77665",
            blockNo: "C-501",
            category: "Maintenance",
            description: "Lift not working, please fix"
        },
        {
            date: "14 Aug 2025",
            name: "Ansh",
            phone: "+91 98765 43210",
            blockNo: "A-704",
            category: "A",
            description: "Today I have party, please come"
        },
        {
            date: "12 Aug 2025",
            name: "Rohit",
            phone: "+91 91234 56789",
            blockNo: "B-203",
            category: "B",
            description: "Water supply will be off tomorrow"
        },
        {
            date: "13 Aug 2025",
            name: "Neha",
            phone: "+91 99887 77665",
            blockNo: "C-501",
            category: "Maintenance",
            description: "Lift not working, please fix"
        }
    ]);

    // Filter notices based on date range
    const filteredNotices = notices.filter((n) => {
        const noticeDate = parse(n.date, "dd MMM yyyy", new Date());
        return isWithinInterval(noticeDate, {
            start: dateRange[0].startDate,
            end: dateRange[0].endDate
        });
    });

    return (

         <div className="container mt-4" style={{
                position: "relative",
                paddingBottom: 30
            }}>
                <h4 className="mb-3">Notices</h4>

                {/* Search + Date filter */}
                <div className="d-flex gap-2 mb-3">
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search"
                    />
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowPicker(!showPicker)}>
                        {format(dateRange[0].startDate, "dd MMM yyyy")} -{" "}
                        {format(dateRange[0].endDate, "dd MMM yyyy")}
                    </button>
                </div>

                {/* Date Picker */}
                {showPicker && (
                    <div style={{position: "absolute", zIndex: 100, top: "90px"}}>
                        <DateRangePicker
                            locale={enUS} // ✅ FIXES localize error
                            onChange={(item) => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                        />
                        <div className="mt-2 text-end">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => setShowPicker(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowPicker(false)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}

                {/* HousingTable */}
                <div className="table-responsive"
                     style={{borderRadius: 5, backgroundColor: colors.light, border: "solid", borderWidth: 1}}>
                    <table className="table table-hover align-middle">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Block No</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredNotices.length > 0 ? (
                            filteredNotices.map((notice, index) => (
                                <tr key={index}>
                                    <td>{notice.date}</td>
                                    <td>
                                        <div><b>{notice.name}</b></div>
                                        <small className="text-muted">{notice.phone}</small>
                                    </td>
                                    <td>{notice.blockNo}</td>
                                    <td>{notice.category}</td>
                                    <td>{notice.description}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No notices found for selected date range
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <NoticeForm />
                </div>
            </div>
    );
}


export default NoticeView;
