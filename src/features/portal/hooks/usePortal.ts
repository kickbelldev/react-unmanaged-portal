import { DEFAULT_PORTAL_ID, usePortalStore } from '../model/store'

export function usePortal(portalId: string = DEFAULT_PORTAL_ID) {
  const portal = usePortalStore((s) => s.portals.get(portalId))
  const register = usePortalStore((s) => s.register)
  const unregister = usePortalStore((s) => s.unregister)
  const setModeAction = usePortalStore((s) => s.setMode)
  const setReturnPathAction = usePortalStore((s) => s.setReturnPath)
  const resetPortalAction = usePortalStore((s) => s.resetPortal)

  const mode = portal?.mode ?? null
  const returnPath = portal?.returnPath ?? null
  const targets = portal?.targets ?? new Map()

  const setMode = (newMode: string | null) => setModeAction(portalId, newMode)

  const setReturnPath = (path: string | null) =>
    setReturnPathAction(portalId, path)

  const reset = () => resetPortalAction(portalId)

  const registerTarget = (targetMode: string, target: HTMLElement) =>
    register(portalId, targetMode, target)

  const unregisterTarget = (targetMode: string) =>
    unregister(portalId, targetMode)

  return {
    mode,
    returnPath,
    targets,
    setMode,
    setReturnPath,
    reset,
    registerTarget,
    unregisterTarget,
  }
}
