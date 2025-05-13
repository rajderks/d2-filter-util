const colors = {
	WHITE:"#dddddd",
	GRAY:"#707070",
	BLUE:"#6666bb",	
	YELLOW:"#cccc77",
	GOLD:"#9b885e",
	GREEN:"#00f000",
	DGREEN:"#255d16",
	TAN:"#9b8c6d",
	BLACK:"000000",
	ORANGE:"#c48736",
	PURPLE:"#9b2aea",
	RED:"#a94838"
};

export type Filter = {
    ids: string[];
    _split0: string;
    _split1: string;
}

const seperateItemFromDisplay = (line: string) => {
    return line.split(':');
}

const regexItemIds = /(?<=[\[])([a-z0-9]+)|(?<=\(|\sOR\s)([a-z0-9])+/g;
const parseItemIds = (part: string): string[] => {
    const matchesIterator = part.matchAll(regexItemIds);
    return [...matchesIterator.map(matchedIdGroups => matchedIdGroups[0])];
}

const parseFilter = (line: string) => {
    const split = seperateItemFromDisplay(line);
    const ids = parseItemIds(split[0]);
    
    return {
        ids,
        _split0: split[0],  
        _split1: split[1],  
    };
}

export default parseFilter;