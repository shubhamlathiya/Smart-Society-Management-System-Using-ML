import axios from 'axios';
import {
    COMPLAINT_POST, HOUSING_GET, HOUSING_POST, COMPLAINTS, COMPLAINT_STATUS, VISITOR_POST, STATS, VISITOR_GET,
} from "../utils/constants/apiConstants";

// ✅ axios instance with correct base URL
const API = axios.create({
    baseURL: "http://127.0.0.1:5000", headers: {'Content-Type': 'application/json'},
});

// ---------------- HOUSING ----------------
export const housingApi = {
    addHousing: (housingUnitsData) => {
        return API.post(HOUSING_POST, housingUnitsData, {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Add Housing Error:', error.response || error.message);
            throw error;
        });
    },

    getHousing: async () => {
        try {
            const response = await axios.get(HOUSING_GET);
            return response.data;
        } catch (error) {
            console.error('Get Housing Error:', error.response || error.message);
            throw error;
        }
    }
};

// ---------------- COMPLAINT ----------------
export const complaintApi = {
    addComplaint: (complaintData) => {
        return API.post(COMPLAINTS, complaintData)
            .then(res => res)
            .catch(error => {
                console.error('Add Complaint Error:', error.response || error.message);
                throw error;
            });
    }
};


// -----------------Visitor -------------------
export const visitorsApi = {
    addVisitor: (visitorData) => {
        return API.post(VISITOR_POST, visitorData)
            .then(res => res)
            .catch(error => {
                console.error('Add Visitors Error:', error.response || error.message);
                throw error;
            });
    }, getVisitors: async () => {
        try {
            const response = await axios.get(VISITOR_GET);
            return response.data;
        } catch (error) {
            console.error('Get Visitors Error:', error.response || error.message);
            throw error;
        }
    }, verifyVisitor: (code) => {
        return API.post(VISITOR_POST, code)
            .then(res => res)
            .catch(error => {
                console.error('Visitors Error:', error.response || error.message);
                throw error;
            });
    }
}

// ---------------- ADMIN SIDE ----------------
export const fetchComplaints = () => API.get(COMPLAINTS);
export const updateStatus = (id, status) => API.patch(COMPLAINT_STATUS(id), {status});
export const fetchStats = () => API.get(STATS);
