import { parse } from 'csv-parse/sync';

function csvParse(csv: string): (string | number)[] {
    const records = parse(csv, { delimiter:'\t', skipEmptyLines: true, columns: true});
    return records;
}


export default csvParse;