import parseCSV from "./parseCSV"
import armorData from '../data/Armor.txt';

type ArmorEntry= {
    code: string;
    name: string;
    type: string;
}

const parseArmorCSV = () => {
    return parseCSV<ArmorEntry>(armorData).map((entry => {
        const _entry = {
            name: entry.name,
            code: entry.code,
            type: entry.type,
        };
        return _entry;
    }));
}

export default parseArmorCSV;