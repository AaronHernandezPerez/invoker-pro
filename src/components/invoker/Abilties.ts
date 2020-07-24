export const InvokerPrimarySpells: {
  [index: string]: {
    value: string;
    keybind: string;
    name: string;
    icon: object;
    icon2x: object;
    icon4x: object;
    icon6x: object;
  };
} = {
  q: {
    value: 'q',
    keybind: keybindings.q,
    name: 'Quas',
    icon: require('src/statics/icons/invoker/Quas_icon.png'),
    icon2x: require('src/statics/icons/invoker/Quas_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Quas_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Quas_icon_6x.png')
  },
  w: {
    value: 'w',
    keybind: keybindings.w,
    name: 'Wex',
    icon: require('src/statics/icons/invoker/Wex_icon.png'),
    icon2x: require('src/statics/icons/invoker/Wex_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Wex_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Wex_icon_6x.png')
  },
  e: {
    value: 'e',
    keybind: keybindings.e,
    name: 'Exort',
    icon: require('src/statics/icons/invoker/Exort_icon.png'),
    icon2x: require('src/statics/icons/invoker/Exort_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Exort_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Exort_icon_6x.png')
  },
  r: {
    value: 'r',
    keybind: keybindings.r,
    name: 'Invoke',
    icon: require('src/statics/icons/invoker/Invoke_icon.png'),
    icon2x: require('src/statics/icons/invoker/Invoke_icon_2x.png'),
    icon4x: require('src/statics/icons/invoker/Invoke_icon_4x.png'),
    icon6x: require('src/statics/icons/invoker/Invoke_icon_6x.png')
  }
};

export const InvokerSpells: {
  [index: string]: {
    name: string;
    combination: object;
    icon: object;
    icon2x: object;
    icon4x: object;
    icon6x: object;
  };
} = {
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
