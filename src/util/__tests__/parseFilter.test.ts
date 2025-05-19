import parseFilter, { FilterProperty } from "../parseFilter";

describe('parseFilter', () => {
    it('works', () => {
        const filter1 = "ItemDisplay[rvs]: %PURPLE%r %WHITE%35%";
        const filter1result = parseFilter(filter1);
        expect(filter1result.groups.length).toBe(1);
        expect(filter1result.groups[0].negated).toBeFalsy();
        expect((filter1result.groups[0].attr as FilterProperty).key).toBe('rvs');
        expect((filter1result.groups[0].attr as FilterProperty).value).toBeUndefined();
        
        const filter2 = parseFilter("ItemDisplay[(7ws OR 9ws OR wsp) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%");
        expect(filter2.groups.length).toBe(5);
        expect((filter2.groups[0].attr as FilterProperty[]).length).toBe(3);
        expect((filter2.groups[0].attr as FilterProperty[])[1].value).toBeUndefined();
        expect((filter2.groups[3].attr as FilterProperty).key).toBe('ID');
        expect(filter2.groups[3].negated).toBeTruthy();

        // const filter3 = "ItemDisplay[gsr CLVL<41]: %ORANGE%ruby"
        // const filter4 = "ItemDisplay[(MAPTIER=1 OR MAPTIER=2 OR MAPTIER=3 OR MAPTIER=4 OR t51 OR t52 OR t53 OR t54 OR t55 OR t61 OR t62) NMAG ETH !ID STAT242=12]: %NAME%%WHITE%%CONTINUE%{%NAME%}"
        // const filter5 = "ItemDisplay[(uap OR uhm OR usk OR urn OR uh9 OR xhm OR xsk OR xrn OR xh9) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%"
    })
})