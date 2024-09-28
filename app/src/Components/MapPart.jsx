import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import osmProvider from '../osm-provider';

const MapPart = () => {
  const [center, setCenter] = useState({ lat: 27.7172, lng: 85.324 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  return (
    <div className="rounded-3xl overflow-hidden mx-3">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ width: "100%",height:'80vh' }} // Full container size
      >
        <TileLayer
          url={osmProvider.maptiler.url}
          attribution={osmProvider.maptiler.attribution}
        />
        {/* <GeoJSON data={worldGeoJSON} style={style} /> */}
      </MapContainer>
    </div>
  );
};

export default MapPart;
