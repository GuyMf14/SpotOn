import "../styles/global.css";


function ParkingAvailability() {
  return (
    <div className="dashboard">
      <h1>Parking Status</h1>

      <div className="spots-grid">
        <div className="spot free">A1</div>
        <div className="spot occupied">A2</div>
      </div>
    </div>);
}

export default ParkingAvailability;
