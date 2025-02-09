import type { LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet.css";
import DatePicker from "react-datepicker";
import styles from "./Map.module.css";
import "react-datepicker/dist/react-datepicker.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import React from "react";
import pinMapIcon from "../../assets/images/svg/pinMap.svg";
import type { Marker as MarkerType } from "../../types/marker"; // Import Marker interface

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: pinMapIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapsProps {
  center?: [number, number];
  zoom?: number;
}

function Maps({ center = [51.505, -0.09], zoom = 13 }: MapsProps) {
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
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
  const [year, setYear] = useState<number | null>(null);
  const [eventCategory, setEventCategory] = useState<string>("");
  const [isRange, setIsRange] = useState(false);

  // State for active filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // State for search functionality
  const [searchCriterion, setSearchCriterion] = useState<
    "brand" | "model" | "year" | "eventCategory"
  >("brand");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Define icons with their types
  const icons = [
    { type: "car", icon: "🚗" },
    { type: "motorcycle", icon: "🏍️" },
    { type: "event", icon: "🎉" },
  ];

  // Fetch markers from the backend on component load
  useEffect(() => {
    fetchMarkers();
  }, []);

  // // Fetch markers based on active filters and search inputs

  const fetchMarkers = async () => {
    try {
      const url = "http://localhost:3310/api/markers/search";
      const params = new URLSearchParams();

      // Add search criterion and query to the request
      if (searchQuery) {
        params.append("criterion", searchCriterion);
        params.append("query", searchQuery);
      }

      // Add active filters to the request
      if (activeFilters.length > 0) {
        params.append("types", activeFilters.join(","));
      }

      // Log the URL and params for debugging
      console.info("Fetching markers with URL:", `${url}?${params.toString()}`);

      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch markers: ${response.statusText}`);
      }

      const data: MarkerType[] = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error("Failed to fetch markers:", error);
    }
  };

  // Handle search criterion change
  const handleCriterionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriterion(
      e.target.value as "brand" | "model" | "year" | "eventCategory",
    );
  };

  // Handle search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    fetchMarkers();
  };

  // Handle filter toggling
  const handleFilterToggle = (type: string) => {
    setActiveFilters(
      (prevFilters) =>
        prevFilters.includes(type)
          ? prevFilters.filter((filter) => filter !== type) // Remove filter if already active
          : [...prevFilters, type], // Add filter if not active
    );
  };

  // Filter markers based on active filters
  const filteredMarkers = markers.filter((marker) => {
    if (activeFilters.length === 0) return true; // Show all markers if no filters are active

    // Ensure marker.details.eventType is defined and matches the activeFilters
    const markerEventType = marker.details?.eventType?.toLowerCase();
    return activeFilters.some(
      (filter) => filter.toLowerCase() === markerEventType,
    );
  });

  // Get available search criteria based on active filters
  const getSearchCriteria = () => {
    if (activeFilters.includes("car") || activeFilters.includes("motorcycle")) {
      return [
        { value: "brand", label: "Brand" },
        { value: "model", label: "Model" },
        { value: "year", label: "Year" },
      ];
    }
    if (activeFilters.includes("event")) {
      return [{ value: "eventCategory", label: "Event Category" }];
    }
    return []; // No active filters
  };

  // Render the search bar with dynamic criteria
  const renderSearchBar = () => {
    const criteria = getSearchCriteria();

    if (criteria.length === 0) {
      return null; // Don't show search bar if no filters are active
    }

    return (
      <div className={styles.searchBar}>
        <select
          className={styles.dropdown}
          value={searchCriterion}
          onChange={handleCriterionChange}
        >
          {criteria.map((criterion) => (
            <option key={criterion.value} value={criterion.value}>
              {criterion.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={styles.search}
          placeholder={`Search by ${searchCriterion}`}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </div>
    );
  };

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
      lat: newMarkerPosition?.[0] || 0,
      lng: newMarkerPosition?.[1] || 0,
      label: `Type: ${eventType}, Date: ${formattedDate}`,
      details: {
        eventType,
        date: formattedDate,
        ...(eventType === "car" || eventType === "motorcycle"
          ? { brand, model, year }
          : { eventCategory, duration: formattedDate }),
      },
      user_id: 1, // Ensure this is a valid user ID
    };

    fetch("http://localhost:3310/api/markers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMarkerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save marker");
        }
        return response.json();
      })
      .then((data: MarkerType) => {
        console.info("Marker saved successfully:", data); // Log the response

        // Ensure the response contains valid marker data
        if (!data.lat || !data.lng) {
          throw new Error("Invalid marker data received from the server");
        }

        // Add the new marker to the state
        setMarkers((prevMarkers) => [...prevMarkers, data]);

        // Reset the form
        setIsModalOpen(false);
        setNewMarkerPosition(null);
        setEventType(null);
        setDate(null);
        setStartDate(null);
        setEndDate(null);
        setBrand("");
        setModel("");
        setYear(null);
        setEventCategory("");
      })
      .catch((error) => {
        console.error("Failed to save marker:", error); // Log any errors
        alert("Failed to save marker. Please try again.");
      });
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
          {isAddingMarker ? "❌" : "📍"}
        </button>

        {/* Render the search bar with dynamic criteria */}
        {renderSearchBar()}

        {/* Icons for Filtering by Type */}
        <IconsContainer
          icons={icons}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
        />

        {/* Map Container */}
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

          {/* Display Markers */}
          {filteredMarkers.map((marker) => {
            if (
              typeof marker.lat !== "number" ||
              typeof marker.lng !== "number"
            ) {
              console.error("Invalid marker data:", marker);
              return null; // Skip rendering this marker
            }

            return (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
                icon={customIcon}
              >
                <Popup>
                  {marker.label}
                  <br />
                  {marker.details && JSON.stringify(marker.details, null, 2)}
                </Popup>
              </Marker>
            );
          })}

          {/* Render the new marker with custom icon */}
          {newMarkerPosition && (
            <Marker position={newMarkerPosition} icon={customIcon}>
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
                  type="number"
                  placeholder="Year of Birth"
                  value={year || ""}
                  onChange={(e) => setYear(Number.parseInt(e.target.value, 10))}
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
                  type="number"
                  placeholder="Year of Birth"
                  value={year || ""}
                  onChange={(e) => setYear(Number.parseInt(e.target.value, 10))}
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

// Create a component to handle map clicks
const MapClickHandler = ({
  onClick,
}: {
  onClick: (e: LeafletMouseEvent) => void;
}) => {
  useMapEvent("click", onClick);
  return null;
};

interface IconsContainerProps {
  icons: { type: string; icon: string }[];
  activeFilters: string[];
  onFilterToggle: (type: string) => void;
}

function IconsContainer({
  icons,
  activeFilters,
  onFilterToggle,
}: IconsContainerProps) {
  return (
    <div className={styles.iconsContainer}>
      {icons.map(({ type, icon }) => (
        <button
          key={type}
          className={`${styles.icon} ${
            activeFilters.includes(type) ? styles.active : ""
          }`}
          onClick={() => onFilterToggle(type)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onFilterToggle(type);
            }
          }}
          type="button"
        >
          {icon}
        </button>
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
