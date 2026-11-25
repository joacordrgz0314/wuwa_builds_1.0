import { useEffect, useRef, useState } from 'react'

export default function ScrollableRow({ as: Row = 'span', contentAs: Content = 'span', contentClassName, label, focusable = true, children }) {
  const scroller = useRef(null)
  const content = useRef(null)
  const [scrollState, setScrollState] = useState({ overflow: false, more: false })
  const [hovered, setHovered] = useState(false)

  function measure() {
    const row = scroller.current
    const remaining = row.scrollWidth - row.clientWidth
    const overflow = remaining > 1
    const more = remaining - row.scrollLeft > 1
    setScrollState((previous) =>
      previous.overflow === overflow && previous.more === more ? previous : { overflow, more },
    )
  }

  useEffect(() => {
    const observer = new ResizeObserver(measure)
    observer.observe(scroller.current)
    observer.observe(content.current)
    measure()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hovered || !scrollState.overflow) return

    const row = scroller.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let start
    let origin
    let direction

    function animate(now) {
      const end = row.scrollWidth - row.clientWidth
      const target = direction > 0 ? end : 0
      const distance = Math.max(0, now - start) * 0.032
      row.scrollLeft = direction > 0
        ? Math.min(target, origin + distance)
        : Math.max(target, origin - distance)

      if (distance >= Math.abs(target - origin)) {
        origin = target
        direction *= -1
        start = now + 650
      }
      frame = requestAnimationFrame(animate)
    }

    function updateMotion() {
      cancelAnimationFrame(frame)
      if (reducedMotion.matches) return
      origin = row.scrollLeft
      direction = row.scrollWidth - row.clientWidth - origin > 1 ? 1 : -1
      start = performance.now() + 400
      frame = requestAnimationFrame(animate)
    }

    updateMotion()
    reducedMotion.addEventListener('change', updateMotion)
    return () => {
      cancelAnimationFrame(frame)
      reducedMotion.removeEventListener('change', updateMotion)
    }
  }, [hovered, scrollState.overflow])

  return (
    <Row
      className={`team-config-scroll${scrollState.more ? ' has-more' : ''}`}
      ref={scroller}
      onScroll={measure}
      onPointerEnter={(event) => setHovered(event.pointerType !== 'touch')}
      onPointerLeave={() => setHovered(false)}
      onKeyDown={() => setHovered(false)}
      tabIndex={focusable && scrollState.overflow ? 0 : undefined}
      role={focusable && scrollState.overflow ? 'group' : undefined}
      aria-label={focusable && scrollState.overflow ? `${label}. Usa las flechas para desplazarte.` : undefined}
    >
      <Content className={['scrollable-row-content', contentClassName].filter(Boolean).join(' ')} ref={content}>
        {children}
      </Content>
    </Row>
  )
}
