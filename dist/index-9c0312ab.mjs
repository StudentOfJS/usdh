import { useState as a, useEffect as k } from "react";
function h(r, s) {
  const [l, n] = a(null), [d, f] = a(null), [i, o] = a(!0);
  return k(() => {
    let t;
    return typeof Worker < "u" && (t = new Worker("/worker.js?worker&inline")), t ? (t.postMessage({ url: r, init: s }), t.onmessage = (e) => {
      const { data: u, error: c } = e.data;
      c ? f(c) : n(u), o(!1);
    }) : fetch(r, s).then((e) => e.json()).then((e) => {
      n(e), o(!1);
    }).catch((e) => {
      f(e), o(!1);
    }), () => {
      t && t.terminate();
    };
  }, [r]), { data: l, error: d, loading: i };
}
export {
  h as default
};
