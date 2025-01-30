import type { LeafletMouseEvent } from "leaflet";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Default Leaflet styles
import "./leaflet.css"; // Custom Leaflet styles
import DatePicker from "react-datepicker";
import styles from "./Map.module.css";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for react-datepicker

interface MarkerDetails {
  eventType: "car" | "motorcycle" | "event";
  date: string;
  brand?: string;
  model?: string;
  year?: string;
  eventCategory?: string;
  duration?: string;
}

interface MapsProps {
  center?: [number, number];
  zoom?: number;
  markers?: {
    position: [number, number];
    label?: string;
    details?: MarkerDetails;
  }[];
}

function Maps({
  center = [51.505, -0.09],
  zoom = 13,
  markers: initialMarkers = [
    { position: [51.505, -0.09], label: "Default Marker" },
  ],
}: MapsProps) {
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [markers, setMarkers] = useState(initialMarkers);
  const [newMarkerPosition, setNewMarkerPosition] = useState<
    [number, number] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [eventType, setEventType] = useState<
    "car" | "motorcycle" | "event" | null
  >(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [eventCategory, setEventCategory] = useState<string>("");
  const [isRange, setIsRange] = useState(false);

  const handleAddMarkerButtonClick = () => {
    setIsAddingMarker((prev) => !prev);
  };

  const handleMapClick = (e: LeafletMouseEvent) => {
    if (isAddingMarker) {
      const { lat, lng } = e.latlng;
      setNewMarkerPosition([lat, lng]);
      setIsModalOpen(true);
      setIsAddingMarker(false);
    }
  };

  const handleModalSubmit = () => {
    if (!eventType || (!date && !startDate && !endDate)) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedDate = isRange
      ? `${startDate?.toLocaleDateString()} to ${endDate?.toLocaleDateString()}`
      : date?.toLocaleDateString() || "";

    const newMarkerData = {
      position: newMarkerPosition as [number, number],
      label: `Type: ${eventType}, Date: ${formattedDate}`,
      details: {
        eventType,
        date: formattedDate,
        ...(eventType === "car" || eventType === "motorcycle"
          ? { brand, model, year }
          : { eventCategory, duration: formattedDate }),
      },
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarkerData]);
    setIsModalOpen(false);
    setNewMarkerPosition(null);
    setEventType(null);
    setDate(null);
    setStartDate(null);
    setEndDate(null);
    setBrand("");
    setModel("");
    setYear("");
    setEventCategory("");
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {/* Add Marker Button */}
        <button
          type="button"
          className={styles.icon}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}
          onClick={handleAddMarkerButtonClick}
        >
          {isAddingMarker ? "❌" : "📍"}{" "}
          {/* Change button icon based on mode */}
        </button>

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

          {/* Add the MapClickHandler component */}
          <MapClickHandler onClick={handleMapClick} />

          {/* Render existing markers */}
          {markers.map((marker) => (
            <Marker key={marker.position.join(",")} position={marker.position}>
              <Popup>
                {marker.label}
                <br />
                {marker.details && JSON.stringify(marker.details, null, 2)}
              </Popup>
            </Marker>
          ))}

          {/* Render the new marker if its position is set */}
          {newMarkerPosition && (
            <Marker position={newMarkerPosition}>
              <Popup>New Marker</Popup>
            </Marker>
          )}

          <AdjustZoomControls />
        </MapContainer>
      </div>

      {/* Modal for adding marker information */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add Point of Interest</h3>

            {/* Event Type Selection */}
            <select
              value={eventType || ""}
              onChange={(e) =>
                setEventType(e.target.value as "car" | "motorcycle" | "event")
              }
              className={styles.modalInput}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="event">Event</option>
            </select>

            {/* Toggle between single day and range */}
            <div>
              <label>
                <input
                  type="radio"
                  checked={!isRange}
                  onChange={() => setIsRange(false)}
                />
                Single Day
              </label>
              <label>
                <input
                  type="radio"
                  checked={isRange}
                  onChange={() => setIsRange(true)}
                />
                Date Range
              </label>
            </div>

            {/* Date Input */}
            {isRange ? (
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className={styles.modalInput}
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || undefined}
                  placeholderText="End Date"
                  className={styles.modalInput}
                />
              </div>
            ) : (
              <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                placeholderText="Select Date"
                className={styles.modalInput}
              />
            )}

            {/* Conditional Fields */}
            {eventType === "car" && (
              <>
                <input
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className={styles.modalInput}
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={styles.modalInput}
                />
                <input
                  type="text"
                  placeholder="Year of Birth"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={styles.modalInput}
                />
              </>
            )}

            {eventType === "motorcycle" && (
              <>
                <input
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className={styles.modalInput}
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={styles.modalInput}
                />
                <input
                  type="text"
                  placeholder="Year of Birth"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={styles.modalInput}
                />
              </>
            )}

            {eventType === "event" && (
              <input
                type="text"
                placeholder="Type of Event (e.g., Gathering, Exposition, Rally)"
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
                className={styles.modalInput}
              />
            )}

            {/* Modal Buttons */}
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => {
                  setIsModalOpen(false);
                  setEventType(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleModalSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MapClickHandler = ({
  onClick,
}: { onClick: (e: LeafletMouseEvent) => void }) => {
  useMapEvent("click", onClick);
  return null;
};

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
    map.zoomControl.setPosition("bottomright");
  }, [map]);

  return null;
}

export default Maps;
