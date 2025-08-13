import React, {useState} from "react";

function ComplaintForm(props) {

    const [form, setForm] = useState({ category: '', description: '' })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!form.category || !form.description) {
            alert('Please fill out all fields')
            return
        }
        console.log(form)
        setForm({ category: '', description: '' })
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="text-lg font-semibold mb-3">Add New Complaint</h3>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="e.g., Plumbing"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Describe the issue"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                    Submit Complaint
                </button>
            </form>
        </>
    )
}

export default ComplaintForm;