import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { usePlayerStore, MainPlayer } from '@/features/player'
import { usePortalStore } from '@/features/portal'

import { VIDEO_SOURCES } from '@/constants/VIDEO_SOURCES'

export const Route = createFileRoute('/video/$id')({
  component: VideoPage,
})

function VideoPage() {
  const { id } = Route.useParams() as { id: string }

  // portal
  const register = usePortalStore((s) => s.register)
  const setMode = usePortalStore((s) => s.setMode)

  // player
  const play = usePlayerStore((s) => s.play)
  const currentSrc = usePlayerStore((s) => s.src)

  const src = VIDEO_SOURCES[id] ?? VIDEO_SOURCES['1']

  useEffect(() => {
    if (currentSrc !== src) {
      play(src)
    } else {
      setMode('main')
    }

    return () => setMode('mini')
  }, [src, currentSrc, register, play, setMode])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Video {id}</h1>
      <MainPlayer />
    </div>
  )
}
