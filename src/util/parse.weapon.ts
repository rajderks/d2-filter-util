import {
  ITEM_GROUP_ALLMACE,
  ITEM_GROUP_ALLWEAPON,
  ITEM_GROUP_AXE,
  ITEM_GROUP_BOW,
  ITEM_GROUP_CLASS,
  ITEM_GROUP_CLUB,
  ITEM_GROUP_CROSSBOW,
  ITEM_GROUP_DAGGER,
  ITEM_GROUP_ELITE,
  ITEM_GROUP_EXCEPTIONAL,
  ITEM_GROUP_HAMMER,
  ITEM_GROUP_JAVELIN,
  ITEM_GROUP_NORMAL,
  ITEM_GROUP_POLEARM,
  ITEM_GROUP_SCEPTER,
  ITEM_GROUP_SPEAR,
  ITEM_GROUP_STAFF,
  ITEM_GROUP_SWORD,
  ITEM_GROUP_THROWING,
  ITEM_GROUP_TIPPED_MACE,
  ITEM_GROUP_WAND,
  ITEM_TYPE_AXE,
  ITEM_TYPE_BOW,
  ITEM_TYPE_CLUB,
  ITEM_TYPE_CROSSBOW,
  ITEM_TYPE_HAMMER,
  ITEM_TYPE_JAVELIN,
  ITEM_TYPE_KNIFE,
  ITEM_TYPE_MACE,
  ITEM_TYPE_POLEARM,
  ITEM_TYPE_SCEPTER,
  ITEM_TYPE_SPEAR,
  ITEM_TYPE_STAFF,
  ITEM_TYPE_SWORD,
  ITEM_TYPE_THROWN,
  ITEM_TYPE_WAND,
} from "@/util/Constants";
import weapData from "../data/Weapons.txt";
import {
  assignClassFlags,
  findAncestorTypes,
  getItemTypeMap,
  isClassItem,
  isItemTypeThrowable,
  ItemEntry,
  ItemTypeEntry,
  staffModsToClass,
} from "./parse.util";
import parseCSV from "./parseCSV";

type WeaponEntry = ItemEntry & {
  spawnable: number;
  mindam: number;
  maxdam: number;
  "2handed": number;
  "2handmindam": number;
  "2handmaxdam": number;
  speed: number;
  reqstr: number;
  reqdex: number;
  wclass: string;
  staffMods: string;
  "2handedwclass": string;
};

const parseWeaponCSV = () => {
  const records = parseCSV<WeaponEntry>(weapData);
  return records.map((entry) => {
    const ancestorTypes: Set<string> = new Set();
    const itemTypeEntry: ItemTypeEntry | undefined = getItemTypeMap().get(
      entry.type
    );
    findAncestorTypes(entry.type, ancestorTypes);
    const throwable = isItemTypeThrowable(entry.type);

    let baseFlags = 0;
    let weaponFlags = ITEM_GROUP_ALLWEAPON;

    if (entry.code === entry.ultracode) {
      baseFlags |= ITEM_GROUP_ELITE;
    } else if (entry.code === entry.ubercode) {
      baseFlags |= ITEM_GROUP_EXCEPTIONAL;
    } else {
      baseFlags |= ITEM_GROUP_NORMAL;
    }

    if (ancestorTypes.has(ITEM_TYPE_CLUB)) {
      weaponFlags |= ITEM_GROUP_CLUB;
      weaponFlags |= ITEM_GROUP_ALLMACE;
    } else if (ancestorTypes.has(ITEM_TYPE_MACE)) {
      weaponFlags |= ITEM_GROUP_TIPPED_MACE;
      weaponFlags |= ITEM_GROUP_ALLMACE;
    } else if (ancestorTypes.has(ITEM_TYPE_HAMMER)) {
      weaponFlags |= ITEM_GROUP_HAMMER;
      weaponFlags |= ITEM_GROUP_ALLMACE;
    } else if (ancestorTypes.has(ITEM_TYPE_WAND)) {
      weaponFlags |= ITEM_GROUP_WAND;
    } else if (ancestorTypes.has(ITEM_TYPE_STAFF)) {
      weaponFlags |= ITEM_GROUP_STAFF;
    } else if (ancestorTypes.has(ITEM_TYPE_BOW)) {
      weaponFlags |= ITEM_GROUP_BOW;
    } else if (ancestorTypes.has(ITEM_TYPE_AXE)) {
      weaponFlags |= ITEM_GROUP_AXE;
    } else if (ancestorTypes.has(ITEM_TYPE_SCEPTER)) {
      weaponFlags |= ITEM_GROUP_SCEPTER;
    } else if (ancestorTypes.has(ITEM_TYPE_SWORD)) {
      weaponFlags |= ITEM_GROUP_SWORD;
    } else if (ancestorTypes.has(ITEM_TYPE_KNIFE)) {
      weaponFlags |= ITEM_GROUP_DAGGER;
    } else if (ancestorTypes.has(ITEM_TYPE_JAVELIN)) {
      weaponFlags |= ITEM_GROUP_JAVELIN;
    } else if (ancestorTypes.has(ITEM_TYPE_SPEAR)) {
      weaponFlags |= ITEM_GROUP_SPEAR;
    } else if (ancestorTypes.has(ITEM_TYPE_POLEARM)) {
      weaponFlags |= ITEM_GROUP_POLEARM;
    } else if (ancestorTypes.has(ITEM_TYPE_CROSSBOW)) {
      weaponFlags |= ITEM_GROUP_CROSSBOW;
    }
    if (ancestorTypes.has(ITEM_TYPE_THROWN)) {
      weaponFlags |= ITEM_GROUP_THROWING;
    }

    weaponFlags = assignClassFlags(entry.type, ancestorTypes, weaponFlags);
    if (isClassItem(weaponFlags, 0)) {
      baseFlags |= ITEM_GROUP_CLASS;
    }

    const _entry: WeaponEntry = {
      baseFlags,
      weaponFlags,
      miscFlags: 0,
      armorFlags: 0,
      name: entry.name,
      code: entry.code,
      type: entry.type,
      spawnable: entry.spawnable,
      mindam: entry.mindam,
      maxdam: entry.maxdam,
      ["2handed"]: entry["2handed"],
      ["2handmindam"]: entry["2handmindam"],
      ["2handmaxdam"]: entry["2handmaxdam"],
      speed: entry.speed,
      reqstr: entry.reqstr,
      reqdex: entry.reqdex,
      level: entry.level,
      // @ts-expect-error space in name
      magicLevel: entry["magic lvl"],
      levelreq: entry.levelreq,
      normcode: entry.normcode,
      ultracode: entry.ultracode,
      ubercode: entry.ubercode,
      wclass: entry.wclass,
      ["2handedwclass"]: entry["2handedwclass"],
      staffMods: entry.staffMods,
      staffmodClass: staffModsToClass(itemTypeEntry?.StaffMods ?? ""),
      stackable: entry.stackable,
      useable: entry.useable,
      throwable,
    };
    return _entry;
  });
};

export default parseWeaponCSV;
