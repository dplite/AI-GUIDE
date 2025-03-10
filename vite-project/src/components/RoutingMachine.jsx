import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
const RoutingMachine = ({ userLocation, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !destination) return;

    // Clear old routes before adding new ones
    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        map.removeLayer(layer);
      }
    });

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      createMarker: function () {
        return null;
      }, // Hide default markers
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userLocation, destination]);

  return null;
};
export default RoutingMachine;
