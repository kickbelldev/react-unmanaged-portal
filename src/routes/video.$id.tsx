import { createFileRoute } from '@tanstack/react-router'

import { MainPlayer } from '@/features/player'

import { VIDEO_SOURCES } from '@/constants/VIDEO_SOURCES'

import useStablePathname from '@/shared/hooks/useStableLocation'

export const Route = createFileRoute('/video/$id')({
  component: VideoPage,
})

function VideoPage() {
  const { id } = Route.useParams()
  const pathname = useStablePathname()
  const src = VIDEO_SOURCES[id] ?? VIDEO_SOURCES['1']

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Video {id}</h1>
      <MainPlayer src={src} pathname={pathname} />
    </div>
  )
}
