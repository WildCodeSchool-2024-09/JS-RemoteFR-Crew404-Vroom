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
import MarkerClusterGroup from "react-leaflet-cluster"; // Import MarkerClusterGroup
import pinMapIcon from "../../assets/images/svg/pinMap.svg";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../helpers/api";
import { errorToast, infoToast, successToast } from "../../services/toast";
import type { Marker as MarkerType } from "../../types/marker";

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

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchCriterion, setSearchCriterion] = useState<
    "brand" | "model" | "year" | "eventCategory"
  >("brand");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const icons = [
    { type: "car", icon: "🚗" },
    { type: "motorcycle", icon: "🏍️" },
    { type: "event", icon: "🎉" },
  ];

  useEffect(() => {
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    try {
      const url = "http://localhost:3310/api/markers/search";
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append("criterion", searchCriterion);
        params.append("query", searchQuery);
      }

      if (activeFilters.length > 0) {
        params.append("types", activeFilters.join(","));
      }
      console.info("Fetching markers with parameters:", params.toString());
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch markers: ${response.statusText}`);
      }

      const data = await response.json();
      console.info("Received markers data:", data);
      setMarkers(data);
    } catch (error) {
      console.error("Failed to fetch markers:", error);
      errorToast(
        "Invalid search criteria. Please check your filters and try again.",
      );
    }
  };

  const handleCriterionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriterion(
      e.target.value as "brand" | "model" | "year" | "eventCategory",
    );
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchMarkers();
  };

  const handleFilterToggle = (type: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(type)
        ? prevFilters.filter((filter) => filter !== type)
        : [...prevFilters, type],
    );
  };

  const filteredMarkers = markers.filter((marker) => {
    if (activeFilters.length === 0) return true;

    const markerEventType = marker.details?.eventType?.toLowerCase();
    return activeFilters.some(
      (filter) => filter.toLowerCase() === markerEventType,
    );
  });

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
    return [];
  };

  const renderSearchBar = () => {
    const criteria = getSearchCriteria();

    if (criteria.length === 0) {
      return null;
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

  const handleModalSubmit = async () => {
    if (!eventType || (!date && !startDate && !endDate)) {
      infoToast("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const formatDate = (date: Date | null) =>
        date ? date.toISOString().split("T")[0] : "";

      const formattedDate = isRange
        ? `${formatDate(startDate)} to ${formatDate(endDate)}`
        : formatDate(date);

      const latitude = newMarkerPosition?.[0] || 0;
      const longitude = newMarkerPosition?.[1] || 0;

      let address = "Adresse inconnue";
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`,
        );
        const data = await response.json();
        if (data.features.length > 0) {
          address = data.features[0].properties.label;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse :", error);
      }

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
      console.info("New Marker Data:", newMarkerData);
      // Ici je poste une 1ère fois
      const addMarker = await api.post("/api/markers", newMarkerData);

      if (addMarker.status !== 201) {
        console.error("Échec de l'enregistrement du marker");
        errorToast("Échec de l'enregistrement du marker. Veuillez réessayer.");
        return;
      }

      switch (eventType) {
        case "event":
          // je poste une 2eme fois le marker
          await api.post("/api/events", {
            title: `Événement: ${eventCategory}`,
            type: "Salon",
            date_start: formatDate(startDate),
            date_end: formatDate(endDate),
            address,
            location: {
              x: newMarkerPosition?.[0] || 0,
              y: newMarkerPosition?.[1] || 0,
              address,
            },
            user_id: user?.id || "",
            isMap: true,
          });
          break;
        case "car":
        case "motorcycle":
          await api.post("/api/vehicules", {
            brand,
            model,
            year,
            location: address,
            user_id: user?.id || "",
            isMap: true,
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

      setMarkers((prevMarkers) => [...prevMarkers, data]);

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
      successToast("Marker enregistré avec succès !");
    } catch (error) {
      console.error("Échec de l'enregistrement du marker :", error);
      errorToast("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
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

        {renderSearchBar()}

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

          <MapClickHandler onClick={handleMapClick} />

          {/* Wrap markers in MarkerClusterGroup */}
          <MarkerClusterGroup>
            {filteredMarkers.map((marker) => {
              if (
                typeof marker.lat !== "number" ||
                typeof marker.lng !== "number"
              ) {
                console.error("Invalid marker data:", marker);
                return null;
              }

              return (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  icon={customIcon}
                >
                  <Popup>
                    <div
                      style={{
                        color: "var(--primary-color)",
                        backgroundColor: "var(--fifthly-color)",
                        padding: "8px",
                        borderRadius: "5px",
                      }}
                    >
                      {marker.label && (
                        <strong style={{ color: "var(--tertiary-color)" }}>
                          {marker.label}
                        </strong>
                      )}
                      <br />
                      {marker.details && (
                        <div
                          style={{
                            color: "var(--secondary-color)",
                            backgroundColor: "var(--light)",
                            padding: "6px",
                            borderRadius: "3px",
                            marginTop: "5px",
                          }}
                        >
                          <p>
                            <strong>Type d'événement :</strong>{" "}
                            {marker.details.eventType}
                          </p>
                          <p>
                            <strong>Date :</strong> {marker.details.date}
                          </p>
                          {marker.details.brand && (
                            <p>
                              <strong>Marque :</strong> {marker.details.brand}
                            </p>
                          )}
                          {marker.details.model && (
                            <p>
                              <strong>Modèle :</strong> {marker.details.model}
                            </p>
                          )}
                          {marker.details.year && (
                            <p>
                              <strong>Année :</strong> {marker.details.year}
                            </p>
                          )}
                          {marker.details.eventCategory && (
                            <p>
                              <strong>Catégorie :</strong>{" "}
                              {marker.details.eventCategory}
                            </p>
                          )}
                          {marker.details.duration && (
                            <p>
                              <strong>Durée :</strong> {marker.details.duration}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {newMarkerPosition && (
              <Marker position={newMarkerPosition} icon={customIcon}>
                <Popup>New Marker</Popup>
              </Marker>
            )}
          </MarkerClusterGroup>

          <AdjustZoomControls />
        </MapContainer>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add Point of Interest</h3>

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
