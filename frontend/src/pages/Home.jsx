import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/global.css";

function Home() {
  const [free, setFree] = useState(0);

  useEffect(() => {
    api.get("/parking/available").then(res => {
      setFree(res.data.free);
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to SpotOn</h1>

        <div className="stats">
          <div className="card stat-box">
            <p>Available Spots</p>
            <h2>{free}</h2>
          </div>

          <div className="card stat-box">
          <p>Occupied Spots</p>
          <h2>76</h2>
          </div>
      </div>
    </div>

  )
}

export default Home;
