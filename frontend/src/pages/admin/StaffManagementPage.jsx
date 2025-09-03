import React, { useState } from "react";
import StaffForm from "../../components/Forms/StaffForm";

function StaffManagementPage() {
    const [staffMembers, setStaffMembers] = useState([]);

    const handleAddStaff = (staffData) => {
        // Here you would typically send the data to your backend API
        console.log("New staff member:", staffData);

        // For demonstration, we'll add it to local state
        setStaffMembers([...staffMembers, staffData]);
    };

    return (
        <div>
            <StaffForm onAddStaff={handleAddStaff} />

            {/* Display existing staff members */}
            <div className="container mt-4">
                <h3>Staff Members</h3>
                {staffMembers.length === 0 ? (
                    <p className="text-muted">No staff members added yet</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {staffMembers.map((staff, index) => (
                                <tr key={index}>
                                    <td>{staff.staff_id}</td>
                                    <td>{staff.name}</td>
                                    <td>{staff.department}</td>
                                    <td>{staff.position}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.phone}</td>
                                    <td>
                                            <span className={`badge ${staff.status === 'active' ? 'bg-success' :
                                                staff.status === 'inactive' ? 'bg-secondary' :
                                                    staff.status === 'on_leave' ? 'bg-warning' : 'bg-danger'}`}>
                                                {staff.status}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StaffManagementPage;