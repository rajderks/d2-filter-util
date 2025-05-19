import parseCSV from "./parseCSV";
import itemTypeData from "../data/ItemTypes.txt";

export type ItemTypeEntry = {
  Code: string;
  Throwable: number;
  BodyLoc1: string;
  Equiv1: string;
  Equiv2: string;
};

const bodyLocMap: Map<string, string> = new Map();
const throwableMap: Map<string, number> = new Map();
const parentMap1: Map<string, string> = new Map();
const parentMap2: Map<string, string> = new Map();

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

const getItemTypeMaps = () => {
  const itemTypeRecords = parseCSV<ItemTypeEntry>(itemTypeData);
  itemTypeRecords.forEach((_entry) => {
    if (_entry.Code?.length) {
      throwableMap.set(_entry.Code, _entry.Throwable);
      bodyLocMap.set(_entry.Code, _entry.BodyLoc1);

      if (_entry.Equiv1?.length) {
        parentMap1.set(_entry.Code, _entry.Equiv1);
      }
      //
      if (_entry.Equiv2?.length) {
        parentMap2.set(_entry.Code, _entry.Equiv2);
      }
    }
  });
};

export const isItemTypeThrowable = (itemTypeCode: ItemTypeEntry["Code"]) => {
  return throwableMap.get(itemTypeCode) ?? 0;
};

export const utilParse = () => {
  getItemTypeMaps();
  console.warn("throw", throwableMap);
  console.warn("bodyloc", bodyLocMap);
  console.warn("par1", parentMap1);
  console.warn("par2", parentMap2);
};
