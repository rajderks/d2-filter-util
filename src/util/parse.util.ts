import parseCSV from "./parseCSV";
import itemTypeData from "../data/ItemTypes.txt";
import {
  CharacterClass,
  ITEM_GROUP_AMAZON_WEAPON,
  ITEM_GROUP_ASSASSIN_KATAR,
  ITEM_GROUP_BARBARIAN_HELM,
  ITEM_GROUP_CLASS_ARMOR,
  ITEM_GROUP_CLASS_WEAPON,
  ITEM_GROUP_DRUID_PELT,
  ITEM_GROUP_NECROMANCER_SHIELD,
  ITEM_GROUP_PALADIN_SHIELD,
  ITEM_GROUP_SORCERESS_ORB,
  ITEM_TYPE_AMAZON,
  ITEM_TYPE_ASSASSIN,
  ITEM_TYPE_BARBARIAN,
  ITEM_TYPE_DRUID,
  ITEM_TYPE_NECROMANCER,
  ITEM_TYPE_PALADIN,
  ITEM_TYPE_SORCERESS,
} from "@/util/Constants";

export type ItemEntry = {
  code: string;
  name: string;
  type: string;
  normcode: string;
  ultracode: string;
  ubercode: string;
  level: number;
  levelreq: number;
  magicLevel?: number;
  baseFlags: number;
  armorFlags: number;
  weaponFlags: number;
  miscFlags: number;
  stackable: number;
  useable: number;
  throwable: number;
  staffmodClass: CharacterClass;
};

export type ItemTypeEntry = {
  Code: string;
  Throwable: number;
  BodyLoc1: string;
  Equiv1: string;
  Equiv2: string;
  StaffMods: string;
};

const bodyLocMap: Map<string, string> = new Map();
const throwableMap: Map<string, number> = new Map();
const parentMap1: Map<string, string> = new Map();
const parentMap2: Map<string, string> = new Map();
const itemTypeMap: Map<string, ItemTypeEntry> = new Map();

export const findAncestorTypes = (
  type: string,
  ancestors: Set<string>,
  map1: typeof parentMap1 = parentMap1,
  map2: typeof parentMap1 = parentMap2
): void => {
  ancestors.add(type);

  const ancestor1 = map1.get(type);
  if (ancestor1 !== undefined) {
    findAncestorTypes(ancestor1, ancestors, map1, map2);
  }

  const ancestor2 = map2.get(type);
  if (ancestor2 !== undefined) {
    findAncestorTypes(ancestor2, ancestors, map1, map2);
  }
};

const parseItemTypeMaps = () => {
  const itemTypeRecords = parseCSV<ItemTypeEntry>(itemTypeData);
  itemTypeRecords.forEach((_entry) => {
    if (_entry.Code?.length) {
      itemTypeMap.set(_entry.Code, _entry);
      throwableMap.set(_entry.Code, _entry.Throwable);
      if (_entry.BodyLoc1?.length) bodyLocMap.set(_entry.Code, _entry.BodyLoc1);

      if (_entry.Equiv1?.length) {
        parentMap1.set(_entry.Code, _entry.Equiv1);
      }
      if (_entry.Equiv2?.length) {
        parentMap2.set(_entry.Code, _entry.Equiv2);
      }
    }
  });
};

export const isItemTypeThrowable = (itemTypeCode: ItemTypeEntry["Code"]) => {
  return throwableMap.has(itemTypeCode) ? 1 : 0;
};

export const assignClassFlags = (
  type: string,
  ancestors: Set<string>,
  flags: number
): number => {
  let _flags = flags;
  if (ancestors.has(ITEM_TYPE_AMAZON)) {
    _flags |= ITEM_GROUP_AMAZON_WEAPON;
  } else if (ancestors.has(ITEM_TYPE_BARBARIAN)) {
    _flags |= ITEM_GROUP_BARBARIAN_HELM;
  } else if (ancestors.has(ITEM_TYPE_NECROMANCER)) {
    _flags |= ITEM_GROUP_NECROMANCER_SHIELD;
  } else if (ancestors.has(ITEM_TYPE_PALADIN)) {
    _flags |= ITEM_GROUP_PALADIN_SHIELD;
  } else if (ancestors.has(ITEM_TYPE_SORCERESS)) {
    _flags |= ITEM_GROUP_SORCERESS_ORB;
  } else if (ancestors.has(ITEM_TYPE_ASSASSIN)) {
    _flags |= ITEM_GROUP_ASSASSIN_KATAR;
  } else if (ancestors.has(ITEM_TYPE_DRUID)) {
    _flags |= ITEM_GROUP_DRUID_PELT;
  }
  return _flags;
};

export const staffModsToClass = (staffMods: string): CharacterClass => {
  if (staffMods === "ama") {
    return CharacterClass.CLASS_AMA;
  } else if (staffMods === "pal") {
    return CharacterClass.CLASS_PAL;
  } else if (staffMods === "nec") {
    return CharacterClass.CLASS_NEC;
  } else if (staffMods === "bar") {
    return CharacterClass.CLASS_BAR;
  } else if (staffMods === "ass") {
    return CharacterClass.CLASS_ASN;
  } else if (staffMods === "dru") {
    return CharacterClass.CLASS_DRU;
  } else if (staffMods === "sor") {
    return CharacterClass.CLASS_SOR;
  }
  return CharacterClass.CLASS_NA;
};

export const isClassItem = (weaponFlags: number, armorFlags: number) => {
  return (
    (weaponFlags & ITEM_GROUP_CLASS_WEAPON) > 0 ||
    (armorFlags & ITEM_GROUP_CLASS_ARMOR) > 0
  );
};

export const getBodyLocMap = () => bodyLocMap;

export const getItemTypeMap = () => itemTypeMap;

export const utilParse = () => {
  parseItemTypeMaps();
  console.warn("bodyloc", bodyLocMap);
};
