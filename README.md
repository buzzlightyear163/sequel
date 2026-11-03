# sequel: every runner gets a part two.

Sajt + fungerande studio för $SEQUEL i termkit-stilen (graphite): monospace, gemener, ett pixel-"II" med lång skugga, och varje sektion är ett kommando. Allt ligger i `index.html` (en fil, ingen build). `api/runner.js` är en liten Vercel-funktion som låter studion läsa pump.fun och GeckoTerminal utan CORS-strul.

## Sektioner
- **hero:** `sequel make --part 2` skrivs ut, monumentet med lång skugga och en mini-terminal med den inlästa runnern (peak, nu, fall, holders, verdict).
- **01 how** (låst scroll): fem steg tänds, och terminalraderna visar riktiga värden för runnern.
- **02 studio** (fungerar på riktigt): CA, länk eller ticker in → Part I läses live (namn, pixlad bild, peak + datum, nu, fall, holders, likviditet, prickad chart, verdict) → kitet:
  - title + ticker (max 10 tecken)
  - lore i tre akter + logline
  - logo.png 1000×1000: monumentet i Part I:s färger, eller Part I pixlad med II:t som märke
  - en hel index.html för Part II i samma stil
  - launch-post (CA i reply)
  - launch: kopierar kitet och öppnar pump.fun/create (one-click står som "next")
  - sequel card för X
- **03 versus:** cto vs fork vs sequel.
- **04 live:** pump.fun-launches i realtid. Namn som läser som en part II flaggas. Utan anslutning syns en märkt preview, och räknarna står då på "—".
- **05 fees · 06 token · 07 faq · footer.**

## Fyll i vid launch (överst i sista `<script>`, `CONFIG`)
```js
ca: "",          // $SEQUEL mint-adressen
x: "",           // https://x.com/dittkonto
dexscreener: "", // valfritt
site: "",        // t.ex. "sequel.fun", skrivs på sequel cards
```
Tom `ca` visar "posted here and on X at launch". Köpknapparna går till `https://pump.fun/coin/<ca>`. Avgiftsfördelningen står i `FEES` precis under.

## Deploy
GitHub → Vercel, Framework: **Other**, ingen build command, output = roten. Lägg `index.html`, `og.png`, `fav.png`, `README.md` och mappen `api/` i repo-roten.

## Kolla efter deploy
1. Typsnittet: JetBrains Mono överallt.
2. X-förhandsvisning: `og.png` när du klistrar in länken.
3. Live-data: heron läser MOODENG automatiskt och mini-terminalen visar "· live". `/api/runner?mint=ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY` ska ge `dex`, `info`, `pump` och `ohlcv` (`pump: null` = pump.fun blockerar servern, då tas peaken från GeckoTerminal).
4. Live-sektionen ska visa "live · pump.fun".
5. Studion: testa pnut och fwog, alla sex flikar, save png, download och sequel card.

Grafiken (pfp, banner, launch, og, favicon) ligger i `grafik\`.

not financial advice.
