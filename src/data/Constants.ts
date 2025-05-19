///////////////////////////////////////////////////
// Item Groups (mainly used in ItemDisplay)
///////////////////////////////////////////////////

// Base
export const ITEM_GROUP_NORMAL = 0x00000001;
export const ITEM_GROUP_EXCEPTIONAL = 0x00000002;
export const ITEM_GROUP_ELITE = 0x00000004;
export const ITEM_GROUP_CLASS = 0x00000008;

// Weapon
export const ITEM_GROUP_ALLWEAPON = 0x00000001;
export const ITEM_GROUP_ALLMACE = 0x00000002;
export const ITEM_GROUP_AXE = 0x00000004;
export const ITEM_GROUP_CLUB = 0x00000008;
export const ITEM_GROUP_TIPPED_MACE = 0x00000010;
export const ITEM_GROUP_HAMMER = 0x00000020;
export const ITEM_GROUP_SWORD = 0x00000040;
export const ITEM_GROUP_DAGGER = 0x00000080;
export const ITEM_GROUP_THROWING = 0x00000100;
export const ITEM_GROUP_JAVELIN = 0x00000200;
export const ITEM_GROUP_SPEAR = 0x00000400;
export const ITEM_GROUP_POLEARM = 0x00000800;
export const ITEM_GROUP_BOW = 0x00001000;
export const ITEM_GROUP_CROSSBOW = 0x00002000;
export const ITEM_GROUP_STAFF = 0x00004000;
export const ITEM_GROUP_WAND = 0x00008000;
export const ITEM_GROUP_SCEPTER = 0x00010000;
export const ITEM_GROUP_AMAZON_WEAPON = 0x00020000;
export const ITEM_GROUP_ASSASSIN_KATAR = 0x00040000;
export const ITEM_GROUP_SORCERESS_ORB = 0x00080000;

export const ITEM_GROUP_CLASS_WEAPON =
  ITEM_GROUP_AMAZON_WEAPON |
  ITEM_GROUP_ASSASSIN_KATAR |
  ITEM_GROUP_SORCERESS_ORB;

// Armor
export const ITEM_GROUP_ALLARMOR = 0x00000001;
export const ITEM_GROUP_HELM = 0x00000002;
export const ITEM_GROUP_BODY_ARMOR = 0x00000004;
export const ITEM_GROUP_SHIELD = 0x00000008;
export const ITEM_GROUP_GLOVES = 0x00000010;
export const ITEM_GROUP_BOOTS = 0x00000020;
export const ITEM_GROUP_BELT = 0x00000040;
export const ITEM_GROUP_CIRCLET = 0x00000080;
export const ITEM_GROUP_BARBARIAN_HELM = 0x00000100;
export const ITEM_GROUP_DRUID_PELT = 0x00000200;
export const ITEM_GROUP_NECROMANCER_SHIELD = 0x00000400;
export const ITEM_GROUP_PALADIN_SHIELD = 0x00000800;

export const ITEM_GROUP_CLASS_ARMOR =
  ITEM_GROUP_BARBARIAN_HELM |
  ITEM_GROUP_DRUID_PELT |
  ITEM_GROUP_NECROMANCER_SHIELD |
  ITEM_GROUP_PALADIN_SHIELD;

// Misc
export const ITEM_GROUP_CHIPPED = 0x00000001;
export const ITEM_GROUP_FLAWED = 0x00000002;
export const ITEM_GROUP_REGULAR = 0x00000004;
export const ITEM_GROUP_FLAWLESS = 0x00000008;
export const ITEM_GROUP_PERFECT = 0x00000010;
export const ITEM_GROUP_AMETHYST = 0x00000020;
export const ITEM_GROUP_DIAMOND = 0x00000040;
export const ITEM_GROUP_EMERALD = 0x00000080;
export const ITEM_GROUP_RUBY = 0x00000100;
export const ITEM_GROUP_SAPPHIRE = 0x00000200;
export const ITEM_GROUP_TOPAZ = 0x00000400;
export const ITEM_GROUP_SKULL = 0x00000800;
export const ITEM_GROUP_RUNE = 0x00001000;
export const ITEM_GROUP_JEWELRY = 0x00002000;
export const ITEM_GROUP_CHARM = 0x00004000;
export const ITEM_GROUP_QUIVER = 0x00008000;
export const ITEM_GROUP_MAP = 0x00010000;

export const ITEM_GROUP_GEM =
  ITEM_GROUP_AMETHYST |
  ITEM_GROUP_DIAMOND |
  ITEM_GROUP_EMERALD |
  ITEM_GROUP_RUBY |
  ITEM_GROUP_SAPPHIRE |
  ITEM_GROUP_TOPAZ |
  ITEM_GROUP_SKULL;

export const ITEM_TYPE_SHIELD = 2;
export const ITEM_TYPE_ARMOR = 3;
export const ITEM_TYPE_BOW_QUIVER = 5;
export const ITEM_TYPE_XBOW_QUIVER = 6;
export const ITEM_TYPE_RING = 10;
export const ITEM_TYPE_AMULET = 12;
export const ITEM_TYPE_CHARM = 13;
export const ITEM_TYPE_BOOTS = 15;
export const ITEM_TYPE_GLOVES = 16;
export const ITEM_TYPE_BELT = 19;
export const ITEM_TYPE_SCEPTER = 24;
export const ITEM_TYPE_WAND = 25;
export const ITEM_TYPE_STAFF = 26;
export const ITEM_TYPE_BOW = 27;
export const ITEM_TYPE_AXE = 28;
export const ITEM_TYPE_CLUB = 29;
export const ITEM_TYPE_SWORD = 30;
export const ITEM_TYPE_HAMMER = 31;
export const ITEM_TYPE_KNIFE = 32;
export const ITEM_TYPE_SPEAR = 33;
export const ITEM_TYPE_POLEARM = 34;
export const ITEM_TYPE_CROSSBOW = 35;
export const ITEM_TYPE_MACE = 36;
export const ITEM_TYPE_HELM = 37;
export const ITEM_TYPE_MISSILE_POT = 38;
export const ITEM_TYPE_JAVELIN = 44;
export const ITEM_TYPE_ALLWEAPON = 45;
export const ITEM_TYPE_THROWN = 48;
export const ITEM_TYPE_ALLARMOR = 50;
export const ITEM_TYPE_ALLSHIELD = 51;
export const ITEM_TYPE_BLUNT = 57;
export const ITEM_TYPE_AMAZON = 60;
export const ITEM_TYPE_BARBARIAN = 61;
export const ITEM_TYPE_NECROMANCER = 62;
export const ITEM_TYPE_PALADIN = 63;
export const ITEM_TYPE_SORCERESS = 64;
export const ITEM_TYPE_ASSASSIN = 65;
export const ITEM_TYPE_DRUID = 66;
export const ITEM_TYPE_CLAW = 67;
export const ITEM_TYPE_ORB = 68;
export const ITEM_TYPE_NECHEAD = 69;
export const ITEM_TYPE_PALSHIELD = 70;
export const ITEM_TYPE_BARHELM = 71;
export const ITEM_TYPE_DRUPELT = 72;
export const ITEM_TYPE_RUNE = 74;
export const ITEM_TYPE_CIRCLET = 75;
export const ITEM_TYPE_CLAW2 = 88;

export const ITEM_TYPE_CHIPPED_GEM = 92;
export const ITEM_TYPE_FLAWED_GEM = 93;
export const ITEM_TYPE_STANDARD_GEM = 94;
export const ITEM_TYPE_FLAWLESS_GEM = 95;
export const ITEM_TYPE_PERFECT_GEM = 96;
export const ITEM_TYPE_AMETHYST = 97;
export const ITEM_TYPE_DIAMOND = 98;
export const ITEM_TYPE_EMERALD = 99;
export const ITEM_TYPE_RUBY = 100;
export const ITEM_TYPE_SAPPHIRE = 101;
export const ITEM_TYPE_TOPAZ = 102;
export const ITEM_TYPE_SKULL = 103;

export const ITEM_TYPE_MAP = 105;
export const ITEM_TYPE_T1_MAP = 106;
export const ITEM_TYPE_T2_MAP = 107;
export const ITEM_TYPE_T3_MAP = 108;
export const ITEM_TYPE_T4_MAP = 109;

export const ITEM_TYPE_STACK_FLAWLESS = 128;
export const ITEM_TYPE_STACK_PERFECT = 129;
export const ITEM_TYPE_STACK_AMETHYST = 130;
export const ITEM_TYPE_STACK_DIAMOND = 131;
export const ITEM_TYPE_STACK_EMERALD = 132;
export const ITEM_TYPE_STACK_RUBY = 133;
export const ITEM_TYPE_STACK_SAPPHIRE = 134;
export const ITEM_TYPE_STACK_TOPAZ = 135;
export const ITEM_TYPE_STACK_SKULL = 136;
export const ITEM_TYPE_STACK_RUNE = 137;
export const ITEM_TYPE_GEN_FLAWLESS_GEM = 139;
export const ITEM_TYPE_GEN_PERFECT_GEM = 140;
export const ITEM_TYPE_GEN_AMETHYST = 141;
export const ITEM_TYPE_GEN_DIAMOND = 142;
export const ITEM_TYPE_GEN_EMERALD = 143;
export const ITEM_TYPE_GEN_RUBY = 144;
export const ITEM_TYPE_GEN_SAPPHIRE = 145;
export const ITEM_TYPE_GEN_TOPAZ = 146;
export const ITEM_TYPE_GEN_SKULL = 147;
export const ITEM_TYPE_GEN_RUNE = 148;
export const ITEM_TYPE_PVP_MAP_MOOR = 199;
export const ITEM_TYPE_T5_MAP = 211;
export const ITEM_TYPE_PVP_MAP_DESERT = 227;
