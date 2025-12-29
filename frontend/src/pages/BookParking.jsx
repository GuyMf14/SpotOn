import "../styles/global.css";



function BookParking() {
  return (
    <div className="booking card">
      <h2>Book a Parking Spot</h2>

      <select className="input">
        <option>Select Spot</option>
      </select>

      <button className="btn-primary">Book</button>
  </div>
);
}

export default BookParking;
