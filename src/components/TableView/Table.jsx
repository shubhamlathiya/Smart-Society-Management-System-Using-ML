import React, {useState} from "react";
import EditHousingBlockForm from "../Forms/HousingBlock/editHousingBlockForm";


function Table({columns = [], data = [], onUpdate}) {
    const [selectedRow, setSelectedRow] = useState(null);

    function onEdit(row) {
        setSelectedRow(row);

    }

    function onDelete(index) {
        console.log("Delete:", index);
    }

    function handleSave() {
        console.log("Saving changes:", selectedRow);
        onUpdate(selectedRow);
    }

    function handleChange(e) {
        setSelectedRow({
            ...selectedRow, [e.target.name]: e.target.value
        });
    }

    return (<>
            <div className="table-responsive bg-white rounded shadow p-3">
                <table className="table table-striped table-hover align-middle">    
                    <thead className="table-light">
                    <tr>
                        {columns.map((col, idx) => (<th key={idx} className="text-uppercase small fw-bold">
                                {col.header}
                            </th>))}
                        <th className="text-uppercase small fw-bold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length === 0 && (<tr>
                            <td colSpan={columns.length + 1} className="text-center text-muted">
                                No records found
                            </td>
                        </tr>)}
                    {data.map((row, rIdx) => (<tr key={rIdx}>
                            {columns.map((col, cIdx) => (<td key={cIdx}>{row[col.accessor]}</td>))}
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editHousingBlockModal"
                                    onClick={() => onEdit(row)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(row.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>

            {/* Bootstrap Modal for Editing */}
            <EditHousingBlockForm
                modalId="editHousingBlockModal"
                handleSave={handleSave}
            >
                {selectedRow && (<form>
                        {columns.map((col, idx) => (<div className="mb-3" key={idx}>
                                <label className="form-label">{col.header}</label>

                                {col.type === "select" ? (<select
                                        className="form-select"
                                        name={col.accessor}
                                        value={selectedRow[col.accessor] || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select {col.header}</option>
                                        {col.options.map((opt, optIdx) => (<option key={optIdx} value={opt}>
                                                {opt}
                                            </option>))}
                                    </select>) : (<input
                                        type="text"
                                        className="form-control"
                                        name={col.accessor}
                                        value={selectedRow[col.accessor] || ""}
                                        onChange={handleChange}
                                    />)}
                            </div>))}
                    </form>)}
            </EditHousingBlockForm>

        </>);
}

export default Table;
