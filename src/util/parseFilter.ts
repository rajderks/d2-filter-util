// const colors = {
// 	WHITE:"#dddddd",
// 	GRAY:"#707070",
// 	BLUE:"#6666bb",	
// 	YELLOW:"#cccc77",
// 	GOLD:"#9b885e",
// 	GREEN:"#00f000",
// 	DGREEN:"#255d16",
// 	TAN:"#9b8c6d",
// 	BLACK:"000000",
// 	ORANGE:"#c48736",
// 	PURPLE:"#9b2aea",
// 	RED:"#a94838"
// };

export type Filter = {
    groups: FilterGroup[];
    _split0: string;
    _split1: string;
}

export type FilterGroup = {
    attr:  FilterProperty[] | FilterProperty;
    negated: boolean;
    _literal: string;
}

export type FilterProperty = {
    key: string;
    value?: number | [number, number];
}

// const infoCodes = [
//     'GOLD',
//     'GEMLEVEL',
//     'GEM',
//     'GEMTYPE',
//     'RUNE',
//     'QTY',
//     'LVLREQ',
//     'PRICE',
//     'ALVL',
//     'CRAFTALVL',
//     'QLVL',
//     'ILVL',
//     'CLVL',
//     'DIFF',
//     'MAPID',
//     'MAPTIER',
//     'PREFIX',
//     'SUFFIX',
//     'AUTOMOD',
//     'FILTLVL'
// ]

// (?<=\[)\s?([\!a-zA-Z0-9><=\(\)\s]+)? // String uit brackets halen
// (\!?\(.*?\))|(?<=\[)([\!a-zA-Z0-9><=]+)|(?<=\[)\s?([\!a-zA-Z0-9><=]+)+?\s?

const seperateItemFromDisplay = (line: string) => {
    return line.split(':');
}

const stripItemDisplay_unsafe = (part: string) => {
    return part.replace('ItemDisplay[', '').replace(']', '');
}


const parseFilterProperties = (group: string) => {
    // Multi
    if(group.startsWith('(')) {
        const splits = group.slice(1, group.length-1).split(' OR ').map(x => x.trim());
        const properties = splits.map(x => parseFilterProperty(x));
        return properties;
    } 
    // Single
    else {
        return parseFilterProperty(group);
    }
}

const parseFilterProperty = (prop: string): FilterProperty => {
    const _split = prop.split(/[=><]/);
    const key = _split[0];
    const value = _split[1];
    const _numVal = Number.parseInt(value, 10);
    return {
        key,
        value: value?.length ? _numVal : undefined
    }
}

const regexItemGroupings = /(?<=\[)(\!?\(.*?\))/g

const parseFilterGroups = (part: string): FilterGroup[] => {
    let _part = part;
    const groups = [...part.matchAll(regexItemGroupings).map(matchedIdGroups => matchedIdGroups[0])];
    for(const group of groups) {
        _part = _part.replace(group, '');
    }

    // Remove unnecesary parts
    _part = stripItemDisplay_unsafe(_part);
    const ungroupedProperties = _part.split(' ').filter(_partGroup => _partGroup.length);
    const ungroupedFilterProps = ungroupedProperties.map(groupString => ({
          attr: parseFilterProperties(groupString.startsWith('!') ? groupString.slice(1, groupString.length) : groupString),
          negated: groupString.startsWith('!'),
          _literal: groupString,
    }));
    const groupedFilterProps = groups.map(groupString => ({
        attr: parseFilterProperties(groupString.startsWith('!') ? groupString.slice(1, groupString.length) : groupString),
        negated: groupString.startsWith('!'),
          _literal: groupString,
}));

    return [...groupedFilterProps, ...ungroupedFilterProps];
}

// const regexFloep = infoCodes.reduce((acc, val) =>  {
//     if(!acc?.length) {
//         return acc;
//     }
//     return `${acc}|${val}`}
// )
// const infoCodeRegexString= `(${regexFloep}){1}[=><](\\d+)`;
// const regexInfoCodes = new RegExp(infoCodeRegexString, "g");

// const regexItemIds = /(?<=[\[])([a-z0-9]+)|(?<=\(|\sOR\s)([a-z0-9])+/g;

// const parseItemIds = (part: string): FilterGroup => {
//     const matchesIteratorIDs = part.matchAll(regexItemIds);
//     const matchesIteratorInfoCodes = part.matchAll(regexInfoCodes);
//     return {
//         ids: [...matchesIteratorIDs.map(matchedIdGroups => matchedIdGroups[0]), ...matchesIteratorInfoCodes.map(matchedInfoCodeGroups => matchedInfoCodeGroups[0])],
//         negated: true
//     };
// }

const parseFilter = (line: string) => {
    const split = seperateItemFromDisplay(line);
    const filterGroups = parseFilterGroups(split[0]);
    console.warn('FILTERGROUPS', filterGroups);

    // const ids = parseItemIds(split[0]);
    // console.warn('ids', ids);
    return {
        groups: filterGroups,
        _split0: split[0],  
        _split1: split[1],  
    };
}

export default parseFilter;