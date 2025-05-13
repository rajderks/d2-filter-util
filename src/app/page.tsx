import parseArmorCSV from "@/util/parse.armor";
import parseFilter from "@/util/parseFilter";

export default function Home() {
  const armors = parseArmorCSV();
  /*
ItemDisplay[rvs]: %PURPLE%r %WHITE%35%
ItemDisplay[(7ws OR 9ws OR wsp) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%
ItemDisplay[gsr CLVL<41]: %ORANGE%ruby
  */
  parseFilter("ItemDisplay[rvl]: %PURPLE%R %WHITE%70%");
  parseFilter(
    "ItemDisplay[(7ws OR 9ws OR wsp) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%"
  );
  parseFilter("ItemDisplay[gsr CLVL<41]: %ORANGE%ruby");
  const filter = parseFilter(
    "ItemDisplay[(uap OR uhm OR usk OR urn OR uh9 OR xhm OR xsk OR xrn OR xh9) RARE !ETH !ID CLVL<86]: %YELLOW%%NAME%"
  );
  const matchedArmors = armors.filter((x) =>
    filter.ids.find((y) => y === x.code)
  );
  console.log("matched armors: ", matchedArmors);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul>
          {matchedArmors.map((x) => (
            <li key={x.code}>{x.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
