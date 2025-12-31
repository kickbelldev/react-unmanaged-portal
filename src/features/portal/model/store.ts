import { create } from 'zustand'

type PortalMode = 'main' | 'mini'

interface PortalState {
  container: HTMLDivElement
  mode: PortalMode | null
  onClose: (() => void) | null
}

interface PortalActions {
  activate: (onClose?: () => void) => void
  deactivate: () => void
  setMode: (mode: PortalMode) => void
}

const container = document.createElement('div')
container.style.width = '100%'
container.style.height = '100%'

export const usePortalStore = create<PortalState & PortalActions>((set, get) => ({
  container,
  mode: null,
  onClose: null,

  activate: (onClose) => {
    // 이전 상태 있으면 먼저 정리
    get().onClose?.()
    set({ mode: 'main', onClose: onClose ?? null })
  },

  deactivate: () => {
    get().onClose?.()
    set({ mode: null, onClose: null })
  },

  setMode: (mode) => {
    set({ mode })
  },
}))
