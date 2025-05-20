import parseCSV from "./parseCSV";
import armorData from "../data/Armor.txt";
import {
  assignClassFlags,
  findAncestorTypes,
  getBodyLocMap,
  getItemTypeMap,
  isClassItem,
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
  CharacterClass,
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

type ArmorEntry = {
  code: string;
  name: string;
  type: string;
  normcode: string;
  ultracode: string;
  ubercode: string;
  reqstr: number;
  level: number;
  levelreq: number;
  minac: number;
  maxac: number;
  useable: number;
  stackable: number;
  baseFlags: number;
  armorFlags: number;
  staffmodClass: CharacterClass;
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
      stackable: entry.stackable,
      baseFlags,
      armorFlags,
      staffmodClass: staffModsToClass(itemTypeEntry?.StaffMods ?? ""),
    };
    return _entry;
  });
};

/*
void GetArmorAttributes()
 {
     D2ItemDataTbl* pItemDataTables = D2COMMON_10535_DATATBLS_GetItemDataTables();
 
     for (auto d = 0; d < pItemDataTables->nArmorTxtRecordCount; d++)
     {
         ItemsTxt* pArmor = &pItemDataTables->pArmor[d];
         D2ItemTypesTxt* pItemTypesTxtRecord = NULL;
         if (pArmor->nType >= 0 && pArmor->nType < pItemDataTables->nItemsTxtRecordCount)
         {
             pItemTypesTxtRecord = &(*p_D2COMMON_sgptDataTable)->pItemsTypeTxt[pArmor->nType];
         }
         BYTE stackable = pArmor->bstackable > 0 ? pArmor->bstackable : 0;
         BYTE useable = pArmor->buseable > 0 ? pArmor->buseable : 0;
         BYTE throwable = throwableMap[pArmor->nType] > 0 ? throwableMap[pArmor->nType] : 0; // Hey, you never know
         unsigned int baseFlags = 0, armorFlags = ITEM_GROUP_ALLARMOR;
 
         std::set<WORD> ancestorTypes;
         FindAncestorTypes(pArmor->nType, ancestorTypes, parentMap1, parentMap2);
 
         if (pArmor->dwcode == pArmor->dwultracode)
         {
             baseFlags |= ITEM_GROUP_ELITE;
         }
         else if (pArmor->dwcode == pArmor->dwubercode)
         {
             baseFlags |= ITEM_GROUP_EXCEPTIONAL;
         }
         else
         {
             baseFlags |= ITEM_GROUP_NORMAL;
         }
 
         if (ancestorTypes.find(ITEM_TYPE_CIRCLET) != ancestorTypes.end())
         {
             armorFlags |= ITEM_GROUP_CIRCLET;  // TODO: This kinda seems like it should be separate
         }
         else if (bodyLocMap[pArmor->nType] == EQUIP_HEAD)
         {
             armorFlags |= ITEM_GROUP_HELM;
         }
         else if (bodyLocMap[pArmor->nType] == EQUIP_BODY)
         {
             armorFlags |= ITEM_GROUP_BODY_ARMOR;
         }
         else if (bodyLocMap[pArmor->nType] == EQUIP_GLOVES)
         {
             armorFlags |= ITEM_GROUP_GLOVES;
         }
         else if (bodyLocMap[pArmor->nType] == EQUIP_FEET)
         {
             armorFlags |= ITEM_GROUP_BOOTS;
         }
         else if (bodyLocMap[pArmor->nType] == EQUIP_BELT)
         {
             armorFlags |= ITEM_GROUP_BELT;
         }
         else if (bodyLocMap[pArmor->nType] == EQUIP_RIGHT_PRIMARY && ancestorTypes.find(ITEM_TYPE_ALLSHIELD) != ancestorTypes.end())
         {
             armorFlags |= ITEM_GROUP_SHIELD;
         }
 
         armorFlags = AssignClassFlags(pArmor->nType, ancestorTypes, armorFlags);
         if (IsClassItem(0, armorFlags))
         {
             baseFlags |= ITEM_GROUP_CLASS;
         }
 
         ItemAttributes* attrs = new ItemAttributes();
         attrs->name = UnicodeToAnsi(GetTblEntryByIndex(pArmor->wnamestr, TBLOFFSET_STRING));
         attrs->category = pArmor->nType;
         attrs->width = 0;
         attrs->height = 0;
         attrs->stackable = stackable;
         attrs->useable = useable;
         attrs->throwable = throwable;
         attrs->baseFlags = baseFlags;
         attrs->weaponFlags = 0;
         attrs->armorFlags = armorFlags;
         attrs->miscFlags = 0;
         attrs->qualityLevel = pArmor->blevel;
         attrs->magicLevel = pArmor->bmagiclvl;
         attrs->staffmodClass = pItemTypesTxtRecord ? pItemTypesTxtRecord->nStaffMods : 255;
         ItemAttributeMap[GetTxtItemCode(pArmor)] = attrs;
     }
 }
*/

export default parseArmorCSV;
