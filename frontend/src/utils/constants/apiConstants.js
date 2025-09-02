// Correct Flask backend base URL
const API_BASE_URL = 'http://127.0.0.1:5000/';

// ---------------- HOUSING ----------------
export const HOUSING_GET = API_BASE_URL + "housing/";
export const HOUSING_POST = API_BASE_URL + "housing/";

// ---------------- COMPLAINT ----------------
export const COMPLAINT_POST = API_BASE_URL + "complaints";

//--------------- visitor ----------------
export const VISITOR_GET = API_BASE_URL + "visitor/visitors";
export const VISITOR_POST = API_BASE_URL + "visitor/visitors";

// ---------------- ADMIN SIDE ----------------
export const COMPLAINTS = API_BASE_URL + "complaints";
export const COMPLAINT_STATUS = (id) => API_BASE_URL + `complaints/${id}/status`;
export const STATS = API_BASE_URL + "stats";

