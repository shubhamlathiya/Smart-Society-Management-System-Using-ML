import React, { useState } from "react";

function PreRegisterVisitorsWithCode() {
    const [visitors, setVisitors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        visitDate: "",
        purpose: ""
    });

    // Generate random 6-digit code
    const generateCode = () => Math.floor(100000 + Math.random() * 900000);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.visitDate) {
            alert("Please fill in all required fields.");
            return;
        }
        const visitorWithCode = { ...formData, code: generateCode() };
        setVisitors([...visitors, visitorWithCode]);
        setFormData({ name: "", email: "", phone: "", visitDate: "", purpose: "" });
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">Pre-register Visitors & Generate Code</h3>

            <div className="row">
                {/* Form Section */}
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm p-3">
                        <h5 className="mb-3">Visitor Registration Form</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email*</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Visit Date*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="visitDate"
                                    value={formData.visitDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Purpose</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Pre-register
                            </button>
                        </form>
                    </div>
                </div>

                {/* Code Cards */}
                <div className="col-lg-6 mb-4">
                    <h5 className="mb-3">Visitor Codes</h5>
                    <div className="d-flex flex-column gap-3">
                        {visitors.length === 0 && <p>No visitors pre-registered yet.</p>}
                        {visitors.map((v, idx) => (
                            <div key={idx} className="card shadow-sm p-3">
                                <h6 className="mb-1">{v.name}</h6>
                                <p className="mb-0">Email: {v.email}</p>
                                <p className="mb-0">Phone: {v.phone || "N/A"}</p>
                                <p className="mb-0">Visit Date: {v.visitDate}</p>
                                <p className="mb-0">Purpose: {v.purpose || "N/A"}</p>
                                <p className="mb-0 fw-bold mt-1">Code: {v.code}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreRegisterVisitorsWithCode;
