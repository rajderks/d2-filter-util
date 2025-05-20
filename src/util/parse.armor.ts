import parseCSV from "./parseCSV";
import armorData from "../data/Armor.txt";
import {
  assignClassFlags,
  findAncestorTypes,
  getBodyLocMap,
  getItemTypeMap,
  isClassItem,
  ItemEntry,
  ItemTypeEntry,
  staffModsToClass,
} from "./parse.util";
import {
  BODY_LOCATION_BELT,
  BODY_LOCATION_BODY,
  BODY_LOCATION_FEET,
  BODY_LOCATION_GLOVES,
  BODY_LOCATION_HEAD,
  BODY_LOCATION_LSECONDARY,
  ITEM_GROUP_ALLARMOR,
  ITEM_GROUP_BELT,
  ITEM_GROUP_BODY_ARMOR,
  ITEM_GROUP_BOOTS,
  ITEM_GROUP_CIRCLET,
  ITEM_GROUP_CLASS,
  ITEM_GROUP_ELITE,
  ITEM_GROUP_EXCEPTIONAL,
  ITEM_GROUP_GLOVES,
  ITEM_GROUP_HELM,
  ITEM_GROUP_NORMAL,
  ITEM_GROUP_SHIELD,
  ITEM_TYPE_ALLSHIELD,
  ITEM_TYPE_CIRCLET,
} from "@/util/Constants";

type ArmorEntry = ItemEntry & {
  reqstr: number;
  minac: number;
  maxac: number;
};

const parseArmorCSV = () => {
  const records = parseCSV<ArmorEntry>(armorData);
  return records.map((entry) => {
    const ancestorTypes: Set<string> = new Set();
    const itemTypeEntry: ItemTypeEntry | undefined = getItemTypeMap().get(
      entry.type
    );
    findAncestorTypes(entry.type, ancestorTypes);

    let baseFlags = 0;
    let armorFlags = ITEM_GROUP_ALLARMOR;

    if (entry.code === entry.ultracode) {
      baseFlags |= ITEM_GROUP_ELITE;
    } else if (entry.code === entry.ubercode) {
      baseFlags |= ITEM_GROUP_EXCEPTIONAL;
    } else {
      baseFlags |= ITEM_GROUP_NORMAL;
    }

    const bodyLocMap = getBodyLocMap();
    if (ancestorTypes.has(ITEM_TYPE_CIRCLET)) {
      armorFlags |= ITEM_GROUP_CIRCLET; // TODO: This kinda seems like it should be separate
    } else if (bodyLocMap.get(entry.type) === BODY_LOCATION_HEAD) {
      armorFlags |= ITEM_GROUP_HELM;
    } else if (bodyLocMap.get(entry.type) === BODY_LOCATION_BODY) {
      armorFlags |= ITEM_GROUP_BODY_ARMOR;
    } else if (bodyLocMap.get(entry.type) === BODY_LOCATION_GLOVES) {
      armorFlags |= ITEM_GROUP_GLOVES;
    } else if (bodyLocMap.get(entry.type) === BODY_LOCATION_FEET) {
      armorFlags |= ITEM_GROUP_BOOTS;
    } else if (bodyLocMap.get(entry.type) === BODY_LOCATION_BELT) {
      armorFlags |= ITEM_GROUP_BELT;
    } else if (
      bodyLocMap.get(entry.type) === BODY_LOCATION_LSECONDARY &&
      ancestorTypes.has(ITEM_TYPE_ALLSHIELD)
    ) {
      armorFlags |= ITEM_GROUP_SHIELD;
    }

    armorFlags = assignClassFlags(entry.type, ancestorTypes, armorFlags);
    if (isClassItem(0, armorFlags)) {
      baseFlags |= ITEM_GROUP_CLASS;
    }

    const _entry: ArmorEntry = {
      name: entry.name,
      code: entry.code,
      type: entry.type,
      reqstr: entry.reqstr,
      level: entry.level,
      levelreq: entry.levelreq,
      normcode: entry.normcode,
      ultracode: entry.ultracode,
      ubercode: entry.ubercode,
      minac: entry.minac,
      maxac: entry.maxac,
      useable: entry.useable,
      throwable: 0,
      stackable: entry.stackable,
      baseFlags,
      armorFlags,
      miscFlags: 0,
      weaponFlags: 0,
      staffmodClass: staffModsToClass(itemTypeEntry?.StaffMods ?? ""),
    };
    return _entry;
  });
};

export default parseArmorCSV;
