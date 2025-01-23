import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Default Leaflet styles
import "./leaflet.css"; // Custom Leaflet styles
import styles from "./Map.module.css";

interface MapsProps {
  center?: [number, number];
  zoom?: number;
  markers?: { position: [number, number]; label?: string }[];
}

function Maps({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [{ position: [51.505, -0.09], label: "Default Marker" }],
}: MapsProps) {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <SearchBar placeholder="Rechercher un lieu..." />
        <IconsContainer icons={["🏍️", "🚗", "🎉"]} />

        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className={styles.maps}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((marker) => (
            <Marker key={marker.position.join(",")} position={marker.position}>
              <Popup>{marker.label || "A marker"}</Popup>
            </Marker>
          ))}

          <AdjustZoomControls />
        </MapContainer>
      </div>
    </div>
  );
}

interface SearchBarProps {
  placeholder: string;
  onSearch?: (query: string) => void;
}

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.searchBar}
      onChange={handleInputChange}
    />
  );
}

interface IconsContainerProps {
  icons: string[];
}

function IconsContainer({ icons }: IconsContainerProps) {
  return (
    <div className={styles.iconsContainer}>
      {icons.map((icon) => (
        <div key={icon} className={styles.icon}>
          {icon}
        </div>
      ))}
    </div>
  );
}

function AdjustZoomControls() {
  const map = useMap();

  React.useEffect(() => {
    // Adjust the position of the zoom control
    map.zoomControl.setPosition("bottomright");
  }, [map]);

  return null;
}

export default Maps;
