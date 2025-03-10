import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";

const MapView = ({ userLocation }) => {
  if (!userLocation) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      className="h-80 w-full rounded-lg shadow-md"
      style={{ height: "400px", width: "100%" }}
    >
      {console.log("inn")}
      {/* OpenStreetMap Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User's Location Marker */}
      <Marker position={userLocation}>
        <Popup>You are here!</Popup>
      </Marker>
      {/* {destination && (
        <RoutingMachine userLocation={userLocation} destination={destination} />
      )} */}
    </MapContainer>
  );
};

export default MapView;
