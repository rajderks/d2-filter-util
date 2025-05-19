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

export const ITEM_TYPE_SHIELD = "shie";
export const ITEM_TYPE_ARMOR = "tors";
export const ITEM_TYPE_BOW_QUIVER = "bowq";
export const ITEM_TYPE_XBOW_QUIVER = "xboq";
export const ITEM_TYPE_RING = "ring";
export const ITEM_TYPE_AMULET = "amul";
export const ITEM_TYPE_CHARM = "char";
export const ITEM_TYPE_BOOTS = "boot";
export const ITEM_TYPE_GLOVES = "glov";
export const ITEM_TYPE_BELT = "belt";
export const ITEM_TYPE_SCEPTER = "scep";
export const ITEM_TYPE_WAND = "wand";
export const ITEM_TYPE_STAFF = "staf";
export const ITEM_TYPE_BOW = "bow";
export const ITEM_TYPE_AXE = "axe";
export const ITEM_TYPE_CLUB = "club";
export const ITEM_TYPE_SWORD = "swor";
export const ITEM_TYPE_HAMMER = "hamm";
export const ITEM_TYPE_KNIFE = "knif";
export const ITEM_TYPE_SPEAR = "spea";
export const ITEM_TYPE_POLEARM = "pole";
export const ITEM_TYPE_CROSSBOW = "xbow";
export const ITEM_TYPE_MACE = "mace";
export const ITEM_TYPE_HELM = "helm";
export const ITEM_TYPE_MISSILE_POT = "tpot";
export const ITEM_TYPE_JAVELIN = "jave";
export const ITEM_TYPE_ALLWEAPON = "weap";
export const ITEM_TYPE_THROWN = "thro";
export const ITEM_TYPE_ALLARMOR = "armo";
export const ITEM_TYPE_ALLSHIELD = "shld";
export const ITEM_TYPE_BLUNT = "blun";
export const ITEM_TYPE_AMAZON = "amaz";
export const ITEM_TYPE_BARBARIAN = "barb";
export const ITEM_TYPE_NECROMANCER = "necr";
export const ITEM_TYPE_PALADIN = "pala";
export const ITEM_TYPE_SORCERESS = "sorc";
export const ITEM_TYPE_ASSASSIN = "assn";
export const ITEM_TYPE_DRUID = "drui";
export const ITEM_TYPE_CLAW = "h2h";
export const ITEM_TYPE_ORB = "orb";
export const ITEM_TYPE_NECHEAD = "head";
export const ITEM_TYPE_PALSHIELD = "ashd";
export const ITEM_TYPE_BARHELM = "phlm";
export const ITEM_TYPE_DRUPELT = "pelt";
export const ITEM_TYPE_RUNE = "rune";
export const ITEM_TYPE_CIRCLET = "circ";
export const ITEM_TYPE_CLAW2 = "h2h2";

export const ITEM_TYPE_CHIPPED_GEM = "gem0";
export const ITEM_TYPE_FLAWED_GEM = "gem1";
export const ITEM_TYPE_STANDARD_GEM = "gem2";
export const ITEM_TYPE_FLAWLESS_GEM = "gem3";
export const ITEM_TYPE_PERFECT_GEM = "gem4";
export const ITEM_TYPE_AMETHYST = "gema";
export const ITEM_TYPE_DIAMOND = "gemd";
export const ITEM_TYPE_EMERALD = "geme";
export const ITEM_TYPE_RUBY = "gemr";
export const ITEM_TYPE_SAPPHIRE = "gems";
export const ITEM_TYPE_TOPAZ = "gemt";
export const ITEM_TYPE_SKULL = "gemz";

export const ITEM_TYPE_MAP = "map";
export const ITEM_TYPE_T1_MAP = "t1m";
export const ITEM_TYPE_T2_MAP = "t2m";
export const ITEM_TYPE_T3_MAP = "t3m";
export const ITEM_TYPE_T4_MAP = "t4m";

export const ITEM_TYPE_STACK_FLAWLESS = "gsm3";
export const ITEM_TYPE_STACK_PERFECT = "gsm4";
export const ITEM_TYPE_STACK_AMETHYST = "gsma";
export const ITEM_TYPE_STACK_DIAMOND = "gsmd";
export const ITEM_TYPE_STACK_EMERALD = "gsme";
export const ITEM_TYPE_STACK_RUBY = "gsmr";
export const ITEM_TYPE_STACK_SAPPHIRE = "gsms";
export const ITEM_TYPE_STACK_TOPAZ = "gsmt";
export const ITEM_TYPE_STACK_SKULL = "gsmz";
export const ITEM_TYPE_STACK_RUNE = "runs";
export const ITEM_TYPE_GEN_FLAWLESS_GEM = "ggm3";
export const ITEM_TYPE_GEN_PERFECT_GEM = "ggm4";
export const ITEM_TYPE_GEN_AMETHYST = "ggma";
export const ITEM_TYPE_GEN_DIAMOND = "ggmd";
export const ITEM_TYPE_GEN_EMERALD = "ggme";
export const ITEM_TYPE_GEN_RUBY = "ggmr";
export const ITEM_TYPE_GEN_SAPPHIRE = "ggms";
export const ITEM_TYPE_GEN_TOPAZ = "ggmt";
export const ITEM_TYPE_GEN_SKULL = "ggmz";
export const ITEM_TYPE_GEN_RUNE = "rung";
export const ITEM_TYPE_PVP_MAP_MOOR = "pvpm";
export const ITEM_TYPE_T5_MAP = "t5m";
export const ITEM_TYPE_PVP_MAP_DESERT = "pvpd";
