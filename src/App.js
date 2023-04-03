import "./App.css";
import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [branches, setBranches] = useState([]);
  const getAllBranches = async () => {
    try {
      const res = await axios.get("http://localhost:8010/restaurant");
      setBranches(res.data.restaurants);
    } catch (err) {
      console.log("ERRR", err);
    }
  };

  const getNearBranch = async()=>{
    try{
      const res = await axios.post("http://localhost:8010/restaurant/near?distance=200", { lat: 47.92373532844665,
      lon:106.93413474965705,} );
      setBranches(res.data.branches)
    } catch(err){
      console.log("ERROR", err);
    }
  }

  return (
    <div className="App">
      <h1>Gazrin zurag</h1>
      <div>
        <button onClick={getAllBranches}>bun salbarig haruulah</button>
        <button onClick={getNearBranch} >ugugdsun zaid oirig haruulah</button>
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
            <Popup>Seoul Business Center</Popup>
          </Marker>
          {branches.length >0  && branches.map((x)=>
          <Marker position={[x.location.coordinates[1], x.location.coordinates[0]]}>
            <Popup>
              {x.name}
            </Popup>
          </Marker> )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
