import React, {useState, useEffect} from "react";
import {housingApi} from "../../services/api";

function HousingMemberForm({onAddMember}) {
    const [formData, setFormData] = useState({
        member_id: "",
        house_id: "",
        name: "",
        email: "",
        phone: "",
        relationship: "",
        date_of_birth: "",
        aadhar_number: "",
        is_primary: false,
        occupation: "",
        move_in_date: "",
        move_out_date: "",
        status: "active"
    });

    const [houses, setHouses] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const fetchHousingData = async () => {
        try {
            const response = await housingApi.getHousing();
            setHouses(response);
        } catch (error) {
            console.error("Error fetching housing data:", error);
        }
    };

    // Sample houses data - in a real app, this would come from an API
    useEffect(() => {
        // This would typically be an API call to fetch houses
        fetchHousingData();
    }, []);

    // Options for dropdowns
    const relationshipOptions = [
        {value: "", label: "Select Relationship"},
        {value: "owner", label: "Owner"},
        {value: "tenant", label: "Tenant"},
        {value: "spouse", label: "Spouse"},
        {value: "child", label: "Child"},
        {value: "parent", label: "Parent"},
        {value: "sibling", label: "Sibling"},
        {value: "other_relative", label: "Other Relative"},
        {value: "domestic_help", label: "Domestic Help"},
        {value: "other", label: "Other"}
    ];

    const occupationOptions = [
        {value: "", label: "Select Occupation"},
        {value: "employed", label: "Employed"},
        {value: "self_employed", label: "Self Employed"},
        {value: "student", label: "Student"},
        {value: "homemaker", label: "Homemaker"},
        {value: "retired", label: "Retired"},
        {value: "unemployed", label: "Unemployed"},
        {value: "other", label: "Other"}
    ];

    const statusOptions = [
        {value: "active", label: "Active"},
        {value: "inactive", label: "Inactive"},
        {value: "moved_out", label: "Moved Out"},
        {value: "deceased", label: "Deceased"}
    ];

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.house_id) newErrors.house_id = "House selection is required";
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.relationship) newErrors.relationship = "Relationship is required";
        if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";

        // Basic email validation if provided
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }

        // Aadhar validation if provided (12 digits)
        if (formData.aadhar_number && !/^\d{12}$/.test(formData.aadhar_number)) {
            newErrors.aadhar_number = "Aadhar number must be 12 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const memberData = {
                ...formData,
                // Generate a member ID if not provided
                member_id: formData.member_id || `MEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                // Get house details from selected house
                house_details: houses.find(house => house.house_id === formData.house_id)
            };

            // Call the function passed as prop to handle the member data
            if (onAddMember) {
                onAddMember(memberData);
            }

            setSubmitted(true);

            // Reset form after 2 seconds (but keep house selection)
            setTimeout(() => {
                setFormData({
                    ...formData,
                    member_id: "",
                    name: "",
                    email: "",
                    phone: "",
                    relationship: "",
                    date_of_birth: "",
                    aadhar_number: "",
                    is_primary: false,
                    occupation: "",
                    move_in_date: "",
                    move_out_date: "",
                    status: "active"
                });
                setSubmitted(false);
            }, 2000);
        }
    };

    const getHouseLabel = (house) => {
        return `Block ${house.block_number}, Unit ${house.unit_number}`;
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow">
                        <div className="card-header bg-info text-white">
                            <h4 className="mb-0">
                                <i className="bi bi-house-add me-2"></i>
                                Add Housing Member
                            </h4>
                        </div>
                        <div className="card-body">
                            {submitted && (
                                <div className="alert alert-success" role="alert">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Member added successfully!
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="house_id" className="form-label">Select House*</label>
                                        <select
                                            className={`form-select ${errors.house_id ? 'is-invalid' : ''}`}
                                            id="house_id"
                                            name="house_id"
                                            value={formData.house_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a House</option>
                                            {houses.map(house => (
                                                <option key={house.house_id} value={house.house_id}>
                                                    {getHouseLabel(house)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.house_id && <div className="invalid-feedback">{errors.house_id}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label">Full Name*</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="relationship" className="form-label">Relationship*</label>
                                        <select
                                            className={`form-select ${errors.relationship ? 'is-invalid' : ''}`}
                                            id="relationship"
                                            name="relationship"
                                            value={formData.relationship}
                                            onChange={handleChange}
                                        >
                                            {relationshipOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.relationship &&
                                            <div className="invalid-feedback">{errors.relationship}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="member@example.com"
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 12345 67890"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="date_of_birth" className="form-label">Date of Birth*</label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            value={formData.date_of_birth}
                                            onChange={handleChange}
                                        />
                                        {errors.date_of_birth &&
                                            <div className="invalid-feedback">{errors.date_of_birth}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="aadhar_number" className="form-label">Aadhar Number</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.aadhar_number ? 'is-invalid' : ''}`}
                                            id="aadhar_number"
                                            name="aadhar_number"
                                            value={formData.aadhar_number}
                                            onChange={handleChange}
                                            placeholder="12-digit Aadhar number"
                                            maxLength="12"
                                        />
                                        {errors.aadhar_number &&
                                            <div className="invalid-feedback">{errors.aadhar_number}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="occupation" className="form-label">Occupation</label>
                                        <select
                                            className="form-select"
                                            id="occupation"
                                            name="occupation"
                                            value={formData.occupation}
                                            onChange={handleChange}
                                        >
                                            {occupationOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="status" className="form-label">Status*</label>
                                        <select
                                            className="form-select"
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            {statusOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="move_in_date" className="form-label">Move In Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="move_in_date"
                                            name="move_in_date"
                                            value={formData.move_in_date}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="move_out_date" className="form-label">Move Out Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="move_out_date"
                                            name="move_out_date"
                                            value={formData.move_out_date}
                                            onChange={handleChange}
                                            disabled={formData.status !== "moved_out"}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="is_primary"
                                        name="is_primary"
                                        checked={formData.is_primary}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="is_primary">
                                        Primary Member (Head of Household)
                                    </label>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="reset" className="btn btn-outline-secondary me-md-2">
                                        <i className="bi bi-arrow-repeat me-2"></i>
                                        Reset Form
                                    </button>
                                    <button type="submit" className="btn btn-info text-white">
                                        <i className="bi bi-person-plus me-2"></i>
                                        Add Member
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HousingMemberForm;