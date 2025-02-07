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
// Import Marker interface
import type { Marker as MarkerType } from "../../types/marker";

import { useAuth } from "../../contexts/AuthContext";
import api from "../../helpers/api";
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

function Maps({ center = [48.85837, 2.294481], zoom = 13 }: MapsProps) {
  const { user } = useAuth();
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

  // Fetch markers based on active filters
  const fetchMarkers = async (query?: string) => {
    try {
      const url = query
        ? `http://localhost:3310/api/markers/search?query=${encodeURIComponent(
            query,
          )}`
        : "http://localhost:3310/api/markers";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch markers");
      }

      const data: MarkerType[] = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error("Failed to fetch markers:", error);
    }
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
    const markerEventType = marker.details?.eventType?.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    return activeFilters.some(
      (filter) => filter.toLowerCase() === markerEventType,
    );
  });

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

  const handleModalSubmit = async () => {
    if (!eventType || (!date && !startDate && !endDate)) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      // Formatage des dates en "YYYY-MM-DD"
      const formatDate = (date: Date | null) =>
        date ? date.toISOString().split("T")[0] : "";

      const formattedDate = isRange
        ? `${formatDate(startDate)} to ${formatDate(endDate)}`
        : formatDate(date);

      // Récupération des coordonnées GPS
      const latitude = newMarkerPosition?.[0] || 0;
      const longitude = newMarkerPosition?.[1] || 0;

      // Récupération de l'adresse avec l'API de géocodage inverse
      let address = "Adresse inconnue"; // Valeur par défaut si l'API échoue
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`,
        );
        const data = await response.json();
        if (data.features.length > 0) {
          address = data.features[0].properties.label; // Adresse formatée
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse :", error);
      }

      // Création du nouvel objet marker avec l'adresse
      const newMarkerData = {
        lat: latitude,
        lng: longitude,
        label: `Type: ${eventType}, Date: ${formattedDate}`,
        details: {
          eventType,
          date: formattedDate,
          address,
          ...(eventType === "car" || eventType === "motorcycle"
            ? { brand, model, year }
            : { type: eventCategory, duration: formattedDate }),
        },
        user_id: user?.id || "",
      };

      // Envoi du marker au serveur
      const addMarker = await api.post("/api/markers", newMarkerData);

      if (addMarker.status !== 201) {
        console.error("Échec de l'enregistrement du marker");
        alert("Échec de l'enregistrement du marker. Veuillez réessayer.");
        return;
      }

      // Ajout de l'événement si nécessaire
      switch (eventType) {
        case "event":
          await api.post("/api/events", {
            title: `Événement: ${eventCategory}`,
            type: "Salon", // Ici, c'est un exemple, mais il faut ajouter un champ pour le type d'événement
            date_start: formatDate(startDate),
            date_end: formatDate(endDate),
            address,
            location: {
              x: newMarkerPosition?.[0] || 0,
              y: newMarkerPosition?.[1] || 0,
            },
            user_id: user?.id || "",
          });
          break;
        case "car":
        case "motorcycle":
          await api.post("/api/vehicules", {
            brand,
            model,
            year,
            user_id: user?.id || "",
          });
          break;
        default:
          console.error("Type d'événement invalide :", eventType);
          return;
      }

      const data: MarkerType = addMarker.data;
      console.info("Marker enregistré avec succès :", data);

      if (!data.lat || !data.lng) {
        throw new Error("Données du marker invalides reçues depuis le serveur");
      }

      // Ajout du marker dans le state
      setMarkers((prevMarkers) => [...prevMarkers, data]);

      // Réinitialisation du formulaire
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
    } catch (error) {
      console.error("Échec de l'enregistrement du marker :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const url = `http://localhost:3310/api/markers/search?query=${encodeURIComponent(
        query,
      )}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch markers");
      }

      const data: MarkerType[] = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error("Failed to fetch markers:", error);
    }
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

        <SearchBar
          placeholder="Rechercher un lieu..."
          onSearch={handleSearch}
        />
        <IconsContainer
          icons={icons}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
        />

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

          {filteredMarkers.map((marker) => {
            // Check if lat and lng are valid numbers
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
                position={[marker.lat, marker.lng]} // Use lat and lng directly
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

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
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
          type="button" // Explicitly set the button type
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
