// Correct Flask backend base URL
const API_BASE_URL = 'http://127.0.0.1:5000/';

// ---------------- HOUSING ----------------
const HOUSING_POST = API_BASE_URL + "housing/";
const HOUSING_GET = API_BASE_URL + "housing/";

// ---------------- COMPLAINT ----------------
const COMPLAINT_POST = API_BASE_URL + "complaints";

// ---------------- ADMIN SIDE ----------------
const COMPLAINTS = API_BASE_URL + "complaints";
const COMPLAINT_STATUS = (id) => API_BASE_URL + `complaints/${id}/status`;
const STATS = API_BASE_URL + "stats";

export {
  HOUSING_POST,
  HOUSING_GET,
  COMPLAINT_POST,
  COMPLAINTS,
  COMPLAINT_STATUS,
  STATS,
};
