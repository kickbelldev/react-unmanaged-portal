# 아키텍처 리팩토링 설계

## 목표

모듈 경계와 의존성 방향을 명확히 하여 portal/player 책임을 분리한다.

## 핵심 원칙

1. **portal** = 순수 DOM 이동 메커니즘 + 위치별 컨테이너/컨트롤
2. **player** = 비디오 요소 + 재생 상태 + UI 컨트롤
3. MiniPlayer는 portal store를 직접 구독하지 않음

## 최종 모듈 구조

### portal feature

```
features/portal/
├── model/store.ts               # targets, mode, returnPath
├── components/
│   ├── PortalHost.tsx           # unmanaged DOM + createPortal
│   ├── PortalSlot.tsx           # DOM ref 등록
│   ├── MainPortal.tsx           # main PortalSlot + mode 설정
│   ├── MiniPortal.tsx           # mini PortalSlot + 닫기/돌아가기
│   └── MiniPortalContainer.tsx  # visibility + fixed 컨테이너 (신규)
└── index.ts
```

### player feature

```
features/player/
├── model/store.ts           # videoRef, src, isPlaying, currentTime, duration
├── components/
│   ├── VideoElement.tsx     # <video> 요소
│   ├── MainPlayer.tsx       # MainPortal 래퍼
│   ├── MiniPlayer.tsx       # MiniPortalContainer + MiniPortal + VideoControls
│   └── VideoControls.tsx    # 재생/일시정지, 진행바, 정보 표시 (신규)
└── index.ts
```

## 컴포넌트 설계

### MiniPortalContainer (신규)

visibility 체크 + fixed 컨테이너 담당. children을 받아 렌더링.

```tsx
function MiniPortalContainer({ children }) {
  const isActive = usePortalStore((s) => s.mode === 'mini')

  if (!isActive) return null

  return (
    <div className="fixed right-4 bottom-4 z-50 ...">
      {children}
    </div>
  )
}
```

### MiniPortal (수정)

PortalSlot + portal 컨트롤(닫기, 돌아가기).

```tsx
function MiniPortal() {
  const returnPath = usePortalStore((s) => s.returnPath)
  const reset = usePortalStore((s) => s.reset)

  return (
    <>
      <PortalSlot mode="mini" />
      <button onClick={reset}>✕</button>
      <Link to={returnPath}>돌아가기</Link>
    </>
  )
}
```

### MiniPlayer (수정)

portal store 직접 구독 없이 조합만 담당.

```tsx
function MiniPlayer() {
  return (
    <MiniPortalContainer>
      <MiniPortal />
      <VideoControls />
    </MiniPortalContainer>
  )
}
```

### VideoControls (신규)

재생 컨트롤 + 정보 표시.

```tsx
function VideoControls() {
  const isPlaying = usePlayerStore((s) => s.isPlaying)
  const currentTime = usePlayerStore((s) => s.currentTime)
  const duration = usePlayerStore((s) => s.duration)
  const togglePlay = usePlayerStore((s) => s.togglePlay)

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
    </div>
  )
}
```

## Player Store 확장

```typescript
interface PlayerState {
  videoRef: HTMLVideoElement | null
  src: string | null
  isPlaying: boolean
  currentTime: number
  duration: number
}

interface PlayerActions {
  setVideoRef: (ref: HTMLVideoElement | null) => void
  initVideo: (src: string) => void
  togglePlay: () => void
  seek: (time: number) => void
  syncTime: (current: number, duration: number) => void
  reset: () => void
}
```

## 삭제 대상

- `src/features/portal/model/target.ts` (dead code)

## 구현 순서

1. MiniPortalContainer 생성
2. MiniPortal 수정
3. Player store 확장
4. VideoControls 생성
5. MiniPlayer 수정
6. VideoElement 수정 (시간 동기화)
7. target.ts 삭제
8. index.ts exports 정리
