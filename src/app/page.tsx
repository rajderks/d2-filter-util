import { utilParse } from "@/util/parse.util";
import parseArmorCSV from "@/util/parse.armor";
import parseMiscCSV from "@/util/parse.misc";
import parseWeaponCSV from "@/util/parse.weapon";
import parseFilter from "@/util/parseFilter";

export default function Home() {
  utilParse();
  const armors = parseArmorCSV();
  const misc = parseMiscCSV();
  const weapons = parseWeaponCSV();
  console.log(armors);
  console.log(misc);
  /*
ItemDisplay[rvs]: %PURPLE%r %WHITE%35%
ItemDisplay[(7ws OR 9ws OR wsp) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%
ItemDisplay[gsr CLVL<41]: %ORANGE%ruby
ItemDisplay[(MAPTIER=1 OR MAPTIER=2 OR MAPTIER=3 OR MAPTIER=4 OR t51 OR t52 OR t53 OR t54 OR t55 OR t61 OR t62) NMAG ETH !ID STAT242=12]: %NAME%%WHITE%%CONTINUE%{%NAME%}
ItemDisplay[(uap OR uhm OR usk OR urn OR uh9 OR xhm OR xsk OR xrn OR xh9) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%
  */
  // parseFilter("ItemDisplay[rvl]: %PURPLE%R %WHITE%70%");
  // parseFilter(
  //   "ItemDisplay[(7ws OR 9ws OR wsp) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%"
  // );
  // parseFilter("ItemDisplay[gsr CLVL<41]: %ORANGE%ruby");
  parseFilter(
    "ItemDisplay[(MAPTIER=1 OR MAPTIER=2 OR MAPTIER=3 OR MAPTIER=4 OR t51 OR t52 OR t53 OR t54 OR t55 OR t61 OR t62) NMAG ETH !ID STAT242=12]: %NAME%%WHITE%%CONTINUE%{%NAME%}"
  );
  const filter = parseFilter(
    "ItemDisplay[(uap OR uhm OR usk OR urn OR uh9 OR xhm OR xsk OR xrn OR xh9) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%"
  );
  const matchedItems = [...armors, ...misc].filter((x) =>
    filter.groups
      .flatMap((x) =>
        Array.isArray(x.attr) ? x.attr.flatMap((x) => x.key) : x.attr.key
      )
      .find((y) => y === x.code)
  );
  console.log("matched armors: ", matchedItems);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul>
          {matchedItems.map((x) => (
            <li key={x.code}>{x.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
