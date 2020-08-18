type Keybinds = {
  q: string;
  w: string;
  e: string;
  r: string;
};

export type PrimarySpellType = {
  value: string;
  keybind: string | null;
  name: string;
  icon: object;
  icon2x: object;
  icon4x: object;
  icon6x: object;
}

export type InvokerPrimarySpellType = {
  [index in keyof Keybinds]: PrimarySpellType;
};

export const InvokerPrimarySpells: InvokerPrimarySpellType = {
  q: {
    value: 'q',
    keybind: null,
    name: 'Quas',
    icon: require('src/statics/icons/invoker/Quas_icon.png'),
    icon2x: require('src/statics/icons/invoker/Quas_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Quas_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Quas_icon_6x.png')
  },
  w: {
    value: 'w',
    keybind: null,
    name: 'Wex',
    icon: require('src/statics/icons/invoker/Wex_icon.png'),
    icon2x: require('src/statics/icons/invoker/Wex_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Wex_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Wex_icon_6x.png')
  },
  e: {
    value: 'e',
    keybind: null,
    name: 'Exort',
    icon: require('src/statics/icons/invoker/Exort_icon.png'),
    icon2x: require('src/statics/icons/invoker/Exort_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Exort_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Exort_icon_6x.png')
  },
  r: {
    value: 'r',
    keybind: null,
    name: 'Invoke',
    icon: require('src/statics/icons/invoker/Invoke_icon.png'),
    icon2x: require('src/statics/icons/invoker/Invoke_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Invoke_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Invoke_icon_6x.png')
  }
};

export type CombinedSpellType = {
  name: string;
  combination: { [index: string]: number };
  icon: object;
  icon2x: object;
  icon4x: object;
  icon6x: object;
}

export type InvokerCombinedSpellType = {
  [index: string]: CombinedSpellType;
};


export const InvokerCombinedSpells: InvokerCombinedSpellType = {
  coldSnap: {
    name: 'Cold Snap',
    combination: { q: 3 },
    icon: require('src/statics/icons/invoker/Cold_Snap_icon.png'),
    icon2x: require('src/statics/icons/invoker/Cold_Snap_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Cold_Snap_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Cold_Snap_icon_6x.png')
  },
  ghostWalk: {
    name: 'Ghost Walk',
    combination: { q: 2, w: 1 },
    icon: require('src/statics/icons/invoker/Ghost_Walk_icon.png'),
    icon2x: require('src/statics/icons/invoker/Ghost_Walk_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Ghost_Walk_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Ghost_Walk_icon_6x.png')
  },
  iceWall: {
    name: 'Ice Wall',
    combination: { q: 2, e: 1 },
    icon: require('src/statics/icons/invoker/Ice_Wall_icon.png'),
    icon2x: require('src/statics/icons/invoker/Ice_Wall_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Ice_Wall_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Ice_Wall_icon_6x.png')
  },
  tornado: {
    name: 'Tornado',
    combination: { q: 1, w: 2 },
    icon: require('src/statics/icons/invoker/Tornado_icon.png'),
    icon2x: require('src/statics/icons/invoker/Tornado_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Tornado_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Tornado_icon_6x.png')
  },
  deafeningBlast: {
    name: 'Deafening Blast',
    combination: { q: 1, w: 1, e: 1 },
    icon: require('src/statics/icons/invoker/Deafening_Blast_icon.png'),
    icon2x: require('src/statics/icons/invoker/Deafening_Blast_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Deafening_Blast_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Deafening_Blast_icon_6x.png')
  },
  forgeSpirit: {
    name: 'Forge Spirit',
    combination: { q: 1, e: 2 },
    icon: require('src/statics/icons/invoker/Forge_Spirit_icon.png'),
    icon2x: require('src/statics/icons/invoker/Forge_Spirit_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Forge_Spirit_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Forge_Spirit_icon_6x.png')
  },
  emp: {
    name: 'EMP',
    combination: { w: 3 },
    icon: require('src/statics/icons/invoker/EMP_icon.png'),
    icon2x: require('src/statics/icons/invoker/EMP_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/EMP_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/EMP_icon_6x.png')
  },
  alacrity: {
    name: 'Alacrity',
    combination: { w: 2, e: 1 },
    icon: require('src/statics/icons/invoker/Alacrity_icon.png'),
    icon2x: require('src/statics/icons/invoker/Alacrity_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Alacrity_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Alacrity_icon_6x.png')
  },
  chaosMeteor: {
    name: 'Chaos Meteor',
    combination: { w: 1, e: 2 },
    icon: require('src/statics/icons/invoker/Chaos_Meteor_icon.png'),
    icon2x: require('src/statics/icons/invoker/Chaos_Meteor_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Chaos_Meteor_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Chaos_Meteor_icon_6x.png')
  },
  sunStrike: {
    name: 'Sun Strike',
    combination: { e: 3 },
    icon: require('src/statics/icons/invoker/Sun_Strike_icon.png'),
    icon2x: require('src/statics/icons/invoker/Sun_Strike_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Sun_Strike_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Sun_Strike_icon_6x.png')
  }
};


export const InvokerCombinedSpellsCombos: Array<Array<CombinedSpellType>> = [[InvokerCombinedSpells.coldSnap, InvokerCombinedSpells.forgeSpirit],
[InvokerCombinedSpells.tornado, InvokerCombinedSpells.emp],
[InvokerCombinedSpells.tornado, InvokerCombinedSpells.chaosMeteor, InvokerCombinedSpells.deafeningBlast],
[InvokerCombinedSpells.iceWall, InvokerCombinedSpells.chaosMeteor, InvokerCombinedSpells.coldSnap],
[InvokerCombinedSpells.iceWall, InvokerCombinedSpells.chaosMeteor, InvokerCombinedSpells.sunStrike],
[InvokerCombinedSpells.iceWall, InvokerCombinedSpells.chaosMeteor, InvokerCombinedSpells.emp],
[InvokerCombinedSpells.alacrity, InvokerCombinedSpells.forgeSpirit],
]

export const InvokerSpellsTime = [2, 3, 4];