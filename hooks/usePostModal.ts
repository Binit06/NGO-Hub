import { create } from "zustand";

interface PostModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usePostModelStore = create<PostModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default usePostModelStore