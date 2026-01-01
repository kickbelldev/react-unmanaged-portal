import { useLayoutEffect, useRef } from 'react'

import { usePortalStore } from '../model/store'

interface PortalSlotProps {
  mode: 'main' | 'mini'
}

export function PortalSlot({ mode }: PortalSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null)
  const register = usePortalStore((s) => s.register)
  const unregister = usePortalStore((s) => s.unregister)

  useLayoutEffect(() => {
    if (slotRef.current) {
      register(mode, slotRef.current)
    }

    return () => unregister(mode)
  }, [mode, register, unregister])

  return <div ref={slotRef} className="contents" />
}
