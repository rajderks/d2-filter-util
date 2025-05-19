import {
  ITEM_GROUP_ALLMACE,
  ITEM_GROUP_ALLWEAPON,
  ITEM_GROUP_AXE,
  ITEM_GROUP_BOW,
  ITEM_GROUP_CLUB,
  ITEM_GROUP_CROSSBOW,
  ITEM_GROUP_DAGGER,
  ITEM_GROUP_ELITE,
  ITEM_GROUP_EXCEPTIONAL,
  ITEM_GROUP_HAMMER,
  ITEM_GROUP_JAVELIN,
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
} from "@/data/Constants";
import weapData from "../data/Weapons.txt";
import parseCSV from "./parseCSV";
import { findAncestorTypes, isItemTypeThrowable } from "./parse.util";

type WeaponEntry = {
  baseFlags: number;
  weaponFlags: number;
  code: string;
  name: string;
  type: string;
  spawnable: number;
  mindam: number;
  maxdam: number;
  "2handed": number;
  "2handmindam": number;
  "2handmaxdam": number;
  speed: number;
  reqstr: number;
  reqdex: number;
  level: number;
  levelreq: number;
  normcode: string;
  ultracode: string;
  ubercode: string;
  wclass: string;
  staffmodClass: number;
  "2handedwclass": string;
  gemsockets: number;
  stackable: number;
  useable: number;
  throwable: number;
};

const parseWeaponCSV = () => {
  const records = parseCSV<WeaponEntry>(weapData);
  return records.map((entry) => {
    const ancestorTypes: Set<string> = new Set();
    findAncestorTypes(entry.type, ancestorTypes);
    const throwable = isItemTypeThrowable(entry.type);
    console.warn("stront", ancestorTypes, entry.code, entry.name);

    let baseFlags = 0;
    let weaponFlags = ITEM_GROUP_ALLWEAPON;

    if (entry.code === entry.ultracode) {
      baseFlags |= ITEM_GROUP_ELITE;
    } else if (entry.code === entry.ubercode) {
      baseFlags |= ITEM_GROUP_EXCEPTIONAL;
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

    const _entry: WeaponEntry = {
      baseFlags,
      weaponFlags,
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
      levelreq: entry.levelreq,
      normcode: entry.normcode,
      ultracode: entry.ultracode,
      ubercode: entry.ubercode,
      wclass: entry.wclass,
      ["2handedwclass"]: entry["2handedwclass"],
      gemsockets: entry.gemsockets,
      staffmodClass: 255,
      stackable: entry.stackable,
      useable: entry.useable,
      throwable,
    };
    return _entry;
  });
};

/*
void GetWeaponAttributes()
 {
     D2ItemDataTbl* pItemDataTables = D2COMMON_10535_DATATBLS_GetItemDataTables();
 
     for (auto d = 0; d < pItemDataTables->nWeaponsTxtRecordCount; d++)
     {
         ItemsTxt* pWeapons = &pItemDataTables->pWeapons[d];
         D2ItemTypesTxt* pItemTypesTxtRecord = NULL;
         if (pWeapons->nType >= 0 && pWeapons->nType < pItemDataTables->nItemsTxtRecordCount)
         {
             pItemTypesTxtRecord = &(*p_D2COMMON_sgptDataTable)->pItemsTypeTxt[pWeapons->nType];
         }
         BYTE stackable = pWeapons->bstackable > 0 ? pWeapons->bstackable : 0;
         BYTE useable = pWeapons->buseable > 0 ? pWeapons->buseable : 0;
         BYTE throwable = throwableMap[pWeapons->nType] > 0 ? throwableMap[pWeapons->nType] : 0;
         unsigned int baseFlags = 0, weaponFlags = ITEM_GROUP_ALLWEAPON;
 
         std::set<WORD> ancestorTypes;
         FindAncestorTypes(pWeapons->nType, ancestorTypes, parentMap1, parentMap2);
 
         if (pWeapons->dwcode == pWeapons->dwultracode)
         {
             baseFlags |= ITEM_GROUP_ELITE;
         }
         else if (pWeapons->dwcode == pWeapons->dwubercode)
         {
             baseFlags |= ITEM_GROUP_EXCEPTIONAL;
         }
         else
         {
             baseFlags |= ITEM_GROUP_NORMAL;
         }
 
         if (ancestorTypes.find(ITEM_TYPE_CLUB) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_CLUB;
             weaponFlags |= ITEM_GROUP_ALLMACE;
         }
         else if (ancestorTypes.find(ITEM_TYPE_MACE) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_TIPPED_MACE;
             weaponFlags |= ITEM_GROUP_ALLMACE;
         }
         else if (ancestorTypes.find(ITEM_TYPE_HAMMER) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_HAMMER;
             weaponFlags |= ITEM_GROUP_ALLMACE;
         }
         else if (ancestorTypes.find(ITEM_TYPE_WAND) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_WAND;
         }
         else if (ancestorTypes.find(ITEM_TYPE_STAFF) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_STAFF;
         }
         else if (ancestorTypes.find(ITEM_TYPE_BOW) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_BOW;
         }
         else if (ancestorTypes.find(ITEM_TYPE_AXE) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_AXE;
         }
         else if (ancestorTypes.find(ITEM_TYPE_SCEPTER) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_SCEPTER;
         }
         else if (ancestorTypes.find(ITEM_TYPE_SWORD) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_SWORD;
         }
         else if (ancestorTypes.find(ITEM_TYPE_KNIFE) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_DAGGER;
         }
         else if (ancestorTypes.find(ITEM_TYPE_JAVELIN) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_JAVELIN;
         }
         else if (ancestorTypes.find(ITEM_TYPE_SPEAR) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_SPEAR;
         }
         else if (ancestorTypes.find(ITEM_TYPE_POLEARM) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_POLEARM;
         }
         else if (ancestorTypes.find(ITEM_TYPE_CROSSBOW) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_CROSSBOW;
         }
         if (ancestorTypes.find(ITEM_TYPE_THROWN) != ancestorTypes.end())
         {
             weaponFlags |= ITEM_GROUP_THROWING;
         }
 
         weaponFlags = AssignClassFlags(pWeapons->nType, ancestorTypes, weaponFlags);
         if (IsClassItem(weaponFlags, 0))
         {
             baseFlags |= ITEM_GROUP_CLASS;
         }
 
         ItemAttributes* attrs = new ItemAttributes();
         attrs->name = UnicodeToAnsi(GetTblEntryByIndex(pWeapons->wnamestr, TBLOFFSET_STRING));
         attrs->category = pWeapons->nType;
         attrs->width = 0;
         attrs->height = 0;
         attrs->stackable = stackable;
         attrs->useable = useable;
         attrs->throwable = throwable;
         attrs->baseFlags = baseFlags;
         attrs->weaponFlags = weaponFlags;
         attrs->armorFlags = 0;
         attrs->miscFlags = 0;
         attrs->qualityLevel = pWeapons->blevel;
         attrs->magicLevel = pWeapons->bmagiclvl;
         attrs->staffmodClass = pItemTypesTxtRecord ? pItemTypesTxtRecord->nStaffMods : 255;
         ItemAttributeMap[GetTxtItemCode(pWeapons)] = attrs;
     }
 }
*/

export default parseWeaponCSV;
