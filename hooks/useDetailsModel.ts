import { create } from "zustand";

interface DeatilsModelStore {
    isOpen: boolean;
    children: React.ReactNode;
    onOpen: (children: React.ReactNode) => void;
    onClose: () => void;
}

const useDetailsModelStore = create<DeatilsModelStore>((set) => ({
    isOpen: false,
    children: null,
    onOpen: (children) => set({isOpen: true, children}),
    onClose: () => set({isOpen: false, children: null})
}))

export default useDetailsModelStore