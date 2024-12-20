"use client";

import { useContext, createContext, useState } from "react";

import { OffersType } from "@/lib/types";

import { DataContextType } from "./types";

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Component should be placed in DataProvider !");
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<OffersType[]>([]);
  const [techFilteredData, setTechFilteredData] =
    useState<OffersType[]>(records);
  const [filteredData, setFilteredData] = useState<OffersType[]>(records);
  const [offerId, setOfferId] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        records,
        setRecords,
        filteredData,
        setFilteredData,
        techFilteredData,
        setTechFilteredData,
        offerId,
        setOfferId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
