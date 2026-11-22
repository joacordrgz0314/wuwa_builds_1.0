import { useEffect, useRef, useState } from 'react'
import { isBuildInPreparation } from '../constants.js'
import builds from '../data/builds.json'
import { artUrl, assetUrl, getCharacterArt, weaponIconUrl } from '../api.js'

function hideOnError(e) {
  e.currentTarget.style.visibility = 'hidden'
}

export default function CharacterCard({ character, base, elementIcon, lazy }) {
  const { Id, Name, QualityId, Element, WeaponType, RoleHeadIcon } = character
  const [src, setSrc] = useState(() => artUrl(character, base))
  const [nearby, setNearby] = useState(false)
  const [showHead, setShowHead] = useState(false)
  const cardRef = useRef(null)
  const triedDetail = useRef(false)
  const imageSrc = src || (showHead ? assetUrl(RoleHeadIcon) : '')
  const weaponIcon = weaponIconUrl(character)
  const status = isBuildInPreparation(builds[Id], Id) ? 'Ficha en preparación' : ''
  const statusId = status ? `char-card-status-${Id}` : undefined

  useEffect(() => {
    if (src || !lazy || nearby || triedDetail.current) return
    if (typeof IntersectionObserver === 'undefined') {
      setNearby(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setNearby(true)
    }, { rootMargin: '200px 0px' })
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [src, lazy, nearby])

  // La consulta de respaldo se hace una sola vez y cuando la tarjeta puede verse pronto.
  useEffect(() => {
    if (src || (lazy && !nearby) || triedDetail.current) return
    triedDetail.current = true
    getCharacterArt(Id)
      .then((info) => {
        if (info.art) setSrc(info.art)
        else setShowHead(true)
      })
      .catch(() => setShowHead(true))
  }, [Id, src, lazy, nearby])

  function onPortraitError() {
    setSrc('')
    if (triedDetail.current) setShowHead(true)
  }

  return (
    <a className="char-card-link" href={`#/personaje/${Id}`} aria-label={Name} aria-describedby={statusId}>
    <article ref={cardRef} className={`char-card rarity-${QualityId} elem-${Element?.Id}`}>
      {imageSrc && (
        <img
          key={showHead ? 'head' : 'art'}
          className={showHead ? 'char-card-art is-head' : 'char-card-art'}
          src={imageSrc}
          alt=""
          referrerPolicy="no-referrer"
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onError={showHead ? hideOnError : onPortraitError}
        />
      )}
      <div className="char-card-badges">
        {elementIcon && (
          <img src={elementIcon} alt={Element?.Name ?? ''} title={Element?.Name} onError={hideOnError} />
        )}
        {weaponIcon && (
          <img src={weaponIcon} alt={WeaponType?.Name ?? ''} title={WeaponType?.Name} onError={hideOnError} />
        )}
      </div>
      <h2 className="char-card-name">
        {Name}
        {status && <small id={statusId} className="char-card-status">{status}</small>}
      </h2>
    </article>
    </a>
  )
}
