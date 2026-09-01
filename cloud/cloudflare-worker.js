/**
 * KONQR sync worker — one tiny endpoint holding the master planner snapshot.
 * Storage: KV binding KONQR_KV (key "data" = {version, savedAt, snapshot}).
 * Auth:    secret KONQR_TOKEN, sent by the app as  Authorization: Bearer <token>
 *
 * GET  /   -> {version, savedAt, snapshot}           (snapshot null if empty)
 * PUT  /   -> body {baseVersion, snapshot}
 *             saves only if baseVersion matches the stored version (no blind
 *             overwrites); on mismatch returns 409 with the current server copy
 *             so the app can merge and retry.
 * Daily backup: first save of each day also writes backup:YYYY-MM-DD (kept 45 days).
 */
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization,Content-Type",
    };
    const json = (obj, status) => new Response(JSON.stringify(obj), {
      status: status || 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const auth = request.headers.get("Authorization") || "";
    if (auth !== "Bearer " + env.KONQR_TOKEN) return json({ error: "unauthorized" }, 401);

    if (request.method === "GET") {
      const raw = await env.KONQR_KV.get("data");
      if (!raw) return json({ version: 0, savedAt: null, snapshot: null });
      return new Response(raw, { headers: { ...cors, "Content-Type": "application/json" } });
    }

    if (request.method === "PUT") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "bad json" }, 400); }
      if (!body || typeof body.snapshot !== "object" || body.snapshot === null)
        return json({ error: "missing snapshot" }, 400);

      const raw = await env.KONQR_KV.get("data");
      const cur = raw ? JSON.parse(raw) : { version: 0, savedAt: null, snapshot: null };

      if ((body.baseVersion | 0) !== (cur.version | 0))
        return json({ conflict: true, version: cur.version, savedAt: cur.savedAt, snapshot: cur.snapshot }, 409);

      const next = {
        version: (cur.version | 0) + 1,
        savedAt: new Date().toISOString(),
        snapshot: body.snapshot,
      };
      const text = JSON.stringify(next);
      await env.KONQR_KV.put("data", text);

      // daily backup, kept 45 days
      const day = next.savedAt.slice(0, 10);
      const bkey = "backup:" + day;
      if (!(await env.KONQR_KV.get(bkey, { type: "stream" })))
        await env.KONQR_KV.put(bkey, text, { expirationTtl: 45 * 86400 });

      return json({ ok: true, version: next.version, savedAt: next.savedAt });
    }

    return json({ error: "method not allowed" }, 405);
  },
};
