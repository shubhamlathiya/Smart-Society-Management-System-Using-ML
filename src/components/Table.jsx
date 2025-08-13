import React from "react";

function Table({columns = [], data = []}) {


    function onEdit(index) {
        console.log(index)
    }

    function onDelete(index) {
        console.log(index)
    }

    return (<>
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {columns.map((col, idx) => (<th
                        key={idx}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {col.header}
                    </th>))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 && (<tr>
                    <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                        No records found
                    </td>
                </tr>)}
                {data.map((row, rIdx) => (<tr key={rIdx}>
                    {columns.map((col, cIdx) => (<td
                        key={cIdx}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                        {row[col.accessor]}
                    </td>))}
                    <td>
                        <button onClick={() => onEdit(row.id)}>Edit</button>
                        <button onClick={() => onDelete(row.id)}>Deleted</button>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </div>
    </>)
}


export default Table;