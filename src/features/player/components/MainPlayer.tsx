import { useEffect } from 'react'

import { MainPortal, usePortalStore } from '@/features/portal'

import { usePlayerStore } from '../model/store'

interface MainPlayerProps {
  pathname: string
  src: string
}

export function MainPlayer({ src, pathname }: MainPlayerProps) {
  const activate = usePortalStore((s) => s.activate)
  const setMode = usePortalStore((s) => s.setMode)

  const play = usePlayerStore((s) => s.play)
  const stop = usePlayerStore((s) => s.stop)

  useEffect(() => {
    activate(pathname, stop)
    return () => setMode('mini')
  }, [pathname, activate, stop, setMode])

  useEffect(() => {
    play(src)
  }, [play, src])

  return (
    <div className="aspect-video max-w-4xl overflow-hidden rounded-lg bg-black">
      <MainPortal />
    </div>
  )
}
