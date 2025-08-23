import { useState } from "react";
import "./Facility.css";
import {facilityTypes} from "../../utils/constants/appConstants"; // custom CSS

function Facility() {
  const [facility, setFacility] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const [facilities, setFacilities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFacility = {
      facility,
      fromDate,
      toDate,
      fromTime,
      toTime,
    };

    setFacilities([...facilities, newFacility]);

    // reset
    setFacility("");
    setFromDate("");
    setToDate("");
    setFromTime("");
    setToTime("");
  };

  return (
    <div className="facility-container">
      <h2 className="page-title">Add Facility Booking</h2>
      <h4 className="note">THIS PAGE IS FOR RESIDENCE SO NO REMOVE</h4>

      {/* Facility Form */}
      <form className="facility-form" onSubmit={handleSubmit}>
        {/* Facility Name */}
        <div className="form-group">
          <label>Facility</label>
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            required
          >
              {facilityTypes.map((facility,index) => (<option value={facility} key={facility}>{facility}</option>))}
          </select>
        </div>

        {/* From Date */}
        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>

        {/* To Date */}
        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>

        {/* From Time */}
        <div className="form-group">
          <label>From Time</label>
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            required
          />
        </div>

        {/* To Time */}
        <div className="form-group">
          <label>To Time</label>
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Add Facility
        </button>
      </form>

      {/* Display Added Facilities */}
      <div className="booked-section">
        <h3>Booked Facilities</h3>
        <table className="facility-table">
          <thead>
            <tr>
              <th>Facility</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>From Time</th>
              <th>To Time</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f, index) => (
              <tr key={index}>
                <td>{f.facility}</td>
                <td>{f.fromDate}</td>
                <td>{f.toDate}</td>
                <td>{f.fromTime}</td>
                <td>{f.toTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Facility;
