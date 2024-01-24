import { create } from 'zustand'

const useChoosePlayerStore = create((set) => ({
  choosePlayerState: true,
  toggle: (newState) => set(() => ({ choosePlayerState: newState })),
}))

export {
    useChoosePlayerStore
}