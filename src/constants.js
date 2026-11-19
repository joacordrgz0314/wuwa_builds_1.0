const CHARACTER_TABS = [
  { id: "guia", label: "Guía" },
  { id: "ecos", label: "Ecos" },
  { id: "armas", label: "Armas" },
  { id: "equipos", label: "Equipos" },
  { id: "materiales", label: "Materiales" },
];

const STAT_ICON_FILES = {
  atq: "T_Iconpropertyredattack_UI",
  basicAttack: "T_Iconpropertyredphysics_UI",
  liberation: 'T_Iconpropertyredskill_UI',
  critProb: "T_Iconpropertyredbaoji_UI",
  critDmg: "T_Iconpropertyredcrit_UI",
  energia: "T_Iconpropertygreenenergy_UI",
  def: "T_Iconpropertygreendefense_UI",
  ps: "T_Iconpropertygreenlife_UI",
  cura: "T_Iconpropertygreencure_UI",
  // Bonos de daño por elemento (mismas ids que Element.Id)
  bono1: "T_Iconpropertyredice_UI",
  bono2: "T_Iconpropertyredhot_UI",
  bono3: "T_Iconpropertyredmine_UI",
  bono4: "T_Iconpropertyredwind_UI",
  bono5: "T_Iconpropertyredlight_UI",
  bono6: "T_Iconpropertyreddark_UI",
};

export { CHARACTER_TABS, STAT_ICON_FILES };
