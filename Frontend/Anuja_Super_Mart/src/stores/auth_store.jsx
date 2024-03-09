import {create} from 'zustand';

const useStore = create((set) => ({
    user: null,
    setUser: (token) => set({ user: token }),
}));

export { useStore };
