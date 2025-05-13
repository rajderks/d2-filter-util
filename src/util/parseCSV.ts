import { parse } from 'csv-parse/sync';

function parseCSV<T>(csv: string): T[] {
    const records = parse(csv, { delimiter:'\t', skipEmptyLines: true, columns: true});
    return records;
}


export default parseCSV;