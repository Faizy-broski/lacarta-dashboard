import { useEffect, useRef } from 'react'
// import { useRouterState } from '@tanstack/react-router'
import { useNavigation } from 'react-router-dom'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  // const state = useRouterState()
  const navigation = useNavigation()

  useEffect(() => {
    // if (state.status === 'pending') {
    if (navigation.state === 'loading') {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [navigation.state])

  return (
    <LoadingBar
      color='var(--muted-foreground)'
      ref={ref}
      shadow={true}
      height={2}
    />
  )
}
