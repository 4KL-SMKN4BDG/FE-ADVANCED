import { create } from "zustand";

interface IdStore {
  selectedId: string;
  setSelectedId: (id: string) => void;
}

const idStore = create<IdStore>((set) => ({
  selectedId: "",
  setSelectedId: (id: string) => set({ selectedId: id }),
}));

export default idStore;
