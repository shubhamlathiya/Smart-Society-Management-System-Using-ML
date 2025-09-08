// src/pages/HousingMemberManagement.jsx
import React, {useEffect, useState} from "react";
import HousingMemberForm from "../../components/Forms/HousingMemberForm";
import {memberApi} from "../../services/api";
import HousingMemberTable from "../../components/TableView/HousingMemberTable";


function HousingMemberManagement() {
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        try {
            const data = await memberApi.getMembers();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleAddMember = async (memberData) => {
        try {
            await memberApi.addMember(memberData);
            fetchMembers();
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    const handleUpdateMember = async (id, memberData) => {
        try {
            await memberApi.updateMember(id, memberData);
            fetchMembers();
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    const handleDeleteMember = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                await memberApi.deleteMember(id);
                fetchMembers();
            } catch (error) {
                console.error("Error deleting member:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Housing Member Management</h2>
            <HousingMemberForm onAddMember={handleAddMember}/>
            <HousingMemberTable
                members={members}
                onUpdate={handleUpdateMember}
                onDelete={handleDeleteMember}
            />
        </div>
    );
}

export default HousingMemberManagement;
