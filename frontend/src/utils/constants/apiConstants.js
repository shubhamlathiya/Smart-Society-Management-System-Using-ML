// Correct Flask backend base URL

const API_BASE_URL = 'http://127.0.0.1:5000/';

// ---------------- Block ------------------
export const BLOCK_POST = API_BASE_URL + "blocks/";
export const BLOCK_GET = API_BASE_URL + "blocks/";
export const BLOCK_UPDATE = (blockId) => API_BASE_URL + `blocks/${blockId}`;
export const BLOCK_DELETE = (blockId) => API_BASE_URL + `blocks/${blockId}`;

// ---------------- HOUSING ----------------
export const HOUSING_GET = API_BASE_URL + "housing/";
export const HOUSING_POST = API_BASE_URL + "housing/";
export const HOUSING_UPDATE = (housingUnitsDataId) => API_BASE_URL + `housing/${housingUnitsDataId}`;
export const HOUSING_DELETE = (housingID) => API_BASE_URL + `housing/${housingID}`;

// ---------------- COMPLAINT ----------------
export const COMPLAINT_POST = API_BASE_URL + "complaints";

//--------------- visitor ----------------
export const VISITOR_GET = API_BASE_URL + "visitor/visitors";
export const VISITOR_POST = API_BASE_URL + "visitor/visitors";

// ---------------- ADMIN SIDE ----------------
export const COMPLAINTS = API_BASE_URL + "complaints";
export const COMPLAINT_STATUS = (id) => API_BASE_URL + `complaints/${id}/status`;
export const STATS = API_BASE_URL + "stats";

// -------------------- member -------------------
export const MEMBER_POST = API_BASE_URL + "member/";
export const MEMBER_GET = API_BASE_URL + "member/";
export const MEMBER_UPDATE = (memberId) => API_BASE_URL + `member/${memberId}`;
export const MEMBER_DELETE = (memberId) => API_BASE_URL + `member/${memberId}`;

// -------------------- utility ------------------
export const UTILITY_GET = API_BASE_URL + "utility/";
export const UTILITY_POST = API_BASE_URL + "utility/";
export const UTILITY_UPDATE = (id) => API_BASE_URL + `utility/${id}`;
export const UTILITY_DELETE = (id) => API_BASE_URL + `utility/${id}`;
