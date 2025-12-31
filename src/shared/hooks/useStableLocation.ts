import { useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export default function useStableLocation() {
  const { isLoading, pathname } = useRouterState({
    select: (state) => ({
      isLoading: state.isLoading,
      pathname: state.location.pathname,
    }),
  })
  const [stablePathname, setStablePathname] = useState<string>(pathname)

  useEffect(() => {
    if (!isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStablePathname(pathname)
    }
  }, [isLoading, pathname])

  return stablePathname
}
