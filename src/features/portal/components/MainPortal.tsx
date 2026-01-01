import { useEffect } from 'react'

import { usePortalStore } from '../model/store'

import { PortalSlot } from './PortalSlot'

interface MainPortalProps {
  pathname: string
}

export function MainPortal({ pathname }: MainPortalProps) {
  const setReturnPath = usePortalStore((s) => s.setReturnPath)
  const setMode = usePortalStore((s) => s.setMode)

  useEffect(() => {
    setReturnPath(pathname)
    setMode('main')

    return () => setMode('mini')
  }, [pathname, setMode, setReturnPath])

  return <PortalSlot mode="main" />
}
