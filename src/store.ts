import create from 'zustand'

interface Store {
	loaded: boolean
	setLoaded: (loaded: boolean) => void
}

export const useStore = create<Store>((set) => ({
	loaded: false,
	setLoaded: (loaded) => set({ loaded }),
}))
