import { create } from 'zustand'

type PortalMode = 'main' | 'mini'

interface PortalState {
  mode: PortalMode | null
  returnPath: string | null
  onClose: (() => void) | null
}

interface PortalActions {
  activate: (returnPath: string, onClose?: () => void) => void
  deactivate: () => void
  setMode: (mode: PortalMode) => void
}

export const usePortalStore = create<PortalState & PortalActions>((set, get) => ({
  mode: null,
  returnPath: null,
  onClose: null,

  activate: (returnPath, onClose) => {
    get().onClose?.()
    set({ mode: 'main', returnPath, onClose: onClose ?? null })
  },

  deactivate: () => {
    get().onClose?.()
    set({ mode: null, returnPath: null, onClose: null })
  },

  setMode: (mode) => {
    set({ mode })
  },
}))
