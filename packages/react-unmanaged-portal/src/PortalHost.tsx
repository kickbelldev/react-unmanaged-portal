import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { DEFAULT_PORTAL_ID } from './store'
import { usePortal } from './usePortal'

interface PortalHostProps<T extends keyof HTMLElementTagNameMap = 'div'> {
  portalId?: string
  children: ReactNode
  as?: T
}

export function PortalHost<T extends keyof HTMLElementTagNameMap = 'div'>({
  portalId = DEFAULT_PORTAL_ID,
  children,
  as,
}: PortalHostProps<T>) {
  const container = as ?? 'div'
  const unmanagedNodeRef = useRef<HTMLElement>(document.createElement(container))

  const { mode, targets } = usePortal(portalId)
  const target = targets.get(mode ?? '')

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

  return <>{createPortal(children, unmanagedNodeRef.current)}</>
}
