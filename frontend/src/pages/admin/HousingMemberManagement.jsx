import React, { useState } from "react";
import HousingMemberForm from "../../components/Forms/HousingMemberForm";


function HousingMemberManagement() {
    const [members, setMembers] = useState([]);

    const handleAddMember = (memberData) => {
        // Here you would typically send the data to your backend API
        console.log("New member:", memberData);

        // For demonstration, we'll add it to local state
        setMembers([...members, memberData]);
    };

    return (
        <div>
            <HousingMemberForm onAddMember={handleAddMember} />

            {/* Display existing members */}
            <div className="container mt-4">
                <h3>Housing Members</h3>
                {members.length === 0 ? (
                    <p className="text-muted">No members added yet</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                            <tr>
                                <th>Member ID</th>
                                <th>Name</th>
                                <th>House</th>
                                <th>Relationship</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Primary</th>
                            </tr>
                            </thead>
                            <tbody>
                            {members.map((member, index) => (
                                <tr key={index}>
                                    <td>{member.member_id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.house_details ? `Block ${member.house_details.block}, Unit ${member.house_details.number}` : member.house_id}</td>
                                    <td>{member.relationship}</td>
                                    <td>{member.phone || "N/A"}</td>
                                    <td>
                                            <span className={`badge ${member.status === 'active' ? 'bg-success' :
                                                member.status === 'inactive' ? 'bg-secondary' :
                                                    member.status === 'moved_out' ? 'bg-warning' : 'bg-danger'}`}>
                                                {member.status}
                                            </span>
                                    </td>
                                    <td>
                                        {member.is_primary ? (
                                            <i className="bi bi-check-circle-fill text-success"></i>
                                        ) : (
                                            <i className="bi bi-x-circle-fill text-secondary"></i>
                                        )}
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

export default HousingMemberManagement;