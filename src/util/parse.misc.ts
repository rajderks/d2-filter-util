import parseCSV from "./parseCSV"
import miscData from '../data/Misc.txt';

type MiscEntry= {
    code: string;
    name: string;
    level: number;
    levelReq: number;
    type: string;
    type2: string;
}

const parseMiscCSV = () => {

    const records = parseCSV<MiscEntry>(miscData);
    return records.map((entry => {
        const _entry = {
            name: entry.name,
            code: entry.code,
            level: entry.level,
            levelReq: entry.level,
            type: entry.type,
            type2: entry.type2
        };
        return _entry;
    }));
}

export default parseMiscCSV;