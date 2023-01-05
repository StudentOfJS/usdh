import { useState as f, useRef as j, useCallback as L, useEffect as k } from "react";
function z({
  url: r,
  init: i,
  optimisticData: C,
  useStaleCache: b,
  retry: y = 0,
  onError: s,
  invalidateCache: w = !1,
  cacheKey: c = r,
  expiration: n,
  errorHandlers: a
}) {
  const [q, d] = f(C || null), [E, g] = f(!0), [$, D] = f(null), [h, x] = f(y), R = j(), l = j(new AbortController()), T = L(async () => {
    C && g(!1);
    try {
      const e = await caches.open("usdh-cache"), m = await e.match(c);
      if (m && !w) {
        let t = 0;
        if (n)
          t = Date.now() + n * 1e3;
        else {
          const u = m.headers.get("Cache-Control");
          if (console.log("trying"), u) {
            console.log("trying cache");
            const p = u.split("max-age=")[1];
            p && (t = Date.now() + Number(p) * 1e3);
          }
        }
        if ((t > Date.now() || b) && (d(await m.json()), g(!1), !b))
          return;
      }
      const o = await fetch(r, {
        ...i,
        signal: l.current.signal
      });
      if (o.ok) {
        const t = o.headers.get("Cache-Control");
        if (t || n) {
          const u = new Request(c);
          e.put(u, o.clone(), {
            expiration: n || t
          });
        }
        d(await o.json());
      } else {
        const t = new Error(
          `Error ${o.status}: ${o.statusText}`
        );
        s && s(t), a && a[o.status] && a[o.status](t), D(t), A();
      }
    } catch (e) {
      s && e instanceof Error && (s(e), A()), e instanceof Error && D(e);
    } finally {
      g(!1);
    }
  }, [
    r,
    w,
    c,
    n,
    i,
    a,
    s
  ]);
  function A() {
    if (h > 0) {
      l.current = new AbortController();
      const e = 2 ** (y - h + 1) * 1e3;
      x(h - 1), R.current = setTimeout(() => T(), e);
    }
  }
  return k(() => (l.current = new AbortController(), () => {
    l.current.abort();
  }), []), k(() => (T(), () => {
    clearTimeout(R.current);
  }), [r, w, c, n, i]), { data: q, loading: E, error: $ };
}
export {
  z as default
};
