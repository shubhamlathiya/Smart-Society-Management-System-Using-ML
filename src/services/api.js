import axios from 'axios';
import {COMPLAINT_POST, HOUSING_GET, HOUSING_POST} from "../utils/constants/apiConstants";


export const housingApi = {
    addHousing: (housingUnitsData) => {
        return axios.post(HOUSING_POST, housingUnitsData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(error => {
            console.error('Detailed error:', error.response || error.message);
            throw error;
        })

    },
    getHousing: async () => {
        try {
            const response = await axios.get(HOUSING_GET);
            return response.data;
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    }
};


export const complaintApi = {
    addComplaint(ComplaintData) {
        return axios.post(COMPLAINT_POST, ComplaintData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(error => {
            console.error('Detailed error:', error.response || error.message);
        })
    }
}