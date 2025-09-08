import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO, isWithinInterval } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { enUS } from "date-fns/locale";
import { startOfDay, endOfDay } from "date-fns";
import NoticeForm from "../../components/Forms/NoticeForm";
import {noticeApi} from "../../services/api";

function NoticeView() {
    const today = new Date();
    const [notices, setNotices] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState([
        { startDate: startOfDay(today), endDate: endOfDay(today), key: "selection" }
    ]);

    // Fetch notices on load
    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const data = await noticeApi.getNotices();
            setNotices(data);
        } catch (err) {
            console.error("Failed to fetch notices:", err);
        }
    };

    // Filter notices by date & search
    const filteredNotices = notices.filter((n) => {
        const noticeDate = parseISO(n.issue_date);
        const inRange = isWithinInterval(noticeDate, {
            start: dateRange[0].startDate,
            end: dateRange[0].endDate
        });
        const matchSearch =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.body.toLowerCase().includes(search.toLowerCase());
        return inRange && matchSearch;
    });

    const handleAddNotice = async (noticeData) => {
        try {
            console.log(noticeData);
            await noticeApi.addNotice(noticeData);
            fetchNotices();
        } catch (err) {
            console.error("Failed to add notice:", err);
        }
    };

    return (
        <div className="container mt-4 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4> Notices</h4>
                <button
                    className="btn btn-success"
                    onClick={() => document.getElementById("noticeForm").scrollIntoView({ behavior: "smooth" })}
                >
                    + New Notice
                </button>
            </div>

            {/* Search + Date filter */}
            <div className="d-flex gap-2 mb-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="🔍 Search notices"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowPicker(!showPicker)}
                >
                    {format(dateRange[0].startDate, "dd MMM yyyy")} -{" "}
                    {format(dateRange[0].endDate, "dd MMM yyyy")}
                </button>
            </div>

            {showPicker && (
                <div className="mb-3" style={{ position: "absolute", zIndex: 100 }}>
                    <DateRangePicker
                        locale={enUS}
                        onChange={(item) => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />
                </div>
            )}

            {/* Notice Table */}
            <div className="table-responsive shadow rounded bg-white">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Audience</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredNotices.length > 0 ? (
                        filteredNotices.map((notice) => (
                            <tr key={notice.notice_id}>
                                <td>{format(parseISO(notice.issue_date), "dd MMM yyyy")}</td>
                                <td><b>{notice.title}</b></td>
                                <td>{notice.category}</td>
                                <td>{notice.target_audience}</td>
                                <td>{notice.body}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No notices found for this range
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Notice Form */}
            <div id="noticeForm" className="mt-4">
                <NoticeForm onAddNotice={handleAddNotice} />
            </div>
        </div>
    );
}

export default NoticeView;
