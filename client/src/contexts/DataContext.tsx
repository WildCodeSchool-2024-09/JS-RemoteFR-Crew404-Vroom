import { createContext, useContext } from "react";
import { useState } from "react";

/* Import des différents composants ou img */

/* Déclarations des types */

interface childrenType {
  children: React.ReactNode;
}

interface VroomType {
  Valeur1: string;
  Valeur2: boolean;
  Valeur3: number;
}

interface dataType {
  data: VroomType[];
  setData: React.Dispatch<React.SetStateAction<VroomType[]>>;
}

/* Création du context */

const DataContext = createContext<dataType | null>(null);

/* Déclaration des valeurs mise a disposition dans le context */

const Vroom = [
  {
    Valeur1: "",
    Valeur2: true,
    valeur3: 0,
  },
  {
    Valeur1: "",
    Valeur2: false,
    Valeur3: 0,
  },
];
/* Mise a disposition du contexte */
export function DataProvider({ children }: childrenType) {
  const [data, setData] = useState<VroomType[]>(Vroom);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const data = useContext(DataContext);
  if (!data) {
    throw new Error(
      "useData doit être utilisé à l'intérieur d'un DataProvider.",
    );
  }
  return data;
};
