import { Link } from '@tanstack/react-router'

import { MiniPortal, usePortalStore } from '@/features/portal'

export function MiniPlayer() {
  const mode = usePortalStore((s) => s.mode)
  const returnPath = usePortalStore((s) => s.returnPath)
  const deactivate = usePortalStore((s) => s.deactivate)

  if (mode !== 'mini') return null

  return (
    <div className="fixed right-4 bottom-4 z-50 w-80 overflow-hidden rounded-lg bg-black shadow-2xl">
      <Link to={returnPath ?? '/'} className="block aspect-video">
        <MiniPortal />
      </Link>
      <button
        onClick={deactivate}
        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
      >
        ✕
      </button>
    </div>
  )
}
