import "./App.css";
import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [branches, setBranches] = useState([]);
  const getAllBranches = async () => {
    try {
      const res = await axios.get("http://localhost:8010/restaurant");
      setBranches(res.data.restaurant);
    } catch (err) {
      console.log("ERRR", err);
    }
  };

  return (
    <div className="App">
      <h1>Gazrin zurag</h1>
      <div>
        <button onClick={getAllBranches}>bun salbarig haruulah</button>
        <button>ugugdsun zaid oirig haruulah</button>
      </div>
      <div style={{ width: "100%", height: "90vh", backgroundColor: "grey" }}>
        <MapContainer
          center={[47.92373532844665, 106.93413474965705]}
          zoom={17}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "90vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {branches  && branches.map((x)=>
          <Marker position={[x.location.coordinates[1], x.location.coordinates[0]]}>
            <Popup>
              {x.name}. <br /> Easily customizable.
            </Popup>
          </Marker> )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
