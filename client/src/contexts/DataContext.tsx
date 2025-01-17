import { createContext, useContext } from "react";
import { useState } from "react";

/* Import des différents composants ou img */

/* Déclarations des types */

/* Création du context */
const DataContext = createContext(null);

/* Déclaration des valeurs mise a disposition dans le context */
const [data, setData] = useState([]);
