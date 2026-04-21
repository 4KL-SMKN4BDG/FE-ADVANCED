import { create } from "zustand";

interface Payload {
  selectedType: string;
  setSelectedType: (type: string) => void;
  search: string;
  setSearch: (search: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export const initialState = create<Payload>((set) => ({
  selectedType: "ALL",
  setSelectedType: (type: string) => set({ selectedType: type }),
  search: "",
  setSearch: (search: string) => set({ search }),
  startDate: "",
  setStartDate: (date: string) =>
    set({ startDate: new Date(date).toISOString() }),
  endDate: "",
  setEndDate: (date: string) => set({ endDate: new Date(date).toISOString() }),
}));
