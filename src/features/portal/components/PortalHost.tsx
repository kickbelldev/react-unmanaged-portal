import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { usePortalStore } from '../model/store'

interface PortalHostProps {
  children: ReactNode
}

export function PortalHost({ children }: PortalHostProps) {
  const unmanagedNodeRef = useRef<HTMLDivElement>(document.createElement('div'))

  const targets = usePortalStore((s) => s.targets)
  const mode = usePortalStore((s) => s.mode)
  const target = targets.get(mode)

  useEffect(() => {
    const unmanagedNode = unmanagedNodeRef.current

    if (unmanagedNode && target && !target.contains(unmanagedNode)) {
      target.appendChild(unmanagedNode)
    }

    return () => {
      if (unmanagedNode?.parentElement) {
        unmanagedNode.parentElement.removeChild(unmanagedNode)
      }
    }
  }, [target])
  // eslint-disable-next-line react-hooks/refs
  return <>{createPortal(children, unmanagedNodeRef.current)}</>
}
