import React, { useState } from "react";
import {complaintApi} from "../../services/api";

function ComplaintForm(props) {
    const [description, setDescription] = useState('');

    function handleChange(e) {
        setDescription(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!description.trim()) {
            alert('Please enter a complaint description');
            return;
        }
        console.log({description});

        const response = await complaintApi.addComplaint({description});
        console.log(response.data);
        if (response) {
            alert(`${response.data.status}`);
        }

        setDescription('');
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Submit New Complaint</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="complaintDescription" className="form-label">
                                        Complaint Description
                                    </label>
                                    <textarea
                                        id="complaintDescription"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="4"
                                        placeholder="Please describe your complaint in detail..."
                                        required
                                    />
                                    <div className="form-text">
                                        Be specific about the issue including location and time if relevant.
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit Complaint
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

export default ComplaintForm;