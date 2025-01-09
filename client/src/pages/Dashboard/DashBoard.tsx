// import styles from "./Dashboard.module.css";

// function Dashboard() {
//   return (
//     <div className={styles.container}>
//       {/* Box 1 */}
//       <div className={styles.box}>
//         <h2 className={styles.title}>Mes Points</h2>
//         <div className={styles.buttons}>
//           <div className={styles.largeButton}>B1</div>
//           <div className={styles.smallButton}>B2</div>
//           <div className={styles.smallButton}>B3</div>
//           <div className={styles.smallButton}>B4</div>
//         </div>
//       </div>

//       {/* Box 2 */}
//       <div className={styles.box}>
//         <h2 className={styles.title}>Mes événements</h2>
//         <input type="text" className={styles.search} placeholder="Recherche" />
//         <div className={styles.details}>
//           <div
//             className={styles.image}
//             style={{
//               backgroundImage: `url('/client/src/assets/images/pictures/contactHeroBanner.jpg')`,
//               backgroundSize: "cover",
//             }}
//           />
//           <div className={styles.inputs}>
//             <input type="text" className={styles.input} placeholder="Date" />
//             <input
//               type="text"
//               className={styles.input}
//               placeholder="Localisation"
//             />
//           </div>
//         </div>
//         <div className={styles.addButton}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             width="24"
//             height="24"
//           >
//             <title>Plus Button</title>
//             <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
//           </svg>
//         </div>
//       </div>

//       {/* Box 3 */}
//       <div className={styles.box}>
//         <h2 className={styles.title}>Mes véhicules</h2>
//         <input type="text" className={styles.search} placeholder="Recherche" />
//         <div className={styles.images}>
//           <div className={styles.placeholder} />
//           <div className={styles.placeholder} />
//         </div>
//         <div className={styles.smallPlaceholder} />
//       </div>

//       {/* Box 4 */}
//       <div className={styles.box}>
//         <h2 className={styles.title}>Annonces favorites</h2>
//         <input type="text" className={styles.search} placeholder="Recherche" />
//       </div>
//     </div>
//   );
// }

// export default Dashboard; //////////////////////////////////////////////////////////////////////////////// 111111

// import { useState } from "react";
// import styles from "./Dashboard.module.css";

// function Dashboard() {
//   const [events, setEvents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     picture: null,
//     date: "",
//     location: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "picture" && files) {
//       const file = files[0];
//       if (file.size > 2 * 1024 * 1024) {
//         alert("File size must be less than 2MB");
//         return;
//       }
//       setFormData((prev) => ({ ...prev, picture: URL.createObjectURL(file) }));
//     } else if (name === "location") {
//       // Ensure the first letter is uppercase
//       setFormData((prev) => ({
//         ...prev,
//         location: value.charAt(0).toUpperCase() + value.slice(1),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCreateEvent = () => {
//     if (!formData.picture || !formData.date || !formData.location) {
//       alert("All fields are required");
//       return;
//     }

//     const today = new Date().toISOString().split("T")[0];
//     if (formData.date < today) {
//       alert("The date cannot be in the past");
//       return;
//     }

//     setEvents((prev) => [...prev, formData]);
//     setFormData({ picture: null, date: "", location: "" });
//     setIsModalOpen(false);
//   };

//   return (
//     <div className={styles.container}>
//       {/* Box 2 */}
//       <div className={styles.box}>
//         <h2 className={styles.title}>Mes événements</h2>
//         <button
//           type="button"
//           className={styles.addButton}
//           onClick={() => setIsModalOpen(true)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             width="24"
//             height="24"
//           >
//             <title>Plus Button</title>
//             <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
//           </svg>
//         </button>

//         <div className={styles.eventList}>
//           {events.map((event, index) => (
//             <div key={index} className={styles.event}>
//               <div
//                 className={styles.image}
//                 style={{
//                   backgroundImage: `url(${event.picture})`,
//                   backgroundSize: "cover",
//                 }}
//               />
//               <div>
//                 <p>Date: {event.date}</p>
//                 <p>Location: {event.location}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Créer un événement</h2>
//             <input
//               type="file"
//               name="picture"
//               accept="image/*"
//               onChange={handleInputChange}
//             />
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location (e.g., Paris)"
//               value={formData.location}
//               onChange={handleInputChange}
//             />
//             <button type="button" onClick={handleCreateEvent}>
//               Créer
//             </button>
//             <button type="button" onClick={() => setIsModalOpen(false)}>
//               Annuler
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard; ///////////////////////////////////////////////////////// 2222222222222222222222222222222

// import type React from "react";
// import { useState, useRef } from "react";
// import styles from "./Dashboard.module.css";

// type Event = {
//   id: number;
//   name: string;
//   picture: string | null;
//   date: string;
//   location: string;
// };

// function Dashboard() {
//   const [formData, setFormData] = useState<{
//     name: string;
//     picture: string | null;
//     date: string;
//     location: string;
//   }>({
//     name: "",
//     picture: null,
//     date: "",
//     location: "",
//   });
//   const [events, setEvents] = useState<Event[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [errors, setErrors] = useState<string[]>([]);
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         picture: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = [];
//     if (!formData.name.trim())
//       newErrors.push("Veuillez donner un nom à l'événement.");
//     if (!formData.date.trim()) newErrors.push("Veuillez choisir une date.");
//     if (!formData.location.trim())
//       newErrors.push("Veuillez renseigner une localisation.");
//     setErrors(newErrors);
//     return newErrors.length === 0;
//   };

//   const addEvent = () => {
//     if (!validateForm()) return;

//     setEvents((prevEvents) => [...prevEvents, { id: Date.now(), ...formData }]);
//     setFormData({ name: "", picture: null, date: "", location: "" });
//     setIsModalOpen(false);
//   };

//   const handleOutsideClick = (event: React.MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className={styles.box}>
//       {/* Title and Search Input */}
//       <h2 className={styles.title}>Mes événements</h2>
//       <input type="text" className={styles.search} placeholder="Recherche" />

//       {/* Event List */}
//       <div>
//         {events.map((event) => (
//           <div key={event.id} className={styles.event}>
//             <div
//               className={styles.image}
//               style={{
//                 backgroundImage: `url(${event.picture})`,
//                 backgroundSize: "cover",
//               }}
//             />
//             <div>
//               <p>Nom: {event.name}</p>
//               <p>Date: {event.date}</p>
//               <p>Location: {event.location}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Event Button */}
//       <button
//         type="button"
//         className={styles.addButton}
//         onClick={() => setIsModalOpen(true)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           width="32"
//           height="32"
//         >
//           <title>Ajouter un événement</title>
//           <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
//         </svg>
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div
//           className={styles.modalOverlay}
//           onClick={handleOutsideClick}
//           onKeyDown={(e) => {
//             if (e.key === "Escape") {
//               setIsModalOpen(false);
//             }
//           }}
//           tabIndex={-1} // Makes the div focusable for keyboard events
//         >
//           <div className={styles.modalContent} ref={modalRef}>
//             <h3>Ajouter un événement</h3>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className={styles.input}
//             />
//             <input
//               type="date"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   date: e.target.value,
//                 }))
//               }
//               className={styles.input}
//             />
//             <input
//               type="text"
//               value={formData.location}
//               placeholder="Localisation"
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   location: e.target.value,
//                 }))
//               }
//               className={styles.input}
//             />
//             <input
//               type="text"
//               value={formData.name}
//               placeholder="Nom de l'événement"
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   name: e.target.value,
//                 }))
//               }
//               className={styles.input}
//             />
//             <div className={styles.modalButtons}>
//               <button
//                 type="button"
//                 onClick={addEvent}
//                 className={styles.largeButton}
//               >
//                 Ajouter
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className={styles.smallButton}
//               >
//                 Annuler
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;                                 ///////////////////////////////////////////////////////////////////////////////////
// import type React from "react";
// import { useState, useRef } from "react";
// import styles from "./Dashboard.module.css";

// type Event = {
//   _id: any;
//   id: number;
//   name: string;
//   picture: string | null;
//   date: string;
//   location: string;
// };

// function Dashboard() {
//   const [formData, setFormData] = useState<{
//     id: number | null; // To differentiate between adding and editing events
//     name: string;
//     picture: string | null;
//     date: string;
//     location: string;
//   }>({
//     id: null,
//     name: "",
//     picture: null,
//     date: "",
//     location: "",
//   });

//   const [events, setEvents] = useState<Event[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [errors, setErrors] = useState<string[]>([]);
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         picture: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = [];
//     if (!formData.name.trim())
//       newErrors.push("Veuillez donner un nom à l'événement.");
//     if (!formData.date.trim()) newErrors.push("Veuillez choisir une date.");
//     if (!formData.location.trim())
//       newErrors.push("Veuillez renseigner une localisation.");
//     setErrors(newErrors);
//     return newErrors.length === 0;
//   };

//   const addOrUpdateEvent = () => {
//     if (!validateForm()) return;

//     if (formData.id) {
//       // Update existing event
//       setEvents((prevEvents) => {
//         return prevEvents.map((event) =>
//           event.id === formData.id ? { ...event, ...formData } : event,
//         );
//       });
//     } else {
//       // Add new event
//       setEvents((prevEvents) => {
//         return [
//           ...prevEvents,
//           {
//             _id: Date.now(),
//             get id() {
//               return this._id;
//             },
//             set id(value) {
//               this._id = value;
//             },
//             ...formData,
//           },
//         ];
//       });
//     }

//     setFormData({ id: null, name: "", picture: null, date: "", location: "" });
//     setIsModalOpen(false);
//   };

//   const handleEventClick = (event: Event) => {
//     setFormData({ ...event });
//     setIsModalOpen(true);
//   };

//   const handleOutsideClick = (event: React.MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className={styles.box}>
//       <h2 className={styles.title}>Mes événements</h2>
//       <input type="text" className={styles.search} placeholder="Recherche" />

//       <div>
//         {events.map((event) => (
//           // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
//           <div
//             key={event.id}
//             className={styles.event}
//             onClick={() => handleEventClick(event)}
//           >
//             <div
//               className={styles.image}
//               style={{
//                 backgroundImage: event.picture
//                   ? `url(${event.picture})`
//                   : "url(/default-placeholder.png)",
//                 backgroundSize: "cover",
//               }}
//             />
//             <div>
//               <p>Nom: {event.name}</p>
//               <p>Date: {event.date}</p>
//               <p className={styles.locationText}>
//                 Localisation: {event.location.toUpperCase()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         type="button"
//         className={styles.addButton}
//         onClick={() => setIsModalOpen(true)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           width="32"
//           height="32"
//         >
//           <title>Ajouter un événement</title>
//           <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
//         </svg>
//       </button>

//       {isModalOpen && (
//         <div
//           className={styles.modalOverlay}
//           onClick={handleOutsideClick}
//           onKeyDown={(e) => {
//             if (e.key === "Escape") {
//               setIsModalOpen(false);
//             }
//           }}
//           tabIndex={-1}
//         >
//           <div className={styles.modalContent} ref={modalRef}>
//             <h3>
//               {formData.id ? "Modifier l'événement" : "Ajouter un événement"}
//             </h3>
//             {errors.map((error, index) => (
//               // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
//               <p key={index} className={styles.errorMessage || "error-message"}>
//                 {error}
//               </p>
//             ))}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className={styles.input}
//             />
//             <input
//               type="date"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   date: e.target.value,
//                 }))
//               }
//               className={styles.input}
//             />
//             <input
//               type="text"
//               value={formData.location}
//               placeholder="Localisation"
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   location: e.target.value,
//                 }))
//               }
//               className={styles.input}
//             />
//             <input
//               type="text"
//               value={formData.name}
//               placeholder="Nom de l'événement"
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   name: e.target.value,
//                 }))
//               }
//               className={styles.input}
//             />
//             <div className={styles.modalButtons}>
//               <button
//                 type="button"
//                 onClick={addOrUpdateEvent}
//                 className={styles.largeButton}
//               >
//                 {formData.id ? "Modifier" : "Ajouter"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className={styles.smallButton}
//               >
//                 Annuler
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard; ///////////////////////////////////////////////// 6666666666666666666666666666666666666666666666666666666

import type React from "react";
import { useRef, useState } from "react";
import styles from "./Dashboard.module.css";

type Event = {
  _id: number; // Use number for consistency
  id: number;
  name: string;
  picture: string | null;
  date: string;
  location: string;
};

function Dashboard() {
  const [formData, setFormData] = useState<{
    id: number; // Match Event type
    name: string;
    picture: string | null;
    date: string;
    location: string;
  }>({
    id: -1, // Use -1 as a placeholder for new events
    name: "",
    picture: null,
    date: "",
    location: "",
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        picture: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.name.trim())
      newErrors.push("Veuillez donner un nom à l'événement.");
    if (!formData.date.trim()) newErrors.push("Veuillez choisir une date.");
    if (!formData.location.trim())
      newErrors.push("Veuillez renseigner une localisation.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const addOrUpdateEvent = () => {
    if (!validateForm()) return;

    if (formData.id !== -1) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === formData.id ? { ...event, ...formData } : event,
        ),
      );
    } else {
      // Add new event
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...formData, // Spread formData first
          _id: Date.now(),
          id: Date.now(), // Explicitly set id after spreading formData
        },
      ]);
    }

    setFormData({
      id: -1,
      name: "",
      picture: null,
      date: "",
      location: "",
    });
    setIsModalOpen(false);
  };

  const handleEventClick = (event: Event) => {
    setFormData({ ...event });
    setIsModalOpen(true);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Mes événements</h2>
      <input type="text" className={styles.search} placeholder="Recherche" />

      <div>
        {events.map((event) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            key={event.id}
            className={styles.event}
            onClick={() => handleEventClick(event)}
          >
            <div
              className={styles.image}
              style={{
                backgroundImage: event.picture
                  ? `url(${event.picture})`
                  : "url(/default-placeholder.png)",
                backgroundSize: "cover",
              }}
            />
            <div>
              <p>Nom: {event.name}</p>
              <p>Date: {event.date}</p>
              <p className={styles.locationText}>
                Localisation: {event.location.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="32"
          height="32"
        >
          <title>Ajouter un événement</title>
          <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={handleOutsideClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsModalOpen(false);
            }
          }}
          tabIndex={-1}
        >
          <div className={styles.modalContent} ref={modalRef}>
            <h3>
              {formData.id !== -1
                ? "Modifier l'événement"
                : "Ajouter un événement"}
            </h3>
            {errors.map((error, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <p key={index} className={styles.errorMessage || "error-message"}>
                {error}
              </p>
            ))}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className={styles.input}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.location}
              placeholder="Localisation"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className={styles.input}
            />
            <input
              type="text"
              value={formData.name}
              placeholder="Nom de l'événement"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={addOrUpdateEvent}
                className={styles.largeButton}
              >
                {formData.id !== -1 ? "Modifier" : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.smallButton}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
