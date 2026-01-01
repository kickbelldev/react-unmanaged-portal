import { create } from 'zustand'

type PortalMode = 'main' | 'mini' | null
type ReturnPath = string | null

interface PortalState {
  targets: Map<PortalMode, HTMLElement>
  mode: PortalMode
  returnPath: ReturnPath
}

interface PortalActions {
  register: (mode: PortalMode, target: HTMLElement) => void
  unregister: (mode: PortalMode) => void
  setMode: (mode: PortalMode) => void
  setReturnPath: (path: ReturnPath) => void
  reset: () => void
}

const initialState: PortalState = {
  targets: new Map(),
  mode: null,
  returnPath: null,
}

export const usePortalStore = create<PortalState & PortalActions>(
  (set) =>
    ({
      ...initialState,

      register: (mode, target) =>
        set((state) => {
          const targets = new Map(state.targets)
          targets.set(mode, target)
          return { targets }
        }),
      unregister: (mode) =>
        set((state) => {
          const targets = new Map(state.targets)
          targets.delete(mode)
          return { targets }
        }),
      setMode: (mode) => set({ mode }),
      setReturnPath: (path) => set({ returnPath: path }),

      reset: () => set(initialState),
    }) satisfies PortalState & PortalActions,
)
