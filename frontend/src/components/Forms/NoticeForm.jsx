import React, { useState } from "react";

function NoticeForm({ onAddNotice }) {
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        category: "",
        issue_date: "",
        valid_until: "",
        issuer_name: "",
        target_audience: "",
        attachments: "",
        ack_required: "no"
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Options for dropdowns
    const categoryOptions = [
        { value: "", label: "Select Category" },
        { value: "general", label: "General Notice" },
        { value: "emergency", label: "Emergency Alert" },
        { value: "maintenance", label: "Maintenance Update" },
        { value: "event", label: "Event Announcement" },
        { value: "policy", label: "Policy Change" },
        { value: "security", label: "Security Advisory" }
    ];

    const audienceOptions = [
        { value: "", label: "Select Target Audience" },
        { value: "all", label: "All Residents" },
        { value: "owners", label: "Flat Owners Only" },
        { value: "tenants", label: "Tenants Only" },
        { value: "staff", label: "Staff Only" },
        { value: "visitors", label: "Visitors" },
        { value: "block_a", label: "Block A Residents" },
        { value: "block_b", label: "Block B Residents" },
        { value: "block_c", label: "Block C Residents" }
    ];

    const ackOptions = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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

        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.body.trim()) newErrors.body = "Notice body is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.issue_date) newErrors.issue_date = "Issue date is required";
        if (!formData.valid_until) newErrors.valid_until = "Valid until date is required";
        if (!formData.issuer_name.trim()) newErrors.issuer_name = "Issuer name is required";
        if (!formData.target_audience) newErrors.target_audience = "Target audience is required";

        // Validate that valid_until is not before issue_date
        if (formData.issue_date && formData.valid_until) {
            const issueDate = new Date(formData.issue_date);
            const validUntil = new Date(formData.valid_until);

            if (validUntil < issueDate) {
                newErrors.valid_until = "Valid until date cannot be before issue date";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Generate a unique notice ID (in a real app, this would come from the backend)
            const noticeId = `NOTICE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            const noticeData = {
                notice_id: noticeId,
                ...formData,
                // Convert attachment string to array if needed
                attachments: formData.attachments ? formData.attachments.split(',').map(a => a.trim()) : []
            };

            // Call the function passed as prop to handle the notice data
            if (onAddNotice) {
                onAddNotice(noticeData);
            }

            setSubmitted(true);

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({
                    title: "",
                    body: "",
                    category: "",
                    issue_date: "",
                    valid_until: "",
                    issuer_name: "",
                    target_audience: "",
                    attachments: "",
                    ack_required: "no"
                });
                setSubmitted(false);
            }, 2000);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">
                                <i className="bi bi-megaphone me-2"></i>
                                Create New Notice
                            </h4>
                        </div>
                        <div className="card-body">
                            {submitted && (
                                <div className="alert alert-success" role="alert">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Notice created successfully!
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="title" className="form-label">Title*</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter notice title"
                                        />
                                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="category" className="form-label">Category*</label>
                                        <select
                                            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            {categoryOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="body" className="form-label">Notice Body*</label>
                                    <textarea
                                        className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                                        id="body"
                                        name="body"
                                        rows="5"
                                        value={formData.body}
                                        onChange={handleChange}
                                        placeholder="Enter the full notice content..."
                                    ></textarea>
                                    {errors.body && <div className="invalid-feedback">{errors.body}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="issue_date" className="form-label">Issue Date*</label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.issue_date ? 'is-invalid' : ''}`}
                                            id="issue_date"
                                            name="issue_date"
                                            value={formData.issue_date}
                                            onChange={handleChange}
                                        />
                                        {errors.issue_date && <div className="invalid-feedback">{errors.issue_date}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="valid_until" className="form-label">Valid Until*</label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.valid_until ? 'is-invalid' : ''}`}
                                            id="valid_until"
                                            name="valid_until"
                                            value={formData.valid_until}
                                            onChange={handleChange}
                                        />
                                        {errors.valid_until && <div className="invalid-feedback">{errors.valid_until}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="issuer_name" className="form-label">Issuer Name*</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.issuer_name ? 'is-invalid' : ''}`}
                                            id="issuer_name"
                                            name="issuer_name"
                                            value={formData.issuer_name}
                                            onChange={handleChange}
                                            placeholder="Name of the person issuing the notice"
                                        />
                                        {errors.issuer_name && <div className="invalid-feedback">{errors.issuer_name}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="target_audience" className="form-label">Target Audience*</label>
                                        <select
                                            className={`form-select ${errors.target_audience ? 'is-invalid' : ''}`}
                                            id="target_audience"
                                            name="target_audience"
                                            value={formData.target_audience}
                                            onChange={handleChange}
                                        >
                                            {audienceOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.target_audience && <div className="invalid-feedback">{errors.target_audience}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="attachments" className="form-label">Attachments</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="attachments"
                                            name="attachments"
                                            value={formData.attachments}
                                            onChange={handleChange}
                                            placeholder="Enter file names separated by commas"
                                        />
                                        <div className="form-text">Optional: Add file names separated by commas</div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="ack_required" className="form-label">Acknowledgment Required*</label>
                                        <select
                                            className="form-select"
                                            id="ack_required"
                                            name="ack_required"
                                            value={formData.ack_required}
                                            onChange={handleChange}
                                        >
                                            {ackOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="form-text">Whether recipients need to acknowledge this notice</div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="reset" className="btn btn-outline-secondary me-md-2">
                                        Reset Form
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-send me-2"></i>
                                        Publish Notice
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

export default NoticeForm;