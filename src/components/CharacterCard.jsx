import { useEffect, useRef, useState } from 'react'
import { artUrl, assetUrl, getCharacterArt, weaponIconUrl } from '../api.js'

function hideOnError(e) {
  e.currentTarget.style.visibility = 'hidden'
}

export default function CharacterCard({ character, base, elementIcon, lazy }) {
  const { Id, Name, QualityId, Element, WeaponType, RoleHeadIcon } = character
  const [src, setSrc] = useState(() => artUrl(character, base))
  const [failed, setFailed] = useState(false)
  const triedDetail = useRef(false)
  const hasArt = Boolean(src) && !failed
  const weaponIcon = weaponIconUrl(character)
  const status = Id === 1512 ? 'Ficha en preparación' : ''
  const statusId = status ? `char-card-status-${Id}` : undefined

  // La URL derivada del nombre puede no existir: se pide el detalle solo de este personaje, una vez.
  function loadFromDetail() {
    if (triedDetail.current) {
      setFailed(true)
      return
    }
    triedDetail.current = true
    setSrc('')
    getCharacterArt(Id)
      .then((info) => (info.art ? setSrc(info.art) : setFailed(true)))
      .catch(() => setFailed(true))
  }

  useEffect(() => {
    if (!src && !triedDetail.current) loadFromDetail()
  }, [])

  return (
    <a className="char-card-link" href={`#/personaje/${Id}`} aria-label={Name} aria-describedby={statusId}>
    <article className={`char-card rarity-${QualityId} elem-${Element?.Id}`}>
      <img
        className={hasArt ? 'char-card-art' : 'char-card-art is-head'}
        src={hasArt ? src : assetUrl(RoleHeadIcon)}
        alt=""
        referrerPolicy="no-referrer"
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        onError={hasArt ? loadFromDetail : hideOnError}
      />
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
