import { useEffect, useState } from "react";
import {
  artUrl,
  assetUrl,
  getCharacterArt,
  getCharacterPortrait,
  knownPortrait,
  rememberPortrait,
  weaponIconUrl,
} from "../api.js";
import builds from "../data/builds.json";
import BuildSections from "./BuildSections.jsx";
import Materials from "./Materials.jsx";
import Ambient from "./Ambient.jsx";
import { CHARACTER_TABS, isBuildInPreparation } from "../constants.js";

function hideOnError(e) {
  e.currentTarget.style.visibility = "hidden";
}

// Ajuste vertical del retrato para los que vienen más arriba en su archivo (por defecto -8%, solo visual)
const PORTRAIT_SHIFT = { 1312: "-2%", 1511: "-4%", 1208: "-4%" };
// Lupa y Zhezhi, por nombre en inglés (EnName), porque no se verificó su Id
const PORTRAIT_SHIFT_BY_NAME = { lupa: "-4%", zhezhi: "-1%" };

export default function CharacterPage({
  character,
  characters,
  base,
  elementIcon,
  elementIcons,
}) {
  const [src, setSrc] = useState(() =>
    character ? artUrl(character, base) : "",
  );
  const [failed, setFailed] = useState(false);
  const [triedDetail, setTriedDetail] = useState(false);
  const [tab, setTab] = useState("guia");
  // Si el retrato ya se conoce (caché de 24 h) se muestra desde el primer cuadro, sin pedir el detalle
  const [portrait, setPortrait] = useState(() => {
    const known = character ? knownPortrait(character.Id) : undefined;
    return known && known !== "-" ? known : "";
  });
  // Hasta saber si hay retrato no se muestra ninguna imagen (evita el salto del arte de tarjeta al retrato)
  const [portraitDone, setPortraitDone] = useState(() =>
    character ? knownPortrait(character.Id) !== undefined : false,
  );

  // Al pasar a otro personaje (por ejemplo desde un equipo) se vuelve a la primera pestaña
  useEffect(() => {
    setTab("guia");
  }, [character?.Id]);

  // Retrato de cuerpo completo: se pide el detalle al abrir y solo se usa si la imagen carga;
  // si falla en cualquier punto (o tarda más de 6 s) se muestra el arte de respaldo
  const characterId = character?.Id;
  useEffect(() => {
    if (characterId == null || knownPortrait(characterId) !== undefined)
      return undefined;
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setPortraitDone(true);
    };
    const timer = setTimeout(finish, 6000);
    getCharacterPortrait(characterId)
      .then((url) => {
        if (!url) rememberPortrait(characterId, "");
        if (!url || cancelled) return finish();
        const img = new Image();
        img.referrerPolicy = "no-referrer";
        img.onload = () => {
          rememberPortrait(characterId, url);
          if (!cancelled) setPortrait(url);
          finish();
        };
        img.onerror = finish;
        img.src = url;
        return undefined;
      })
      .catch(finish);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [characterId]);

  if (!character) {
    return (
      <>
        <a className="char-page-back" href="#/">
          ← Volver
        </a>
        <p className="app-msg">No se encontró ese personaje.</p>
      </>
    );
  }

  const { Id, Name, QualityId, Element, WeaponType, RoleHeadIcon } = character;
  const artShift =
    PORTRAIT_SHIFT[Id] ??
    PORTRAIT_SHIFT_BY_NAME[
      String(character.EnName ?? "")
        .trim()
        .toLowerCase()
    ];
  const weaponIcon = weaponIconUrl(character);
  // Icono neutro de Materiales: la cabeza del Errante (Electro, 1309) en todos los personajes
  const roverHead = characters?.find((c) => c.Id === 1309)?.RoleHeadIcon;
  // La última palabra del nombre y el icono de elemento van juntos para que el icono nunca quede solo en una línea
  const nameWords = String(Name).split(" ");
  const nameEnd = nameWords.pop();
  const nameStart = nameWords.length ? `${nameWords.join(" ")} ` : "";
  const hasArt = Boolean(src) && !failed;
  // Materiales se monta cuando el arte ya se decidió (o al abrir su pestaña) y no se desmonta al cambiar de pestaña:
  // así se pide en segundo plano y volver a ella es instantáneo
  const showMat = portraitDone || tab === "materiales";
  const artClass = portrait
    ? "char-page-art is-portrait"
    : hasArt
      ? "char-page-art is-portrait is-card"
      : "char-page-art is-head";

  // Si un retrato recordado deja de cargar se olvida y queda el arte de respaldo
  function forgetPortrait() {
    setPortrait("");
    rememberPortrait(Id, "");
  }

  // La URL derivada puede no existir: se pide el detalle de este personaje, una vez.
  function loadFromDetail() {
    if (triedDetail) {
      setFailed(true);
      return;
    }
    setTriedDetail(true);
    getCharacterArt(Id)
      .then((info) => (info.art ? setSrc(info.art) : setFailed(true)))
      .catch(() => setFailed(true));
  }

  // Flechas, Inicio y Fin cambian de pestaña y mueven el foco
  function onTabKey(e) {
    const i = CHARACTER_TABS.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % CHARACTER_TABS.length;
    else if (e.key === "ArrowLeft")
      next = (i - 1 + CHARACTER_TABS.length) % CHARACTER_TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = CHARACTER_TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(CHARACTER_TABS[next].id);
    document.getElementById(`tab-${CHARACTER_TABS[next].id}`)?.focus();
  }

  return (
    <div className={`char-page elem-${Element?.Id}`}>
      <Ambient />
      <a className="char-page-back" href="#/">
        ← Volver
      </a>
      <header
        className="char-page-head"
        style={artShift ? { "--art-shift": artShift } : undefined}
      >
        <div className="char-page-info">
          <h2 className="char-page-name">
            {nameStart}
            <span className="char-page-name-end">
              {nameEnd}
              {elementIcon && (
                <img
                  className="char-page-elem"
                  src={elementIcon}
                  alt=""
                  onError={hideOnError}
                />
              )}
            </span>
          </h2>
          <p
            className={`char-page-stars rarity-${QualityId}`}
            aria-label={`${QualityId} estrellas`}
          >
            {"★".repeat(QualityId ?? 0)}
          </p>
          <ul className="char-page-tags">
            <li>
              {elementIcon && (
                <img src={elementIcon} alt="" onError={hideOnError} />
              )}
              {Element?.Name}
            </li>
            <li>
              {weaponIcon && (
                <img src={weaponIcon} alt="" onError={hideOnError} />
              )}
              {WeaponType?.Name}
            </li>
          </ul>
        </div>
        {portraitDone || portrait ? (
          <img
            className={artClass}
            src={portrait || (hasArt ? src : assetUrl(RoleHeadIcon))}
            alt={Name}
            referrerPolicy="no-referrer"
            decoding="async"
            onError={
              portrait ? forgetPortrait : hasArt ? loadFromDetail : hideOnError
            }
          />
        ) : (
          <span
            className="char-page-art is-portrait is-pending"
            aria-hidden="true"
          />
        )}
      </header>
      <div className="char-tabs">
        <div
          className="char-tab-list"
          role="tablist"
          aria-label="Secciones del personaje"
          onKeyDown={onTabKey}
        >
          {CHARACTER_TABS.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              aria-controls="char-tabpanel"
              tabIndex={tab === t.id ? 0 : -1}
              className="char-tab"
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {isBuildInPreparation(builds[Id], Id) && (
          <span className="char-tab-status">Ficha en preparación</span>
        )}
      </div>
      <div id="char-tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab !== "materiales" && (
          <BuildSections
            key={Id}
            tab={tab}
            build={builds[Id]}
            characters={characters}
            base={base}
            elementIcons={elementIcons}
            characterId={Id}
            personalWeaponId={builds._armaPersonal?.[Id]}
          />
        )}
        {showMat && (
          <div hidden={tab !== "materiales"}>
            <Materials
              id={Id}
              headIcon={roverHead ? assetUrl(roverHead) : ""}
              weaponIcon={weaponIcon}
              weaponId={
                QualityId === 5 ? builds._armaPersonal?.[Id] : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
