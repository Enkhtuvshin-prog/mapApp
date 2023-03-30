import "./App.css";
import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [branch, setBranch] = useState();
  const getAllBranch = async () => {
    try {
      const res = await axios.get("http://localhost:8010/restaurant");
      setBranch(res.data.restaurant);
    } catch (err) {
      console.log("ERRR", err);
    }
  };

  return (
    <div className="App">
      <h1>Gazrin zurag</h1>
      <div>
        <button onClick={getAllBranch}>bun salbarig haruulah</button>
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
          <Marker position={[47.92373532844665, 106.93413474965705]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
