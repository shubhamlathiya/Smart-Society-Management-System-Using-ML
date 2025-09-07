import axios from 'axios';
import {
    HOUSING_GET,
    HOUSING_POST,
    COMPLAINTS,
    COMPLAINT_STATUS,
    VISITOR_POST,
    STATS,
    VISITOR_GET,
    BLOCK_POST,
    BLOCK_GET,
    BLOCK_UPDATE,
    BLOCK_DELETE,
    HOUSING_DELETE,
    HOUSING_UPDATE, UTILITY_GET, UTILITY_DELETE, UTILITY_UPDATE, UTILITY_POST,
} from "../utils/constants/apiConstants";

// axios instance with correct base URL
const API = axios.create({
    baseURL: "http://127.0.0.1:5000", headers: {'Content-Type': 'application/json'},
});

// ---------------- HOUSING ----------------
export const blockApi = {
    addBlock: (block) => {
        return API.post(BLOCK_POST, block, {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Error creating block post', error);
            throw error;
        });
    },
    getBlocks: async () => {
        try {
            const response = await API.get(BLOCK_GET);
            return response.data;
        } catch (error) {
            console.error('Error getting block post', error);
            throw error;
        }
    },
    updateBlock: (blockId, updatedData) => {
        return API.put(BLOCK_UPDATE(blockId), updatedData, {
            headers: {'Content-Type': 'application/json'}
        }).catch(error => {
            console.error('Error updating block', error);
            throw error;
        });
    },
    deleteBlock: (blockId) => {
        return API.delete(BLOCK_DELETE(blockId), {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Error deleting block', error);
            throw error;
        });
    }
}
export const housingApi = {
    addHousing: (housingUnitsData) => {
        return API.post(HOUSING_POST, housingUnitsData, {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Add Housing Error:', error.response || error.message);
            throw error;
        });
    }, getHousing: async () => {
        try {
            const response = await API.get(HOUSING_GET);
            return response.data;
        } catch (error) {
            console.error('Get Housing Error:', error.response || error.message);
            throw error;
        }
    }, updateHousing: (housingUnitsDataId, housingUnitsData) => {
        // console.log(housingUnitsDataId)
        return API.put(HOUSING_UPDATE(housingUnitsDataId), housingUnitsData, {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Error updating Housing Error:', error);
            throw error;
        })
    }, deleteHousing: (housingUnitsDataId) => {
        return API.delete(HOUSING_DELETE(housingUnitsDataId), {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Error deleting block', error);
            throw error;
        });
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
            const response = await API.get(VISITOR_GET);
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

export const utilityApi = {
    addUtility: (utilityData) => {
        return API.post(UTILITY_POST, utilityData, {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Add Utility Error:', error.response || error.message);
            throw error;
        });
    },

    getUtilities: async (blockId = null) => {
        try {
            const url = blockId ? `${UTILITY_GET}?block_id=${blockId}` : UTILITY_GET;
            const response = await API.get(url);
            return response.data;
        } catch (error) {
            console.error('Get Utilities Error:', error.response || error.message);
            throw error;
        }
    },

    updateUtility: (utilityId, updatedData) => {
        return API.put(UTILITY_UPDATE(utilityId), updatedData, {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Update Utility Error:', error.response || error.message);
            throw error;
        });
    },

    deleteUtility: (utilityId) => {
        return API.delete(UTILITY_DELETE(utilityId), {
            headers: {'Content-Type': 'application/json'},
        }).catch(error => {
            console.error('Delete Utility Error:', error.response || error.message);
            throw error;
        });
    }
};


// ---------------- ADMIN SIDE ----------------
export const fetchComplaints = () => API.get(COMPLAINTS);
export const updateStatus = (id, status) => API.patch(COMPLAINT_STATUS(id), {status});
export const fetchStats = () => API.get(STATS);
