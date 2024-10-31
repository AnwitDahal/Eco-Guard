import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import osmProvider from "../osm-provider";
import worldGeoJSON from "../custom.geo.json";
import { useAuthStore } from '../store/AppStore';

const MapPart = () => {
  const [center] = useState({ lat: 27.7172, lng: 85.324 });
  const { fetchAqiData, aqiData, isLoading, } = useAuthStore();  // Get aqiData directly from Zustand store
  const ZOOM_LEVEL = 4;
  const mapRef = useRef();

  useEffect(() => {
    // Fetch AQI data when the component mounts
    fetchAqiData();
  }, [fetchAqiData]);

  const getAqiColor = (value) => {
    if (value <= 50) return "green";
    if (value <= 100) return "yellow";
    if (value <= 150) return "orange";
    if (value <= 200) return "red";
    if (value <= 300) return "purple";
    return "maroon";
  };

  const style = (feature) => {
    const country = aqiData?.find(
      (item) => item.countryName === feature.properties.name
    );
    const value = country ? country["overallAqi"] : 0; // Default to 0 if no AQI data
    const fillColor = getAqiColor(value);

    return {
      fillColor: fillColor,
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const renderLegend = () => (
    <div className="legend" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000,marginBottom:"15p" }}>
      <h4>AQI Legend</h4>
      <div><span style={{ backgroundColor: 'green', display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span> 0 - 50 (Good)</div>
      <div><span style={{ backgroundColor: 'yellow', display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span> 51 - 100 (Moderate)</div>
      <div><span style={{ backgroundColor: 'orange', display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span> 101 - 150 (Unhealthy for Sensitive Groups)</div>
      <div><span style={{ backgroundColor: 'red', display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span> 151 - 200 (Unhealthy)</div>
      <div><span style={{ backgroundColor: 'purple', display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span> 201 - 300 (Very Unhealthy)</div>
      <div><span style={{ backgroundColor: 'maroon', display: 'inline-block', width: '20px', height: '20px', marginRight: '5px' }}></span> 301+ (Hazardous)</div>
    </div>
  );

  return (
    <section className="ml-5">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          ref={mapRef}
          style={{ height: "80vh", width: "98%", borderRadius:"15px" }}
        >
          <TileLayer
            url={osmProvider.maptiler.url}
            attribution={osmProvider.maptiler.attribution}
          />
          <GeoJSON data={worldGeoJSON} style={style} />
          {renderLegend()} 
        </MapContainer>
      )}
    </section>
  );
};

export default MapPart;
