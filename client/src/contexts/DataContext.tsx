import { createContext, useContext } from "react";
import { useState } from "react";

/* Import des différents composants ou img */

/* Déclarations des types */

interface childrenType {
  children: React.ReactNode;
}

interface VroomType {
  Value1: string;
  Value2: boolean;
  Value3: number;
}

interface dataType {
  data: VroomType[];
  setData: React.Dispatch<React.SetStateAction<VroomType[]>>;
}

/* Création du context */

const DataContext = createContext<dataType | null>(null);

/* Déclaration des Value mise a disposition dans le context */

const Vroom = [
  {
    Value1: "",
    Value2: true,
    Value3: 0,
  },
  {
    Value1: "",
    Value2: false,
    Value3: 0,
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
