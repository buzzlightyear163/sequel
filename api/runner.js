// SEQUEL · /api/runner?mint=<address>
// A small same-origin proxy so the studio can read pump.fun and GeckoTerminal without CORS trouble or API keys.
// Vercel runs this file automatically as a serverless function (no build step, no settings). Results are cached at the edge.

const B58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const GT = "https://api.geckoterminal.com/api/v2/networks/solana";

async function get(url, ms = 7000) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(url, { signal: c.signal, headers: { accept: "application/json" } });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function bestPool(pairs) {
  if (!Array.isArray(pairs)) return null;
  const p = pairs
    .filter(x => x && x.chainId === "solana" && x.pairAddress)
    .sort((a, b) => ((b.liquidity || {}).usd || 0) - ((a.liquidity || {}).usd || 0))[0];
  return p ? p.pairAddress : null;
}

module.exports = async (req, res) => {
  const mint = String((req.query && req.query.mint) || "").trim();
  if (!B58.test(mint)) {
    res.status(400).json({ error: "Pass ?mint=<Solana address>" });
    return;
  }
  const [dex, info, pump] = await Promise.all([
    get(`https://api.dexscreener.com/tokens/v1/solana/${mint}`),
    get(`${GT}/tokens/${mint}/info`),
    get(`https://frontend-api-v3.pump.fun/coins/${mint}`)
  ]);
  const pool = bestPool(dex);
  const ohlcv = pool ? await get(`${GT}/pools/${pool}/ohlcv/day?aggregate=1&limit=1000&currency=usd`) : null;
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=3600");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ v: 1, mint, pool, dex, info, pump, ohlcv });
};
