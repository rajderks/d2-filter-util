import parseCSV from "./parseCSV";
import miscData from "../data/Misc.txt";
import {
  findAncestorTypes,
  getItemTypeMap,
  isItemTypeThrowable,
  ItemEntry,
  ItemTypeEntry,
  staffModsToClass,
} from "./parse.util";
import {
  ITEM_GROUP_AMETHYST,
  ITEM_GROUP_CHARM,
  ITEM_GROUP_CHIPPED,
  ITEM_GROUP_DIAMOND,
  ITEM_GROUP_EMERALD,
  ITEM_GROUP_FLAWED,
  ITEM_GROUP_FLAWLESS,
  ITEM_GROUP_JEWELRY,
  ITEM_GROUP_MAP,
  ITEM_GROUP_PERFECT,
  ITEM_GROUP_QUIVER,
  ITEM_GROUP_REGULAR,
  ITEM_GROUP_RUBY,
  ITEM_GROUP_RUNE,
  ITEM_GROUP_SAPPHIRE,
  ITEM_GROUP_SKULL,
  ITEM_GROUP_TOPAZ,
  ITEM_TYPE_AMETHYST,
  ITEM_TYPE_AMULET,
  ITEM_TYPE_BOW_QUIVER,
  ITEM_TYPE_CHARM,
  ITEM_TYPE_CHIPPED_GEM,
  ITEM_TYPE_DIAMOND,
  ITEM_TYPE_EMERALD,
  ITEM_TYPE_FLAWED_GEM,
  ITEM_TYPE_GEN_AMETHYST,
  ITEM_TYPE_GEN_DIAMOND,
  ITEM_TYPE_GEN_EMERALD,
  ITEM_TYPE_GEN_FLAWLESS_GEM,
  ITEM_TYPE_GEN_PERFECT_GEM,
  ITEM_TYPE_GEN_RUBY,
  ITEM_TYPE_GEN_SAPPHIRE,
  ITEM_TYPE_GEN_SKULL,
  ITEM_TYPE_GEN_TOPAZ,
  ITEM_TYPE_MAP,
  ITEM_TYPE_RING,
  ITEM_TYPE_RUBY,
  ITEM_TYPE_RUNE,
  ITEM_TYPE_SAPPHIRE,
  ITEM_TYPE_SKULL,
  ITEM_TYPE_STACK_FLAWLESS,
  ITEM_TYPE_STACK_PERFECT,
  ITEM_TYPE_STACK_RUNE,
  ITEM_TYPE_STANDARD_GEM,
  ITEM_TYPE_TOPAZ,
  ITEM_TYPE_XBOW_QUIVER,
} from "./Constants";

type MiscEntry = ItemEntry & {
  type2: string;
};

const parseMiscCSV = () => {
  const records = parseCSV<MiscEntry>(miscData);
  return records.map((entry) => {
    const ancestorTypes: Set<string> = new Set();
    const itemTypeEntry: ItemTypeEntry | undefined = getItemTypeMap().get(
      entry.type
    );
    const throwable = isItemTypeThrowable(entry.type);
    findAncestorTypes(entry.type, ancestorTypes);
    findAncestorTypes(entry.type2, ancestorTypes);

    const baseFlags = 0;
    let miscFlags = 0;

    if (
      ancestorTypes.has(ITEM_TYPE_RUNE) ||
      ancestorTypes.has(ITEM_TYPE_STACK_RUNE)
    ) {
      miscFlags |= ITEM_GROUP_RUNE;
    } else if (
      ancestorTypes.has(ITEM_TYPE_RING) ||
      ancestorTypes.has(ITEM_TYPE_AMULET)
    ) {
      miscFlags |= ITEM_GROUP_JEWELRY;
    } else if (ancestorTypes.has(ITEM_TYPE_CHARM)) {
      miscFlags |= ITEM_GROUP_CHARM;
    } else if (
      ancestorTypes.has(ITEM_TYPE_BOW_QUIVER) ||
      ancestorTypes.has(ITEM_TYPE_XBOW_QUIVER)
    ) {
      miscFlags |= ITEM_GROUP_QUIVER;
    } else if (ancestorTypes.has(ITEM_TYPE_MAP)) {
      miscFlags |= ITEM_GROUP_MAP;
    }

    // Gem Quality
    if (ancestorTypes.has(ITEM_TYPE_CHIPPED_GEM)) {
      miscFlags |= ITEM_GROUP_CHIPPED;
    } else if (ancestorTypes.has(ITEM_TYPE_FLAWED_GEM)) {
      miscFlags |= ITEM_GROUP_FLAWED;
    } else if (ancestorTypes.has(ITEM_TYPE_STANDARD_GEM)) {
      miscFlags |= ITEM_GROUP_REGULAR;
    } else if (
      ancestorTypes.has(ITEM_TYPE_GEN_FLAWLESS_GEM) ||
      ancestorTypes.has(ITEM_TYPE_STACK_FLAWLESS)
    ) {
      miscFlags |= ITEM_GROUP_FLAWLESS;
    } else if (
      ancestorTypes.has(ITEM_TYPE_GEN_PERFECT_GEM) ||
      ancestorTypes.has(ITEM_TYPE_STACK_PERFECT)
    ) {
      miscFlags |= ITEM_GROUP_PERFECT;
    }

    // Gem Type
    if (
      ancestorTypes.has(ITEM_TYPE_AMETHYST) ||
      ancestorTypes.has(ITEM_TYPE_GEN_AMETHYST)
    ) {
      miscFlags |= ITEM_GROUP_AMETHYST;
    } else if (
      ancestorTypes.has(ITEM_TYPE_DIAMOND) ||
      ancestorTypes.has(ITEM_TYPE_GEN_DIAMOND)
    ) {
      miscFlags |= ITEM_GROUP_DIAMOND;
    } else if (
      ancestorTypes.has(ITEM_TYPE_EMERALD) ||
      ancestorTypes.has(ITEM_TYPE_GEN_EMERALD)
    ) {
      miscFlags |= ITEM_GROUP_EMERALD;
    } else if (
      ancestorTypes.has(ITEM_TYPE_RUBY) ||
      ancestorTypes.has(ITEM_TYPE_GEN_RUBY)
    ) {
      miscFlags |= ITEM_GROUP_RUBY;
    } else if (
      ancestorTypes.has(ITEM_TYPE_SAPPHIRE) ||
      ancestorTypes.has(ITEM_TYPE_GEN_SAPPHIRE)
    ) {
      miscFlags |= ITEM_GROUP_SAPPHIRE;
    } else if (
      ancestorTypes.has(ITEM_TYPE_TOPAZ) ||
      ancestorTypes.has(ITEM_TYPE_GEN_TOPAZ)
    ) {
      miscFlags |= ITEM_GROUP_TOPAZ;
    } else if (
      ancestorTypes.has(ITEM_TYPE_SKULL) ||
      ancestorTypes.has(ITEM_TYPE_GEN_SKULL)
    ) {
      miscFlags |= ITEM_GROUP_SKULL;
    }

    const _entry: MiscEntry = {
      weaponFlags: 0,
      baseFlags,
      armorFlags: 0,
      miscFlags,
      normcode: "",
      ubercode: "",
      ultracode: "",
      name: entry.name,
      code: entry.code,
      level: entry.level,
      levelreq: entry.levelreq,
      magicLevel: 0,
      type: entry.type,
      type2: entry.type2,
      useable: entry.useable,
      throwable,
      stackable: entry.stackable,
      staffmodClass: staffModsToClass(itemTypeEntry?.StaffMods ?? ""),
    };
    return _entry;
  });
};

export default parseMiscCSV;
