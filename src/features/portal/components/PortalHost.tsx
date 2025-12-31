import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { usePortalStore } from '../model/store'

interface PortalHostProps {
  children: ReactNode
}

export function PortalHost({ children }: PortalHostProps) {
  const container = usePortalStore((s) => s.container)

  return createPortal(children, container)
}
