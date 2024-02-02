import { create } from "zustand";

interface BottomModalStore {
    isOpen: boolean;
    children: React.ReactNode;
    onOpen: (children: React.ReactNode) => void;
    onClose: () => void;
}

const useBottomModalStore = create<BottomModalStore>((set) => ({
    isOpen: false,
    children: null,
    onOpen: (children) => set({isOpen: true, children}),
    onClose: () => set({isOpen: false, children: null})
}))

export default useBottomModalStore