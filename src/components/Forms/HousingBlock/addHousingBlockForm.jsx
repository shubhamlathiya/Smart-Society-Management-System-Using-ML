import React, {useState} from "react";
import {housingApi} from "../../../services/api";
import {unitTypes} from "../../../utils/constants/appConstants";

function AddHousingBlockForm({onSuccess}) {


    const [blockNumber, setBlockNumber] = useState('');
    const [flats, setFlats] = useState([{flatNumber: '', type: '1BHK'}]);

    const handleBlockNumberChange = (e) => {
        setBlockNumber(e.target.value);
    };

    const handleFlatNumberChange = (index, value) => {
        const updatedFlats = [...flats];
        updatedFlats[index].flatNumber = value;
        setFlats(updatedFlats);
    };

    const handleTypeChange = (index, value) => {
        const updatedFlats = [...flats];
        updatedFlats[index].type = value;
        setFlats(updatedFlats);
    };

    const addFlat = () => {
        setFlats([...flats, {flatNumber: '', type: '1BHK'}]);
    };

    const removeFlat = (index) => {
        if (flats.length > 1) {
            const updatedFlats = flats.filter((_, i) => i !== index);
            setFlats(updatedFlats);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const housingUnitsData = flats.map(flat => ({
            blockNumber, unitNumber: flat.flatNumber, type: flat.type
        }));

        const response = await housingApi.addHousing(housingUnitsData);
        console.log(response);
        if (response) {
            alert(`${response.data.message}`);
            onSuccess && onSuccess();  // ✅ refresh housing data in parent
        }

        setBlockNumber('');
        setFlats([{flatNumber: '', type: '1BHK'}]);
    };

    return (<>
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <h4 className="mb-4">Add New Housing Block</h4>

                <div className="mb-3">
                    <label htmlFor="blockNumber" className="form-label">Block Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="blockNumber"
                        value={blockNumber}
                        onChange={handleBlockNumberChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <h6 className="mb-3">Flats in this Block</h6>
                    {flats.map((flat, index) => (<div key={index} className="row g-3 mb-3 align-items-center">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Flat Number ${index + 1}`}
                                value={flat.flatNumber}
                                onChange={(e) => handleFlatNumberChange(index, e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-5">
                            <select
                                className="form-select"
                                value={flat.type}
                                onChange={(e) => handleTypeChange(index, e.target.value)}
                            >
                                {unitTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                            </select>
                        </div>

                        <div className="col-md-2">
                            {index === flats.length - 1 ? (<button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addFlat}
                            >
                                Add
                            </button>) : (<button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => removeFlat(index)}
                            >
                                Remove
                            </button>)}
                        </div>
                    </div>))}
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Save All Flats
                    </button>
                </div>
            </form>
        </div>
    </>)
}


export default AddHousingBlockForm;