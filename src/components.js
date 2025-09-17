import * as Yo from "vue";
import { effectScope as mo, getCurrentScope as vo, onScopeDispose as ho, computed as y, toRef as nt, readonly as bo, ref as D, customRef as Xr, onMounted as Se, nextTick as he, isRef as At, reactive as Ot, unref as d, getCurrentInstance as Te, watch as fe, hasInjectionContext as Zr, inject as xe, toRefs as We, toValue as le, shallowRef as Ne, defineComponent as F, watchEffect as Me, h as je, provide as pt, Fragment as $e, onBeforeUnmount as ba, toHandlerKey as ya, camelize as ei, onUnmounted as vt, Comment as wa, mergeProps as K, cloneVNode as xa, createBlock as I, openBlock as x, withCtx as B, renderSlot as q, createVNode as ie, createCommentVNode as ne, withKeys as rt, normalizeStyle as yo, Teleport as ka, markRaw as Ca, createElementBlock as oe, renderList as Rt, watchPostEffect as ti, shallowReadonly as kt, mergeDefaults as Sa, withModifiers as gt, watchSyncEffect as _a, withMemo as Aa, resolveDynamicComponent as Nt, normalizeProps as qe, createTextVNode as Ce, toDisplayString as we, guardReactiveProps as xn, resolveComponent as ni, mergeModels as jt, useModel as wo, normalizeClass as N, useSlots as zt, createElementVNode as Je, toRaw as Ia, useId as oi } from "vue";
function Hn(e, t = {}, n) {
  for (const o in e) {
    const r = e[o], i = n ? `${n}:${o}` : o;
    typeof r == "object" && r !== null ? Hn(r, t, i) : typeof r == "function" && (t[i] = r);
  }
  return t;
}
const Oa = { run: (e) => e() }, Ea = () => Oa, ri = typeof console.createTask < "u" ? console.createTask : Ea;
function Ta(e, t) {
  const n = t.shift(), o = ri(n);
  return e.reduce(
    (r, i) => r.then(() => o.run(() => i(...t))),
    Promise.resolve()
  );
}
function za(e, t) {
  const n = t.shift(), o = ri(n);
  return Promise.all(e.map((r) => o.run(() => r(...t))));
}
function zn(e, t) {
  for (const n of [...e])
    n(t);
}
class Pa {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, n, o = {}) {
    if (!t || typeof n != "function")
      return () => {
      };
    const r = t;
    let i;
    for (; this._deprecatedHooks[t]; )
      i = this._deprecatedHooks[t], t = i.to;
    if (i && !o.allowDeprecated) {
      let a = i.message;
      a || (a = `${r} hook has been deprecated` + (i.to ? `, please use ${i.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(a) || (console.warn(a), this._deprecatedMessages.add(a));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0
        });
      } catch {
      }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(n), () => {
      n && (this.removeHook(t, n), n = void 0);
    };
  }
  hookOnce(t, n) {
    let o, r = (...i) => (typeof o == "function" && o(), o = void 0, r = void 0, n(...i));
    return o = this.hook(t, r), o;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const o = this._hooks[t].indexOf(n);
      o !== -1 && this._hooks[t].splice(o, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const o = this._hooks[t] || [];
    delete this._hooks[t];
    for (const r of o)
      this.hook(t, r);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t)
      this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = Hn(t), o = Object.keys(n).map(
      (r) => this.hook(r, n[r])
    );
    return () => {
      for (const r of o.splice(0, o.length))
        r();
    };
  }
  removeHooks(t) {
    const n = Hn(t);
    for (const o in n)
      this.removeHook(o, n[o]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Ta, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(za, t, ...n);
  }
  callHookWith(t, n, ...o) {
    const r = this._before || this._after ? { name: n, args: o, context: {} } : void 0;
    this._before && zn(this._before, r);
    const i = t(
      n in this._hooks ? [...this._hooks[n]] : [],
      o
    );
    return i instanceof Promise ? i.finally(() => {
      this._after && r && zn(this._after, r);
    }) : (this._after && r && zn(this._after, r), i);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    };
  }
}
function Ba() {
  return new Pa();
}
function ii(e) {
  return vo() ? (ho(e), !0) : !1;
}
const Pn = /* @__PURE__ */ new WeakMap(), $a = /* @__NO_SIDE_EFFECTS__ */ (...e) => {
  var t;
  const n = e[0], o = (t = Te()) == null ? void 0 : t.proxy;
  if (o == null && !Zr())
    throw new Error("injectLocal must be called in setup");
  return o && Pn.has(o) && n in Pn.get(o) ? Pn.get(o)[n] : xe(...e);
};
// @__NO_SIDE_EFFECTS__
function La(e) {
  let t = 0, n, o;
  const r = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...i) => (t += 1, o || (o = mo(!0), n = o.run(() => e(...i))), ii(r), n);
}
// @__NO_SIDE_EFFECTS__
function Ma(e, t) {
  if (typeof Symbol < "u") {
    const n = { ...e };
    return Object.defineProperty(n, Symbol.iterator, {
      enumerable: !1,
      value() {
        let o = 0;
        return {
          next: () => ({
            value: t[o++],
            done: o > t.length
          })
        };
      }
    }), n;
  } else
    return Object.assign([...t], e);
}
function qa(e) {
  if (!At(e))
    return Ot(e);
  const t = new Proxy({}, {
    get(n, o, r) {
      return d(Reflect.get(e.value, o, r));
    },
    set(n, o, r) {
      return At(e.value[o]) && !At(r) ? e.value[o].value = r : e.value[o] = r, !0;
    },
    deleteProperty(n, o) {
      return Reflect.deleteProperty(e.value, o);
    },
    has(n, o) {
      return Reflect.has(e.value, o);
    },
    ownKeys() {
      return Object.keys(e.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    }
  });
  return Ot(t);
}
function ai(e) {
  return qa(y(e));
}
function si(e, ...t) {
  const n = t.flat(), o = n[0];
  return ai(() => Object.fromEntries(typeof o == "function" ? Object.entries(We(e)).filter(([r, i]) => !o(le(i), r)) : Object.entries(We(e)).filter((r) => !n.includes(r[0]))));
}
const Fa = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Va = (e) => typeof e < "u", Ra = Object.prototype.toString, Da = (e) => Ra.call(e) === "[object Object]", Wn = () => {
};
function xo(...e) {
  if (e.length !== 1)
    return nt(...e);
  const t = e[0];
  return typeof t == "function" ? bo(Xr(() => ({ get: t, set: Wn }))) : D(t);
}
function Yt(e, ...t) {
  const n = t.flat(), o = n[0];
  return ai(() => Object.fromEntries(typeof o == "function" ? Object.entries(We(e)).filter(([r, i]) => o(le(i), r)) : n.map((r) => [r, xo(e, r)])));
}
function li(e, t) {
  function n(...o) {
    return new Promise((r, i) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(r).catch(i);
    });
  }
  return n;
}
const ui = (e) => e();
function Na(e, t = {}) {
  let n, o, r = Wn;
  const i = (u) => {
    clearTimeout(u), r(), r = Wn;
  };
  let a;
  return (u) => {
    const c = le(e), l = le(t.maxWait);
    return n && i(n), c <= 0 || l !== void 0 && l <= 0 ? (o && (i(o), o = void 0), Promise.resolve(u())) : new Promise((f, g) => {
      r = t.rejectOnCancel ? g : f, a = u, l && !o && (o = setTimeout(() => {
        n && i(n), o = void 0, f(a());
      }, l)), n = setTimeout(() => {
        o && i(o), o = void 0, f(u());
      }, c);
    });
  };
}
function ja(e = ui, t = {}) {
  const {
    initialState: n = "active"
  } = t, o = xo(n === "active");
  function r() {
    o.value = !1;
  }
  function i() {
    o.value = !0;
  }
  const a = (...s) => {
    o.value && e(...s);
  };
  return { isActive: bo(o), pause: r, resume: i, eventFilter: a };
}
function Qo(e) {
  return e.endsWith("rem") ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function Bn(e) {
  return Array.isArray(e) ? e : [e];
}
function Ha(e) {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}
const Wa = /-(\w)/g, Ka = Ha((e) => e.replace(Wa, (t, n) => n ? n.toUpperCase() : ""));
function Ga(e) {
  return Te();
}
// @__NO_SIDE_EFFECTS__
function Ua(e, t = 200, n = {}) {
  return li(
    Na(t, n),
    e
  );
}
function Ya(e, t, n = {}) {
  const {
    eventFilter: o = ui,
    ...r
  } = n;
  return fe(
    e,
    li(
      o,
      t
    ),
    r
  );
}
function Qa(e, t, n = {}) {
  const {
    eventFilter: o,
    initialState: r = "active",
    ...i
  } = n, { eventFilter: a, pause: s, resume: u, isActive: c } = ja(o, { initialState: r });
  return { stop: Ya(
    e,
    t,
    {
      ...i,
      eventFilter: a
    }
  ), pause: s, resume: u, isActive: c };
}
function ci(e, t = !0, n) {
  Ga() ? Se(e, n) : t ? e() : he(e);
}
function Ja(e, t, n) {
  return fe(
    e,
    t,
    {
      ...n,
      immediate: !0
    }
  );
}
// @__NO_SIDE_EFFECTS__
function Xa(e = {}) {
  const {
    inheritAttrs: t = !0
  } = e, n = Ne(), o = /* @__PURE__ */ F({
    setup(i, { slots: a }) {
      return () => {
        n.value = a.default;
      };
    }
  }), r = /* @__PURE__ */ F({
    inheritAttrs: t,
    props: e.props,
    setup(i, { attrs: a, slots: s }) {
      return () => {
        var u;
        if (!n.value && process.env.NODE_ENV !== "production")
          throw new Error("[VueUse] Failed to find the definition of reusable template");
        const c = (u = n.value) == null ? void 0 : u.call(n, {
          ...e.props == null ? Za(a) : i,
          $slots: s
        });
        return t && c?.length === 1 ? c[0] : c;
      };
    }
  });
  return /* @__PURE__ */ Ma(
    { define: o, reuse: r },
    [o, r]
  );
}
function Za(e) {
  const t = {};
  for (const n in e)
    t[Ka(n)] = e[n];
  return t;
}
const Ht = Fa ? window : void 0;
function di(e) {
  var t;
  const n = le(e);
  return (t = n?.$el) != null ? t : n;
}
function Kn(...e) {
  const t = [], n = () => {
    t.forEach((s) => s()), t.length = 0;
  }, o = (s, u, c, l) => (s.addEventListener(u, c, l), () => s.removeEventListener(u, c, l)), r = y(() => {
    const s = Bn(le(e[0])).filter((u) => u != null);
    return s.every((u) => typeof u != "string") ? s : void 0;
  }), i = Ja(
    () => {
      var s, u;
      return [
        (u = (s = r.value) == null ? void 0 : s.map((c) => di(c))) != null ? u : [Ht].filter((c) => c != null),
        Bn(le(r.value ? e[1] : e[0])),
        Bn(d(r.value ? e[2] : e[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        le(r.value ? e[3] : e[2])
      ];
    },
    ([s, u, c, l]) => {
      if (n(), !s?.length || !u?.length || !c?.length)
        return;
      const f = Da(l) ? { ...l } : l;
      t.push(
        ...s.flatMap(
          (g) => u.flatMap(
            (m) => c.map((p) => o(g, m, p, f))
          )
        )
      );
    },
    { flush: "post" }
  ), a = () => {
    i(), n();
  };
  return ii(n), a;
}
// @__NO_SIDE_EFFECTS__
function es() {
  const e = Ne(!1), t = Te();
  return t && Se(() => {
    e.value = !0;
  }, t), e;
}
// @__NO_SIDE_EFFECTS__
function ts(e) {
  const t = /* @__PURE__ */ es();
  return y(() => (t.value, !!e()));
}
const ns = Symbol("vueuse-ssr-width");
// @__NO_SIDE_EFFECTS__
function os() {
  const e = Zr() ? /* @__PURE__ */ $a(ns, null) : null;
  return typeof e == "number" ? e : void 0;
}
function rs(e, t = {}) {
  const { window: n = Ht, ssrWidth: o = /* @__PURE__ */ os() } = t, r = /* @__PURE__ */ ts(() => n && "matchMedia" in n && typeof n.matchMedia == "function"), i = Ne(typeof o == "number"), a = Ne(), s = Ne(!1), u = (c) => {
    s.value = c.matches;
  };
  return Me(() => {
    if (i.value) {
      i.value = !r.value;
      const c = le(e).split(",");
      s.value = c.some((l) => {
        const f = l.includes("not all"), g = l.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), m = l.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let p = !!(g || m);
        return g && p && (p = o >= Qo(g[1])), m && p && (p = o <= Qo(m[1])), f ? !p : p;
      });
      return;
    }
    r.value && (a.value = n.matchMedia(le(e)), s.value = a.value.matches);
  }), Kn(a, "change", u, { passive: !0 }), y(() => s.value);
}
function is(e) {
  return JSON.parse(JSON.stringify(e));
}
const Jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Xt = "__vueuse_ssr_handlers__", as = /* @__PURE__ */ ss();
function ss() {
  return Xt in Jt || (Jt[Xt] = Jt[Xt] || {}), Jt[Xt];
}
function fi(e, t) {
  return as[e] || t;
}
// @__NO_SIDE_EFFECTS__
function ls(e) {
  return rs("(prefers-color-scheme: dark)", e);
}
function us(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const cs = {
  boolean: {
    read: (e) => e === "true",
    write: (e) => String(e)
  },
  object: {
    read: (e) => JSON.parse(e),
    write: (e) => JSON.stringify(e)
  },
  number: {
    read: (e) => Number.parseFloat(e),
    write: (e) => String(e)
  },
  any: {
    read: (e) => e,
    write: (e) => String(e)
  },
  string: {
    read: (e) => e,
    write: (e) => String(e)
  },
  map: {
    read: (e) => new Map(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e.entries()))
  },
  set: {
    read: (e) => new Set(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e))
  },
  date: {
    read: (e) => new Date(e),
    write: (e) => e.toISOString()
  }
}, Jo = "vueuse-storage";
function ds(e, t, n, o = {}) {
  var r;
  const {
    flush: i = "pre",
    deep: a = !0,
    listenToStorageChanges: s = !0,
    writeDefaults: u = !0,
    mergeDefaults: c = !1,
    shallow: l,
    window: f = Ht,
    eventFilter: g,
    onError: m = (k) => {
      console.error(k);
    },
    initOnMounted: p
  } = o, h = (l ? Ne : D)(typeof t == "function" ? t() : t), v = y(() => le(e));
  if (!n)
    try {
      n = fi("getDefaultStorage", () => {
        var k;
        return (k = Ht) == null ? void 0 : k.localStorage;
      })();
    } catch (k) {
      m(k);
    }
  if (!n)
    return h;
  const w = le(t), S = us(w), b = (r = o.serializer) != null ? r : cs[S], { pause: C, resume: A } = Qa(
    h,
    (k) => H(k),
    { flush: i, deep: a, eventFilter: g }
  );
  fe(v, () => W(), { flush: i });
  let $ = !1;
  const T = (k) => {
    p && !$ || W(k);
  }, E = (k) => {
    p && !$ || ee(k);
  };
  f && s && (n instanceof Storage ? Kn(f, "storage", T, { passive: !0 }) : Kn(f, Jo, E)), p ? ci(() => {
    $ = !0, W();
  }) : W();
  function j(k, O) {
    if (f) {
      const M = {
        key: v.value,
        oldValue: k,
        newValue: O,
        storageArea: n
      };
      f.dispatchEvent(n instanceof Storage ? new StorageEvent("storage", M) : new CustomEvent(Jo, {
        detail: M
      }));
    }
  }
  function H(k) {
    try {
      const O = n.getItem(v.value);
      if (k == null)
        j(O, null), n.removeItem(v.value);
      else {
        const M = b.write(k);
        O !== M && (n.setItem(v.value, M), j(O, M));
      }
    } catch (O) {
      m(O);
    }
  }
  function Z(k) {
    const O = k ? k.newValue : n.getItem(v.value);
    if (O == null)
      return u && w != null && n.setItem(v.value, b.write(w)), w;
    if (!k && c) {
      const M = b.read(O);
      return typeof c == "function" ? c(M, w) : S === "object" && !Array.isArray(M) ? { ...w, ...M } : M;
    } else return typeof O != "string" ? O : b.read(O);
  }
  function W(k) {
    if (!(k && k.storageArea !== n)) {
      if (k && k.key == null) {
        h.value = w;
        return;
      }
      if (!(k && k.key !== v.value)) {
        C();
        try {
          const O = b.write(h.value);
          (k === void 0 || k?.newValue !== O) && (h.value = Z(k));
        } catch (O) {
          m(O);
        } finally {
          k ? he(A) : A();
        }
      }
    }
  }
  function ee(k) {
    W(k.detail);
  }
  return h;
}
const fs = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function ps(e = {}) {
  const {
    selector: t = "html",
    attribute: n = "class",
    initialValue: o = "auto",
    window: r = Ht,
    storage: i,
    storageKey: a = "vueuse-color-scheme",
    listenToStorageChanges: s = !0,
    storageRef: u,
    emitAuto: c,
    disableTransition: l = !0
  } = e, f = {
    auto: "",
    light: "light",
    dark: "dark",
    ...e.modes || {}
  }, g = /* @__PURE__ */ ls({ window: r }), m = y(() => g.value ? "dark" : "light"), p = u || (a == null ? xo(o) : ds(a, o, i, { window: r, listenToStorageChanges: s })), h = y(() => p.value === "auto" ? m.value : p.value), v = fi(
    "updateHTMLAttrs",
    (C, A, $) => {
      const T = typeof C == "string" ? r?.document.querySelector(C) : di(C);
      if (!T)
        return;
      const E = /* @__PURE__ */ new Set(), j = /* @__PURE__ */ new Set();
      let H = null;
      if (A === "class") {
        const W = $.split(/\s/g);
        Object.values(f).flatMap((ee) => (ee || "").split(/\s/g)).filter(Boolean).forEach((ee) => {
          W.includes(ee) ? E.add(ee) : j.add(ee);
        });
      } else
        H = { key: A, value: $ };
      if (E.size === 0 && j.size === 0 && H === null)
        return;
      let Z;
      l && (Z = r.document.createElement("style"), Z.appendChild(document.createTextNode(fs)), r.document.head.appendChild(Z));
      for (const W of E)
        T.classList.add(W);
      for (const W of j)
        T.classList.remove(W);
      H && T.setAttribute(H.key, H.value), l && (r.getComputedStyle(Z).opacity, document.head.removeChild(Z));
    }
  );
  function w(C) {
    var A;
    v(t, n, (A = f[C]) != null ? A : C);
  }
  function S(C) {
    e.onChanged ? e.onChanged(C, w) : w(C);
  }
  fe(h, S, { flush: "post", immediate: !0 }), ci(() => S(h.value));
  const b = y({
    get() {
      return c ? p.value : h.value;
    },
    set(C) {
      p.value = C;
    }
  });
  return Object.assign(b, { store: p, system: m, state: h });
}
// @__NO_SIDE_EFFECTS__
function gs(e, t, n, o = {}) {
  var r, i, a;
  const {
    clone: s = !1,
    passive: u = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: f,
    shouldEmit: g
  } = o, m = Te(), p = n || m?.emit || ((r = m?.$emit) == null ? void 0 : r.bind(m)) || ((a = (i = m?.proxy) == null ? void 0 : i.$emit) == null ? void 0 : a.bind(m?.proxy));
  let h = c;
  h = h || `update:${t.toString()}`;
  const v = (b) => s ? typeof s == "function" ? s(b) : is(b) : b, w = () => Va(e[t]) ? v(e[t]) : f, S = (b) => {
    g ? g(b) && p(h, b) : p(h, b);
  };
  if (u) {
    const b = w(), C = D(b);
    let A = !1;
    return fe(
      () => e[t],
      ($) => {
        A || (A = !0, C.value = v($), he(() => A = !1));
      }
    ), fe(
      C,
      ($) => {
        !A && ($ !== e[t] || l) && S($);
      },
      { deep: l }
    ), C;
  } else
    return y({
      get() {
        return w();
      },
      set(b) {
        S(b);
      }
    });
}
const ko = {
  ui: {
    icons: {
      dark: "i-lucide-moon",
      light: "i-lucide-sun"
    }
  },
  colorMode: {
    preference: "system"
  }
};
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
const ms = typeof document < "u", vs = () => {
}, fn = Array.isArray;
function Xo(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
function Zo(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function hs(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!bs(e[n], t[n]))
      return !1;
  return !0;
}
function bs(e, t) {
  return fn(e) ? er(e, t) : fn(t) ? er(t, e) : e === t;
}
function er(e, t) {
  return fn(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
var tr;
(function(e) {
  e.pop = "pop", e.push = "push";
})(tr || (tr = {}));
var nr;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(nr || (nr = {}));
function or(e) {
  return typeof e == "string" || e && typeof e == "object";
}
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var rr;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(rr || (rr = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const pi = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), gi = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function ir(e) {
  const t = xe(pi), n = xe(gi);
  let o = !1, r = null;
  const i = y(() => {
    const l = d(e.to);
    return process.env.NODE_ENV !== "production" && (!o || l !== r) && (or(l) || (o ? Xo(`Invalid value for prop "to" in useLink()
- to:`, l, `
- previous to:`, r, `
- props:`, e) : Xo(`Invalid value for prop "to" in useLink()
- to:`, l, `
- props:`, e)), r = l, o = !0), t.resolve(l);
  }), a = y(() => {
    const { matched: l } = i.value, { length: f } = l, g = l[f - 1], m = n.matched;
    if (!g || !m.length)
      return -1;
    const p = m.findIndex(Zo.bind(null, g));
    if (p > -1)
      return p;
    const h = ar(l[f - 2]);
    return (
      // we are dealing with nested routes
      f > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      ar(g) === h && // avoid comparing the child with its parent
      m[m.length - 1].path !== h ? m.findIndex(Zo.bind(null, l[f - 2])) : p
    );
  }), s = y(() => a.value > -1 && Cs(n.params, i.value.params)), u = y(() => a.value > -1 && a.value === n.matched.length - 1 && hs(n.params, i.value.params));
  function c(l = {}) {
    if (ks(l)) {
      const f = t[d(e.replace) ? "replace" : "push"](
        d(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(vs);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => f), f;
    }
    return Promise.resolve();
  }
  if (process.env.NODE_ENV !== "production" && ms) {
    const l = Te();
    if (l) {
      const f = {
        route: i.value,
        isActive: s.value,
        isExactActive: u.value,
        error: null
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(f), Me(() => {
        f.route = i.value, f.isActive = s.value, f.isExactActive = u.value, f.error = or(d(e.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route: i,
    href: y(() => i.value.href),
    isActive: s,
    isExactActive: u,
    navigate: c
  };
}
function ys(e) {
  return e.length === 1 ? e[0] : e;
}
const ws = /* @__PURE__ */ F({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink: ir,
  setup(e, { slots: t }) {
    const n = Ot(ir(e)), { options: o } = xe(pi), r = y(() => ({
      [sr(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [sr(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const i = t.default && ys(t.default(n));
      return e.custom ? i : je("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, i);
    };
  }
}), xs = ws;
function ks(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Cs(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!fn(r) || r.length !== o.length || o.some((i, a) => i !== r[a]))
      return !1;
  }
  return !0;
}
function ar(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const sr = (e, t, n) => e ?? t ?? n;
function mi(e) {
  return xe(gi);
}
const Ss = Ot(ko), Ie = () => Ss;
function $n(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Gn(e, t, n = ".", o) {
  if (!$n(t))
    return Gn(e, {}, n, o);
  const r = Object.assign({}, t);
  for (const i in e) {
    if (i === "__proto__" || i === "constructor")
      continue;
    const a = e[i];
    a != null && (o && o(r, i, a, n) || (Array.isArray(a) && Array.isArray(r[i]) ? r[i] = [...a, ...r[i]] : $n(a) && $n(r[i]) ? r[i] = Gn(
      a,
      r[i],
      (n ? `${n}.` : "") + i.toString(),
      o
    ) : r[i] = a));
  }
  return r;
}
function _s(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => Gn(n, o, "", e), {})
  );
}
const ot = _s();
// @__NO_SIDE_EFFECTS__
function As(e) {
  return ot(e, { dir: "ltr" });
}
function Un(e) {
  return typeof e == "string" ? `'${e}'` : new Is().serialize(e);
}
const Is = /* @__PURE__ */ function() {
  class e {
    #e = /* @__PURE__ */ new Map();
    compare(n, o) {
      const r = typeof n, i = typeof o;
      return r === "string" && i === "string" ? n.localeCompare(o) : r === "number" && i === "number" ? n - o : String.prototype.localeCompare.call(this.serialize(n, !0), this.serialize(o, !0));
    }
    serialize(n, o) {
      if (n === null) return "null";
      switch (typeof n) {
        case "string":
          return o ? n : `'${n}'`;
        case "bigint":
          return `${n}n`;
        case "object":
          return this.$object(n);
        case "function":
          return this.$function(n);
      }
      return String(n);
    }
    serializeObject(n) {
      const o = Object.prototype.toString.call(n);
      if (o !== "[object Object]") return this.serializeBuiltInType(o.length < 10 ? `unknown:${o}` : o.slice(8, -1), n);
      const r = n.constructor, i = r === Object || r === void 0 ? "" : r.name;
      if (i !== "" && globalThis[i] === r) return this.serializeBuiltInType(i, n);
      if (typeof n.toJSON == "function") {
        const a = n.toJSON();
        return i + (a !== null && typeof a == "object" ? this.$object(a) : `(${this.serialize(a)})`);
      }
      return this.serializeObjectEntries(i, Object.entries(n));
    }
    serializeBuiltInType(n, o) {
      const r = this["$" + n];
      if (r) return r.call(this, o);
      if (typeof o?.entries == "function") return this.serializeObjectEntries(n, o.entries());
      throw new Error(`Cannot serialize ${n}`);
    }
    serializeObjectEntries(n, o) {
      const r = Array.from(o).sort((a, s) => this.compare(a[0], s[0]));
      let i = `${n}{`;
      for (let a = 0; a < r.length; a++) {
        const [s, u] = r[a];
        i += `${this.serialize(s, !0)}:${this.serialize(u)}`, a < r.length - 1 && (i += ",");
      }
      return i + "}";
    }
    $object(n) {
      let o = this.#e.get(n);
      return o === void 0 && (this.#e.set(n, `#${this.#e.size}`), o = this.serializeObject(n), this.#e.set(n, o)), o;
    }
    $function(n) {
      const o = Function.prototype.toString.call(n);
      return o.slice(-15) === "[native code] }" ? `${n.name || ""}()[native]` : `${n.name}(${n.length})${o.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(n) {
      let o = "[";
      for (let r = 0; r < n.length; r++) o += this.serialize(n[r]), r < n.length - 1 && (o += ",");
      return o + "]";
    }
    $Date(n) {
      try {
        return `Date(${n.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(n) {
      return `ArrayBuffer[${new Uint8Array(n).join(",")}]`;
    }
    $Set(n) {
      return `Set${this.$Array(Array.from(n).sort((o, r) => this.compare(o, r)))}`;
    }
    $Map(n) {
      return this.serializeObjectEntries("Map", n.entries());
    }
  }
  for (const t of ["Error", "RegExp", "URL"]) e.prototype["$" + t] = function(n) {
    return `${t}(${n})`;
  };
  for (const t of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]) e.prototype["$" + t] = function(n) {
    return `${t}[${n.join(",")}]`;
  };
  for (const t of ["BigInt64Array", "BigUint64Array"]) e.prototype["$" + t] = function(n) {
    return `${t}[${n.join("n,")}${n.length > 0 ? "n" : ""}]`;
  };
  return e;
}();
function Fe(e, t) {
  return e === t || Un(e) === Un(t);
}
function Os(e, t) {
  const n = Yn(e), o = Yn(t);
  return vi(n, o);
}
function vi(e, t) {
  const n = [], o = /* @__PURE__ */ new Set([
    ...Object.keys(e.props || {}),
    ...Object.keys(t.props || {})
  ]);
  if (e.props && t.props)
    for (const r of o) {
      const i = e.props[r], a = t.props[r];
      i && a ? n.push(...vi(e.props?.[r], t.props?.[r])) : (i || a) && n.push(
        new lr((a || i).key, i ? "removed" : "added", a, i)
      );
    }
  return o.size === 0 && e.hash !== t.hash && n.push(new lr((t || e).key, "changed", t, e)), n;
}
function Yn(e, t = "") {
  if (e && typeof e != "object")
    return new ur(t, e, Un(e));
  const n = {}, o = [];
  for (const r in e)
    n[r] = Yn(e[r], t ? `${t}.${r}` : r), o.push(n[r].hash);
  return new ur(t, e, `{${o.join(":")}}`, n);
}
class lr {
  constructor(t, n, o, r) {
    this.key = t, this.type = n, this.newValue = o, this.oldValue = r;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added":
        return `Added   \`${this.key}\``;
      case "removed":
        return `Removed \`${this.key}\``;
      case "changed":
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
    }
  }
}
class ur {
  constructor(t, n, o, r) {
    this.key = t, this.value = n, this.hash = o, this.props = r;
  }
  toString() {
    return this.props ? `{${Object.keys(this.props).join(",")}}` : JSON.stringify(this.value);
  }
  toJSON() {
    const t = this.key || ".";
    return this.props ? `${t}({${Object.keys(this.props).join(",")}})` : `${t}(${this.value})`;
  }
}
function Es(e, t) {
  const n = { ...e };
  for (const o of t)
    delete n[o];
  return n;
}
function Le(e, t, n) {
  typeof t == "string" && (t = t.split(".").map((r) => {
    const i = Number(r);
    return Number.isNaN(i) ? r : i;
  }));
  let o = e;
  for (const r of t) {
    if (o == null)
      return n;
    o = o[r];
  }
  return o !== void 0 ? o : n;
}
function Ts(e) {
  const t = Number.parseFloat(e);
  return Number.isNaN(t) ? e : t;
}
function hi(e, t, n) {
  return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? Le(e, n) === Le(t, n) : Fe(e, t);
}
function cr(e) {
  if (e == null)
    return !0;
  if (typeof e == "boolean" || typeof e == "number")
    return !1;
  if (typeof e == "string")
    return e.trim().length === 0;
  if (Array.isArray(e))
    return e.length === 0;
  if (e instanceof Map || e instanceof Set)
    return e.size === 0;
  if (e instanceof Date || e instanceof RegExp || typeof e == "function")
    return !1;
  if (typeof e == "object") {
    for (const t in e)
      if (Object.prototype.hasOwnProperty.call(e, t))
        return !1;
    return !0;
  }
  return !1;
}
function dr(e, t, n = {}) {
  const { valueKey: o, labelKey: r } = n, i = e.find((s) => {
    const u = typeof s == "object" && s !== null && o ? Le(s, o) : s;
    return hi(u, t);
  });
  if (cr(t) && i)
    return r ? Le(i, r) : void 0;
  if (cr(t))
    return;
  const a = i ?? t;
  if (a != null)
    return typeof a == "object" ? r ? Le(a, r) : void 0 : String(a);
}
function zs(e) {
  return Array.isArray(e[0]);
}
function pn(e, t) {
  return !e && !t ? "" : [
    ...Array.isArray(e) ? e : [e],
    t
  ].filter(Boolean);
}
function Ps(e) {
  return (t, n) => Bs(t, n, d(e));
}
function Bs(e, t, n) {
  return Le(n, `messages.${e}`, e).replace(
    /\{(\w+)\}/g,
    (r, i) => `${t?.[i] ?? `{${i}}`}`
  );
}
function $s(e) {
  const t = y(() => d(e).name), n = y(() => d(e).code), o = y(() => d(e).dir), r = At(e) ? e : D(e);
  return {
    lang: t,
    code: n,
    dir: o,
    locale: r,
    t: Ps(e)
  };
}
const fr = /* @__PURE__ */ As({
  name: "English",
  code: "en",
  messages: {
    alert: {
      close: "Close"
    },
    authForm: {
      hidePassword: "Hide password",
      showPassword: "Show password",
      submit: "Continue"
    },
    banner: {
      close: "Close"
    },
    calendar: {
      nextMonth: "Next month",
      nextYear: "Next year",
      prevMonth: "Previous month",
      prevYear: "Previous year"
    },
    carousel: {
      dots: "Choose slide to display",
      goto: "Go to slide {slide}",
      next: "Next",
      prev: "Prev"
    },
    chatPrompt: {
      placeholder: "Type your message here..."
    },
    chatPromptSubmit: {
      label: "Send prompt"
    },
    colorMode: {
      dark: "Dark",
      light: "Light",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
      system: "System"
    },
    commandPalette: {
      back: "Back",
      close: "Close",
      noData: "No data",
      noMatch: "No matching data",
      placeholder: "Type a command or search..."
    },
    contentSearch: {
      links: "Links",
      theme: "Theme"
    },
    contentSearchButton: {
      label: "Search..."
    },
    contentToc: {
      title: "On this page"
    },
    dashboardSearch: {
      theme: "Theme"
    },
    dashboardSearchButton: {
      label: "Search..."
    },
    dashboardSidebarCollapse: {
      collapse: "Collapse sidebar",
      expand: "Expand sidebar"
    },
    dashboardSidebarToggle: {
      close: "Close sidebar",
      open: "Open sidebar"
    },
    error: {
      clear: "Back to home"
    },
    fileUpload: {
      removeFile: "Remove {filename}"
    },
    header: {
      close: "Close menu",
      open: "Open menu"
    },
    inputMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data"
    },
    inputNumber: {
      decrement: "Decrement",
      increment: "Increment"
    },
    modal: {
      close: "Close"
    },
    pricingTable: {
      caption: "Pricing plan comparison"
    },
    prose: {
      codeCollapse: {
        closeText: "Collapse",
        name: "code",
        openText: "Expand"
      },
      collapsible: {
        closeText: "Hide",
        name: "properties",
        openText: "Show"
      },
      pre: {
        copy: "Copy code to clipboard"
      }
    },
    selectMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data",
      search: "Search..."
    },
    slideover: {
      close: "Close"
    },
    table: {
      noData: "No data"
    },
    toast: {
      close: "Close"
    }
  }
}), Ls = Symbol.for("nuxt-ui.locale-context"), pr = (e) => {
  const t = e || nt(xe(Ls, fr));
  return $s(y(() => t.value || fr));
}, kn = import.meta.client ? /* @__PURE__ */ La(pr) : pr, Co = () => {
  if (!ko.colorMode)
    return {
      forced: !0
    };
  const { store: e, system: t } = ps();
  return {
    get preference() {
      return e.value === "auto" ? "system" : e.value;
    },
    set preference(n) {
      e.value = n === "system" ? "auto" : n;
    },
    get value() {
      return e.value === "auto" ? t.value : e.value;
    },
    forced: !1
  };
};
Ba();
function Ms(e, t, n) {
  const o = e.findIndex((s) => Fe(s, t)), r = e.findIndex((s) => Fe(s, n));
  if (o === -1 || r === -1) return [];
  const [i, a] = [o, r].sort((s, u) => s - u);
  return e.slice(i, a + 1);
}
function ze(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(a) => {
    const s = xe(o, a);
    if (s || s === null) return s;
    throw new Error(`Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
  }, (a) => (pt(o, a), a)];
}
function ft() {
  let e = document.activeElement;
  if (e == null) return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; ) e = e.shadowRoot.activeElement;
  return e;
}
function So(e, t, n) {
  const o = n.originalEvent.target, r = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(r);
}
function qs(e) {
  return e == null;
}
function Fs(e, t) {
  return qs(e) ? !1 : Array.isArray(e) ? e.some((n) => Fe(n, t)) : Fe(e, t);
}
function _o(e) {
  return e ? e.flatMap((t) => t.type === $e ? _o(t.children) : [t]) : [];
}
const Vs = ["INPUT", "TEXTAREA"];
function Rs(e, t, n, o = {}) {
  if (!t || o.enableIgnoredElement && Vs.includes(t.nodeName)) return null;
  const { arrowKeyOptions: r = "both", attributeName: i = "[data-reka-collection-item]", itemsArray: a = [], loop: s = !0, dir: u = "ltr", preventScroll: c = !0, focus: l = !1 } = o, [f, g, m, p, h, v] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ], w = m || p, S = f || g;
  if (!h && !v && (!w && !S || r === "vertical" && S || r === "horizontal" && w)) return null;
  const b = n ? Array.from(n.querySelectorAll(i)) : a;
  if (!b.length) return null;
  c && e.preventDefault();
  let C = null;
  return S || w ? C = bi(b, t, {
    goForward: w ? p : u === "ltr" ? f : g,
    loop: s
  }) : h ? C = b.at(0) || null : v && (C = b.at(-1) || null), l && C?.focus(), C;
}
function bi(e, t, n, o = e.length) {
  if (--o === 0) return null;
  const r = e.indexOf(t), i = n.goForward ? r + 1 : r - 1;
  if (!n.loop && (i < 0 || i >= e.length)) return null;
  const a = (i + e.length) % e.length, s = e[a];
  return s ? s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false" ? bi(e, s, n, o) : s : null;
}
const [Ao, og] = ze("ConfigProvider");
function Ds(e, t) {
  var n;
  const o = Ne();
  return Me(() => {
    o.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), bo(o);
}
function Cn(e) {
  return vo() ? (ho(e), !0) : !1;
}
function ln() {
  const e = /* @__PURE__ */ new Set(), t = (i) => {
    e.delete(i);
  };
  return {
    on: (i) => {
      e.add(i);
      const a = () => t(i);
      return Cn(a), {
        off: a
      };
    },
    off: t,
    trigger: (...i) => Promise.all(Array.from(e).map((a) => a(...i))),
    clear: () => {
      e.clear();
    }
  };
}
function Ns(e) {
  let t = !1, n;
  const o = mo(!0);
  return (...r) => (t || (n = o.run(() => e(...r)), t = !0), n);
}
function js(e) {
  let t = 0, n, o;
  const r = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...i) => (t += 1, o || (o = mo(!0), n = o.run(() => e(...i))), Cn(r), n);
}
const ht = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Hs = (e) => typeof e < "u", Ws = Object.prototype.toString, Ks = (e) => Ws.call(e) === "[object Object]", gr = /* @__PURE__ */ Gs();
function Gs() {
  var e, t;
  return ht && ((e = window?.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window?.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function Us(e) {
  return Te();
}
function Ln(e) {
  return Array.isArray(e) ? e : [e];
}
function yi(e, t = 1e4) {
  return Xr((n, o) => {
    let r = le(e), i;
    const a = () => setTimeout(() => {
      r = le(e), o();
    }, le(t));
    return Cn(() => {
      clearTimeout(i);
    }), {
      get() {
        return n(), r;
      },
      set(s) {
        r = s, o(), clearTimeout(i), i = a();
      }
    };
  });
}
const Ys = le;
function Qs(e, t) {
  Us() && ba(e, t);
}
function Js(e, t, n) {
  return fe(
    e,
    t,
    {
      ...n,
      immediate: !0
    }
  );
}
const Io = ht ? window : void 0;
function bt(e) {
  var t;
  const n = le(e);
  return (t = n?.$el) != null ? t : n;
}
function Oo(...e) {
  const t = [], n = () => {
    t.forEach((s) => s()), t.length = 0;
  }, o = (s, u, c, l) => (s.addEventListener(u, c, l), () => s.removeEventListener(u, c, l)), r = y(() => {
    const s = Ln(le(e[0])).filter((u) => u != null);
    return s.every((u) => typeof u != "string") ? s : void 0;
  }), i = Js(
    () => {
      var s, u;
      return [
        (u = (s = r.value) == null ? void 0 : s.map((c) => bt(c))) != null ? u : [Io].filter((c) => c != null),
        Ln(le(r.value ? e[1] : e[0])),
        Ln(d(r.value ? e[2] : e[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        le(r.value ? e[3] : e[2])
      ];
    },
    ([s, u, c, l]) => {
      if (n(), !s?.length || !u?.length || !c?.length)
        return;
      const f = Ks(l) ? { ...l } : l;
      t.push(
        ...s.flatMap(
          (g) => u.flatMap(
            (m) => c.map((p) => o(g, m, p, f))
          )
        )
      );
    },
    { flush: "post" }
  ), a = () => {
    i(), n();
  };
  return Cn(n), a;
}
function Xs() {
  const e = Ne(!1), t = Te();
  return t && Se(() => {
    e.value = !0;
  }, t), e;
}
function Zs(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function el(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: r = Io,
    eventName: i = "keydown",
    passive: a = !1,
    dedupe: s = !1
  } = o, u = Zs(t);
  return Oo(r, i, (l) => {
    l.repeat && le(s) || u(l) && n(l);
  }, a);
}
function tl(e) {
  return JSON.parse(JSON.stringify(e));
}
function it(e, t, n, o = {}) {
  var r, i, a;
  const {
    clone: s = !1,
    passive: u = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: f,
    shouldEmit: g
  } = o, m = Te(), p = n || m?.emit || ((r = m?.$emit) == null ? void 0 : r.bind(m)) || ((a = (i = m?.proxy) == null ? void 0 : i.$emit) == null ? void 0 : a.bind(m?.proxy));
  let h = c;
  t || (t = "modelValue"), h = h || `update:${t.toString()}`;
  const v = (b) => s ? typeof s == "function" ? s(b) : tl(b) : b, w = () => Hs(e[t]) ? v(e[t]) : f, S = (b) => {
    g ? g(b) && p(h, b) : p(h, b);
  };
  if (u) {
    const b = w(), C = D(b);
    let A = !1;
    return fe(
      () => e[t],
      ($) => {
        A || (A = !0, C.value = v($), he(() => A = !1));
      }
    ), fe(
      C,
      ($) => {
        !A && ($ !== e[t] || l) && S($);
      },
      { deep: l }
    ), C;
  } else
    return y({
      get() {
        return w();
      },
      set(b) {
        S(b);
      }
    });
}
const nl = js(() => {
  const e = D(/* @__PURE__ */ new Map()), t = D(), n = y(() => {
    for (const a of e.value.values()) if (a) return !0;
    return !1;
  }), o = Ao({ scrollBody: D(!0) });
  let r = null;
  const i = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", gr && r?.(), t.value = void 0;
  };
  return fe(n, (a, s) => {
    if (!ht) return;
    if (!a) {
      s && i();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const u = window.innerWidth - document.documentElement.clientWidth, c = {
      padding: u,
      margin: 0
    }, l = o.scrollBody?.value ? typeof o.scrollBody.value == "object" ? ot({
      padding: o.scrollBody.value.padding === !0 ? u : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? u : o.scrollBody.value.margin
    }, c) : c : {
      padding: 0,
      margin: 0
    };
    u > 0 && (document.body.style.paddingRight = typeof l.padding == "number" ? `${l.padding}px` : String(l.padding), document.body.style.marginRight = typeof l.margin == "number" ? `${l.margin}px` : String(l.margin), document.documentElement.style.setProperty("--scrollbar-width", `${u}px`), document.body.style.overflow = "hidden"), gr && (r = Oo(document, "touchmove", (f) => rl(f), { passive: !1 })), he(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), e;
});
function ol(e) {
  const t = Math.random().toString(36).substring(2, 7), n = nl();
  n.value.set(t, e ?? !1);
  const o = y({
    get: () => n.value.get(t) ?? !1,
    set: (r) => n.value.set(t, r)
  });
  return Qs(() => {
    n.value.delete(t);
  }), o;
}
function wi(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
  {
    const n = e.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : wi(n);
  }
}
function rl(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && wi(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function Eo(e) {
  const t = Ao({ dir: D("ltr") });
  return y(() => e?.value || t.dir?.value || "ltr");
}
function il(e) {
  const t = Te(), n = t?.type.emits, o = {};
  return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((r) => {
    o[ya(ei(r))] = (...i) => e(r, ...i);
  }), o;
}
function xi(e) {
  const t = y(() => d(e)), n = y(() => new Intl.Collator("en", {
    usage: "search",
    ...t.value
  }));
  return {
    startsWith: (a, s) => s.length === 0 ? !0 : (a = a.normalize("NFC"), s = s.normalize("NFC"), n.value.compare(a.slice(0, s.length), s) === 0),
    endsWith: (a, s) => s.length === 0 ? !0 : (a = a.normalize("NFC"), s = s.normalize("NFC"), n.value.compare(a.slice(-s.length), s) === 0),
    contains: (a, s) => {
      if (s.length === 0) return !0;
      a = a.normalize("NFC"), s = s.normalize("NFC");
      let u = 0;
      const c = s.length;
      for (; u + c <= a.length; u++) {
        const l = a.slice(u, u + c);
        if (n.value.compare(s, l) === 0) return !0;
      }
      return !1;
    }
  };
}
function ki(e) {
  return y(() => Ys(e) ? !!bt(e)?.closest("form") : !0);
}
function pe() {
  const e = Te(), t = D(), n = y(() => ["#text", "#comment"].includes(t.value?.$el.nodeName) ? t.value?.$el.nextElementSibling : bt(t)), o = Object.assign({}, e.exposed), r = {};
  for (const a in e.props) Object.defineProperty(r, a, {
    enumerable: !0,
    configurable: !0,
    get: () => e.props[a]
  });
  if (Object.keys(o).length > 0) for (const a in o) Object.defineProperty(r, a, {
    enumerable: !0,
    configurable: !0,
    get: () => o[a]
  });
  Object.defineProperty(r, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = r;
  function i(a) {
    t.value = a, a && (Object.defineProperty(r, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => a instanceof Element ? a : a.$el
    }), e.exposed = r);
  }
  return {
    forwardRef: i,
    currentRef: t,
    currentElement: n
  };
}
function yt(e) {
  const t = Te(), n = Object.keys(t?.type.props ?? {}).reduce((r, i) => {
    const a = (t?.type.props[i]).default;
    return a !== void 0 && (r[i] = a), r;
  }, {}), o = nt(e);
  return y(() => {
    const r = {}, i = t?.vnode.props ?? {};
    return Object.keys(i).forEach((a) => {
      r[ei(a)] = i[a];
    }), Object.keys({
      ...n,
      ...r
    }).reduce((a, s) => (o.value[s] !== void 0 && (a[s] = o.value[s]), a), {});
  });
}
function To(e, t) {
  const n = yt(e), o = t ? il(t) : {};
  return y(() => ({
    ...n.value,
    ...o
  }));
}
var al = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ct = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), en = {}, Mn = 0, Ci = function(e) {
  return e && (e.host || Ci(e.parentNode));
}, sl = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Ci(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, ll = function(e, t, n, o) {
  var r = sl(t, Array.isArray(e) ? e : [e]);
  en[n] || (en[n] = /* @__PURE__ */ new WeakMap());
  var i = en[n], a = [], s = /* @__PURE__ */ new Set(), u = new Set(r), c = function(f) {
    !f || s.has(f) || (s.add(f), c(f.parentNode));
  };
  r.forEach(c);
  var l = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(g) {
      if (s.has(g))
        l(g);
      else
        try {
          var m = g.getAttribute(o), p = m !== null && m !== "false", h = (Ct.get(g) || 0) + 1, v = (i.get(g) || 0) + 1;
          Ct.set(g, h), i.set(g, v), a.push(g), h === 1 && p && Zt.set(g, !0), v === 1 && g.setAttribute(n, "true"), p || g.setAttribute(o, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", g, w);
        }
    });
  };
  return l(t), s.clear(), Mn++, function() {
    a.forEach(function(f) {
      var g = Ct.get(f) - 1, m = i.get(f) - 1;
      Ct.set(f, g), i.set(f, m), g || (Zt.has(f) || f.removeAttribute(o), Zt.delete(f)), m || f.removeAttribute(n);
    }), Mn--, Mn || (Ct = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), en = {});
  };
}, ul = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = al(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), ll(o, r, n, "aria-hidden")) : function() {
    return null;
  };
};
function cl(e) {
  let t;
  fe(() => bt(e), (n) => {
    n ? t = ul(n) : t && t();
  }), vt(() => {
    t && t();
  });
}
let dl = 0;
function ut(e, t = "reka") {
  if ("useId" in Yo) return `${t}-${Yo.useId?.()}`;
  const n = Ao({ useId: void 0 });
  return n.useId ? `${t}-${n.useId()}` : `${t}-${++dl}`;
}
function fl() {
  return {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    SPACE_CODE: "Space"
  };
}
function pl(e) {
  const t = D(), n = y(() => t.value?.width ?? 0), o = y(() => t.value?.height ?? 0);
  return Se(() => {
    const r = bt(e);
    if (r) {
      t.value = {
        width: r.offsetWidth,
        height: r.offsetHeight
      };
      const i = new ResizeObserver((a) => {
        if (!Array.isArray(a) || !a.length) return;
        const s = a[0];
        let u, c;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, f = Array.isArray(l) ? l[0] : l;
          u = f.inlineSize, c = f.blockSize;
        } else
          u = r.offsetWidth, c = r.offsetHeight;
        t.value = {
          width: u,
          height: c
        };
      });
      return i.observe(r, { box: "border-box" }), () => i.unobserve(r);
    } else t.value = void 0;
  }), {
    width: n,
    height: o
  };
}
function gl(e, t) {
  const n = D(e);
  function o(i) {
    return t[n.value][i] ?? n.value;
  }
  return {
    state: n,
    dispatch: (i) => {
      n.value = o(i);
    }
  };
}
function ml(e) {
  const t = yi("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (r, i) => {
      t.value = t.value + r;
      {
        const a = ft(), s = i.map((g) => ({
          ...g,
          textValue: g.value?.textValue ?? g.ref.textContent?.trim() ?? ""
        })), u = s.find((g) => g.ref === a), c = s.map((g) => g.textValue), l = hl(c, t.value, u?.textValue), f = s.find((g) => g.textValue === l);
        return f && f.ref.focus(), f?.ref;
      }
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function vl(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function hl(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let a = vl(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter((c) => c !== n));
  const u = a.find((c) => c.toLowerCase().startsWith(r.toLowerCase()));
  return u !== n ? u : void 0;
}
function bl(e, t) {
  const n = D({}), o = D("none"), r = D(e), i = e.value ? "mounted" : "unmounted";
  let a;
  const s = t.value?.ownerDocument.defaultView ?? Io, { state: u, dispatch: c } = gl(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), l = (v) => {
    if (ht) {
      const w = new CustomEvent(v, {
        bubbles: !1,
        cancelable: !1
      });
      t.value?.dispatchEvent(w);
    }
  };
  fe(e, async (v, w) => {
    const S = w !== v;
    if (await he(), S) {
      const b = o.value, C = tn(t.value);
      v ? (c("MOUNT"), l("enter"), C === "none" && l("after-enter")) : C === "none" || C === "undefined" || n.value?.display === "none" ? (c("UNMOUNT"), l("leave"), l("after-leave")) : w && b !== C ? (c("ANIMATION_OUT"), l("leave")) : (c("UNMOUNT"), l("after-leave"));
    }
  }, { immediate: !0 });
  const f = (v) => {
    const w = tn(t.value), S = w.includes(v.animationName), b = u.value === "mounted" ? "enter" : "leave";
    if (v.target === t.value && S && (l(`after-${b}`), c("ANIMATION_END"), !r.value)) {
      const C = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", a = s?.setTimeout(() => {
        t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = C);
      });
    }
    v.target === t.value && w === "none" && c("ANIMATION_END");
  }, g = (v) => {
    v.target === t.value && (o.value = tn(t.value));
  }, m = fe(t, (v, w) => {
    v ? (n.value = getComputedStyle(v), v.addEventListener("animationstart", g), v.addEventListener("animationcancel", f), v.addEventListener("animationend", f)) : (c("ANIMATION_END"), a !== void 0 && s?.clearTimeout(a), w?.removeEventListener("animationstart", g), w?.removeEventListener("animationcancel", f), w?.removeEventListener("animationend", f));
  }, { immediate: !0 }), p = fe(u, () => {
    const v = tn(t.value);
    o.value = u.value === "mounted" ? v : "none";
  });
  return vt(() => {
    m(), p();
  }), { isPresent: y(() => ["mounted", "unmountSuspended"].includes(u.value)) };
}
function tn(e) {
  return e && getComputedStyle(e).animationName || "none";
}
var Si = F({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    const { present: o, forceMount: r } = We(e), i = D(), { isPresent: a } = bl(o, i);
    n({ present: a });
    let s = t.default({ present: a.value });
    s = _o(s || []);
    const u = Te();
    if (s && s?.length > 1) {
      const c = u?.parent?.type.name ? `<${u.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${c}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((l) => `  - ${l}`).join(`
`)
      ].join(`
`));
    }
    return () => r.value || o.value || a.value ? je(t.default({ present: a.value })[0], { ref: (c) => {
      const l = bt(c);
      return typeof l?.hasAttribute > "u" || (l?.hasAttribute("data-reka-popper-content-wrapper") ? i.value = l.firstElementChild : i.value = l), l;
    } }) : null;
  }
});
const Wt = F({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      if (!n.default) return null;
      const o = _o(n.default()), r = o.findIndex((u) => u.type !== wa);
      if (r === -1) return o;
      const i = o[r];
      delete i.props?.ref;
      const a = i.props ? K(t, i.props) : t, s = xa({
        ...i,
        props: {}
      }, a);
      return o.length === 1 ? s : (o[r] = s, o);
    };
  }
}), yl = [
  "area",
  "img",
  "input"
], re = F({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && yl.includes(o) ? () => je(o, t) : o !== "template" ? () => je(e.as, t, { default: n.default }) : () => je(Wt, t, { default: n.default });
  }
});
function at() {
  const e = D(), t = y(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : bt(e));
  return {
    primitiveElement: e,
    currentElement: t
  };
}
const [_i, wl] = ze("CollapsibleRoot");
var xl = /* @__PURE__ */ F({
  __name: "CollapsibleRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    unmountOnHide: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["update:open"],
  setup(e, { expose: t, emit: n }) {
    const o = e, i = it(o, "open", n, {
      defaultValue: o.defaultOpen,
      passive: o.open === void 0
    }), { disabled: a, unmountOnHide: s } = We(o);
    return wl({
      contentId: "",
      disabled: a,
      open: i,
      unmountOnHide: s,
      onOpenToggle: () => {
        a.value || (i.value = !i.value);
      }
    }), t({ open: i }), pe(), (u, c) => (x(), I(d(re), {
      as: u.as,
      "as-child": o.asChild,
      "data-state": d(i) ? "open" : "closed",
      "data-disabled": d(a) ? "" : void 0
    }, {
      default: B(() => [q(u.$slots, "default", { open: d(i) })]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state",
      "data-disabled"
    ]));
  }
}), kl = xl, Cl = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "CollapsibleContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["contentFound"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = _i();
    r.contentId ||= ut(void 0, "reka-collapsible-content");
    const i = D(), { forwardRef: a, currentElement: s } = pe(), u = D(0), c = D(0), l = y(() => r.open.value), f = D(l.value), g = D();
    fe(() => [l.value, i.value?.present], async () => {
      await he();
      const p = s.value;
      if (!p) return;
      g.value = g.value || {
        transitionDuration: p.style.transitionDuration,
        animationName: p.style.animationName
      }, p.style.transitionDuration = "0s", p.style.animationName = "none";
      const h = p.getBoundingClientRect();
      c.value = h.height, u.value = h.width, f.value || (p.style.transitionDuration = g.value.transitionDuration, p.style.animationName = g.value.animationName);
    }, { immediate: !0 });
    const m = y(() => f.value && r.open.value);
    return Se(() => {
      requestAnimationFrame(() => {
        f.value = !1;
      });
    }), Oo(s, "beforematch", (p) => {
      requestAnimationFrame(() => {
        r.onOpenToggle(), o("contentFound");
      });
    }), (p, h) => (x(), I(d(Si), {
      ref_key: "presentRef",
      ref: i,
      present: p.forceMount || d(r).open.value,
      "force-mount": !0
    }, {
      default: B(({ present: v }) => [ie(d(re), K(p.$attrs, {
        id: d(r).contentId,
        ref: d(a),
        "as-child": n.asChild,
        as: p.as,
        hidden: v ? void 0 : d(r).unmountOnHide.value ? "" : "until-found",
        "data-state": m.value ? void 0 : d(r).open.value ? "open" : "closed",
        "data-disabled": d(r).disabled?.value ? "" : void 0,
        style: {
          "--reka-collapsible-content-height": `${c.value}px`,
          "--reka-collapsible-content-width": `${u.value}px`
        }
      }), {
        default: B(() => [!d(r).unmountOnHide.value || v ? q(p.$slots, "default", { key: 0 }) : ne("v-if", !0)]),
        _: 2
      }, 1040, [
        "id",
        "as-child",
        "as",
        "hidden",
        "data-state",
        "data-disabled",
        "style"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), Sl = Cl, _l = /* @__PURE__ */ F({
  __name: "CollapsibleTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e;
    pe();
    const n = _i();
    return (o, r) => (x(), I(d(re), {
      type: o.as === "button" ? "button" : void 0,
      as: o.as,
      "as-child": t.asChild,
      "aria-controls": d(n).contentId,
      "aria-expanded": d(n).open.value,
      "data-state": d(n).open.value ? "open" : "closed",
      "data-disabled": d(n).disabled?.value ? "" : void 0,
      disabled: d(n).disabled?.value,
      onClick: d(n).onOpenToggle
    }, {
      default: B(() => [q(o.$slots, "default")]),
      _: 3
    }, 8, [
      "type",
      "as",
      "as-child",
      "aria-controls",
      "aria-expanded",
      "data-state",
      "data-disabled",
      "disabled",
      "onClick"
    ]));
  }
}), Al = _l;
function Il({ type: e, defaultValue: t, modelValue: n }) {
  const o = n || t;
  return n !== void 0 || t !== void 0 ? Array.isArray(o) ? "multiple" : "single" : e ?? "single";
}
function Ol({ type: e, defaultValue: t, modelValue: n }) {
  return e || Il({
    type: e,
    defaultValue: t,
    modelValue: n
  });
}
function El({ type: e, defaultValue: t }) {
  return t !== void 0 ? t : e === "single" ? void 0 : [];
}
function Tl(e, t) {
  const n = y(() => Ol(e)), o = it(e, "modelValue", t, {
    defaultValue: El(e),
    passive: e.modelValue === void 0,
    deep: !0
  });
  function r(a) {
    if (n.value === "single") o.value = Fe(a, o.value) ? void 0 : a;
    else {
      const s = Array.isArray(o.value) ? [...o.value || []] : [o.value].filter(Boolean);
      if (Fs(s, a)) {
        const u = s.findIndex((c) => Fe(c, a));
        s.splice(u, 1);
      } else s.push(a);
      o.value = s;
    }
  }
  const i = y(() => n.value === "single");
  return {
    modelValue: o,
    changeModelValue: r,
    isSingle: i
  };
}
const [Sn, zl] = ze("AccordionRoot");
var Pl = /* @__PURE__ */ F({
  __name: "AccordionRoot",
  props: {
    collapsible: {
      type: Boolean,
      required: !1,
      default: !1
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: !1
    },
    dir: {
      type: String,
      required: !1
    },
    orientation: {
      type: String,
      required: !1,
      default: "vertical"
    },
    unmountOnHide: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    type: {
      type: String,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, { dir: r, disabled: i, unmountOnHide: a } = We(n), s = Eo(r), { modelValue: u, changeModelValue: c, isSingle: l } = Tl(n, o), { forwardRef: f, currentElement: g } = pe();
    return zl({
      disabled: i,
      direction: s,
      orientation: n.orientation,
      parentElement: g,
      isSingle: l,
      collapsible: n.collapsible,
      modelValue: u,
      changeModelValue: c,
      unmountOnHide: a
    }), (m, p) => (x(), I(d(re), {
      ref: d(f),
      "as-child": m.asChild,
      as: m.as
    }, {
      default: B(() => [q(m.$slots, "default", { modelValue: d(u) })]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), Bl = Pl, Qn = /* @__PURE__ */ function(e) {
  return e.Open = "open", e.Closed = "closed", e;
}(Qn || {});
const [zo, $l] = ze("AccordionItem");
var Ll = /* @__PURE__ */ F({
  __name: "AccordionItem",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    value: {
      type: String,
      required: !0
    },
    unmountOnHide: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e, { expose: t }) {
    const n = e, o = Sn(), r = y(() => o.isSingle.value ? n.value === o.modelValue.value : Array.isArray(o.modelValue.value) && o.modelValue.value.includes(n.value)), i = y(() => o.disabled.value || n.disabled), a = y(() => i.value ? "" : void 0), s = y(() => r.value ? Qn.Open : Qn.Closed);
    t({
      open: r,
      dataDisabled: a
    });
    const { currentRef: u, currentElement: c } = pe();
    $l({
      open: r,
      dataState: s,
      disabled: i,
      dataDisabled: a,
      triggerId: "",
      currentRef: u,
      currentElement: c,
      value: y(() => n.value)
    });
    function l(f) {
      const g = f.target;
      if (Array.from(o.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []).findIndex((h) => h === g) === -1) return null;
      Rs(f, g, o.parentElement.value, {
        arrowKeyOptions: o.orientation,
        dir: o.direction.value,
        focus: !0
      });
    }
    return (f, g) => (x(), I(d(kl), {
      "data-orientation": d(o).orientation,
      "data-disabled": a.value,
      "data-state": s.value,
      disabled: i.value,
      open: r.value,
      as: n.as,
      "as-child": n.asChild,
      "unmount-on-hide": d(o).unmountOnHide.value,
      onKeydown: rt(l, [
        "up",
        "down",
        "left",
        "right",
        "home",
        "end"
      ])
    }, {
      default: B(() => [q(f.$slots, "default", { open: r.value })]),
      _: 3
    }, 8, [
      "data-orientation",
      "data-disabled",
      "data-state",
      "disabled",
      "open",
      "as",
      "as-child",
      "unmount-on-hide"
    ]));
  }
}), Ml = Ll, ql = /* @__PURE__ */ F({
  __name: "AccordionContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = Sn(), o = zo();
    return pe(), (r, i) => (x(), I(d(Sl), {
      role: "region",
      "as-child": t.asChild,
      as: r.as,
      "force-mount": t.forceMount,
      "aria-labelledby": d(o).triggerId,
      "data-state": d(o).dataState.value,
      "data-disabled": d(o).dataDisabled.value,
      "data-orientation": d(n).orientation,
      style: {
        "--reka-accordion-content-width": "var(--reka-collapsible-content-width)",
        "--reka-accordion-content-height": "var(--reka-collapsible-content-height)"
      },
      onContentFound: i[0] || (i[0] = (a) => d(n).changeModelValue(d(o).value.value))
    }, {
      default: B(() => [q(r.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "force-mount",
      "aria-labelledby",
      "data-state",
      "data-disabled",
      "data-orientation"
    ]));
  }
}), Fl = ql, Vl = /* @__PURE__ */ F({
  __name: "AccordionHeader",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "h3"
    }
  },
  setup(e) {
    const t = e, n = Sn(), o = zo();
    return pe(), (r, i) => (x(), I(d(re), {
      as: t.as,
      "as-child": t.asChild,
      "data-orientation": d(n).orientation,
      "data-state": d(o).dataState.value,
      "data-disabled": d(o).dataDisabled.value
    }, {
      default: B(() => [q(r.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-orientation",
      "data-state",
      "data-disabled"
    ]));
  }
}), Rl = Vl, Dl = /* @__PURE__ */ F({
  __name: "AccordionTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = Sn(), o = zo();
    o.triggerId ||= ut(void 0, "reka-accordion-trigger");
    function r() {
      const i = n.isSingle.value && o.open.value && !n.collapsible;
      o.disabled.value || i || n.changeModelValue(o.value.value);
    }
    return (i, a) => (x(), I(d(Al), {
      id: d(o).triggerId,
      ref: d(o).currentRef,
      "data-reka-collection-item": "",
      as: t.as,
      "as-child": t.asChild,
      "aria-disabled": d(o).disabled.value || void 0,
      "aria-expanded": d(o).open.value || !1,
      "data-disabled": d(o).dataDisabled.value,
      "data-orientation": d(n).orientation,
      "data-state": d(o).dataState.value,
      disabled: d(o).disabled.value,
      onClick: r
    }, {
      default: B(() => [q(i.$slots, "default")]),
      _: 3
    }, 8, [
      "id",
      "as",
      "as-child",
      "aria-disabled",
      "aria-expanded",
      "data-disabled",
      "data-orientation",
      "data-state",
      "disabled"
    ]));
  }
}), Nl = Dl;
const jl = "dismissableLayer.pointerDownOutside", Hl = "dismissableLayer.focusOutside";
function Ai(e, t) {
  const n = t.closest("[data-dismissable-layer]"), o = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), r = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(n && (o === n || r.indexOf(o) < r.indexOf(n)));
}
function Wl(e, t, n = !0) {
  const o = t?.value?.ownerDocument ?? globalThis?.document, r = D(!1), i = D(() => {
  });
  return Me((a) => {
    if (!ht || !le(n)) return;
    const s = async (c) => {
      const l = c.target;
      if (!(!t?.value || !l)) {
        if (Ai(t.value, l)) {
          r.value = !1;
          return;
        }
        if (c.target && !r.value) {
          let g = function() {
            So(jl, e, f);
          };
          const f = { originalEvent: c };
          c.pointerType === "touch" ? (o.removeEventListener("click", i.value), i.value = g, o.addEventListener("click", i.value, { once: !0 })) : g();
        } else o.removeEventListener("click", i.value);
        r.value = !1;
      }
    }, u = window.setTimeout(() => {
      o.addEventListener("pointerdown", s);
    }, 0);
    a(() => {
      window.clearTimeout(u), o.removeEventListener("pointerdown", s), o.removeEventListener("click", i.value);
    });
  }), { onPointerDownCapture: () => {
    le(n) && (r.value = !0);
  } };
}
function Kl(e, t, n = !0) {
  const o = t?.value?.ownerDocument ?? globalThis?.document, r = D(!1);
  return Me((i) => {
    if (!ht || !le(n)) return;
    const a = async (s) => {
      if (!t?.value) return;
      await he(), await he();
      const u = s.target;
      !t.value || !u || Ai(t.value, u) || s.target && !r.value && So(Hl, e, { originalEvent: s });
    };
    o.addEventListener("focusin", a), i(() => o.removeEventListener("focusin", a));
  }), {
    onFocusCapture: () => {
      le(n) && (r.value = !0);
    },
    onBlurCapture: () => {
      le(n) && (r.value = !1);
    }
  };
}
const Ue = Ot({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var Gl = /* @__PURE__ */ F({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: r, currentElement: i } = pe(), a = y(() => i.value?.ownerDocument ?? globalThis.document), s = y(() => Ue.layersRoot), u = y(() => i.value ? Array.from(s.value).indexOf(i.value) : -1), c = y(() => Ue.layersWithOutsidePointerEventsDisabled.size > 0), l = y(() => {
      const p = Array.from(s.value), [h] = [...Ue.layersWithOutsidePointerEventsDisabled].slice(-1), v = p.indexOf(h);
      return u.value >= v;
    }), f = Wl(async (p) => {
      const h = [...Ue.branches].some((v) => v?.contains(p.target));
      !l.value || h || (o("pointerDownOutside", p), o("interactOutside", p), await he(), p.defaultPrevented || o("dismiss"));
    }, i), g = Kl((p) => {
      [...Ue.branches].some((v) => v?.contains(p.target)) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, i);
    el("Escape", (p) => {
      u.value === s.value.size - 1 && (o("escapeKeyDown", p), p.defaultPrevented || o("dismiss"));
    });
    let m;
    return Me((p) => {
      i.value && (n.disableOutsidePointerEvents && (Ue.layersWithOutsidePointerEventsDisabled.size === 0 && (m = a.value.body.style.pointerEvents, a.value.body.style.pointerEvents = "none"), Ue.layersWithOutsidePointerEventsDisabled.add(i.value)), s.value.add(i.value), p(() => {
        n.disableOutsidePointerEvents && Ue.layersWithOutsidePointerEventsDisabled.size === 1 && (a.value.body.style.pointerEvents = m);
      }));
    }), Me((p) => {
      p(() => {
        i.value && (s.value.delete(i.value), Ue.layersWithOutsidePointerEventsDisabled.delete(i.value));
      });
    }), (p, h) => (x(), I(d(re), {
      ref: d(r),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: yo({ pointerEvents: c.value ? l.value ? "auto" : "none" : void 0 }),
      onFocusCapture: d(g).onFocusCapture,
      onBlurCapture: d(g).onBlurCapture,
      onPointerdownCapture: d(f).onPointerDownCapture
    }, {
      default: B(() => [q(p.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "style",
      "onFocusCapture",
      "onBlurCapture",
      "onPointerdownCapture"
    ]));
  }
}), Ul = Gl;
const Yl = Ns(() => D([]));
function Ql() {
  const e = Yl();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && n?.pause(), e.value = mr(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      e.value = mr(e.value, t), e.value[0]?.resume();
    }
  };
}
function mr(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Jl(e) {
  return e.filter((t) => t.tagName !== "A");
}
const qn = "focusScope.autoFocusOnMount", Fn = "focusScope.autoFocusOnUnmount", vr = {
  bubbles: !1,
  cancelable: !0
};
function Xl(e, { select: t = !1 } = {}) {
  const n = ft();
  for (const o of e)
    if (tt(o, { select: t }), ft() !== n) return !0;
}
function Zl(e) {
  const t = Ii(e), n = hr(t, e), o = hr(t.reverse(), e);
  return [n, o];
}
function Ii(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function hr(e, t) {
  for (const n of e) if (!eu(n, { upTo: t })) return n;
}
function eu(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function tu(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function tt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = ft();
    e.focus({ preventScroll: !0 }), e !== n && tu(e) && t && e.select();
  }
}
var nu = /* @__PURE__ */ F({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    trapped: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: r, currentElement: i } = pe(), a = D(null), s = Ql(), u = Ot({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    Me((l) => {
      if (!ht) return;
      const f = i.value;
      if (!n.trapped) return;
      function g(v) {
        if (u.paused || !f) return;
        const w = v.target;
        f.contains(w) ? a.value = w : tt(a.value, { select: !0 });
      }
      function m(v) {
        if (u.paused || !f) return;
        const w = v.relatedTarget;
        w !== null && (f.contains(w) || tt(a.value, { select: !0 }));
      }
      function p(v) {
        f.contains(a.value) || tt(f);
      }
      document.addEventListener("focusin", g), document.addEventListener("focusout", m);
      const h = new MutationObserver(p);
      f && h.observe(f, {
        childList: !0,
        subtree: !0
      }), l(() => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", m), h.disconnect();
      });
    }), Me(async (l) => {
      const f = i.value;
      if (await he(), !f) return;
      s.add(u);
      const g = ft();
      if (!f.contains(g)) {
        const p = new CustomEvent(qn, vr);
        f.addEventListener(qn, (h) => o("mountAutoFocus", h)), f.dispatchEvent(p), p.defaultPrevented || (Xl(Jl(Ii(f)), { select: !0 }), ft() === g && tt(f));
      }
      l(() => {
        f.removeEventListener(qn, (v) => o("mountAutoFocus", v));
        const p = new CustomEvent(Fn, vr), h = (v) => {
          o("unmountAutoFocus", v);
        };
        f.addEventListener(Fn, h), f.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || tt(g ?? document.body, { select: !0 }), f.removeEventListener(Fn, h), s.remove(u);
        }, 0);
      });
    });
    function c(l) {
      if (!n.loop && !n.trapped || u.paused) return;
      const f = l.key === "Tab" && !l.altKey && !l.ctrlKey && !l.metaKey, g = ft();
      if (f && g) {
        const m = l.currentTarget, [p, h] = Zl(m);
        p && h ? !l.shiftKey && g === h ? (l.preventDefault(), n.loop && tt(p, { select: !0 })) : l.shiftKey && g === p && (l.preventDefault(), n.loop && tt(h, { select: !0 })) : g === m && l.preventDefault();
      }
    }
    return (l, f) => (x(), I(d(re), {
      ref_key: "currentRef",
      ref: r,
      tabindex: "-1",
      "as-child": l.asChild,
      as: l.as,
      onKeydown: c
    }, {
      default: B(() => [q(l.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), ou = nu, ru = /* @__PURE__ */ F({
  __name: "Teleport",
  props: {
    to: {
      type: null,
      required: !1,
      default: "body"
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = Xs();
    return (n, o) => d(t) || n.forceMount ? (x(), I(ka, {
      key: 0,
      to: n.to,
      disabled: n.disabled,
      defer: n.defer
    }, [q(n.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : ne("v-if", !0);
  }
}), iu = ru;
const br = "data-reka-collection-item";
function Po(e = {}) {
  const { key: t = "", isProvider: n = !1 } = e, o = `${t}CollectionProvider`;
  let r;
  if (n) {
    const l = D(/* @__PURE__ */ new Map());
    r = {
      collectionRef: D(),
      itemMap: l
    }, pt(o, r);
  } else r = xe(o);
  const i = (l = !1) => {
    const f = r.collectionRef.value;
    if (!f) return [];
    const g = Array.from(f.querySelectorAll(`[${br}]`)), p = Array.from(r.itemMap.value.values()).sort((h, v) => g.indexOf(h.ref) - g.indexOf(v.ref));
    return l ? p : p.filter((h) => h.ref.dataset.disabled !== "");
  }, a = F({
    name: "CollectionSlot",
    setup(l, { slots: f }) {
      const { primitiveElement: g, currentElement: m } = at();
      return fe(m, () => {
        r.collectionRef.value = m.value;
      }), () => je(Wt, { ref: g }, f);
    }
  }), s = F({
    name: "CollectionItem",
    inheritAttrs: !1,
    props: { value: { validator: () => !0 } },
    setup(l, { slots: f, attrs: g }) {
      const { primitiveElement: m, currentElement: p } = at();
      return Me((h) => {
        if (p.value) {
          const v = Ca(p.value);
          r.itemMap.value.set(v, {
            ref: p.value,
            value: l.value
          }), h(() => r.itemMap.value.delete(v));
        }
      }), () => je(Wt, {
        ...g,
        [br]: "",
        ref: m
      }, f);
    }
  }), u = y(() => Array.from(r.itemMap.value.values())), c = y(() => r.itemMap.value.size);
  return {
    getItems: i,
    reactiveItems: u,
    itemMapSize: c,
    CollectionSlot: a,
    CollectionItem: s
  };
}
const au = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function su(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function lu(e, t, n) {
  const o = su(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return au[o];
}
var uu = /* @__PURE__ */ F({
  __name: "VisuallyHidden",
  props: {
    feature: {
      type: String,
      required: !1,
      default: "focusable"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    return (t, n) => (x(), I(d(re), {
      as: t.as,
      "as-child": t.asChild,
      "aria-hidden": t.feature === "focusable" ? "true" : void 0,
      "data-hidden": t.feature === "fully-hidden" ? "" : void 0,
      tabindex: t.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        position: "absolute",
        border: 0,
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: B(() => [q(t.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), cu = uu, du = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const t = e, { primitiveElement: n, currentElement: o } = at(), r = y(() => t.checked ?? t.value);
    return fe(r, (i, a) => {
      if (!o.value) return;
      const s = o.value, u = window.HTMLInputElement.prototype, l = Object.getOwnPropertyDescriptor(u, "value").set;
      if (l && i !== a) {
        const f = new Event("input", { bubbles: !0 }), g = new Event("change", { bubbles: !0 });
        l.call(s, i), s.dispatchEvent(f), s.dispatchEvent(g);
      }
    }), (i, a) => (x(), I(cu, K({
      ref_key: "primitiveElement",
      ref: n
    }, {
      ...t,
      ...i.$attrs
    }, { as: "input" }), null, 16));
  }
}), yr = du, fu = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const t = e, n = y(() => typeof t.value == "object" && Array.isArray(t.value) && t.value.length === 0 && t.required), o = y(() => typeof t.value == "string" || typeof t.value == "number" || typeof t.value == "boolean" || t.value === null || t.value === void 0 ? [{
      name: t.name,
      value: t.value
    }] : typeof t.value == "object" && Array.isArray(t.value) ? t.value.flatMap((r, i) => typeof r == "object" ? Object.entries(r).map(([a, s]) => ({
      name: `${t.name}[${i}][${a}]`,
      value: s
    })) : {
      name: `${t.name}[${i}]`,
      value: r
    }) : t.value !== null && typeof t.value == "object" && !Array.isArray(t.value) ? Object.entries(t.value).map(([r, i]) => ({
      name: `${t.name}[${r}]`,
      value: i
    })) : []);
    return (r, i) => (x(), oe($e, null, [ne(" We render single input if it's required "), n.value ? (x(), I(yr, K({ key: r.name }, {
      ...t,
      ...r.$attrs
    }, {
      name: r.name,
      value: r.value
    }), null, 16, ["name", "value"])) : (x(!0), oe($e, { key: 1 }, Rt(o.value, (a) => (x(), I(yr, K({ key: a.name }, { ref_for: !0 }, {
      ...t,
      ...r.$attrs
    }, {
      name: a.name,
      value: a.value
    }), null, 16, ["name", "value"]))), 128))], 2112));
  }
}), Oi = fu;
const [Ei, pu] = ze("PopperRoot");
var gu = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = D();
    return pu({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, o) => q(n.$slots, "default");
  }
}), mu = gu, vu = /* @__PURE__ */ F({
  __name: "PopperAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: o } = pe(), r = Ei();
    return ti(() => {
      r.onAnchorChange(t.reference ?? o.value);
    }), (i, a) => (x(), I(d(re), {
      ref: d(n),
      as: i.as,
      "as-child": i.asChild
    }, {
      default: B(() => [q(i.$slots, "default")]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), hu = vu;
const bu = {
  key: 0,
  d: "M0 0L6 6L12 0"
}, yu = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var wu = /* @__PURE__ */ F({
  __name: "Arrow",
  props: {
    width: {
      type: Number,
      required: !1,
      default: 10
    },
    height: {
      type: Number,
      required: !1,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "svg"
    }
  },
  setup(e) {
    const t = e;
    return pe(), (n, o) => (x(), I(d(re), K(t, {
      width: n.width,
      height: n.height,
      viewBox: n.asChild ? void 0 : "0 0 12 6",
      preserveAspectRatio: n.asChild ? void 0 : "none"
    }), {
      default: B(() => [q(n.$slots, "default", {}, () => [n.rounded ? (x(), oe("path", yu)) : (x(), oe("path", bu))])]),
      _: 3
    }, 16, [
      "width",
      "height",
      "viewBox",
      "preserveAspectRatio"
    ]));
  }
}), xu = wu;
function ku(e) {
  return e !== null;
}
function Cu(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, s = a ? 0 : e.arrowWidth, u = a ? 0 : e.arrowHeight, [c, l] = Jn(n), f = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[l], g = (r.arrow?.x ?? 0) + s / 2, m = (r.arrow?.y ?? 0) + u / 2;
      let p = "", h = "";
      return c === "bottom" ? (p = a ? f : `${g}px`, h = `${-u}px`) : c === "top" ? (p = a ? f : `${g}px`, h = `${o.floating.height + u}px`) : c === "right" ? (p = `${-u}px`, h = a ? f : `${m}px`) : c === "left" && (p = `${o.floating.width + u}px`, h = a ? f : `${m}px`), { data: {
        x: p,
        y: h
      } };
    }
  };
}
function Jn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const Su = ["top", "right", "bottom", "left"], st = Math.min, Oe = Math.max, gn = Math.round, nn = Math.floor, He = (e) => ({
  x: e,
  y: e
}), _u = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Au = {
  start: "end",
  end: "start"
};
function Xn(e, t, n) {
  return Oe(e, st(t, n));
}
function Xe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ze(e) {
  return e.split("-")[0];
}
function Pt(e) {
  return e.split("-")[1];
}
function Bo(e) {
  return e === "x" ? "y" : "x";
}
function $o(e) {
  return e === "y" ? "height" : "width";
}
const Iu = /* @__PURE__ */ new Set(["top", "bottom"]);
function De(e) {
  return Iu.has(Ze(e)) ? "y" : "x";
}
function Lo(e) {
  return Bo(De(e));
}
function Ou(e, t, n) {
  n === void 0 && (n = !1);
  const o = Pt(e), r = Lo(e), i = $o(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (a = mn(a)), [a, mn(a)];
}
function Eu(e) {
  const t = mn(e);
  return [Zn(e), t, Zn(t)];
}
function Zn(e) {
  return e.replace(/start|end/g, (t) => Au[t]);
}
const wr = ["left", "right"], xr = ["right", "left"], Tu = ["top", "bottom"], zu = ["bottom", "top"];
function Pu(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? xr : wr : t ? wr : xr;
    case "left":
    case "right":
      return t ? Tu : zu;
    default:
      return [];
  }
}
function Bu(e, t, n, o) {
  const r = Pt(e);
  let i = Pu(Ze(e), n === "start", o);
  return r && (i = i.map((a) => a + "-" + r), t && (i = i.concat(i.map(Zn)))), i;
}
function mn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => _u[t]);
}
function $u(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ti(e) {
  return typeof e != "number" ? $u(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function vn(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function kr(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = De(t), a = Lo(t), s = $o(a), u = Ze(t), c = i === "y", l = o.x + o.width / 2 - r.width / 2, f = o.y + o.height / 2 - r.height / 2, g = o[s] / 2 - r[s] / 2;
  let m;
  switch (u) {
    case "top":
      m = {
        x: l,
        y: o.y - r.height
      };
      break;
    case "bottom":
      m = {
        x: l,
        y: o.y + o.height
      };
      break;
    case "right":
      m = {
        x: o.x + o.width,
        y: f
      };
      break;
    case "left":
      m = {
        x: o.x - r.width,
        y: f
      };
      break;
    default:
      m = {
        x: o.x,
        y: o.y
      };
  }
  switch (Pt(t)) {
    case "start":
      m[a] -= g * (n && c ? -1 : 1);
      break;
    case "end":
      m[a] += g * (n && c ? -1 : 1);
      break;
  }
  return m;
}
const Lu = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: a
  } = n, s = i.filter(Boolean), u = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: l,
    y: f
  } = kr(c, o, u), g = o, m = {}, p = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: v,
      fn: w
    } = s[h], {
      x: S,
      y: b,
      data: C,
      reset: A
    } = await w({
      x: l,
      y: f,
      initialPlacement: o,
      placement: g,
      strategy: r,
      middlewareData: m,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = S ?? l, f = b ?? f, m = {
      ...m,
      [v]: {
        ...m[v],
        ...C
      }
    }, A && p <= 50 && (p++, typeof A == "object" && (A.placement && (g = A.placement), A.rects && (c = A.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : A.rects), {
      x: l,
      y: f
    } = kr(c, g, u)), h = -1);
  }
  return {
    x: l,
    y: f,
    placement: g,
    strategy: r,
    middlewareData: m
  };
};
async function Kt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: a,
    elements: s,
    strategy: u
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: f = "floating",
    altBoundary: g = !1,
    padding: m = 0
  } = Xe(t, e), p = Ti(m), v = s[g ? f === "floating" ? "reference" : "floating" : f], w = vn(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(v))) == null || n ? v : v.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: u
  })), S = f === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, b = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), C = await (i.isElement == null ? void 0 : i.isElement(b)) ? await (i.getScale == null ? void 0 : i.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, A = vn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: S,
    offsetParent: b,
    strategy: u
  }) : S);
  return {
    top: (w.top - A.top + p.top) / C.y,
    bottom: (A.bottom - w.bottom + p.bottom) / C.y,
    left: (w.left - A.left + p.left) / C.x,
    right: (A.right - w.right + p.right) / C.x
  };
}
const Mu = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: a,
      elements: s,
      middlewareData: u
    } = t, {
      element: c,
      padding: l = 0
    } = Xe(e, t) || {};
    if (c == null)
      return {};
    const f = Ti(l), g = {
      x: n,
      y: o
    }, m = Lo(r), p = $o(m), h = await a.getDimensions(c), v = m === "y", w = v ? "top" : "left", S = v ? "bottom" : "right", b = v ? "clientHeight" : "clientWidth", C = i.reference[p] + i.reference[m] - g[m] - i.floating[p], A = g[m] - i.reference[m], $ = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let T = $ ? $[b] : 0;
    (!T || !await (a.isElement == null ? void 0 : a.isElement($))) && (T = s.floating[b] || i.floating[p]);
    const E = C / 2 - A / 2, j = T / 2 - h[p] / 2 - 1, H = st(f[w], j), Z = st(f[S], j), W = H, ee = T - h[p] - Z, k = T / 2 - h[p] / 2 + E, O = Xn(W, k, ee), M = !u.arrow && Pt(r) != null && k !== O && i.reference[p] / 2 - (k < W ? H : Z) - h[p] / 2 < 0, z = M ? k < W ? k - W : k - ee : 0;
    return {
      [m]: g[m] + z,
      data: {
        [m]: O,
        centerOffset: k - O - z,
        ...M && {
          alignmentOffset: z
        }
      },
      reset: M
    };
  }
}), qu = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: a,
        initialPlacement: s,
        platform: u,
        elements: c
      } = t, {
        mainAxis: l = !0,
        crossAxis: f = !0,
        fallbackPlacements: g,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: h = !0,
        ...v
      } = Xe(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const w = Ze(r), S = De(s), b = Ze(s) === s, C = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), A = g || (b || !h ? [mn(s)] : Eu(s)), $ = p !== "none";
      !g && $ && A.push(...Bu(s, h, p, C));
      const T = [s, ...A], E = await Kt(t, v), j = [];
      let H = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (l && j.push(E[w]), f) {
        const k = Ou(r, a, C);
        j.push(E[k[0]], E[k[1]]);
      }
      if (H = [...H, {
        placement: r,
        overflows: j
      }], !j.every((k) => k <= 0)) {
        var Z, W;
        const k = (((Z = i.flip) == null ? void 0 : Z.index) || 0) + 1, O = T[k];
        if (O && (!(f === "alignment" ? S !== De(O) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        H.every((_) => _.overflows[0] > 0 && De(_.placement) === S)))
          return {
            data: {
              index: k,
              overflows: H
            },
            reset: {
              placement: O
            }
          };
        let M = (W = H.filter((z) => z.overflows[0] <= 0).sort((z, _) => z.overflows[1] - _.overflows[1])[0]) == null ? void 0 : W.placement;
        if (!M)
          switch (m) {
            case "bestFit": {
              var ee;
              const z = (ee = H.filter((_) => {
                if ($) {
                  const P = De(_.placement);
                  return P === S || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  P === "y";
                }
                return !0;
              }).map((_) => [_.placement, _.overflows.filter((P) => P > 0).reduce((P, te) => P + te, 0)]).sort((_, P) => _[1] - P[1])[0]) == null ? void 0 : ee[0];
              z && (M = z);
              break;
            }
            case "initialPlacement":
              M = s;
              break;
          }
        if (r !== M)
          return {
            reset: {
              placement: M
            }
          };
      }
      return {};
    }
  };
};
function Cr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Sr(e) {
  return Su.some((t) => e[t] >= 0);
}
const Fu = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = Xe(e, t);
      switch (o) {
        case "referenceHidden": {
          const i = await Kt(t, {
            ...r,
            elementContext: "reference"
          }), a = Cr(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Sr(a)
            }
          };
        }
        case "escaped": {
          const i = await Kt(t, {
            ...r,
            altBoundary: !0
          }), a = Cr(i, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Sr(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, zi = /* @__PURE__ */ new Set(["left", "top"]);
async function Vu(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = Ze(n), s = Pt(n), u = De(n) === "y", c = zi.has(a) ? -1 : 1, l = i && u ? -1 : 1, f = Xe(t, e);
  let {
    mainAxis: g,
    crossAxis: m,
    alignmentAxis: p
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return s && typeof p == "number" && (m = s === "end" ? p * -1 : p), u ? {
    x: m * l,
    y: g * c
  } : {
    x: g * c,
    y: m * l
  };
}
const Ru = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: a,
        middlewareData: s
      } = t, u = await Vu(t, e);
      return a === ((n = s.offset) == null ? void 0 : n.placement) && (o = s.arrow) != null && o.alignmentOffset ? {} : {
        x: r + u.x,
        y: i + u.y,
        data: {
          ...u,
          placement: a
        }
      };
    }
  };
}, Du = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: s = {
          fn: (v) => {
            let {
              x: w,
              y: S
            } = v;
            return {
              x: w,
              y: S
            };
          }
        },
        ...u
      } = Xe(e, t), c = {
        x: n,
        y: o
      }, l = await Kt(t, u), f = De(Ze(r)), g = Bo(f);
      let m = c[g], p = c[f];
      if (i) {
        const v = g === "y" ? "top" : "left", w = g === "y" ? "bottom" : "right", S = m + l[v], b = m - l[w];
        m = Xn(S, m, b);
      }
      if (a) {
        const v = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", S = p + l[v], b = p - l[w];
        p = Xn(S, p, b);
      }
      const h = s.fn({
        ...t,
        [g]: m,
        [f]: p
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - o,
          enabled: {
            [g]: i,
            [f]: a
          }
        }
      };
    }
  };
}, Nu = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: i,
        middlewareData: a
      } = t, {
        offset: s = 0,
        mainAxis: u = !0,
        crossAxis: c = !0
      } = Xe(e, t), l = {
        x: n,
        y: o
      }, f = De(r), g = Bo(f);
      let m = l[g], p = l[f];
      const h = Xe(s, t), v = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (u) {
        const b = g === "y" ? "height" : "width", C = i.reference[g] - i.floating[b] + v.mainAxis, A = i.reference[g] + i.reference[b] - v.mainAxis;
        m < C ? m = C : m > A && (m = A);
      }
      if (c) {
        var w, S;
        const b = g === "y" ? "width" : "height", C = zi.has(Ze(r)), A = i.reference[f] - i.floating[b] + (C && ((w = a.offset) == null ? void 0 : w[f]) || 0) + (C ? 0 : v.crossAxis), $ = i.reference[f] + i.reference[b] + (C ? 0 : ((S = a.offset) == null ? void 0 : S[f]) || 0) - (C ? v.crossAxis : 0);
        p < A ? p = A : p > $ && (p = $);
      }
      return {
        [g]: m,
        [f]: p
      };
    }
  };
}, ju = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: a,
        elements: s
      } = t, {
        apply: u = () => {
        },
        ...c
      } = Xe(e, t), l = await Kt(t, c), f = Ze(r), g = Pt(r), m = De(r) === "y", {
        width: p,
        height: h
      } = i.floating;
      let v, w;
      f === "top" || f === "bottom" ? (v = f, w = g === (await (a.isRTL == null ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (w = f, v = g === "end" ? "top" : "bottom");
      const S = h - l.top - l.bottom, b = p - l.left - l.right, C = st(h - l[v], S), A = st(p - l[w], b), $ = !t.middlewareData.shift;
      let T = C, E = A;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (E = b), (o = t.middlewareData.shift) != null && o.enabled.y && (T = S), $ && !g) {
        const H = Oe(l.left, 0), Z = Oe(l.right, 0), W = Oe(l.top, 0), ee = Oe(l.bottom, 0);
        m ? E = p - 2 * (H !== 0 || Z !== 0 ? H + Z : Oe(l.left, l.right)) : T = h - 2 * (W !== 0 || ee !== 0 ? W + ee : Oe(l.top, l.bottom));
      }
      await u({
        ...t,
        availableWidth: E,
        availableHeight: T
      });
      const j = await a.getDimensions(s.floating);
      return p !== j.width || h !== j.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function _n() {
  return typeof window < "u";
}
function wt(e) {
  return Mo(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ee(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ge(e) {
  var t;
  return (t = (Mo(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Mo(e) {
  return _n() ? e instanceof Node || e instanceof Ee(e).Node : !1;
}
function Ve(e) {
  return _n() ? e instanceof Element || e instanceof Ee(e).Element : !1;
}
function Ke(e) {
  return _n() ? e instanceof HTMLElement || e instanceof Ee(e).HTMLElement : !1;
}
function _r(e) {
  return !_n() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ee(e).ShadowRoot;
}
const Hu = /* @__PURE__ */ new Set(["inline", "contents"]);
function Qt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Re(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Hu.has(r);
}
const Wu = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Ku(e) {
  return Wu.has(wt(e));
}
const Gu = [":popover-open", ":modal"];
function An(e) {
  return Gu.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Uu = ["transform", "translate", "scale", "rotate", "perspective"], Yu = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Qu = ["paint", "layout", "strict", "content"];
function qo(e) {
  const t = Fo(), n = Ve(e) ? Re(e) : e;
  return Uu.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Yu.some((o) => (n.willChange || "").includes(o)) || Qu.some((o) => (n.contain || "").includes(o));
}
function Ju(e) {
  let t = lt(e);
  for (; Ke(t) && !Et(t); ) {
    if (qo(t))
      return t;
    if (An(t))
      return null;
    t = lt(t);
  }
  return null;
}
function Fo() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Xu = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Et(e) {
  return Xu.has(wt(e));
}
function Re(e) {
  return Ee(e).getComputedStyle(e);
}
function In(e) {
  return Ve(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function lt(e) {
  if (wt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    _r(e) && e.host || // Fallback.
    Ge(e)
  );
  return _r(t) ? t.host : t;
}
function Pi(e) {
  const t = lt(e);
  return Et(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ke(t) && Qt(t) ? t : Pi(t);
}
function Gt(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Pi(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = Ee(r);
  if (i) {
    const s = eo(a);
    return t.concat(a, a.visualViewport || [], Qt(r) ? r : [], s && n ? Gt(s) : []);
  }
  return t.concat(r, Gt(r, [], n));
}
function eo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Bi(e) {
  const t = Re(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Ke(e), i = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, s = gn(n) !== i || gn(o) !== a;
  return s && (n = i, o = a), {
    width: n,
    height: o,
    $: s
  };
}
function Vo(e) {
  return Ve(e) ? e : e.contextElement;
}
function It(e) {
  const t = Vo(e);
  if (!Ke(t))
    return He(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = Bi(t);
  let a = (i ? gn(n.width) : n.width) / o, s = (i ? gn(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: a,
    y: s
  };
}
const Zu = /* @__PURE__ */ He(0);
function $i(e) {
  const t = Ee(e);
  return !Fo() || !t.visualViewport ? Zu : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ec(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ee(e) ? !1 : t;
}
function mt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = Vo(e);
  let a = He(1);
  t && (o ? Ve(o) && (a = It(o)) : a = It(e));
  const s = ec(i, n, o) ? $i(i) : He(0);
  let u = (r.left + s.x) / a.x, c = (r.top + s.y) / a.y, l = r.width / a.x, f = r.height / a.y;
  if (i) {
    const g = Ee(i), m = o && Ve(o) ? Ee(o) : o;
    let p = g, h = eo(p);
    for (; h && o && m !== p; ) {
      const v = It(h), w = h.getBoundingClientRect(), S = Re(h), b = w.left + (h.clientLeft + parseFloat(S.paddingLeft)) * v.x, C = w.top + (h.clientTop + parseFloat(S.paddingTop)) * v.y;
      u *= v.x, c *= v.y, l *= v.x, f *= v.y, u += b, c += C, p = Ee(h), h = eo(p);
    }
  }
  return vn({
    width: l,
    height: f,
    x: u,
    y: c
  });
}
function Ro(e, t) {
  const n = In(e).scrollLeft;
  return t ? t.left + n : mt(Ge(e)).left + n;
}
function Li(e, t, n) {
  n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), r = o.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Ro(e, o)
  )), i = o.top + t.scrollTop;
  return {
    x: r,
    y: i
  };
}
function tc(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", a = Ge(o), s = t ? An(t.floating) : !1;
  if (o === a || s && i)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = He(1);
  const l = He(0), f = Ke(o);
  if ((f || !f && !i) && ((wt(o) !== "body" || Qt(a)) && (u = In(o)), Ke(o))) {
    const m = mt(o);
    c = It(o), l.x = m.x + o.clientLeft, l.y = m.y + o.clientTop;
  }
  const g = a && !f && !i ? Li(a, u, !0) : He(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - u.scrollLeft * c.x + l.x + g.x,
    y: n.y * c.y - u.scrollTop * c.y + l.y + g.y
  };
}
function nc(e) {
  return Array.from(e.getClientRects());
}
function oc(e) {
  const t = Ge(e), n = In(e), o = e.ownerDocument.body, r = Oe(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), i = Oe(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Ro(e);
  const s = -n.scrollTop;
  return Re(o).direction === "rtl" && (a += Oe(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: a,
    y: s
  };
}
function rc(e, t) {
  const n = Ee(e), o = Ge(e), r = n.visualViewport;
  let i = o.clientWidth, a = o.clientHeight, s = 0, u = 0;
  if (r) {
    i = r.width, a = r.height;
    const c = Fo();
    (!c || c && t === "fixed") && (s = r.offsetLeft, u = r.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: s,
    y: u
  };
}
const ic = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ac(e, t) {
  const n = mt(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = Ke(e) ? It(e) : He(1), a = e.clientWidth * i.x, s = e.clientHeight * i.y, u = r * i.x, c = o * i.y;
  return {
    width: a,
    height: s,
    x: u,
    y: c
  };
}
function Ar(e, t, n) {
  let o;
  if (t === "viewport")
    o = rc(e, n);
  else if (t === "document")
    o = oc(Ge(e));
  else if (Ve(t))
    o = ac(t, n);
  else {
    const r = $i(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return vn(o);
}
function Mi(e, t) {
  const n = lt(e);
  return n === t || !Ve(n) || Et(n) ? !1 : Re(n).position === "fixed" || Mi(n, t);
}
function sc(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Gt(e, [], !1).filter((s) => Ve(s) && wt(s) !== "body"), r = null;
  const i = Re(e).position === "fixed";
  let a = i ? lt(e) : e;
  for (; Ve(a) && !Et(a); ) {
    const s = Re(a), u = qo(a);
    !u && s.position === "fixed" && (r = null), (i ? !u && !r : !u && s.position === "static" && !!r && ic.has(r.position) || Qt(a) && !u && Mi(e, a)) ? o = o.filter((l) => l !== a) : r = s, a = lt(a);
  }
  return t.set(e, o), o;
}
function lc(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? An(t) ? [] : sc(t, this._c) : [].concat(n), o], s = a[0], u = a.reduce((c, l) => {
    const f = Ar(t, l, r);
    return c.top = Oe(f.top, c.top), c.right = st(f.right, c.right), c.bottom = st(f.bottom, c.bottom), c.left = Oe(f.left, c.left), c;
  }, Ar(t, s, r));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function uc(e) {
  const {
    width: t,
    height: n
  } = Bi(e);
  return {
    width: t,
    height: n
  };
}
function cc(e, t, n) {
  const o = Ke(t), r = Ge(t), i = n === "fixed", a = mt(e, !0, i, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = He(0);
  function c() {
    u.x = Ro(r);
  }
  if (o || !o && !i)
    if ((wt(t) !== "body" || Qt(r)) && (s = In(t)), o) {
      const m = mt(t, !0, i, t);
      u.x = m.x + t.clientLeft, u.y = m.y + t.clientTop;
    } else r && c();
  i && !o && r && c();
  const l = r && !o && !i ? Li(r, s) : He(0), f = a.left + s.scrollLeft - u.x - l.x, g = a.top + s.scrollTop - u.y - l.y;
  return {
    x: f,
    y: g,
    width: a.width,
    height: a.height
  };
}
function Vn(e) {
  return Re(e).position === "static";
}
function Ir(e, t) {
  if (!Ke(e) || Re(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Ge(e) === n && (n = n.ownerDocument.body), n;
}
function qi(e, t) {
  const n = Ee(e);
  if (An(e))
    return n;
  if (!Ke(e)) {
    let r = lt(e);
    for (; r && !Et(r); ) {
      if (Ve(r) && !Vn(r))
        return r;
      r = lt(r);
    }
    return n;
  }
  let o = Ir(e, t);
  for (; o && Ku(o) && Vn(o); )
    o = Ir(o, t);
  return o && Et(o) && Vn(o) && !qo(o) ? n : o || Ju(e) || n;
}
const dc = async function(e) {
  const t = this.getOffsetParent || qi, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: cc(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function fc(e) {
  return Re(e).direction === "rtl";
}
const pc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: tc,
  getDocumentElement: Ge,
  getClippingRect: lc,
  getOffsetParent: qi,
  getElementRects: dc,
  getClientRects: nc,
  getDimensions: uc,
  getScale: It,
  isElement: Ve,
  isRTL: fc
};
function Fi(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function gc(e, t) {
  let n = null, o;
  const r = Ge(e);
  function i() {
    var s;
    clearTimeout(o), (s = n) == null || s.disconnect(), n = null;
  }
  function a(s, u) {
    s === void 0 && (s = !1), u === void 0 && (u = 1), i();
    const c = e.getBoundingClientRect(), {
      left: l,
      top: f,
      width: g,
      height: m
    } = c;
    if (s || t(), !g || !m)
      return;
    const p = nn(f), h = nn(r.clientWidth - (l + g)), v = nn(r.clientHeight - (f + m)), w = nn(l), b = {
      rootMargin: -p + "px " + -h + "px " + -v + "px " + -w + "px",
      threshold: Oe(0, st(1, u)) || 1
    };
    let C = !0;
    function A($) {
      const T = $[0].intersectionRatio;
      if (T !== u) {
        if (!C)
          return a();
        T ? a(!1, T) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      T === 1 && !Fi(c, e.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(A, {
        ...b,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(A, b);
    }
    n.observe(e);
  }
  return a(!0), i;
}
function mc(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = o, c = Vo(e), l = r || i ? [...c ? Gt(c) : [], ...Gt(t)] : [];
  l.forEach((w) => {
    r && w.addEventListener("scroll", n, {
      passive: !0
    }), i && w.addEventListener("resize", n);
  });
  const f = c && s ? gc(c, n) : null;
  let g = -1, m = null;
  a && (m = new ResizeObserver((w) => {
    let [S] = w;
    S && S.target === c && m && (m.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var b;
      (b = m) == null || b.observe(t);
    })), n();
  }), c && !u && m.observe(c), m.observe(t));
  let p, h = u ? mt(e) : null;
  u && v();
  function v() {
    const w = mt(e);
    h && !Fi(h, w) && n(), h = w, p = requestAnimationFrame(v);
  }
  return n(), () => {
    var w;
    l.forEach((S) => {
      r && S.removeEventListener("scroll", n), i && S.removeEventListener("resize", n);
    }), f?.(), (w = m) == null || w.disconnect(), m = null, u && cancelAnimationFrame(p);
  };
}
const vc = Ru, hc = Du, Or = qu, bc = ju, yc = Fu, wc = Mu, xc = Nu, kc = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: pc,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return Lu(e, t, {
    ...r,
    platform: i
  });
};
function Cc(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function to(e) {
  if (Cc(e)) {
    const t = e.$el;
    return Mo(t) && wt(t) === "#comment" ? null : t;
  }
  return e;
}
function _t(e) {
  return typeof e == "function" ? e() : d(e);
}
function Sc(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = to(_t(e.element));
      return n == null ? {} : wc({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function Vi(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Er(e, t) {
  const n = Vi(e);
  return Math.round(t * n) / n;
}
function _c(e, t, n) {
  n === void 0 && (n = {});
  const o = n.whileElementsMounted, r = y(() => {
    var T;
    return (T = _t(n.open)) != null ? T : !0;
  }), i = y(() => _t(n.middleware)), a = y(() => {
    var T;
    return (T = _t(n.placement)) != null ? T : "bottom";
  }), s = y(() => {
    var T;
    return (T = _t(n.strategy)) != null ? T : "absolute";
  }), u = y(() => {
    var T;
    return (T = _t(n.transform)) != null ? T : !0;
  }), c = y(() => to(e.value)), l = y(() => to(t.value)), f = D(0), g = D(0), m = D(s.value), p = D(a.value), h = Ne({}), v = D(!1), w = y(() => {
    const T = {
      position: m.value,
      left: "0",
      top: "0"
    };
    if (!l.value)
      return T;
    const E = Er(l.value, f.value), j = Er(l.value, g.value);
    return u.value ? {
      ...T,
      transform: "translate(" + E + "px, " + j + "px)",
      ...Vi(l.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: m.value,
      left: E + "px",
      top: j + "px"
    };
  });
  let S;
  function b() {
    if (c.value == null || l.value == null)
      return;
    const T = r.value;
    kc(c.value, l.value, {
      middleware: i.value,
      placement: a.value,
      strategy: s.value
    }).then((E) => {
      f.value = E.x, g.value = E.y, m.value = E.strategy, p.value = E.placement, h.value = E.middlewareData, v.value = T !== !1;
    });
  }
  function C() {
    typeof S == "function" && (S(), S = void 0);
  }
  function A() {
    if (C(), o === void 0) {
      b();
      return;
    }
    if (c.value != null && l.value != null) {
      S = o(c.value, l.value, b);
      return;
    }
  }
  function $() {
    r.value || (v.value = !1);
  }
  return fe([i, a, s, r], b, {
    flush: "sync"
  }), fe([c, l], A, {
    flush: "sync"
  }), fe(r, $, {
    flush: "sync"
  }), vo() && ho(C), {
    x: kt(f),
    y: kt(g),
    strategy: kt(m),
    placement: kt(p),
    middlewareData: kt(h),
    isPositioned: kt(v),
    floatingStyles: w,
    update: b
  };
}
const Ac = {
  side: "bottom",
  sideOffset: 0,
  sideFlip: !0,
  align: "center",
  alignOffset: 0,
  alignFlip: !0,
  arrowPadding: 0,
  avoidCollisions: !0,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: !1,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: !1
}, [Ic, Oc] = ze("PopperContent");
var Ec = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ Sa({
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  }, { ...Ac }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Ei(), { forwardRef: i, currentElement: a } = pe(), s = D(), u = D(), { width: c, height: l } = pl(u), f = y(() => n.side + (n.align !== "center" ? `-${n.align}` : "")), g = y(() => typeof n.collisionPadding == "number" ? n.collisionPadding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n.collisionPadding
    }), m = y(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), p = y(() => ({
      padding: g.value,
      boundary: m.value.filter(ku),
      altBoundary: m.value.length > 0
    })), h = y(() => ({
      mainAxis: n.sideFlip,
      crossAxis: n.alignFlip
    })), v = Ds(() => [
      vc({
        mainAxis: n.sideOffset + l.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && Or({
        ...p.value,
        ...h.value
      }),
      n.avoidCollisions && hc({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? xc() : void 0,
        ...p.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Or({
        ...p.value,
        ...h.value
      }),
      bc({
        ...p.value,
        apply: ({ elements: W, rects: ee, availableWidth: k, availableHeight: O }) => {
          const { width: M, height: z } = ee.reference, _ = W.floating.style;
          _.setProperty("--reka-popper-available-width", `${k}px`), _.setProperty("--reka-popper-available-height", `${O}px`), _.setProperty("--reka-popper-anchor-width", `${M}px`), _.setProperty("--reka-popper-anchor-height", `${z}px`);
        }
      }),
      u.value && Sc({
        element: u.value,
        padding: n.arrowPadding
      }),
      Cu({
        arrowWidth: c.value,
        arrowHeight: l.value
      }),
      n.hideWhenDetached && yc({
        strategy: "referenceHidden",
        ...p.value
      })
    ]), w = y(() => n.reference ?? r.anchor.value), { floatingStyles: S, placement: b, isPositioned: C, middlewareData: A } = _c(w, s, {
      strategy: n.positionStrategy,
      placement: f,
      whileElementsMounted: (...W) => mc(...W, {
        layoutShift: !n.disableUpdateOnLayoutShift,
        animationFrame: n.updatePositionStrategy === "always"
      }),
      middleware: v
    }), $ = y(() => Jn(b.value)[0]), T = y(() => Jn(b.value)[1]);
    ti(() => {
      C.value && o("placed");
    });
    const E = y(() => A.value.arrow?.centerOffset !== 0), j = D("");
    Me(() => {
      a.value && (j.value = window.getComputedStyle(a.value).zIndex);
    });
    const H = y(() => A.value.arrow?.x ?? 0), Z = y(() => A.value.arrow?.y ?? 0);
    return Oc({
      placedSide: $,
      onArrowChange: (W) => u.value = W,
      arrowX: H,
      arrowY: Z,
      shouldHideArrow: E
    }), (W, ee) => (x(), oe("div", {
      ref_key: "floatingRef",
      ref: s,
      "data-reka-popper-content-wrapper": "",
      style: yo({
        ...d(S),
        transform: d(C) ? d(S).transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: j.value,
        "--reka-popper-transform-origin": [d(A).transformOrigin?.x, d(A).transformOrigin?.y].join(" "),
        ...d(A).hide?.referenceHidden && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      })
    }, [ie(d(re), K({ ref: d(i) }, W.$attrs, {
      "as-child": n.asChild,
      as: W.as,
      "data-side": $.value,
      "data-align": T.value,
      style: { animation: d(C) ? void 0 : "none" }
    }), {
      default: B(() => [q(W.$slots, "default")]),
      _: 3
    }, 16, [
      "as-child",
      "as",
      "data-side",
      "data-align",
      "style"
    ])], 4));
  }
}), Tc = Ec;
const zc = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var Pc = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "PopperArrow",
  props: {
    width: {
      type: Number,
      required: !1
    },
    height: {
      type: Number,
      required: !1
    },
    rounded: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "svg"
    }
  },
  setup(e) {
    const { forwardRef: t } = pe(), n = Ic(), o = y(() => zc[n.placedSide.value]);
    return (r, i) => (x(), oe("span", {
      ref: (a) => {
        d(n).onArrowChange(a);
      },
      style: yo({
        position: "absolute",
        left: d(n).arrowX?.value ? `${d(n).arrowX?.value}px` : void 0,
        top: d(n).arrowY?.value ? `${d(n).arrowY?.value}px` : void 0,
        [o.value]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0"
        }[d(n).placedSide.value],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)"
        }[d(n).placedSide.value],
        visibility: d(n).shouldHideArrow.value ? "hidden" : void 0
      })
    }, [ie(xu, K(r.$attrs, {
      ref: d(t),
      style: { display: "block" },
      as: r.as,
      "as-child": r.asChild,
      rounded: r.rounded,
      width: r.width,
      height: r.height
    }), {
      default: B(() => [q(r.$slots, "default")]),
      _: 3
    }, 16, [
      "as",
      "as-child",
      "rounded",
      "width",
      "height"
    ])], 4));
  }
}), Bc = Pc, $c = /* @__PURE__ */ F({
  __name: "ComboboxAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const { forwardRef: t } = pe();
    return (n, o) => (x(), I(d(hu), {
      "as-child": "",
      reference: n.reference
    }, {
      default: B(() => [ie(d(re), K({
        ref: d(t),
        "as-child": n.asChild,
        as: n.as
      }, n.$attrs), {
        default: B(() => [q(n.$slots, "default")]),
        _: 3
      }, 16, ["as-child", "as"])]),
      _: 3
    }, 8, ["reference"]));
  }
}), Lc = $c;
function Mc(e, t, n) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((o) => Dt(o, t, n)) : Dt(e, t, n);
}
function Dt(e, t, n) {
  return e === void 0 || t === void 0 ? !1 : typeof e == "string" ? e === t : typeof n == "function" ? n(e, t) : typeof n == "string" ? e?.[n] === t?.[n] : Fe(e, t);
}
const [On, qc] = ze("ListboxRoot");
var Fc = /* @__PURE__ */ F({
  __name: "ListboxRoot",
  props: {
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    orientation: {
      type: String,
      required: !1,
      default: "vertical"
    },
    dir: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    selectionBehavior: {
      type: String,
      required: !1,
      default: "toggle"
    },
    highlightOnHover: {
      type: Boolean,
      required: !1
    },
    by: {
      type: [String, Function],
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "update:modelValue",
    "highlight",
    "entryFocus",
    "leave"
  ],
  setup(e, { expose: t, emit: n }) {
    const o = e, r = n, { multiple: i, highlightOnHover: a, orientation: s, disabled: u, selectionBehavior: c, dir: l } = We(o), { getItems: f } = Po({ isProvider: !0 }), { handleTypeaheadSearch: g } = ml(), { primitiveElement: m, currentElement: p } = at(), h = fl(), v = Eo(l), w = ki(p), S = D(), b = D(!1), C = D(!0), A = it(o, "modelValue", r, {
      defaultValue: o.defaultValue ?? (i.value ? [] : void 0),
      passive: o.modelValue === void 0,
      deep: !0
    });
    function $(L) {
      if (b.value = !0, o.multiple) {
        const Y = Array.isArray(A.value) ? [...A.value] : [], Q = Y.findIndex((ce) => Dt(ce, L, o.by));
        o.selectionBehavior === "toggle" ? (Q === -1 ? Y.push(L) : Y.splice(Q, 1), A.value = Y) : (A.value = [L], S.value = L);
      } else o.selectionBehavior === "toggle" && Dt(A.value, L, o.by) ? A.value = void 0 : A.value = L;
      setTimeout(() => {
        b.value = !1;
      }, 1);
    }
    const T = D(null), E = D(null), j = D(!1), H = D(!1), Z = ln(), W = ln(), ee = ln();
    function k() {
      return f().map((L) => L.ref).filter((L) => L.dataset.disabled !== "");
    }
    function O(L, Y = !0) {
      if (!L) return;
      T.value = L, C.value && T.value.focus(), Y && T.value.scrollIntoView({ block: "nearest" });
      const Q = f().find((ce) => ce.ref === L);
      r("highlight", Q);
    }
    function M(L) {
      if (j.value) ee.trigger(L);
      else {
        const Y = f().find((Q) => Dt(Q.value, L, o.by));
        Y && (T.value = Y.ref, O(Y.ref));
      }
    }
    function z(L) {
      T.value && T.value.isConnected && (L.preventDefault(), L.stopPropagation(), H.value || T.value.click());
    }
    function _(L) {
      if (C.value) {
        if (b.value = !0, j.value) W.trigger(L);
        else {
          const Y = L.altKey || L.ctrlKey || L.metaKey;
          if (Y && L.key === "a" && i.value) {
            const Q = f(), ce = Q.map((Pe) => Pe.value);
            A.value = [...ce], L.preventDefault(), O(Q[Q.length - 1].ref);
          } else if (!Y) {
            const Q = g(L.key, f());
            Q && O(Q);
          }
        }
        setTimeout(() => {
          b.value = !1;
        }, 1);
      }
    }
    function P() {
      H.value = !0;
    }
    function te() {
      he(() => {
        H.value = !1;
      });
    }
    function ue() {
      he(() => {
        const L = new KeyboardEvent("keydown", { key: "PageUp" });
        se(L);
      });
    }
    function ae(L) {
      const Y = T.value;
      Y?.isConnected && (E.value = Y), T.value = null, r("leave", L);
    }
    function J(L) {
      const Y = new CustomEvent("listbox.entryFocus", {
        bubbles: !1,
        cancelable: !0
      });
      if (L.currentTarget?.dispatchEvent(Y), r("entryFocus", Y), !Y.defaultPrevented)
        if (E.value) O(E.value);
        else {
          const Q = k()?.[0];
          O(Q);
        }
    }
    function se(L) {
      const Y = lu(L, s.value, v.value);
      if (!Y) return;
      let Q = k();
      if (T.value) {
        if (Y === "last") Q.reverse();
        else if (Y === "prev" || Y === "next") {
          Y === "prev" && Q.reverse();
          const ce = Q.indexOf(T.value);
          Q = Q.slice(ce + 1);
        }
        ge(L, Q[0]);
      }
      if (Q.length) {
        const ce = !T.value && Y === "prev" ? Q.length - 1 : 0;
        O(Q[ce]);
      }
      if (j.value) return W.trigger(L);
    }
    function ge(L, Y) {
      if (!(j.value || o.selectionBehavior !== "replace" || !i.value || !Array.isArray(A.value) || (L.altKey || L.ctrlKey || L.metaKey) && !L.shiftKey) && L.shiftKey) {
        const ce = f().filter((G) => G.ref.dataset.disabled !== "");
        let Pe = ce.find((G) => G.ref === Y)?.value;
        if (L.key === h.END ? Pe = ce[ce.length - 1].value : L.key === h.HOME && (Pe = ce[0].value), !Pe || !S.value) return;
        const me = Ms(ce.map((G) => G.value), S.value, Pe);
        A.value = me;
      }
    }
    async function ke(L) {
      if (await he(), j.value) Z.trigger(L);
      else {
        const Y = k(), Q = Y.find((ce) => ce.dataset.state === "checked");
        Q ? O(Q) : Y.length && O(Y[0]);
      }
    }
    return fe(A, () => {
      b.value || he(() => {
        ke();
      });
    }, {
      immediate: !0,
      deep: !0
    }), t({
      highlightedElement: T,
      highlightItem: M,
      highlightFirstItem: ue,
      highlightSelected: ke,
      getItems: f
    }), qc({
      modelValue: A,
      onValueChange: $,
      multiple: i,
      orientation: s,
      dir: v,
      disabled: u,
      highlightOnHover: a,
      highlightedElement: T,
      isVirtual: j,
      virtualFocusHook: Z,
      virtualKeydownHook: W,
      virtualHighlightHook: ee,
      by: o.by,
      firstValue: S,
      selectionBehavior: c,
      focusable: C,
      onLeave: ae,
      onEnter: J,
      changeHighlight: O,
      onKeydownEnter: z,
      onKeydownNavigation: se,
      onKeydownTypeAhead: _,
      onCompositionStart: P,
      onCompositionEnd: te,
      highlightFirstItem: ue
    }), (L, Y) => (x(), I(d(re), {
      ref_key: "primitiveElement",
      ref: m,
      as: L.as,
      "as-child": L.asChild,
      dir: d(v),
      "data-disabled": d(u) ? "" : void 0,
      onPointerleave: ae,
      onFocusout: Y[0] || (Y[0] = async (Q) => {
        const ce = Q.relatedTarget || Q.target;
        await he(), T.value && d(p) && !d(p).contains(ce) && ae(Q);
      })
    }, {
      default: B(() => [q(L.$slots, "default", { modelValue: d(A) }), d(w) && L.name ? (x(), I(d(Oi), {
        key: 0,
        name: L.name,
        value: d(A),
        disabled: d(u),
        required: L.required
      }, null, 8, [
        "name",
        "value",
        "disabled",
        "required"
      ])) : ne("v-if", !0)]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "dir",
      "data-disabled"
    ]));
  }
}), Vc = Fc, Rc = /* @__PURE__ */ F({
  __name: "ListboxContent",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const { CollectionSlot: t } = Po(), n = On(), o = yi(!1, 10);
    return (r, i) => (x(), I(d(t), null, {
      default: B(() => [ie(d(re), {
        role: "listbox",
        as: r.as,
        "as-child": r.asChild,
        tabindex: d(n).focusable.value ? d(n).highlightedElement.value ? "-1" : "0" : void 0,
        "aria-orientation": d(n).orientation.value,
        "aria-multiselectable": !!d(n).multiple.value,
        "data-orientation": d(n).orientation.value,
        onMousedown: i[0] || (i[0] = gt((a) => o.value = !0, ["left"])),
        onFocus: i[1] || (i[1] = (a) => {
          d(o) || d(n).onEnter(a);
        }),
        onKeydown: [
          i[2] || (i[2] = rt(gt((a) => {
            d(n).focusable.value && d(n).onKeydownNavigation(a);
          }, ["prevent"]), [
            "down",
            "up",
            "left",
            "right",
            "home",
            "end"
          ])),
          rt(d(n).onKeydownEnter, ["enter"]),
          d(n).onKeydownTypeAhead
        ]
      }, {
        default: B(() => [q(r.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "tabindex",
        "aria-orientation",
        "aria-multiselectable",
        "data-orientation",
        "onKeydown"
      ])]),
      _: 3
    }));
  }
}), Dc = Rc, Nc = /* @__PURE__ */ F({
  __name: "ListboxFilter",
  props: {
    modelValue: {
      type: String,
      required: !1
    },
    autoFocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "input"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, r = it(n, "modelValue", t, {
      defaultValue: "",
      passive: n.modelValue === void 0
    }), i = On(), { primitiveElement: a, currentElement: s } = at(), u = y(() => n.disabled || i.disabled.value || !1), c = D();
    return _a(() => c.value = i.highlightedElement.value?.id), Se(() => {
      i.focusable.value = !1, setTimeout(() => {
        n.autoFocus && s.value?.focus();
      }, 1);
    }), vt(() => {
      i.focusable.value = !0;
    }), (l, f) => (x(), I(d(re), {
      ref_key: "primitiveElement",
      ref: a,
      as: l.as,
      "as-child": l.asChild,
      value: d(r),
      disabled: u.value ? "" : void 0,
      "data-disabled": u.value ? "" : void 0,
      "aria-disabled": u.value ?? void 0,
      "aria-activedescendant": c.value,
      type: "text",
      onKeydown: [rt(gt(d(i).onKeydownNavigation, ["prevent"]), [
        "down",
        "up",
        "home",
        "end"
      ]), rt(d(i).onKeydownEnter, ["enter"])],
      onInput: f[0] || (f[0] = (g) => {
        r.value = g.target.value, d(i).highlightFirstItem();
      }),
      onCompositionstart: d(i).onCompositionStart,
      onCompositionend: d(i).onCompositionEnd
    }, {
      default: B(() => [q(l.$slots, "default", { modelValue: d(r) })]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "value",
      "disabled",
      "data-disabled",
      "aria-disabled",
      "aria-activedescendant",
      "onKeydown",
      "onCompositionstart",
      "onCompositionend"
    ]));
  }
}), jc = Nc;
const [rg, Hc] = ze("ListboxGroup");
var Wc = /* @__PURE__ */ F({
  __name: "ListboxGroup",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = ut(void 0, "reka-listbox-group");
    return Hc({ id: n }), (o, r) => (x(), I(d(re), K({ role: "group" }, t, { "aria-labelledby": d(n) }), {
      default: B(() => [q(o.$slots, "default")]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
}), Kc = Wc;
const Gc = "listbox.select", [Uc, Yc] = ze("ListboxItem");
var Qc = /* @__PURE__ */ F({
  __name: "ListboxItem",
  props: {
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "div"
    }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = ut(void 0, "reka-listbox-item"), { CollectionItem: i } = Po(), { forwardRef: a, currentElement: s } = pe(), u = On(), c = y(() => s.value === u.highlightedElement.value), l = y(() => Mc(u.modelValue.value, n.value, u.by)), f = y(() => u.disabled.value || n.disabled);
    async function g(p) {
      o("select", p), !p?.defaultPrevented && !f.value && p && (u.onValueChange(n.value), u.changeHighlight(s.value));
    }
    function m(p) {
      const h = {
        originalEvent: p,
        value: n.value
      };
      So(Gc, g, h);
    }
    return Yc({ isSelected: l }), (p, h) => (x(), I(d(i), { value: p.value }, {
      default: B(() => [Aa([c.value, l.value], () => ie(d(re), K({ id: d(r) }, p.$attrs, {
        ref: d(a),
        role: "option",
        tabindex: d(u).focusable.value ? c.value ? "0" : "-1" : -1,
        "aria-selected": l.value,
        as: p.as,
        "as-child": p.asChild,
        disabled: f.value ? "" : void 0,
        "data-disabled": f.value ? "" : void 0,
        "data-highlighted": c.value ? "" : void 0,
        "data-state": l.value ? "checked" : "unchecked",
        onClick: m,
        onKeydown: rt(gt(m, ["prevent"]), ["space"]),
        onPointermove: h[0] || (h[0] = (v) => {
          d(u).highlightedElement.value !== d(s) && (d(u).highlightOnHover.value ? d(u).changeHighlight(d(s), !1) : d(u).focusable.value || d(u).changeHighlight(d(s), !1));
        })
      }), {
        default: B(() => [q(p.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "tabindex",
        "aria-selected",
        "as",
        "as-child",
        "disabled",
        "data-disabled",
        "data-highlighted",
        "data-state",
        "onKeydown"
      ]), h, 1)]),
      _: 3
    }, 8, ["value"]));
  }
}), Jc = Qc, Xc = /* @__PURE__ */ F({
  __name: "ListboxItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = e;
    pe();
    const n = Uc();
    return (o, r) => d(n).isSelected.value ? (x(), I(d(re), K({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: B(() => [q(o.$slots, "default")]),
      _: 3
    }, 16)) : ne("v-if", !0);
  }
}), Zc = Xc;
const [ct, ed] = ze("ComboboxRoot");
var td = /* @__PURE__ */ F({
  __name: "ComboboxRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    resetSearchTermOnBlur: {
      type: Boolean,
      required: !1,
      default: !0
    },
    resetSearchTermOnSelect: {
      type: Boolean,
      required: !1,
      default: !0
    },
    openOnFocus: {
      type: Boolean,
      required: !1,
      default: !1
    },
    openOnClick: {
      type: Boolean,
      required: !1,
      default: !1
    },
    ignoreFilter: {
      type: Boolean,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    highlightOnHover: {
      type: Boolean,
      required: !1
    },
    by: {
      type: [String, Function],
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "update:modelValue",
    "highlight",
    "update:open"
  ],
  setup(e, { expose: t, emit: n }) {
    const o = e, r = n, { primitiveElement: i, currentElement: a } = at(), { multiple: s, disabled: u, ignoreFilter: c, resetSearchTermOnSelect: l, openOnFocus: f, openOnClick: g, dir: m } = We(o), p = Eo(m), h = it(o, "modelValue", r, {
      defaultValue: o.defaultValue ?? (s.value ? [] : void 0),
      passive: o.modelValue === void 0,
      deep: !0
    }), v = it(o, "open", r, {
      defaultValue: o.defaultOpen,
      passive: o.open === void 0
    });
    async function w(k) {
      v.value = k, Z.value = "", k ? (await he(), i.value?.highlightSelected(), b.value = !0) : b.value = !1, A.value?.focus(), setTimeout(() => {
        !k && o.resetSearchTermOnBlur && S.trigger();
      }, 1);
    }
    const S = ln(), b = D(!1), C = D(!1), A = D(), $ = D(), T = y(() => i.value?.highlightedElement ?? void 0), E = D(/* @__PURE__ */ new Map()), j = D(/* @__PURE__ */ new Map()), { contains: H } = xi({ sensitivity: "base" }), Z = D(""), W = y((k) => {
      if (!Z.value || o.ignoreFilter || C.value) return {
        count: E.value.size,
        items: k?.items ?? /* @__PURE__ */ new Map(),
        groups: k?.groups ?? new Set(j.value.keys())
      };
      let O = 0;
      const M = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Set();
      for (const [_, P] of E.value) {
        const te = H(P, Z.value);
        M.set(_, te ? 1 : 0), te && O++;
      }
      for (const [_, P] of j.value) for (const te of P) if (M.get(te) > 0) {
        z.add(_);
        break;
      }
      return {
        count: O,
        items: M,
        groups: z
      };
    }), ee = Te();
    return Se(() => {
      ee?.exposed && (ee.exposed.highlightItem = i.value?.highlightItem, ee.exposed.highlightFirstItem = i.value?.highlightFirstItem, ee.exposed.highlightSelected = i.value?.highlightSelected);
    }), t({
      filtered: W,
      highlightedElement: T,
      highlightItem: i.value?.highlightItem,
      highlightFirstItem: i.value?.highlightFirstItem,
      highlightSelected: i.value?.highlightSelected
    }), ed({
      modelValue: h,
      multiple: s,
      disabled: u,
      open: v,
      onOpenChange: w,
      contentId: "",
      isUserInputted: b,
      isVirtual: C,
      inputElement: A,
      highlightedElement: T,
      onInputElementChange: (k) => A.value = k,
      triggerElement: $,
      onTriggerElementChange: (k) => $.value = k,
      parentElement: a,
      resetSearchTermOnSelect: l,
      onResetSearchTerm: S.on,
      allItems: E,
      allGroups: j,
      filterSearch: Z,
      filterState: W,
      ignoreFilter: c,
      openOnFocus: f,
      openOnClick: g
    }), (k, O) => (x(), I(d(mu), null, {
      default: B(() => [ie(d(Vc), K({
        ref_key: "primitiveElement",
        ref: i
      }, k.$attrs, {
        modelValue: d(h),
        "onUpdate:modelValue": O[0] || (O[0] = (M) => At(h) ? h.value = M : null),
        style: { pointerEvents: d(v) ? "auto" : void 0 },
        as: k.as,
        "as-child": k.asChild,
        dir: d(p),
        multiple: d(s),
        name: k.name,
        required: k.required,
        disabled: d(u),
        "highlight-on-hover": !0,
        by: o.by,
        onHighlight: O[1] || (O[1] = (M) => r("highlight", M))
      }), {
        default: B(() => [q(k.$slots, "default", {
          open: d(v),
          modelValue: d(h)
        })]),
        _: 3
      }, 16, [
        "modelValue",
        "style",
        "as",
        "as-child",
        "dir",
        "multiple",
        "name",
        "required",
        "disabled",
        "by"
      ])]),
      _: 3
    }));
  }
}), nd = td;
const [od, rd] = ze("ComboboxContent");
var id = /* @__PURE__ */ F({
  __name: "ComboboxContentImpl",
  props: {
    position: {
      type: String,
      required: !1,
      default: "inline"
    },
    bodyLock: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(e, { emit: t }) {
    const n = e, o = t, { position: r } = We(n), i = ct(), { forwardRef: a, currentElement: s } = pe();
    ol(n.bodyLock), cl(i.parentElement);
    const u = y(() => n.position === "popper" ? n : {}), c = yt(u.value), l = {
      boxSizing: "border-box",
      "--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
      "--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
      "--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
    };
    rd({ position: r });
    const f = D(!1);
    return Se(() => {
      i.inputElement.value && (f.value = s.value.contains(i.inputElement.value), f.value && i.inputElement.value.focus());
    }), vt(() => {
      f.value && i.triggerElement.value?.focus();
    }), (g, m) => (x(), I(d(Dc), { "as-child": "" }, {
      default: B(() => [ie(d(Ul), {
        "as-child": "",
        "disable-outside-pointer-events": g.disableOutsidePointerEvents,
        onDismiss: m[0] || (m[0] = (p) => d(i).onOpenChange(!1)),
        onFocusOutside: m[1] || (m[1] = (p) => {
          d(i).parentElement.value?.contains(p.target) && p.preventDefault(), o("focusOutside", p);
        }),
        onInteractOutside: m[2] || (m[2] = (p) => o("interactOutside", p)),
        onEscapeKeyDown: m[3] || (m[3] = (p) => o("escapeKeyDown", p)),
        onPointerDownOutside: m[4] || (m[4] = (p) => {
          d(i).parentElement.value?.contains(p.target) && p.preventDefault(), o("pointerDownOutside", p);
        })
      }, {
        default: B(() => [(x(), I(Nt(d(r) === "popper" ? d(Tc) : d(re)), K({
          ...g.$attrs,
          ...d(c)
        }, {
          id: d(i).contentId,
          ref: d(a),
          "data-state": d(i).open.value ? "open" : "closed",
          style: {
            display: "flex",
            flexDirection: "column",
            outline: "none",
            ...d(r) === "popper" ? l : {}
          }
        }), {
          default: B(() => [q(g.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "data-state",
          "style"
        ]))]),
        _: 3
      }, 8, ["disable-outside-pointer-events"])]),
      _: 3
    }));
  }
}), ad = id, sd = /* @__PURE__ */ F({
  __name: "ComboboxArrow",
  props: {
    width: {
      type: Number,
      required: !1,
      default: 10
    },
    height: {
      type: Number,
      required: !1,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "svg"
    }
  },
  setup(e) {
    const t = e, n = ct(), o = od();
    return pe(), (r, i) => d(n).open.value && d(o).position.value === "popper" ? (x(), I(d(Bc), qe(K({ key: 0 }, t)), {
      default: B(() => [q(r.$slots, "default")]),
      _: 3
    }, 16)) : ne("v-if", !0);
  }
}), ld = sd, ud = /* @__PURE__ */ F({
  __name: "ComboboxContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    position: {
      type: String,
      required: !1
    },
    bodyLock: {
      type: Boolean,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(e, { emit: t }) {
    const r = To(e, t), { forwardRef: i } = pe(), a = ct();
    return a.contentId ||= ut(void 0, "reka-combobox-content"), (s, u) => (x(), I(d(Si), { present: s.forceMount || d(a).open.value }, {
      default: B(() => [ie(ad, K({
        ...d(r),
        ...s.$attrs
      }, { ref: d(i) }), {
        default: B(() => [q(s.$slots, "default")]),
        _: 3
      }, 16)]),
      _: 3
    }, 8, ["present"]));
  }
}), cd = ud, dd = /* @__PURE__ */ F({
  __name: "ComboboxEmpty",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = ct(), o = y(() => n.ignoreFilter.value ? n.allItems.value.size === 0 : n.filterState.value.count === 0);
    return (r, i) => o.value ? (x(), I(d(re), qe(K({ key: 0 }, t)), {
      default: B(() => [q(r.$slots, "default", {}, () => [i[0] || (i[0] = Ce("No options"))])]),
      _: 3
    }, 16)) : ne("v-if", !0);
  }
}), fd = dd;
const [Ri, pd] = ze("ComboboxGroup");
var gd = /* @__PURE__ */ F({
  __name: "ComboboxGroup",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, n = ut(void 0, "reka-combobox-group"), o = ct(), r = y(() => o.ignoreFilter.value ? !0 : o.filterSearch.value ? o.filterState.value.groups.has(n) : !0), i = pd({
      id: n,
      labelId: ""
    });
    return Se(() => {
      o.allGroups.value.has(n) || o.allGroups.value.set(n, /* @__PURE__ */ new Set());
    }), vt(() => {
      o.allGroups.value.delete(n);
    }), (a, s) => (x(), I(d(Kc), K({
      id: d(n),
      "aria-labelledby": d(i).labelId
    }, t, { hidden: r.value ? void 0 : !0 }), {
      default: B(() => [q(a.$slots, "default")]),
      _: 3
    }, 16, [
      "id",
      "aria-labelledby",
      "hidden"
    ]));
  }
}), Tr = gd, md = /* @__PURE__ */ F({
  __name: "ComboboxInput",
  props: {
    displayValue: {
      type: Function,
      required: !1
    },
    modelValue: {
      type: String,
      required: !1
    },
    autoFocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "input"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = ct(), i = On(), { primitiveElement: a, currentElement: s } = at(), u = it(n, "modelValue", o, { passive: n.modelValue === void 0 });
    Se(() => {
      s.value && r.onInputElementChange(s.value);
    });
    function c(p) {
      r.open.value || r.onOpenChange(!0);
    }
    function l(p) {
      const h = p.target;
      r.open.value ? r.filterSearch.value = h.value : (r.onOpenChange(!0), he(() => {
        h.value && (r.filterSearch.value = h.value, i.highlightFirstItem());
      }));
    }
    function f() {
      r.openOnFocus.value && !r.open.value && r.onOpenChange(!0);
    }
    function g() {
      r.openOnClick.value && !r.open.value && r.onOpenChange(!0);
    }
    function m() {
      const p = r.modelValue.value;
      n.displayValue ? u.value = n.displayValue(p) : !r.multiple.value && p && !Array.isArray(p) && typeof p != "object" ? u.value = p.toString() : u.value = "", he(() => {
        u.value = u.value;
      });
    }
    return r.onResetSearchTerm(() => {
      m();
    }), fe(r.modelValue, async () => {
      !r.isUserInputted.value && r.resetSearchTermOnSelect.value && m();
    }, {
      immediate: !0,
      deep: !0
    }), fe(r.filterState, () => {
      r.isVirtual.value || i.highlightFirstItem();
    }), (p, h) => (x(), I(d(jc), {
      ref_key: "primitiveElement",
      ref: a,
      modelValue: d(u),
      "onUpdate:modelValue": h[0] || (h[0] = (v) => At(u) ? u.value = v : null),
      as: p.as,
      "as-child": p.asChild,
      "auto-focus": p.autoFocus,
      disabled: p.disabled,
      "aria-expanded": d(r).open.value,
      "aria-controls": d(r).contentId,
      "aria-autocomplete": "list",
      role: "combobox",
      autocomplete: "off",
      onClick: g,
      onInput: l,
      onKeydown: rt(gt(c, ["prevent"]), ["down", "up"]),
      onFocus: f
    }, {
      default: B(() => [q(p.$slots, "default")]),
      _: 3
    }, 8, [
      "modelValue",
      "as",
      "as-child",
      "auto-focus",
      "disabled",
      "aria-expanded",
      "aria-controls",
      "onKeydown"
    ]));
  }
}), vd = md, hd = /* @__PURE__ */ F({
  __name: "ComboboxItem",
  props: {
    textValue: {
      type: String,
      required: !1
    },
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = ut(void 0, "reka-combobox-item"), i = ct(), a = Ri(null), { primitiveElement: s, currentElement: u } = at();
    if (n.value === "") throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
    const c = y(() => {
      if (i.isVirtual.value || i.ignoreFilter.value || !i.filterSearch.value) return !0;
      {
        const l = i.filterState.value.items.get(r);
        return l === void 0 ? !0 : l > 0;
      }
    });
    return Se(() => {
      i.allItems.value.set(r, n.textValue || u.value.textContent || u.value.innerText);
      const l = a?.id;
      l && (i.allGroups.value.has(l) ? i.allGroups.value.get(l)?.add(r) : i.allGroups.value.set(l, /* @__PURE__ */ new Set([r])));
    }), vt(() => {
      i.allItems.value.delete(r);
    }), (l, f) => c.value ? (x(), I(d(Jc), K({ key: 0 }, n, {
      id: d(r),
      ref_key: "primitiveElement",
      ref: s,
      disabled: d(i).disabled.value || l.disabled,
      onSelect: f[0] || (f[0] = (g) => {
        o("select", g), !g.defaultPrevented && !d(i).multiple.value && !l.disabled && !d(i).disabled.value && (g.preventDefault(), d(i).onOpenChange(!1), d(i).modelValue.value = n.value);
      })
    }), {
      default: B(() => [q(l.$slots, "default", {}, () => [Ce(we(l.value), 1)])]),
      _: 3
    }, 16, ["id", "disabled"])) : ne("v-if", !0);
  }
}), zr = hd, bd = /* @__PURE__ */ F({
  __name: "ComboboxItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), I(d(Zc), qe(xn(t)), {
      default: B(() => [q(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), yd = bd, wd = /* @__PURE__ */ F({
  __name: "ComboboxLabel",
  props: {
    for: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "div"
    }
  },
  setup(e) {
    const t = e;
    pe();
    const n = Ri({
      id: "",
      labelId: ""
    });
    return n.labelId ||= ut(void 0, "reka-combobox-group-label"), (o, r) => (x(), I(d(re), K(t, { id: d(n).labelId }), {
      default: B(() => [q(o.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), xd = wd, kd = /* @__PURE__ */ F({
  __name: "ComboboxPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (x(), I(d(iu), qe(xn(t)), {
      default: B(() => [q(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Cd = kd, Sd = /* @__PURE__ */ F({
  __name: "ComboboxSeparator",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return pe(), (n, o) => (x(), I(d(re), K(t, { "aria-hidden": "true" }), {
      default: B(() => [q(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), _d = Sd, Ad = /* @__PURE__ */ F({
  __name: "ComboboxTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: o } = pe(), r = ct(), i = y(() => t.disabled || r.disabled.value || !1);
    return Se(() => {
      o.value && r.onTriggerElementChange(o.value);
    }), (a, s) => (x(), I(d(re), K(t, {
      ref: d(n),
      type: a.as === "button" ? "button" : void 0,
      tabindex: "-1",
      "aria-label": "Show popup",
      "aria-haspopup": "listbox",
      "aria-expanded": d(r).open.value,
      "aria-controls": d(r).contentId,
      "data-state": d(r).open.value ? "open" : "closed",
      disabled: i.value,
      "data-disabled": i.value ? "" : void 0,
      "aria-disabled": i.value ?? void 0,
      onClick: s[0] || (s[0] = (u) => d(r).onOpenChange(!d(r).open.value))
    }), {
      default: B(() => [q(a.$slots, "default")]),
      _: 3
    }, 16, [
      "type",
      "aria-expanded",
      "aria-controls",
      "data-state",
      "disabled",
      "data-disabled",
      "aria-disabled"
    ]));
  }
}), Id = Ad, Od = /* @__PURE__ */ F({
  __name: "Label",
  props: {
    for: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "label"
    }
  },
  setup(e) {
    const t = e;
    return pe(), (n, o) => (x(), I(d(re), K(t, { onMousedown: o[0] || (o[0] = (r) => {
      !r.defaultPrevented && r.detail > 1 && r.preventDefault();
    }) }), {
      default: B(() => [q(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Di = Od;
const [Ed, Td] = ze("SwitchRoot");
var zd = /* @__PURE__ */ F({
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: Boolean,
      required: !1
    },
    modelValue: {
      type: [Boolean, null],
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    id: {
      type: String,
      required: !1
    },
    value: {
      type: String,
      required: !1,
      default: "on"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, { disabled: r } = We(n), i = it(n, "modelValue", o, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    });
    function a() {
      r.value || (i.value = !i.value);
    }
    const { forwardRef: s, currentElement: u } = pe(), c = ki(u), l = y(() => n.id && u.value ? document.querySelector(`[for="${n.id}"]`)?.innerText : void 0);
    return Td({
      modelValue: i,
      toggleCheck: a,
      disabled: r
    }), (f, g) => (x(), I(d(re), K(f.$attrs, {
      id: f.id,
      ref: d(s),
      role: "switch",
      type: f.as === "button" ? "button" : void 0,
      value: f.value,
      "aria-label": f.$attrs["aria-label"] || l.value,
      "aria-checked": d(i),
      "aria-required": f.required,
      "data-state": d(i) ? "checked" : "unchecked",
      "data-disabled": d(r) ? "" : void 0,
      "as-child": f.asChild,
      as: f.as,
      disabled: d(r),
      onClick: a,
      onKeydown: rt(gt(a, ["prevent"]), ["enter"])
    }), {
      default: B(() => [q(f.$slots, "default", { modelValue: d(i) }), d(c) && f.name ? (x(), I(d(Oi), {
        key: 0,
        type: "checkbox",
        name: f.name,
        disabled: d(r),
        required: f.required,
        value: f.value,
        checked: !!d(i)
      }, null, 8, [
        "name",
        "disabled",
        "required",
        "value",
        "checked"
      ])) : ne("v-if", !0)]),
      _: 3
    }, 16, [
      "id",
      "type",
      "value",
      "aria-label",
      "aria-checked",
      "aria-required",
      "data-state",
      "data-disabled",
      "as-child",
      "as",
      "disabled",
      "onKeydown"
    ]));
  }
}), Pd = zd, Bd = /* @__PURE__ */ F({
  __name: "SwitchThumb",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const t = Ed();
    return pe(), (n, o) => (x(), I(d(re), {
      "data-state": d(t).modelValue?.value ? "checked" : "unchecked",
      "data-disabled": d(t).disabled.value ? "" : void 0,
      "as-child": n.asChild,
      as: n.as
    }, {
      default: B(() => [q(n.$slots, "default")]),
      _: 3
    }, 8, [
      "data-state",
      "data-disabled",
      "as-child",
      "as"
    ]));
  }
}), $d = Bd;
function Do(e) {
  const t = Ie(), n = y(() => le(e)), o = y(() => n.value.icon && n.value.leading || n.value.icon && !n.value.trailing || n.value.loading && !n.value.trailing || !!n.value.leadingIcon), r = y(() => n.value.icon && n.value.trailing || n.value.loading && n.value.trailing || !!n.value.trailingIcon), i = y(() => n.value.loading ? n.value.loadingIcon || t.ui.icons.loading : n.value.leadingIcon || n.value.icon), a = y(() => n.value.loading && !o.value ? n.value.loadingIcon || t.ui.icons.loading : n.value.trailingIcon || n.value.icon);
  return {
    isLeading: o,
    isTrailing: r,
    leadingIconName: i,
    trailingIconName: a
  };
}
const Ld = Symbol("nuxt-ui.field-group");
function No(e) {
  const t = xe(Ld, void 0);
  return {
    orientation: y(() => t?.value.orientation),
    size: y(() => e?.size ?? t?.value.size)
  };
}
const Md = Symbol("nuxt-ui.form-options"), qd = Symbol("nuxt-ui.form-events"), no = Symbol("nuxt-ui.form-field"), Ni = Symbol("nuxt-ui.input-id"), Fd = Symbol("nuxt-ui.form-inputs"), Vd = Symbol("nuxt-ui.form-loading"), Rd = Symbol("nuxt-ui.form-errors");
function jo(e, t) {
  const n = xe(Md, void 0), o = xe(qd, void 0), r = xe(no, void 0), i = xe(Fd, void 0), a = xe(Ni, void 0);
  pt(no, void 0), r && a && (t?.bind === !1 ? a.value = void 0 : e?.id && (a.value = e?.id), i && r.value.name && a.value && (i.value[r.value.name] = { id: a.value, pattern: r.value.errorPattern }));
  function s(g, m, p) {
    o && r && m && o.emit({ type: g, name: m, eager: p });
  }
  function u() {
    s("blur", r?.value.name);
  }
  function c() {
    s("focus", r?.value.name);
  }
  function l() {
    s("change", r?.value.name);
  }
  const f = /* @__PURE__ */ Ua(
    () => {
      s("input", r?.value.name, !t?.deferInputValidation || r?.value.eagerValidation);
    },
    r?.value.validateOnInputDelay ?? n?.value.validateOnInputDelay ?? 0
  );
  return {
    id: y(() => e?.id ?? a?.value),
    name: y(() => e?.name ?? r?.value.name),
    size: y(() => e?.size ?? r?.value.size),
    color: y(() => r?.value.error ? "error" : e?.color),
    highlight: y(() => r?.value.error ? !0 : e?.highlight),
    disabled: y(() => n?.value.disabled || e?.disabled),
    emitFormBlur: u,
    emitFormInput: f,
    emitFormChange: l,
    emitFormFocus: c,
    ariaAttrs: y(() => {
      if (!r?.value) return;
      const g = ["error", "hint", "description", "help"].filter((p) => r?.value?.[p]).map((p) => `${r?.value.ariaId}-${p}`) || [], m = {
        "aria-invalid": !!r?.value.error
      };
      return g.length > 0 && (m["aria-describedby"] = g.join(" ")), m;
    })
  };
}
var Dd = /\s+/g, oo = (e) => typeof e != "string" || !e ? e : e.replace(Dd, " ").trim(), hn = (...e) => {
  let t = [], n = (o) => {
    if (!o && o !== 0 && o !== 0n) return;
    if (Array.isArray(o)) {
      for (let i = 0, a = o.length; i < a; i++) n(o[i]);
      return;
    }
    let r = typeof o;
    if (r === "string" || r === "number" || r === "bigint") {
      if (r === "number" && o !== o) return;
      t.push(String(o));
    } else if (r === "object") {
      let i = Object.keys(o);
      for (let a = 0, s = i.length; a < s; a++) {
        let u = i[a];
        o[u] && t.push(u);
      }
    }
  };
  for (let o = 0, r = e.length; o < r; o++) {
    let i = e[o];
    i != null && n(i);
  }
  return t.length > 0 ? oo(t.join(" ")) : void 0;
}, Pr = (e) => e === !1 ? "false" : e === !0 ? "true" : e === 0 ? "0" : e, _e = (e) => {
  if (!e || typeof e != "object") return !0;
  for (let t in e) return !1;
  return !0;
}, Nd = (e, t) => {
  if (e === t) return !0;
  if (!e || !t) return !1;
  let n = Object.keys(e), o = Object.keys(t);
  if (n.length !== o.length) return !1;
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    if (!o.includes(i) || e[i] !== t[i]) return !1;
  }
  return !0;
}, Br = (e, t) => {
  for (let n in t) if (Object.prototype.hasOwnProperty.call(t, n)) {
    let o = t[n];
    n in e ? e[n] = hn(e[n], o) : e[n] = o;
  }
  return e;
}, ji = (e, t) => {
  for (let n = 0; n < e.length; n++) {
    let o = e[n];
    Array.isArray(o) ? ji(o, t) : o && t.push(o);
  }
}, Hi = (...e) => {
  let t = [];
  ji(e, t);
  let n = [];
  for (let o = 0; o < t.length; o++) t[o] && n.push(t[o]);
  return n;
}, ro = (e, t) => {
  let n = {};
  for (let o in e) {
    let r = e[o];
    if (o in t) {
      let i = t[o];
      Array.isArray(r) || Array.isArray(i) ? n[o] = Hi(i, r) : typeof r == "object" && typeof i == "object" && r && i ? n[o] = ro(r, i) : n[o] = i + " " + r;
    } else n[o] = r;
  }
  for (let o in t) o in e || (n[o] = t[o]);
  return n;
}, jd = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 };
function Hd() {
  let e = null, t = {}, n = !1;
  return { get cachedTwMerge() {
    return e;
  }, set cachedTwMerge(o) {
    e = o;
  }, get cachedTwMergeConfig() {
    return t;
  }, set cachedTwMergeConfig(o) {
    t = o;
  }, get didTwMergeConfigChange() {
    return n;
  }, set didTwMergeConfigChange(o) {
    n = o;
  }, reset() {
    e = null, t = {}, n = !1;
  } };
}
var Qe = Hd(), Wd = (e) => {
  let t = (n, o) => {
    let { extend: r = null, slots: i = {}, variants: a = {}, compoundVariants: s = [], compoundSlots: u = [], defaultVariants: c = {} } = n, l = { ...jd, ...o }, f = r?.base ? hn(r.base, n?.base) : n?.base, g = r?.variants && !_e(r.variants) ? ro(a, r.variants) : a, m = r?.defaultVariants && !_e(r.defaultVariants) ? { ...r.defaultVariants, ...c } : c;
    !_e(l.twMergeConfig) && !Nd(l.twMergeConfig, Qe.cachedTwMergeConfig) && (Qe.didTwMergeConfigChange = !0, Qe.cachedTwMergeConfig = l.twMergeConfig);
    let p = _e(r?.slots), h = _e(i) ? {} : { base: hn(n?.base, p && r?.base), ...i }, v = p ? h : Br({ ...r?.slots }, _e(h) ? { base: n?.base } : h), w = _e(r?.compoundVariants) ? s : Hi(r?.compoundVariants, s), S = (C) => {
      if (_e(g) && _e(i) && p) return e(f, C?.class, C?.className)(l);
      if (w && !Array.isArray(w)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof w}`);
      if (u && !Array.isArray(u)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof u}`);
      let A = (k, O, M = [], z) => {
        let _ = M;
        if (typeof O == "string") {
          let P = oo(O).split(" ");
          for (let te = 0; te < P.length; te++) _.push(`${k}:${P[te]}`);
        } else if (Array.isArray(O)) for (let P = 0; P < O.length; P++) _.push(`${k}:${O[P]}`);
        else if (typeof O == "object" && typeof z == "string" && z in O) {
          let P = O[z];
          if (P && typeof P == "string") {
            let te = oo(P).split(" "), ue = [];
            for (let ae = 0; ae < te.length; ae++) ue.push(`${k}:${te[ae]}`);
            _[z] = _[z] ? _[z].concat(ue) : ue;
          } else if (Array.isArray(P) && P.length > 0) {
            let te = [];
            for (let ue = 0; ue < P.length; ue++) te.push(`${k}:${P[ue]}`);
            _[z] = te;
          }
        }
        return _;
      }, $ = (k, O = g, M = null, z = null) => {
        let _ = O[k];
        if (!_ || _e(_)) return null;
        let P = z?.[k] ?? C?.[k];
        if (P === null) return null;
        let te = Pr(P), ue = Array.isArray(l.responsiveVariants) && l.responsiveVariants.length > 0 || l.responsiveVariants === !0, ae = m?.[k], J = [];
        if (typeof te == "object" && ue) for (let [ke, L] of Object.entries(te)) {
          let Y = _[L];
          if (ke === "initial") {
            ae = L;
            continue;
          }
          Array.isArray(l.responsiveVariants) && !l.responsiveVariants.includes(ke) || (J = A(ke, Y, J, M));
        }
        let se = te != null && typeof te != "object" ? te : Pr(ae), ge = _[se || "false"];
        return typeof J == "object" && typeof M == "string" && J[M] ? Br(J, ge) : J.length > 0 ? (J.push(ge), M === "base" ? J.join(" ") : J) : ge;
      }, T = () => {
        if (!g) return null;
        let k = Object.keys(g), O = [];
        for (let M = 0; M < k.length; M++) {
          let z = $(k[M], g);
          z && O.push(z);
        }
        return O;
      }, E = (k, O) => {
        if (!g || typeof g != "object") return null;
        let M = [];
        for (let z in g) {
          let _ = $(z, g, k, O), P = k === "base" && typeof _ == "string" ? _ : _ && _[k];
          P && M.push(P);
        }
        return M;
      }, j = {};
      for (let k in C) {
        let O = C[k];
        O !== void 0 && (j[k] = O);
      }
      let H = (k, O) => {
        let M = typeof C?.[k] == "object" ? { [k]: C[k]?.initial } : {};
        return { ...m, ...j, ...M, ...O };
      }, Z = (k = [], O) => {
        let M = [], z = k.length;
        for (let _ = 0; _ < z; _++) {
          let { class: P, className: te, ...ue } = k[_], ae = !0, J = H(null, O);
          for (let se in ue) {
            let ge = ue[se], ke = J[se];
            if (Array.isArray(ge)) {
              if (!ge.includes(ke)) {
                ae = !1;
                break;
              }
            } else {
              if ((ge == null || ge === !1) && (ke == null || ke === !1)) continue;
              if (ke !== ge) {
                ae = !1;
                break;
              }
            }
          }
          ae && (P && M.push(P), te && M.push(te));
        }
        return M;
      }, W = (k) => {
        let O = Z(w, k);
        if (!Array.isArray(O)) return O;
        let M = {}, z = e;
        for (let _ = 0; _ < O.length; _++) {
          let P = O[_];
          if (typeof P == "string") M.base = z(M.base, P)(l);
          else if (typeof P == "object") for (let te in P) M[te] = z(M[te], P[te])(l);
        }
        return M;
      }, ee = (k) => {
        if (u.length < 1) return null;
        let O = {}, M = H(null, k);
        for (let z = 0; z < u.length; z++) {
          let { slots: _ = [], class: P, className: te, ...ue } = u[z];
          if (!_e(ue)) {
            let ae = !0;
            for (let J in ue) {
              let se = M[J], ge = ue[J];
              if (se === void 0 || (Array.isArray(ge) ? !ge.includes(se) : ge !== se)) {
                ae = !1;
                break;
              }
            }
            if (!ae) continue;
          }
          for (let ae = 0; ae < _.length; ae++) {
            let J = _[ae];
            O[J] || (O[J] = []), O[J].push([P, te]);
          }
        }
        return O;
      };
      if (!_e(i) || !p) {
        let k = {};
        if (typeof v == "object" && !_e(v)) {
          let O = e;
          for (let M in v) k[M] = (z) => {
            let _ = W(z), P = ee(z);
            return O(v[M], E(M, z), _ ? _[M] : void 0, P ? P[M] : void 0, z?.class, z?.className)(l);
          };
        }
        return k;
      }
      return e(f, T(), Z(w), C?.class, C?.className)(l);
    }, b = () => {
      if (!(!g || typeof g != "object")) return Object.keys(g);
    };
    return S.variantKeys = b(), S.extend = r, S.base = f, S.slots = v, S.variants = g, S.defaultVariants = m, S.compoundSlots = u, S.compoundVariants = w, S;
  };
  return { tv: t, createTV: (n) => (o, r) => t(o, r ? ro(n, r) : n) };
};
const Ho = "-", Kd = (e) => {
  const t = Ud(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const s = a.split(Ho);
      return s[0] === "" && s.length !== 1 && s.shift(), Wi(s, t) || Gd(a);
    },
    getConflictingClassGroupIds: (a, s) => {
      const u = n[a] || [];
      return s && o[a] ? [...u, ...o[a]] : u;
    }
  };
}, Wi = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? Wi(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const i = e.join(Ho);
  return t.validators.find(({
    validator: a
  }) => a(i))?.classGroupId;
}, $r = /^\[(.+)\]$/, Gd = (e) => {
  if ($r.test(e)) {
    const t = $r.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ud = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    io(n[r], o, r, t);
  return o;
}, io = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const i = r === "" ? t : Lr(t, r);
      i.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (Yd(r)) {
        io(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([i, a]) => {
      io(a, Lr(t, i), n, o);
    });
  });
}, Lr = (e, t) => {
  let n = e;
  return t.split(Ho).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, Yd = (e) => e.isThemeGetter, Qd = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (i, a) => {
    n.set(i, a), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let a = n.get(i);
      if (a !== void 0)
        return a;
      if ((a = o.get(i)) !== void 0)
        return r(i, a), a;
    },
    set(i, a) {
      n.has(i) ? n.set(i, a) : r(i, a);
    }
  };
}, ao = "!", so = ":", Jd = so.length, Xd = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const i = [];
    let a = 0, s = 0, u = 0, c;
    for (let p = 0; p < r.length; p++) {
      let h = r[p];
      if (a === 0 && s === 0) {
        if (h === so) {
          i.push(r.slice(u, p)), u = p + Jd;
          continue;
        }
        if (h === "/") {
          c = p;
          continue;
        }
      }
      h === "[" ? a++ : h === "]" ? a-- : h === "(" ? s++ : h === ")" && s--;
    }
    const l = i.length === 0 ? r : r.substring(u), f = Zd(l), g = f !== l, m = c && c > u ? c - u : void 0;
    return {
      modifiers: i,
      hasImportantModifier: g,
      baseClassName: f,
      maybePostfixModifierPosition: m
    };
  };
  if (t) {
    const r = t + so, i = o;
    o = (a) => a.startsWith(r) ? i(a.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const r = o;
    o = (i) => n({
      className: i,
      parseClassName: r
    });
  }
  return o;
}, Zd = (e) => e.endsWith(ao) ? e.substring(0, e.length - 1) : e.startsWith(ao) ? e.substring(1) : e, ef = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const r = [];
    let i = [];
    return o.forEach((a) => {
      a[0] === "[" || t[a] ? (r.push(...i.sort(), a), i = []) : i.push(a);
    }), r.push(...i.sort()), r;
  };
}, tf = (e) => ({
  cache: Qd(e.cacheSize),
  parseClassName: Xd(e),
  sortModifiers: ef(e),
  ...Kd(e)
}), nf = /\s+/, of = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: i
  } = t, a = [], s = e.trim().split(nf);
  let u = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const l = s[c], {
      isExternal: f,
      modifiers: g,
      hasImportantModifier: m,
      baseClassName: p,
      maybePostfixModifierPosition: h
    } = n(l);
    if (f) {
      u = l + (u.length > 0 ? " " + u : u);
      continue;
    }
    let v = !!h, w = o(v ? p.substring(0, h) : p);
    if (!w) {
      if (!v) {
        u = l + (u.length > 0 ? " " + u : u);
        continue;
      }
      if (w = o(p), !w) {
        u = l + (u.length > 0 ? " " + u : u);
        continue;
      }
      v = !1;
    }
    const S = i(g).join(":"), b = m ? S + ao : S, C = b + w;
    if (a.includes(C))
      continue;
    a.push(C);
    const A = r(w, v);
    for (let $ = 0; $ < A.length; ++$) {
      const T = A[$];
      a.push(b + T);
    }
    u = l + (u.length > 0 ? " " + u : u);
  }
  return u;
};
function rf() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Ki(t)) && (o && (o += " "), o += n);
  return o;
}
const Ki = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Ki(e[o])) && (n && (n += " "), n += t);
  return n;
};
function lo(e, ...t) {
  let n, o, r, i = a;
  function a(u) {
    const c = t.reduce((l, f) => f(l), e());
    return n = tf(c), o = n.cache.get, r = n.cache.set, i = s, s(u);
  }
  function s(u) {
    const c = o(u);
    if (c)
      return c;
    const l = of(u, n);
    return r(u, l), l;
  }
  return function() {
    return i(rf.apply(null, arguments));
  };
}
const ye = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Gi = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ui = /^\((?:(\w[\w-]*):)?(.+)\)$/i, af = /^\d+\/\d+$/, sf = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, lf = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, uf = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, cf = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, df = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, St = (e) => af.test(e), X = (e) => !!e && !Number.isNaN(Number(e)), et = (e) => !!e && Number.isInteger(Number(e)), Rn = (e) => e.endsWith("%") && X(e.slice(0, -1)), Ye = (e) => sf.test(e), ff = () => !0, pf = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lf.test(e) && !uf.test(e)
), Yi = () => !1, gf = (e) => cf.test(e), mf = (e) => df.test(e), vf = (e) => !V(e) && !R(e), hf = (e) => Bt(e, Xi, Yi), V = (e) => Gi.test(e), dt = (e) => Bt(e, Zi, pf), Dn = (e) => Bt(e, kf, X), Mr = (e) => Bt(e, Qi, Yi), bf = (e) => Bt(e, Ji, mf), on = (e) => Bt(e, ea, gf), R = (e) => Ui.test(e), Mt = (e) => $t(e, Zi), yf = (e) => $t(e, Cf), qr = (e) => $t(e, Qi), wf = (e) => $t(e, Xi), xf = (e) => $t(e, Ji), rn = (e) => $t(e, ea, !0), Bt = (e, t, n) => {
  const o = Gi.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, $t = (e, t, n = !1) => {
  const o = Ui.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, Qi = (e) => e === "position" || e === "percentage", Ji = (e) => e === "image" || e === "url", Xi = (e) => e === "length" || e === "size" || e === "bg-size", Zi = (e) => e === "length", kf = (e) => e === "number", Cf = (e) => e === "family-name", ea = (e) => e === "shadow", uo = () => {
  const e = ye("color"), t = ye("font"), n = ye("text"), o = ye("font-weight"), r = ye("tracking"), i = ye("leading"), a = ye("breakpoint"), s = ye("container"), u = ye("spacing"), c = ye("radius"), l = ye("shadow"), f = ye("inset-shadow"), g = ye("text-shadow"), m = ye("drop-shadow"), p = ye("blur"), h = ye("perspective"), v = ye("aspect"), w = ye("ease"), S = ye("animate"), b = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], A = () => [...C(), R, V], $ = () => ["auto", "hidden", "clip", "visible", "scroll"], T = () => ["auto", "contain", "none"], E = () => [R, V, u], j = () => [St, "full", "auto", ...E()], H = () => [et, "none", "subgrid", R, V], Z = () => ["auto", {
    span: ["full", et, R, V]
  }, et, R, V], W = () => [et, "auto", R, V], ee = () => ["auto", "min", "max", "fr", R, V], k = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], O = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], M = () => ["auto", ...E()], z = () => [St, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], _ = () => [e, R, V], P = () => [...C(), qr, Mr, {
    position: [R, V]
  }], te = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ue = () => ["auto", "cover", "contain", wf, hf, {
    size: [R, V]
  }], ae = () => [Rn, Mt, dt], J = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    R,
    V
  ], se = () => ["", X, Mt, dt], ge = () => ["solid", "dashed", "dotted", "double"], ke = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], L = () => [X, Rn, qr, Mr], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    R,
    V
  ], Q = () => ["none", X, R, V], ce = () => ["none", X, R, V], Pe = () => [X, R, V], me = () => [St, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ye],
      breakpoint: [Ye],
      color: [ff],
      container: [Ye],
      "drop-shadow": [Ye],
      ease: ["in", "out", "in-out"],
      font: [vf],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ye],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ye],
      shadow: [Ye],
      spacing: ["px", X],
      text: [Ye],
      "text-shadow": [Ye],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", St, V, R, v]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [X, V, R, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": b()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": b()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: A()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: $()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": $()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": $()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: T()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": T()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": T()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: j()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": j()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": j()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: j()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: j()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: j()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: j()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: j()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: j()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [et, "auto", R, V]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [St, "full", "auto", s, ...E()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [X, St, "auto", "initial", "none", V]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", X, R, V]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", X, R, V]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [et, "first", "last", "none", R, V]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": H()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: Z()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": W()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": W()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": H()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: Z()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": W()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": W()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ee()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ee()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: E()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": E()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": E()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...k(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...O(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...O()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...k()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...O(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...O(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": k()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...O(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...O()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: E()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: E()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: E()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: E()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: E()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: E()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: E()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: E()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: E()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: M()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: M()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: M()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: M()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: M()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: M()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: M()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: M()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: M()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": E()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": E()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: z()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...z()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...z()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          s,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
          },
          ...z()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...z()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...z()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...z()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Mt, dt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [o, R, Dn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Rn, V]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [yf, V, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [r, R, V]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [X, "none", R, Dn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...E()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", R, V]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", R, V]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: _()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: _()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ge(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [X, "from-font", "auto", R, dt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: _()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [X, "auto", R, V]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: E()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", R, V]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", R, V]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: P()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: te()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ue()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, et, R, V],
          radial: ["", R, V],
          conic: [et, R, V]
        }, xf, bf]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: _()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ae()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ae()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ae()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: _()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: _()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: _()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: J()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": J()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": J()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": J()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": J()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": J()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": J()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": J()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": J()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": J()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": J()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": J()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": J()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": J()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": J()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: se()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": se()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": se()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": se()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": se()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": se()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": se()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": se()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": se()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": se()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": se()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ge(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ge(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: _()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": _()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": _()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": _()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": _()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": _()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": _()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": _()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": _()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: _()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ge(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [X, R, V]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", X, Mt, dt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: _()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          l,
          rn,
          on
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: _()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, rn, on]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": _()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: se()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: _()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [X, dt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": _()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": se()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": _()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", g, rn, on]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": _()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [X, R, V]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ke(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ke()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [X]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": L()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": L()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": _()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": _()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": L()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": L()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": _()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": _()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": L()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": L()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": _()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": _()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": L()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": L()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": _()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": _()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": L()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": L()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": _()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": _()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": L()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": L()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": _()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": _()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": L()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": L()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": _()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": _()
      }],
      "mask-image-radial": [{
        "mask-radial": [R, V]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": L()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": L()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": _()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": _()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [X]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": L()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": L()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": _()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": _()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: P()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: te()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ue()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", R, V]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          R,
          V
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Y()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [X, R, V]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [X, R, V]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          m,
          rn,
          on
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": _()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", X, R, V]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [X, R, V]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", X, R, V]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [X, R, V]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", X, R, V]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          R,
          V
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Y()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [X, R, V]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [X, R, V]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", X, R, V]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [X, R, V]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", X, R, V]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [X, R, V]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [X, R, V]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", X, R, V]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": E()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": E()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": E()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", R, V]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [X, "initial", R, V]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, R, V]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [X, R, V]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", S, R, V]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [h, R, V]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": A()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Q()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Q()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Q()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Q()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ce()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ce()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ce()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ce()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Pe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Pe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Pe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [R, V, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: A()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: me()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": me()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": me()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": me()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: _()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: _()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", R, V]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": E()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", R, V]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ..._()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [X, Mt, dt, Dn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ..._()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Sf = (e, {
  cacheSize: t,
  prefix: n,
  experimentalParseClassName: o,
  extend: r = {},
  override: i = {}
}) => (Vt(e, "cacheSize", t), Vt(e, "prefix", n), Vt(e, "experimentalParseClassName", o), an(e.theme, i.theme), an(e.classGroups, i.classGroups), an(e.conflictingClassGroups, i.conflictingClassGroups), an(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), Vt(e, "orderSensitiveModifiers", i.orderSensitiveModifiers), sn(e.theme, r.theme), sn(e.classGroups, r.classGroups), sn(e.conflictingClassGroups, r.conflictingClassGroups), sn(e.conflictingClassGroupModifiers, r.conflictingClassGroupModifiers), ta(e, r, "orderSensitiveModifiers"), e), Vt = (e, t, n) => {
  n !== void 0 && (e[t] = n);
}, an = (e, t) => {
  if (t)
    for (const n in t)
      Vt(e, n, t[n]);
}, sn = (e, t) => {
  if (t)
    for (const n in t)
      ta(e, t, n);
}, ta = (e, t, n) => {
  const o = t[n];
  o !== void 0 && (e[n] = e[n] ? e[n].concat(o) : o);
}, _f = (e, ...t) => typeof e == "function" ? lo(uo, e, ...t) : lo(() => Sf(uo(), e), ...t), Af = /* @__PURE__ */ lo(uo);
var If = (e) => _e(e) ? Af : _f({ ...e, extend: { theme: e.theme, classGroups: e.classGroups, conflictingClassGroupModifiers: e.conflictingClassGroupModifiers, conflictingClassGroups: e.conflictingClassGroups, ...e.extend } }), Of = (...e) => (t) => {
  let n = hn(e);
  return !n || !t.twMerge ? n : ((!Qe.cachedTwMerge || Qe.didTwMergeConfigChange) && (Qe.didTwMergeConfigChange = !1, Qe.cachedTwMerge = If(Qe.cachedTwMergeConfig)), Qe.cachedTwMerge(n) || void 0);
}, { createTV: Ef } = Wd(Of);
const Tf = ko, be = /* @__PURE__ */ Ef(Tf.ui?.tv);
function zf(e) {
  const t = Object.keys(e), n = t.filter((i) => i.startsWith("aria-")), o = t.filter((i) => i.startsWith("data-")), r = [
    "active",
    "activeClass",
    "ariaCurrentValue",
    "as",
    "disabled",
    "exact",
    "exactActiveClass",
    "exactHash",
    "exactQuery",
    "external",
    "href",
    "download",
    "inactiveClass",
    "noPrefetch",
    "noRel",
    "prefetch",
    "prefetchedClass",
    "rel",
    "replace",
    "target",
    "to",
    "type",
    "title",
    "onClick",
    ...n,
    ...o
  ];
  return Yt(e, ...r);
}
function na(e, t) {
  const n = Os(e, t).reduce((i, a) => (a.type === "added" && i.add(a.key), i), /* @__PURE__ */ new Set()), o = Object.fromEntries(Object.entries(e).filter(([i]) => !n.has(i))), r = Object.fromEntries(Object.entries(t).filter(([i]) => !n.has(i)));
  return Fe(o, r);
}
const Ae = /* @__PURE__ */ F({
  __name: "Icon",
  props: {
    name: {},
    mode: {},
    size: {},
    customize: { type: Function }
  },
  setup(e) {
    const n = yt(Yt(e, "name", "mode", "size", "customize"));
    return (o, r) => {
      const i = ni("Icon", !0);
      return typeof o.name == "string" ? (x(), I(i, qe(K({ key: 0 }, d(n))), null, 16)) : (x(), I(Nt(o.name), { key: 1 }));
    };
  }
}), Pf = F({
  name: "UiImageStub",
  props: {
    src: { type: String, default: "" },
    alt: { type: String, default: "" }
  },
  setup(e, { attrs: t }) {
    return () => je("img", { ...t, src: e.src, alt: e.alt });
  }
}), Fr = Symbol("nuxt-ui.avatar-group");
function oa(e) {
  const t = xe(Fr, void 0), n = y(() => e.size ?? t?.value.size);
  return pt(Fr, y(() => ({ size: n.value }))), {
    size: n
  };
}
const Bf = {
  slots: {
    root: "relative inline-flex items-center justify-center shrink-0",
    base: "rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap"
  },
  variants: {
    color: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      success: "bg-success",
      info: "bg-info",
      warning: "bg-warning",
      error: "bg-error",
      neutral: "bg-inverted"
    },
    size: {
      "3xs": "h-[4px] min-w-[4px] text-[4px]",
      "2xs": "h-[5px] min-w-[5px] text-[5px]",
      xs: "h-[6px] min-w-[6px] text-[6px]",
      sm: "h-[7px] min-w-[7px] text-[7px]",
      md: "h-[8px] min-w-[8px] text-[8px]",
      lg: "h-[9px] min-w-[9px] text-[9px]",
      xl: "h-[10px] min-w-[10px] text-[10px]",
      "2xl": "h-[11px] min-w-[11px] text-[11px]",
      "3xl": "h-[12px] min-w-[12px] text-[12px]"
    },
    position: {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    inset: {
      false: ""
    },
    standalone: {
      false: "absolute"
    }
  },
  compoundVariants: [
    {
      position: "top-right",
      inset: !1,
      class: "-translate-y-1/2 translate-x-1/2 transform"
    },
    {
      position: "bottom-right",
      inset: !1,
      class: "translate-y-1/2 translate-x-1/2 transform"
    },
    {
      position: "top-left",
      inset: !1,
      class: "-translate-y-1/2 -translate-x-1/2 transform"
    },
    {
      position: "bottom-left",
      inset: !1,
      class: "translate-y-1/2 -translate-x-1/2 transform"
    }
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    position: "top-right"
  }
}, ra = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "Chip",
  props: /* @__PURE__ */ jt({
    as: {},
    text: {},
    color: {},
    size: {},
    position: {},
    inset: { type: Boolean, default: !1 },
    standalone: { type: Boolean, default: !1 },
    class: {},
    ui: {}
  }, {
    show: { type: Boolean, default: !0 },
    showModifiers: {}
  }),
  emits: ["update:show"],
  setup(e) {
    const t = e, n = wo(e, "show"), { size: o } = oa(t), r = Ie(), i = y(() => be({ extend: be(Bf), ...r.ui?.chip || {} })({
      color: t.color,
      size: o.value,
      position: t.position,
      inset: t.inset,
      standalone: t.standalone
    }));
    return (a, s) => (x(), I(d(re), {
      as: a.as,
      class: N(i.value.root({ class: [t.ui?.root, t.class] }))
    }, {
      default: B(() => [
        ie(d(Wt), qe(xn(a.$attrs)), {
          default: B(() => [
            q(a.$slots, "default")
          ]),
          _: 3
        }, 16),
        n.value ? (x(), oe("span", {
          key: 0,
          class: N(i.value.base({ class: t.ui?.base }))
        }, [
          q(a.$slots, "content", {}, () => [
            Ce(we(a.text), 1)
          ])
        ], 2)) : ne("", !0)
      ]),
      _: 3
    }, 8, ["as", "class"]));
  }
}), $f = {
  slots: {
    root: "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated",
    image: "h-full w-full rounded-[inherit] object-cover",
    fallback: "font-medium leading-none text-muted truncate",
    icon: "text-muted shrink-0"
  },
  variants: {
    size: {
      "3xs": {
        root: "size-4 text-[8px]"
      },
      "2xs": {
        root: "size-5 text-[10px]"
      },
      xs: {
        root: "size-6 text-xs"
      },
      sm: {
        root: "size-7 text-sm"
      },
      md: {
        root: "size-8 text-base"
      },
      lg: {
        root: "size-9 text-lg"
      },
      xl: {
        root: "size-10 text-xl"
      },
      "2xl": {
        root: "size-11 text-[22px]"
      },
      "3xl": {
        root: "size-12 text-2xl"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
}, bn = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "Avatar",
  props: {
    as: { default: "span" },
    src: {},
    alt: {},
    icon: {},
    text: {},
    size: {},
    chip: { type: [Boolean, Object] },
    class: {},
    style: {},
    ui: {}
  },
  setup(e) {
    const t = e, n = y(() => t.text || (t.alt || "").split(" ").map((c) => c.charAt(0)).join("").substring(0, 2)), o = Ie(), { size: r } = oa(t), i = y(() => be({ extend: be($f), ...o.ui?.avatar || {} })({
      size: r.value
    })), a = y(() => ({
      "3xs": 16,
      "2xs": 20,
      xs: 24,
      sm: 28,
      md: 32,
      lg: 36,
      xl: 40,
      "2xl": 44,
      "3xl": 48
    })[t.size || "md"]), s = D(!1);
    fe(() => t.src, () => {
      s.value && (s.value = !1);
    });
    function u() {
      s.value = !0;
    }
    return (c, l) => (x(), I(Nt(t.chip ? ra : d(re)), K({ as: c.as }, t.chip ? typeof t.chip == "object" ? { inset: !0, ...t.chip } : { inset: !0 } : {}, {
      class: i.value.root({ class: [t.ui?.root, t.class] }),
      style: t.style
    }), {
      default: B(() => [
        c.src && !s.value ? (x(), I(Nt(d(Pf)), K({
          key: 0,
          role: "img",
          src: c.src,
          alt: c.alt,
          width: a.value,
          height: a.value
        }, c.$attrs, {
          class: i.value.image({ class: t.ui?.image }),
          onError: u
        }), null, 16, ["src", "alt", "width", "height", "class"])) : (x(), I(d(Wt), qe(K({ key: 1 }, c.$attrs)), {
          default: B(() => [
            q(c.$slots, "default", {}, () => [
              c.icon ? (x(), I(Ae, {
                key: 0,
                name: c.icon,
                class: N(i.value.icon({ class: t.ui?.icon }))
              }, null, 8, ["name", "class"])) : (x(), oe("span", {
                key: 1,
                class: N(i.value.fallback({ class: t.ui?.fallback }))
              }, we(n.value || " "), 3))
            ])
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 16, ["as", "class", "style"]));
  }
}), yn = /* @__PURE__ */ F({
  __name: "LinkBase",
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    onClick: {},
    href: {},
    navigate: {},
    target: {},
    rel: {},
    active: { type: Boolean },
    isExternal: { type: Boolean }
  },
  setup(e) {
    const t = e;
    function n(o) {
      if (t.disabled) {
        o.stopPropagation(), o.preventDefault();
        return;
      }
      if (t.onClick)
        for (const r of Array.isArray(t.onClick) ? t.onClick : [t.onClick])
          r(o);
      t.href && t.navigate && !t.isExternal && t.navigate(o);
    }
    return (o, r) => (x(), I(d(re), K(o.href ? {
      as: "a",
      href: o.disabled ? void 0 : o.href,
      "aria-disabled": o.disabled ? "true" : void 0,
      role: o.disabled ? "link" : void 0,
      tabindex: o.disabled ? -1 : void 0
    } : o.as === "button" ? {
      as: o.as,
      type: o.type,
      disabled: o.disabled
    } : {
      as: o.as
    }, {
      rel: o.rel,
      target: o.target,
      onClick: n
    }), {
      default: B(() => [
        q(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["rel", "target"]));
  }
}), ia = {
  base: "focus-visible:outline-primary",
  variants: {
    active: {
      true: "text-primary",
      false: "text-muted"
    },
    disabled: {
      true: "cursor-not-allowed opacity-75"
    }
  },
  compoundVariants: [
    {
      active: !1,
      disabled: !1,
      class: [
        "hover:text-default",
        "transition-colors"
      ]
    }
  ]
}, Lf = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "Link",
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    active: { type: Boolean, default: void 0 },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: {},
    custom: { type: Boolean },
    raw: { type: Boolean },
    class: {},
    to: {},
    href: {},
    external: { type: Boolean },
    target: {},
    rel: {},
    noRel: { type: Boolean },
    prefetchedClass: {},
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    activeClass: {},
    exactActiveClass: {},
    ariaCurrentValue: { default: "page" },
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(e) {
    const t = e, n = mi(), o = Ie(), r = yt(si(t, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "class")), i = y(() => be({
      extend: be(ia),
      ...ot({
        variants: {
          active: {
            true: pn(o.ui?.link?.variants?.active?.true, t.activeClass),
            false: pn(o.ui?.link?.variants?.active?.false, t.inactiveClass)
          }
        }
      }, o.ui?.link || {})
    })), a = y(() => t.to ?? t.href);
    function s({ route: c, isActive: l, isExactActive: f }) {
      if (t.active !== void 0)
        return t.active;
      if (t.exactQuery === "partial") {
        if (!na(c.query, n.query)) return !1;
      } else if (t.exactQuery === !0 && !Fe(c.query, n.query))
        return !1;
      return t.exactHash && c.hash !== n.hash ? !1 : !!(t.exact && f || !t.exact && l);
    }
    function u({ route: c, isActive: l, isExactActive: f }) {
      const g = s({ route: c, isActive: l, isExactActive: f });
      return t.raw ? [t.class, g ? t.activeClass : t.inactiveClass] : i.value({ class: t.class, active: g, disabled: t.disabled });
    }
    return (c, l) => {
      const f = ni("NuxtLink");
      return x(), I(f, K(d(r), {
        to: a.value,
        custom: ""
      }), {
        default: B(({ href: g, navigate: m, route: p, rel: h, target: v, isExternal: w, isActive: S, isExactActive: b }) => [
          c.custom ? q(c.$slots, "default", qe(K({ key: 0 }, {
            ...c.$attrs,
            ...c.exact && b ? { "aria-current": t.ariaCurrentValue } : {},
            as: c.as,
            type: c.type,
            disabled: c.disabled,
            href: g,
            navigate: m,
            rel: h,
            target: v,
            isExternal: w,
            active: s({ route: p, isActive: S, isExactActive: b })
          }))) : (x(), I(yn, K({ key: 1 }, {
            ...c.$attrs,
            ...c.exact && b ? { "aria-current": t.ariaCurrentValue } : {},
            as: c.as,
            type: c.type,
            disabled: c.disabled,
            href: g,
            navigate: m,
            rel: h,
            target: v,
            isExternal: w
          }, {
            class: u({ route: p, isActive: S, isExactActive: b })
          }), {
            default: B(() => [
              q(c.$slots, "default", {
                active: s({ route: p, isActive: S, isExactActive: b })
              })
            ]),
            _: 2
          }, 1040, ["class"]))
        ]),
        _: 3
      }, 16, ["to"]);
    };
  }
}), Mf = {
  slots: {
    base: [
      "rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    label: "truncate",
    leadingIcon: "shrink-0",
    leadingAvatar: "shrink-0",
    leadingAvatarSize: "",
    trailingIcon: "shrink-0"
  },
  variants: {
    fieldGroup: {
      horizontal: "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      vertical: "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: ""
    },
    variant: {
      solid: "",
      outline: "",
      soft: "",
      subtle: "",
      ghost: "",
      link: ""
    },
    size: {
      xs: {
        base: "px-2 py-1 text-xs gap-1",
        leadingIcon: "size-4",
        leadingAvatarSize: "3xs",
        trailingIcon: "size-4"
      },
      sm: {
        base: "px-2.5 py-1.5 text-xs gap-1.5",
        leadingIcon: "size-4",
        leadingAvatarSize: "3xs",
        trailingIcon: "size-4"
      },
      md: {
        base: "px-2.5 py-1.5 text-sm gap-1.5",
        leadingIcon: "size-5",
        leadingAvatarSize: "2xs",
        trailingIcon: "size-5"
      },
      lg: {
        base: "px-3 py-2 text-sm gap-2",
        leadingIcon: "size-5",
        leadingAvatarSize: "2xs",
        trailingIcon: "size-5"
      },
      xl: {
        base: "px-3 py-2 text-base gap-2",
        leadingIcon: "size-6",
        leadingAvatarSize: "xs",
        trailingIcon: "size-6"
      }
    },
    block: {
      true: {
        base: "w-full justify-center",
        trailingIcon: "ms-auto"
      }
    },
    square: {
      true: ""
    },
    leading: {
      true: ""
    },
    trailing: {
      true: ""
    },
    loading: {
      true: ""
    },
    active: {
      true: {
        base: ""
      },
      false: {
        base: ""
      }
    }
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "solid",
      class: "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    },
    {
      color: "secondary",
      variant: "solid",
      class: "text-inverted bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    },
    {
      color: "success",
      variant: "solid",
      class: "text-inverted bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
    },
    {
      color: "info",
      variant: "solid",
      class: "text-inverted bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
    },
    {
      color: "warning",
      variant: "solid",
      class: "text-inverted bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
    },
    {
      color: "error",
      variant: "solid",
      class: "text-inverted bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
    },
    {
      color: "primary",
      variant: "outline",
      class: "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      color: "secondary",
      variant: "outline",
      class: "ring ring-inset ring-secondary/50 text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      color: "success",
      variant: "outline",
      class: "ring ring-inset ring-success/50 text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      color: "info",
      variant: "outline",
      class: "ring ring-inset ring-info/50 text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      color: "warning",
      variant: "outline",
      class: "ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      color: "error",
      variant: "outline",
      class: "ring ring-inset ring-error/50 text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      color: "primary",
      variant: "soft",
      class: "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10"
    },
    {
      color: "secondary",
      variant: "soft",
      class: "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 focus:outline-none focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10"
    },
    {
      color: "success",
      variant: "soft",
      class: "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 focus:outline-none focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10"
    },
    {
      color: "info",
      variant: "soft",
      class: "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 focus:outline-none focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10"
    },
    {
      color: "warning",
      variant: "soft",
      class: "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 focus:outline-none focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10"
    },
    {
      color: "error",
      variant: "soft",
      class: "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 focus:outline-none focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10"
    },
    {
      color: "primary",
      variant: "subtle",
      class: "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      color: "secondary",
      variant: "subtle",
      class: "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      color: "success",
      variant: "subtle",
      class: "text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      color: "info",
      variant: "subtle",
      class: "text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      color: "warning",
      variant: "subtle",
      class: "text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      color: "error",
      variant: "subtle",
      class: "text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      color: "primary",
      variant: "ghost",
      class: "text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      color: "secondary",
      variant: "ghost",
      class: "text-secondary hover:bg-secondary/10 active:bg-secondary/10 focus:outline-none focus-visible:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      color: "success",
      variant: "ghost",
      class: "text-success hover:bg-success/10 active:bg-success/10 focus:outline-none focus-visible:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      color: "info",
      variant: "ghost",
      class: "text-info hover:bg-info/10 active:bg-info/10 focus:outline-none focus-visible:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      color: "warning",
      variant: "ghost",
      class: "text-warning hover:bg-warning/10 active:bg-warning/10 focus:outline-none focus-visible:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      color: "error",
      variant: "ghost",
      class: "text-error hover:bg-error/10 active:bg-error/10 focus:outline-none focus-visible:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      color: "primary",
      variant: "link",
      class: "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      color: "secondary",
      variant: "link",
      class: "text-secondary hover:text-secondary/75 active:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      color: "success",
      variant: "link",
      class: "text-success hover:text-success/75 active:text-success/75 disabled:text-success aria-disabled:text-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      color: "info",
      variant: "link",
      class: "text-info hover:text-info/75 active:text-info/75 disabled:text-info aria-disabled:text-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      color: "warning",
      variant: "link",
      class: "text-warning hover:text-warning/75 active:text-warning/75 disabled:text-warning aria-disabled:text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      color: "error",
      variant: "link",
      class: "text-error hover:text-error/75 active:text-error/75 disabled:text-error aria-disabled:text-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      color: "neutral",
      variant: "solid",
      class: "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
    },
    {
      color: "neutral",
      variant: "outline",
      class: "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      color: "neutral",
      variant: "soft",
      class: "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated"
    },
    {
      color: "neutral",
      variant: "subtle",
      class: "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      color: "neutral",
      variant: "ghost",
      class: "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      color: "neutral",
      variant: "link",
      class: "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      size: "xs",
      square: !0,
      class: "p-1"
    },
    {
      size: "sm",
      square: !0,
      class: "p-1.5"
    },
    {
      size: "md",
      square: !0,
      class: "p-1.5"
    },
    {
      size: "lg",
      square: !0,
      class: "p-2"
    },
    {
      size: "xl",
      square: !0,
      class: "p-2"
    },
    {
      loading: !0,
      leading: !0,
      class: {
        leadingIcon: "animate-spin"
      }
    },
    {
      loading: !0,
      leading: !1,
      trailing: !0,
      class: {
        trailingIcon: "animate-spin"
      }
    }
  ],
  defaultVariants: {
    color: "primary",
    variant: "solid",
    size: "md"
  }
}, qf = /* @__PURE__ */ F({
  __name: "Button",
  props: {
    label: {},
    color: {},
    activeColor: {},
    variant: {},
    activeVariant: {},
    size: {},
    square: { type: Boolean },
    block: { type: Boolean },
    loadingAuto: { type: Boolean },
    onClick: { type: [Function, Array] },
    class: {},
    ui: {},
    icon: {},
    avatar: {},
    leading: { type: Boolean },
    leadingIcon: {},
    trailing: { type: Boolean },
    trailingIcon: {},
    loading: { type: Boolean },
    loadingIcon: {},
    as: {},
    type: {},
    disabled: { type: Boolean },
    active: { type: Boolean },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: {},
    to: {},
    href: {},
    external: { type: Boolean },
    target: {},
    rel: {},
    noRel: { type: Boolean },
    prefetchedClass: {},
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    activeClass: {},
    exactActiveClass: {},
    ariaCurrentValue: {},
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(e) {
    const t = e, n = zt(), o = Ie(), { orientation: r, size: i } = No(t), a = yt(zf(t)), s = D(!1), u = xe(Vd, void 0);
    async function c(v) {
      s.value = !0;
      const w = Array.isArray(t.onClick) ? t.onClick : [t.onClick];
      try {
        await Promise.all(w.map((S) => S?.(v)));
      } finally {
        s.value = !1;
      }
    }
    const l = y(() => t.loading || t.loadingAuto && (s.value || u?.value && t.type === "submit")), { isLeading: f, isTrailing: g, leadingIconName: m, trailingIconName: p } = Do(
      y(() => ({ ...t, loading: l.value }))
    ), h = y(() => be({
      extend: be(Mf),
      ...ot({
        variants: {
          active: {
            true: {
              base: pn(o.ui?.button?.variants?.active?.true?.base, t.activeClass)
            },
            false: {
              base: pn(o.ui?.button?.variants?.active?.false?.base, t.inactiveClass)
            }
          }
        }
      }, o.ui?.button || {})
    })({
      color: t.color,
      variant: t.variant,
      size: i.value,
      loading: l.value,
      block: t.block,
      square: t.square || !n.default && !t.label,
      leading: f.value,
      trailing: g.value,
      fieldGroup: r.value
    }));
    return (v, w) => (x(), I(Lf, K({
      type: v.type,
      disabled: v.disabled || l.value
    }, d(Es)(d(a), ["type", "disabled", "onClick"]), { custom: "" }), {
      default: B(({ active: S, ...b }) => [
        ie(yn, K(b, {
          class: h.value.base({
            class: [t.ui?.base, t.class],
            active: S,
            ...S && v.activeVariant ? { variant: v.activeVariant } : {},
            ...S && v.activeColor ? { color: v.activeColor } : {}
          }),
          onClick: c
        }), {
          default: B(() => [
            q(v.$slots, "leading", {}, () => [
              d(f) && d(m) ? (x(), I(Ae, {
                key: 0,
                name: d(m),
                class: N(h.value.leadingIcon({ class: t.ui?.leadingIcon, active: S }))
              }, null, 8, ["name", "class"])) : v.avatar ? (x(), I(bn, K({
                key: 1,
                size: t.ui?.leadingAvatarSize || h.value.leadingAvatarSize()
              }, v.avatar, {
                class: h.value.leadingAvatar({ class: t.ui?.leadingAvatar, active: S })
              }), null, 16, ["size", "class"])) : ne("", !0)
            ]),
            q(v.$slots, "default", {}, () => [
              v.label !== void 0 && v.label !== null ? (x(), oe("span", {
                key: 0,
                class: N(h.value.label({ class: t.ui?.label, active: S }))
              }, we(v.label), 3)) : ne("", !0)
            ]),
            q(v.$slots, "trailing", {}, () => [
              d(g) && d(p) ? (x(), I(Ae, {
                key: 0,
                name: d(p),
                class: N(h.value.trailingIcon({ class: t.ui?.trailingIcon, active: S }))
              }, null, 8, ["name", "class"])) : ne("", !0)
            ])
          ]),
          _: 2
        }, 1040, ["class"])
      ]),
      _: 3
    }, 16, ["type", "disabled"]));
  }
}), ig = /* @__PURE__ */ F({
  __name: "ColorModeButton",
  props: {
    color: { default: "neutral" },
    variant: { default: "ghost" }
  },
  setup(e) {
    const { t } = kn(), n = Co(), o = Ie(), r = y({
      get() {
        return n.value === "dark";
      },
      set(i) {
        n.preference = i ? "dark" : "light";
      }
    });
    return (i, a) => (x(), I(qf, {
      icon: r.value ? d(o).ui.icons.dark : d(o).ui.icons.light,
      color: i.color,
      variant: i.variant,
      "aria-label": r.value ? d(t)("colorMode.switchToLight") : d(t)("colorMode.switchToDark"),
      onClick: a[0] || (a[0] = (s) => r.value = !r.value)
    }, null, 8, ["icon", "color", "variant", "aria-label"]));
  }
}), Vr = Symbol("nuxt-ui.portal-target");
function Ff(e) {
  const t = xe(Vr, void 0), n = y(() => typeof e.value == "boolean" || e.value === void 0 ? t?.value ?? "body" : e.value), o = y(() => typeof e.value == "boolean" ? !e.value : !1);
  return pt(Vr, y(() => n.value)), y(() => ({
    to: n.value,
    disabled: o.value
  }));
}
const Vf = {
  slots: {
    root: "relative inline-flex items-center",
    base: [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    leading: "absolute inset-y-0 start-0 flex items-center",
    leadingIcon: "shrink-0 text-dimmed",
    leadingAvatar: "shrink-0",
    leadingAvatarSize: "",
    trailing: "absolute inset-y-0 end-0 flex items-center",
    trailingIcon: "shrink-0 text-dimmed"
  },
  variants: {
    fieldGroup: {
      horizontal: {
        root: "group has-focus-visible:z-[1]",
        base: "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      vertical: {
        root: "group has-focus-visible:z-[1]",
        base: "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    size: {
      xs: {
        base: "px-2 py-1 text-xs gap-1",
        leading: "ps-2",
        trailing: "pe-2",
        leadingIcon: "size-4",
        leadingAvatarSize: "3xs",
        trailingIcon: "size-4"
      },
      sm: {
        base: "px-2.5 py-1.5 text-xs gap-1.5",
        leading: "ps-2.5",
        trailing: "pe-2.5",
        leadingIcon: "size-4",
        leadingAvatarSize: "3xs",
        trailingIcon: "size-4"
      },
      md: {
        base: "px-2.5 py-1.5 text-sm gap-1.5",
        leading: "ps-2.5",
        trailing: "pe-2.5",
        leadingIcon: "size-5",
        leadingAvatarSize: "2xs",
        trailingIcon: "size-5"
      },
      lg: {
        base: "px-3 py-2 text-sm gap-2",
        leading: "ps-3",
        trailing: "pe-3",
        leadingIcon: "size-5",
        leadingAvatarSize: "2xs",
        trailingIcon: "size-5"
      },
      xl: {
        base: "px-3 py-2 text-base gap-2",
        leading: "ps-3",
        trailing: "pe-3",
        leadingIcon: "size-6",
        leadingAvatarSize: "xs",
        trailingIcon: "size-6"
      }
    },
    variant: {
      outline: "text-highlighted bg-default ring ring-inset ring-accented",
      soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      subtle: "text-highlighted bg-elevated ring ring-inset ring-accented",
      ghost: "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      none: "text-highlighted bg-transparent"
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: ""
    },
    leading: {
      true: ""
    },
    trailing: {
      true: ""
    },
    loading: {
      true: ""
    },
    highlight: {
      true: ""
    },
    type: {
      file: "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  compoundVariants: [
    {
      color: "primary",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      color: "secondary",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      color: "success",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      color: "info",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      color: "warning",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      color: "error",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      color: "primary",
      highlight: !0,
      class: "ring ring-inset ring-primary"
    },
    {
      color: "secondary",
      highlight: !0,
      class: "ring ring-inset ring-secondary"
    },
    {
      color: "success",
      highlight: !0,
      class: "ring ring-inset ring-success"
    },
    {
      color: "info",
      highlight: !0,
      class: "ring ring-inset ring-info"
    },
    {
      color: "warning",
      highlight: !0,
      class: "ring ring-inset ring-warning"
    },
    {
      color: "error",
      highlight: !0,
      class: "ring ring-inset ring-error"
    },
    {
      color: "neutral",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      color: "neutral",
      highlight: !0,
      class: "ring ring-inset ring-inverted"
    },
    {
      leading: !0,
      size: "xs",
      class: "ps-7"
    },
    {
      leading: !0,
      size: "sm",
      class: "ps-8"
    },
    {
      leading: !0,
      size: "md",
      class: "ps-9"
    },
    {
      leading: !0,
      size: "lg",
      class: "ps-10"
    },
    {
      leading: !0,
      size: "xl",
      class: "ps-11"
    },
    {
      trailing: !0,
      size: "xs",
      class: "pe-7"
    },
    {
      trailing: !0,
      size: "sm",
      class: "pe-8"
    },
    {
      trailing: !0,
      size: "md",
      class: "pe-9"
    },
    {
      trailing: !0,
      size: "lg",
      class: "pe-10"
    },
    {
      trailing: !0,
      size: "xl",
      class: "pe-11"
    },
    {
      loading: !0,
      leading: !0,
      class: {
        leadingIcon: "animate-spin"
      }
    },
    {
      loading: !0,
      leading: !1,
      trailing: !0,
      class: {
        trailingIcon: "animate-spin"
      }
    }
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    variant: "outline"
  }
}, Rf = ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete"], Df = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "Input",
  props: {
    as: {},
    id: {},
    name: {},
    type: { default: "text" },
    placeholder: {},
    color: {},
    variant: {},
    size: {},
    required: { type: Boolean },
    autocomplete: { default: "off" },
    autofocus: { type: Boolean },
    autofocusDelay: { default: 0 },
    disabled: { type: Boolean },
    highlight: { type: Boolean },
    modelValue: {},
    defaultValue: {},
    modelModifiers: {},
    class: {},
    ui: {},
    icon: {},
    avatar: {},
    leading: { type: Boolean },
    leadingIcon: {},
    trailing: { type: Boolean },
    trailingIcon: {},
    loading: { type: Boolean },
    loadingIcon: {}
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(e, { expose: t, emit: n }) {
    const o = e, r = n, i = zt(), a = /* @__PURE__ */ gs(o, "modelValue", r, { defaultValue: o.defaultValue }), s = Ie(), { emitFormBlur: u, emitFormInput: c, emitFormChange: l, size: f, color: g, id: m, name: p, highlight: h, disabled: v, emitFormFocus: w, ariaAttrs: S } = jo(o, { deferInputValidation: !0 }), { orientation: b, size: C } = No(o), { isLeading: A, isTrailing: $, leadingIconName: T, trailingIconName: E } = Do(o), j = y(() => C.value || f.value), H = y(() => be({ extend: be(Vf), ...s.ui?.input || {} })({
      type: o.type,
      color: g.value,
      variant: o.variant,
      size: j?.value,
      loading: o.loading,
      highlight: h.value,
      leading: A.value || !!o.avatar || !!i.leading,
      trailing: $.value || !!i.trailing,
      fieldGroup: b.value
    })), Z = D(null);
    function W(z) {
      o.modelModifiers?.trim && (z = z?.trim() ?? null), (o.modelModifiers?.number || o.type === "number") && (z = Ts(z)), o.modelModifiers?.nullable && (z ||= null), o.modelModifiers?.optional && (z ||= void 0), a.value = z, c();
    }
    function ee(z) {
      o.modelModifiers?.lazy || W(z.target.value);
    }
    function k(z) {
      const _ = z.target.value;
      o.modelModifiers?.lazy && W(_), o.modelModifiers?.trim && (z.target.value = _.trim()), l(), r("change", z);
    }
    function O(z) {
      u(), r("blur", z);
    }
    function M() {
      o.autofocus && Z.value?.focus();
    }
    return Se(() => {
      setTimeout(() => {
        M();
      }, o.autofocusDelay);
    }), t({
      inputRef: Z
    }), (z, _) => (x(), I(d(re), {
      as: z.as,
      class: N(H.value.root({ class: [o.ui?.root, o.class] }))
    }, {
      default: B(() => [
        Je("input", K({
          id: d(m),
          ref_key: "inputRef",
          ref: Z,
          type: z.type,
          value: d(a),
          name: d(p),
          placeholder: z.placeholder,
          class: H.value.base({ class: o.ui?.base }),
          disabled: d(v),
          required: z.required,
          autocomplete: z.autocomplete
        }, { ...z.$attrs, ...d(S) }, {
          onInput: ee,
          onBlur: O,
          onChange: k,
          onFocus: _[0] || (_[0] = //@ts-ignore
          (...P) => d(w) && d(w)(...P))
        }), null, 16, Rf),
        q(z.$slots, "default"),
        d(A) || z.avatar || i.leading ? (x(), oe("span", {
          key: 0,
          class: N(H.value.leading({ class: o.ui?.leading }))
        }, [
          q(z.$slots, "leading", {}, () => [
            d(A) && d(T) ? (x(), I(Ae, {
              key: 0,
              name: d(T),
              class: N(H.value.leadingIcon({ class: o.ui?.leadingIcon }))
            }, null, 8, ["name", "class"])) : z.avatar ? (x(), I(bn, K({
              key: 1,
              size: o.ui?.leadingAvatarSize || H.value.leadingAvatarSize()
            }, z.avatar, {
              class: H.value.leadingAvatar({ class: o.ui?.leadingAvatar })
            }), null, 16, ["size", "class"])) : ne("", !0)
          ])
        ], 2)) : ne("", !0),
        d($) || i.trailing ? (x(), oe("span", {
          key: 1,
          class: N(H.value.trailing({ class: o.ui?.trailing }))
        }, [
          q(z.$slots, "trailing", {}, () => [
            d(E) ? (x(), I(Ae, {
              key: 0,
              name: d(E),
              class: N(H.value.trailingIcon({ class: o.ui?.trailingIcon }))
            }, null, 8, ["name", "class"])) : ne("", !0)
          ])
        ], 2)) : ne("", !0)
      ]),
      _: 3
    }, 8, ["as", "class"]));
  }
}), Nf = {
  slots: {
    base: [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    leading: "absolute inset-y-0 start-0 flex items-center",
    leadingIcon: "shrink-0 text-dimmed",
    leadingAvatar: "shrink-0",
    leadingAvatarSize: "",
    trailing: "absolute inset-y-0 end-0 flex items-center",
    trailingIcon: "shrink-0 text-dimmed",
    value: "truncate pointer-events-none",
    placeholder: "truncate text-dimmed",
    arrow: "fill-default",
    content: [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    viewport: "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    group: "p-1 isolate",
    empty: "text-center text-muted",
    label: "font-semibold text-highlighted",
    separator: "-mx-1 my-1 h-px bg-border",
    item: [
      "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    itemLeadingIcon: [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    itemLeadingAvatar: "shrink-0",
    itemLeadingAvatarSize: "",
    itemLeadingChip: "shrink-0",
    itemLeadingChipSize: "",
    itemTrailing: "ms-auto inline-flex gap-1.5 items-center",
    itemTrailingIcon: "shrink-0",
    itemLabel: "truncate",
    input: "border-b border-default",
    focusScope: "flex flex-col min-h-0"
  },
  variants: {
    fieldGroup: {
      horizontal: "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      vertical: "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    size: {
      xs: {
        base: "px-2 py-1 text-xs gap-1",
        leading: "ps-2",
        trailing: "pe-2",
        leadingIcon: "size-4",
        leadingAvatarSize: "3xs",
        trailingIcon: "size-4",
        label: "p-1 text-[10px]/3 gap-1",
        item: "p-1 text-xs gap-1",
        itemLeadingIcon: "size-4",
        itemLeadingAvatarSize: "3xs",
        itemLeadingChip: "size-4",
        itemLeadingChipSize: "sm",
        itemTrailingIcon: "size-4",
        empty: "p-1 text-xs"
      },
      sm: {
        base: "px-2.5 py-1.5 text-xs gap-1.5",
        leading: "ps-2.5",
        trailing: "pe-2.5",
        leadingIcon: "size-4",
        leadingAvatarSize: "3xs",
        trailingIcon: "size-4",
        label: "p-1.5 text-[10px]/3 gap-1.5",
        item: "p-1.5 text-xs gap-1.5",
        itemLeadingIcon: "size-4",
        itemLeadingAvatarSize: "3xs",
        itemLeadingChip: "size-4",
        itemLeadingChipSize: "sm",
        itemTrailingIcon: "size-4",
        empty: "p-1.5 text-xs"
      },
      md: {
        base: "px-2.5 py-1.5 text-sm gap-1.5",
        leading: "ps-2.5",
        trailing: "pe-2.5",
        leadingIcon: "size-5",
        leadingAvatarSize: "2xs",
        trailingIcon: "size-5",
        label: "p-1.5 text-xs gap-1.5",
        item: "p-1.5 text-sm gap-1.5",
        itemLeadingIcon: "size-5",
        itemLeadingAvatarSize: "2xs",
        itemLeadingChip: "size-5",
        itemLeadingChipSize: "md",
        itemTrailingIcon: "size-5",
        empty: "p-1.5 text-sm"
      },
      lg: {
        base: "px-3 py-2 text-sm gap-2",
        leading: "ps-3",
        trailing: "pe-3",
        leadingIcon: "size-5",
        leadingAvatarSize: "2xs",
        trailingIcon: "size-5",
        label: "p-2 text-xs gap-2",
        item: "p-2 text-sm gap-2",
        itemLeadingIcon: "size-5",
        itemLeadingAvatarSize: "2xs",
        itemLeadingChip: "size-5",
        itemLeadingChipSize: "md",
        itemTrailingIcon: "size-5",
        empty: "p-2 text-sm"
      },
      xl: {
        base: "px-3 py-2 text-base gap-2",
        leading: "ps-3",
        trailing: "pe-3",
        leadingIcon: "size-6",
        leadingAvatarSize: "xs",
        trailingIcon: "size-6",
        label: "p-2 text-sm gap-2",
        item: "p-2 text-base gap-2",
        itemLeadingIcon: "size-6",
        itemLeadingAvatarSize: "xs",
        itemLeadingChip: "size-6",
        itemLeadingChipSize: "lg",
        itemTrailingIcon: "size-6",
        empty: "p-2 text-base"
      }
    },
    variant: {
      outline: "text-highlighted bg-default ring ring-inset ring-accented",
      soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      subtle: "text-highlighted bg-elevated ring ring-inset ring-accented",
      ghost: "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      none: "text-highlighted bg-transparent"
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: ""
    },
    leading: {
      true: ""
    },
    trailing: {
      true: ""
    },
    loading: {
      true: ""
    },
    highlight: {
      true: ""
    },
    type: {
      file: "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  compoundVariants: [
    {
      color: "primary",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      color: "secondary",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      color: "success",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      color: "info",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      color: "warning",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      color: "error",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      color: "primary",
      highlight: !0,
      class: "ring ring-inset ring-primary"
    },
    {
      color: "secondary",
      highlight: !0,
      class: "ring ring-inset ring-secondary"
    },
    {
      color: "success",
      highlight: !0,
      class: "ring ring-inset ring-success"
    },
    {
      color: "info",
      highlight: !0,
      class: "ring ring-inset ring-info"
    },
    {
      color: "warning",
      highlight: !0,
      class: "ring ring-inset ring-warning"
    },
    {
      color: "error",
      highlight: !0,
      class: "ring ring-inset ring-error"
    },
    {
      color: "neutral",
      variant: [
        "outline",
        "subtle"
      ],
      class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      color: "neutral",
      highlight: !0,
      class: "ring ring-inset ring-inverted"
    },
    {
      leading: !0,
      size: "xs",
      class: "ps-7"
    },
    {
      leading: !0,
      size: "sm",
      class: "ps-8"
    },
    {
      leading: !0,
      size: "md",
      class: "ps-9"
    },
    {
      leading: !0,
      size: "lg",
      class: "ps-10"
    },
    {
      leading: !0,
      size: "xl",
      class: "ps-11"
    },
    {
      trailing: !0,
      size: "xs",
      class: "pe-7"
    },
    {
      trailing: !0,
      size: "sm",
      class: "pe-8"
    },
    {
      trailing: !0,
      size: "md",
      class: "pe-9"
    },
    {
      trailing: !0,
      size: "lg",
      class: "pe-10"
    },
    {
      trailing: !0,
      size: "xl",
      class: "pe-11"
    },
    {
      loading: !0,
      leading: !0,
      class: {
        leadingIcon: "animate-spin"
      }
    },
    {
      loading: !0,
      leading: !1,
      trailing: !0,
      class: {
        trailingIcon: "animate-spin"
      }
    }
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    variant: "outline"
  }
}, jf = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "SelectMenu",
  props: /* @__PURE__ */ jt({
    id: {},
    placeholder: {},
    searchInput: { type: [Boolean, Object], default: !0 },
    color: {},
    variant: {},
    size: {},
    required: { type: Boolean },
    trailingIcon: {},
    selectedIcon: {},
    content: {},
    arrow: { type: [Boolean, Object] },
    portal: { type: [Boolean, String], default: !0 },
    valueKey: {},
    labelKey: { default: "label" },
    items: {},
    defaultValue: {},
    modelValue: {},
    multiple: { type: Boolean },
    highlight: { type: Boolean },
    createItem: { type: [Boolean, String, Object] },
    filterFields: {},
    ignoreFilter: { type: Boolean },
    autofocus: { type: Boolean },
    autofocusDelay: { default: 0 },
    class: {},
    ui: {},
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    disabled: { type: Boolean },
    name: {},
    resetSearchTermOnBlur: { type: Boolean, default: !0 },
    resetSearchTermOnSelect: { type: Boolean, default: !0 },
    highlightOnHover: { type: Boolean },
    icon: {},
    avatar: {},
    leading: { type: Boolean },
    leadingIcon: {},
    trailing: { type: Boolean },
    loading: { type: Boolean },
    loadingIcon: {}
  }, {
    searchTerm: { default: "" },
    searchTermModifiers: {}
  }),
  emits: /* @__PURE__ */ jt(["update:open", "change", "blur", "focus", "create", "highlight", "update:modelValue"], ["update:searchTerm"]),
  setup(e, { expose: t, emit: n }) {
    const o = e, r = n, i = zt(), a = wo(e, "searchTerm"), { t: s } = kn(), u = Ie(), { contains: c } = xi({ sensitivity: "base" }), l = To(Yt(o, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "highlightOnHover"), r), f = Ff(nt(() => o.portal)), g = nt(() => ot(o.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" })), m = nt(() => o.arrow), p = nt(() => ot(o.searchInput, { placeholder: s("selectMenu.search"), variant: "none" })), { emitFormBlur: h, emitFormFocus: v, emitFormInput: w, emitFormChange: S, size: b, color: C, id: A, name: $, highlight: T, disabled: E, ariaAttrs: j } = jo(o), { orientation: H, size: Z } = No(o), { isLeading: W, isTrailing: ee, leadingIconName: k, trailingIconName: O } = Do(nt(() => ot(o, { trailingIcon: u.ui.icons.chevronDown }))), M = y(() => Z.value || b.value), [z, _] = /* @__PURE__ */ Xa(), P = y(() => be({ extend: be(Nf), ...u.ui?.selectMenu || {} })({
      color: C.value,
      variant: o.variant,
      size: M?.value,
      loading: o.loading,
      highlight: T.value,
      leading: W.value || !!o.avatar || !!i.leading,
      trailing: ee.value || !!i.trailing,
      fieldGroup: H.value
    }));
    function te(G) {
      if (o.multiple && Array.isArray(G)) {
        const ve = G.map((de) => dr(ae.value, de, {
          labelKey: o.labelKey,
          valueKey: o.valueKey
        })).filter((de) => de != null && de !== "");
        return ve.length > 0 ? ve.join(", ") : void 0;
      }
      return dr(ae.value, G, {
        labelKey: o.labelKey,
        valueKey: o.valueKey
      });
    }
    const ue = y(
      () => o.items?.length ? zs(o.items) ? o.items : [o.items] : []
    ), ae = y(() => ue.value.flatMap((G) => G)), J = y(() => {
      if (o.ignoreFilter || !a.value)
        return ue.value;
      const G = Array.isArray(o.filterFields) ? o.filterFields : [o.labelKey];
      return ue.value.map((ve) => ve.filter((de) => de == null ? !1 : typeof de != "object" ? c(String(de), a.value) : de.type && ["label", "separator"].includes(de.type) ? !0 : G.some((xt) => {
        const Be = Le(de, xt);
        return Be != null && c(String(Be), a.value);
      }))).filter((ve) => ve.filter(
        (de) => !me(de) || !de.type || !["label", "separator"].includes(de.type)
      ).length > 0);
    }), se = y(() => J.value.flatMap((G) => G)), ge = y(() => {
      if (!o.createItem || !a.value)
        return !1;
      const G = o.valueKey ? { [o.valueKey]: a.value } : a.value;
      return typeof o.createItem == "object" && o.createItem.when === "always" || o.createItem === "always" ? !se.value.find((ve) => hi(ve, G, o.valueKey)) : !se.value.length;
    }), ke = y(() => typeof o.createItem == "object" ? o.createItem.position : "bottom"), L = D(null);
    function Y() {
      o.autofocus && L.value?.$el?.focus({
        focusVisible: !0
      });
    }
    Se(() => {
      setTimeout(() => {
        Y();
      }, o.autofocusDelay);
    });
    function Q(G) {
      if (Ia(o.modelValue) === G)
        return;
      const ve = new Event("change", { target: { value: G } });
      r("change", ve), S(), w(), o.resetSearchTermOnSelect && (a.value = "");
    }
    function ce(G) {
      let ve;
      if (G) {
        const de = new FocusEvent("focus");
        r("focus", de), v(), clearTimeout(ve);
      } else {
        const de = new FocusEvent("blur");
        r("blur", de), h(), o.resetSearchTermOnBlur && (ve = setTimeout(() => {
          a.value = "";
        }, 100));
      }
    }
    function Pe(G, ve) {
      if (me(ve)) {
        if (ve.disabled) {
          G.preventDefault();
          return;
        }
        ve.onSelect?.(G);
      }
    }
    function me(G) {
      return typeof G == "object" && G !== null;
    }
    return t({
      triggerRef: L
    }), (G, ve) => (x(), oe($e, null, [
      ie(d(z), null, {
        default: B(() => [
          ie(d(Tr), {
            class: N(P.value.group({ class: o.ui?.group }))
          }, {
            default: B(() => [
              ie(d(zr), {
                class: N(P.value.item({ class: o.ui?.item })),
                value: a.value,
                onSelect: ve[0] || (ve[0] = gt((de) => r("create", a.value), ["prevent"]))
              }, {
                default: B(() => [
                  Je("span", {
                    class: N(P.value.itemLabel({ class: o.ui?.itemLabel }))
                  }, [
                    q(G.$slots, "create-item-label", { item: a.value }, () => [
                      Ce(we(d(s)("selectMenu.create", { label: a.value })), 1)
                    ])
                  ], 2)
                ]),
                _: 3
              }, 8, ["class", "value"])
            ]),
            _: 3
          }, 8, ["class"])
        ]),
        _: 3
      }),
      ie(d(nd), K({ id: d(A) }, { ...d(l), ...G.$attrs, ...d(j) }, {
        "ignore-filter": "",
        "as-child": "",
        name: d($),
        disabled: d(E),
        "onUpdate:modelValue": Q,
        "onUpdate:open": ce
      }), {
        default: B(({ modelValue: de, open: xt }) => [
          ie(d(Lc), { "as-child": "" }, {
            default: B(() => [
              ie(d(Id), {
                ref_key: "triggerRef",
                ref: L,
                class: N(P.value.base({ class: [o.ui?.base, o.class] })),
                tabindex: "0"
              }, {
                default: B(() => [
                  d(W) || G.avatar || i.leading ? (x(), oe("span", {
                    key: 0,
                    class: N(P.value.leading({ class: o.ui?.leading }))
                  }, [
                    q(G.$slots, "leading", {
                      modelValue: de,
                      open: xt,
                      ui: P.value
                    }, () => [
                      d(W) && d(k) ? (x(), I(Ae, {
                        key: 0,
                        name: d(k),
                        class: N(P.value.leadingIcon({ class: o.ui?.leadingIcon }))
                      }, null, 8, ["name", "class"])) : G.avatar ? (x(), I(bn, K({
                        key: 1,
                        size: o.ui?.itemLeadingAvatarSize || P.value.itemLeadingAvatarSize()
                      }, G.avatar, {
                        class: P.value.itemLeadingAvatar({ class: o.ui?.itemLeadingAvatar })
                      }), null, 16, ["size", "class"])) : ne("", !0)
                    ])
                  ], 2)) : ne("", !0),
                  q(G.$slots, "default", {
                    modelValue: de,
                    open: xt
                  }, () => [
                    (x(!0), oe($e, null, Rt([te(de)], (Be) => (x(), oe($e, { key: Be }, [
                      Be != null ? (x(), oe("span", {
                        key: 0,
                        class: N(P.value.value({ class: o.ui?.value }))
                      }, we(Be), 3)) : (x(), oe("span", {
                        key: 1,
                        class: N(P.value.placeholder({ class: o.ui?.placeholder }))
                      }, we(G.placeholder ?? " "), 3))
                    ], 64))), 128))
                  ]),
                  d(ee) || i.trailing ? (x(), oe("span", {
                    key: 1,
                    class: N(P.value.trailing({ class: o.ui?.trailing }))
                  }, [
                    q(G.$slots, "trailing", {
                      modelValue: de,
                      open: xt,
                      ui: P.value
                    }, () => [
                      d(O) ? (x(), I(Ae, {
                        key: 0,
                        name: d(O),
                        class: N(P.value.trailingIcon({ class: o.ui?.trailingIcon }))
                      }, null, 8, ["name", "class"])) : ne("", !0)
                    ])
                  ], 2)) : ne("", !0)
                ]),
                _: 2
              }, 1032, ["class"])
            ]),
            _: 2
          }, 1024),
          ie(d(Cd), qe(xn(d(f))), {
            default: B(() => [
              ie(d(cd), K({
                class: P.value.content({ class: o.ui?.content })
              }, g.value), {
                default: B(() => [
                  ie(d(ou), {
                    trapped: "",
                    class: N(P.value.focusScope({ class: o.ui?.focusScope }))
                  }, {
                    default: B(() => [
                      q(G.$slots, "content-top"),
                      G.searchInput ? (x(), I(d(vd), {
                        key: 0,
                        modelValue: a.value,
                        "onUpdate:modelValue": ve[1] || (ve[1] = (Be) => a.value = Be),
                        "display-value": () => a.value,
                        "as-child": ""
                      }, {
                        default: B(() => [
                          ie(Df, K({
                            autofocus: "",
                            autocomplete: "off",
                            size: G.size
                          }, p.value, {
                            class: P.value.input({ class: o.ui?.input })
                          }), null, 16, ["size", "class"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "display-value"])) : ne("", !0),
                      ie(d(fd), {
                        class: N(P.value.empty({ class: o.ui?.empty }))
                      }, {
                        default: B(() => [
                          q(G.$slots, "empty", { searchTerm: a.value }, () => [
                            Ce(we(a.value ? d(s)("selectMenu.noMatch", { searchTerm: a.value }) : d(s)("selectMenu.noData")), 1)
                          ])
                        ]),
                        _: 3
                      }, 8, ["class"]),
                      Je("div", {
                        role: "presentation",
                        class: N(P.value.viewport({ class: o.ui?.viewport }))
                      }, [
                        ge.value && ke.value === "top" ? (x(), I(d(_), { key: 0 })) : ne("", !0),
                        (x(!0), oe($e, null, Rt(J.value, (Be, Uo) => (x(), I(d(Tr), {
                          key: `group-${Uo}`,
                          class: N(P.value.group({ class: o.ui?.group }))
                        }, {
                          default: B(() => [
                            (x(!0), oe($e, null, Rt(Be, (U, Lt) => (x(), oe($e, {
                              key: `group-${Uo}-${Lt}`
                            }, [
                              me(U) && U.type === "label" ? (x(), I(d(xd), {
                                key: 0,
                                class: N(P.value.label({ class: [o.ui?.label, U.ui?.label, U.class] }))
                              }, {
                                default: B(() => [
                                  Ce(we(d(Le)(U, o.labelKey)), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"])) : me(U) && U.type === "separator" ? (x(), I(d(_d), {
                                key: 1,
                                class: N(P.value.separator({ class: [o.ui?.separator, U.ui?.separator, U.class] }))
                              }, null, 8, ["class"])) : (x(), I(d(zr), {
                                key: 2,
                                class: N(P.value.item({ class: [o.ui?.item, me(U) && U.ui?.item, me(U) && U.class] })),
                                disabled: me(U) && U.disabled,
                                value: o.valueKey && me(U) ? d(Le)(U, o.valueKey) : U,
                                onSelect: (ha) => Pe(ha, U)
                              }, {
                                default: B(() => [
                                  q(G.$slots, "item", {
                                    item: U,
                                    index: Lt
                                  }, () => [
                                    q(G.$slots, "item-leading", {
                                      item: U,
                                      index: Lt
                                    }, () => [
                                      me(U) && U.icon ? (x(), I(Ae, {
                                        key: 0,
                                        name: U.icon,
                                        class: N(P.value.itemLeadingIcon({ class: [o.ui?.itemLeadingIcon, U.ui?.itemLeadingIcon] }))
                                      }, null, 8, ["name", "class"])) : me(U) && U.avatar ? (x(), I(bn, K({
                                        key: 1,
                                        size: U.ui?.itemLeadingAvatarSize || o.ui?.itemLeadingAvatarSize || P.value.itemLeadingAvatarSize()
                                      }, { ref_for: !0 }, U.avatar, {
                                        class: P.value.itemLeadingAvatar({ class: [o.ui?.itemLeadingAvatar, U.ui?.itemLeadingAvatar] })
                                      }), null, 16, ["size", "class"])) : me(U) && U.chip ? (x(), I(ra, K({
                                        key: 2,
                                        size: o.ui?.itemLeadingChipSize || P.value.itemLeadingChipSize(),
                                        inset: "",
                                        standalone: ""
                                      }, { ref_for: !0 }, U.chip, {
                                        class: P.value.itemLeadingChip({ class: [o.ui?.itemLeadingChip, U.ui?.itemLeadingChip] })
                                      }), null, 16, ["size", "class"])) : ne("", !0)
                                    ]),
                                    Je("span", {
                                      class: N(P.value.itemLabel({ class: [o.ui?.itemLabel, me(U) && U.ui?.itemLabel] }))
                                    }, [
                                      q(G.$slots, "item-label", {
                                        item: U,
                                        index: Lt
                                      }, () => [
                                        Ce(we(me(U) ? d(Le)(U, o.labelKey) : U), 1)
                                      ])
                                    ], 2),
                                    Je("span", {
                                      class: N(P.value.itemTrailing({ class: [o.ui?.itemTrailing, me(U) && U.ui?.itemTrailing] }))
                                    }, [
                                      q(G.$slots, "item-trailing", {
                                        item: U,
                                        index: Lt
                                      }),
                                      ie(d(yd), { "as-child": "" }, {
                                        default: B(() => [
                                          ie(Ae, {
                                            name: G.selectedIcon || d(u).ui.icons.check,
                                            class: N(P.value.itemTrailingIcon({ class: [o.ui?.itemTrailingIcon, me(U) && U.ui?.itemTrailingIcon] }))
                                          }, null, 8, ["name", "class"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ], 2)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["class", "disabled", "value", "onSelect"]))
                            ], 64))), 128))
                          ]),
                          _: 2
                        }, 1032, ["class"]))), 128)),
                        ge.value && ke.value === "bottom" ? (x(), I(d(_), { key: 1 })) : ne("", !0)
                      ], 2),
                      q(G.$slots, "content-bottom")
                    ]),
                    _: 3
                  }, 8, ["class"]),
                  G.arrow ? (x(), I(d(ld), K({ key: 0 }, m.value, {
                    class: P.value.arrow({ class: o.ui?.arrow })
                  }), null, 16, ["class"])) : ne("", !0)
                ]),
                _: 3
              }, 16, ["class"])
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 16, ["id", "name", "disabled"])
    ], 64));
  }
}), ag = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "ColorModeSelect",
  setup(e) {
    const { t } = kn(), n = Co(), o = Ie(), r = y(() => [
      { label: t("colorMode.system"), value: "system", icon: o.ui.icons.system },
      { label: t("colorMode.light"), value: "light", icon: o.ui.icons.light },
      { label: t("colorMode.dark"), value: "dark", icon: o.ui.icons.dark }
    ]), i = y({
      get() {
        return r.value.find((a) => a.value === n.preference) || r.value[0];
      },
      set(a) {
        n.preference = a.value;
      }
    });
    return (a, s) => (x(), I(jf, K({
      modelValue: i.value,
      "onUpdate:modelValue": s[0] || (s[0] = (u) => i.value = u),
      icon: i.value?.icon,
      "search-input": !1
    }, a.$attrs, { items: r.value }), null, 16, ["modelValue", "icon", "items"]));
  }
}), Hf = {
  slots: {
    root: "relative flex items-start",
    base: [
      "inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented",
      "transition-[background] duration-200"
    ],
    container: "flex items-center",
    thumb: "group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center",
    icon: [
      "absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12",
      "transition-[color,opacity] duration-200"
    ],
    wrapper: "ms-2",
    label: "block font-medium text-default",
    description: "text-muted"
  },
  variants: {
    color: {
      primary: {
        base: "data-[state=checked]:bg-primary focus-visible:outline-primary",
        icon: "group-data-[state=checked]:text-primary"
      },
      secondary: {
        base: "data-[state=checked]:bg-secondary focus-visible:outline-secondary",
        icon: "group-data-[state=checked]:text-secondary"
      },
      success: {
        base: "data-[state=checked]:bg-success focus-visible:outline-success",
        icon: "group-data-[state=checked]:text-success"
      },
      info: {
        base: "data-[state=checked]:bg-info focus-visible:outline-info",
        icon: "group-data-[state=checked]:text-info"
      },
      warning: {
        base: "data-[state=checked]:bg-warning focus-visible:outline-warning",
        icon: "group-data-[state=checked]:text-warning"
      },
      error: {
        base: "data-[state=checked]:bg-error focus-visible:outline-error",
        icon: "group-data-[state=checked]:text-error"
      },
      neutral: {
        base: "data-[state=checked]:bg-inverted focus-visible:outline-inverted",
        icon: "group-data-[state=checked]:text-highlighted"
      }
    },
    size: {
      xs: {
        base: "w-7",
        container: "h-4",
        thumb: "size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3",
        wrapper: "text-xs"
      },
      sm: {
        base: "w-8",
        container: "h-4",
        thumb: "size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5",
        wrapper: "text-xs"
      },
      md: {
        base: "w-9",
        container: "h-5",
        thumb: "size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4",
        wrapper: "text-sm"
      },
      lg: {
        base: "w-10",
        container: "h-5",
        thumb: "size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5",
        wrapper: "text-sm"
      },
      xl: {
        base: "w-11",
        container: "h-6",
        thumb: "size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5",
        wrapper: "text-base"
      }
    },
    checked: {
      true: {
        icon: "group-data-[state=checked]:opacity-100"
      }
    },
    unchecked: {
      true: {
        icon: "group-data-[state=unchecked]:opacity-100"
      }
    },
    loading: {
      true: {
        icon: "animate-spin"
      }
    },
    required: {
      true: {
        label: "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    disabled: {
      true: {
        base: "cursor-not-allowed opacity-75",
        label: "cursor-not-allowed opacity-75",
        description: "cursor-not-allowed opacity-75"
      }
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md"
  }
}, Wf = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "Switch",
  props: /* @__PURE__ */ jt({
    as: {},
    color: {},
    size: {},
    loading: { type: Boolean },
    loadingIcon: {},
    checkedIcon: {},
    uncheckedIcon: {},
    label: {},
    description: {},
    class: {},
    ui: {},
    disabled: { type: Boolean },
    id: {},
    name: {},
    required: { type: Boolean },
    value: {},
    defaultValue: { type: Boolean }
  }, {
    modelValue: { type: Boolean, default: void 0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ jt(["change"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const n = e, o = zt(), r = t, i = wo(e, "modelValue"), a = Ie(), s = yt(Yt(n, "required", "value", "defaultValue")), { id: u, emitFormChange: c, emitFormInput: l, size: f, color: g, name: m, disabled: p, ariaAttrs: h } = jo(n), v = u.value ?? oi(), w = y(() => be({ extend: be(Hf), ...a.ui?.switch || {} })({
      size: f.value,
      color: g.value,
      required: n.required,
      loading: n.loading,
      disabled: p.value || n.loading
    }));
    function S(b) {
      const C = new Event("change", { target: { value: b } });
      r("change", C), c(), l();
    }
    return (b, C) => (x(), I(d(re), {
      as: b.as,
      class: N(w.value.root({ class: [n.ui?.root, n.class] }))
    }, {
      default: B(() => [
        Je("div", {
          class: N(w.value.container({ class: n.ui?.container }))
        }, [
          ie(d(Pd), K({ id: d(v) }, { ...d(s), ...b.$attrs, ...d(h) }, {
            modelValue: i.value,
            "onUpdate:modelValue": [
              C[0] || (C[0] = (A) => i.value = A),
              S
            ],
            name: d(m),
            disabled: d(p) || b.loading,
            class: w.value.base({ class: n.ui?.base })
          }), {
            default: B(() => [
              ie(d($d), {
                class: N(w.value.thumb({ class: n.ui?.thumb }))
              }, {
                default: B(() => [
                  b.loading ? (x(), I(Ae, {
                    key: 0,
                    name: b.loadingIcon || d(a).ui.icons.loading,
                    class: N(w.value.icon({ class: n.ui?.icon, checked: !0, unchecked: !0 }))
                  }, null, 8, ["name", "class"])) : (x(), oe($e, { key: 1 }, [
                    b.checkedIcon ? (x(), I(Ae, {
                      key: 0,
                      name: b.checkedIcon,
                      class: N(w.value.icon({ class: n.ui?.icon, checked: !0 }))
                    }, null, 8, ["name", "class"])) : ne("", !0),
                    b.uncheckedIcon ? (x(), I(Ae, {
                      key: 1,
                      name: b.uncheckedIcon,
                      class: N(w.value.icon({ class: n.ui?.icon, unchecked: !0 }))
                    }, null, 8, ["name", "class"])) : ne("", !0)
                  ], 64))
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }, 16, ["id", "modelValue", "name", "disabled", "class"])
        ], 2),
        b.label || o.label || b.description || o.description ? (x(), oe("div", {
          key: 0,
          class: N(w.value.wrapper({ class: n.ui?.wrapper }))
        }, [
          b.label || o.label ? (x(), I(d(Di), {
            key: 0,
            for: d(v),
            class: N(w.value.label({ class: n.ui?.label }))
          }, {
            default: B(() => [
              q(b.$slots, "label", { label: b.label }, () => [
                Ce(we(b.label), 1)
              ])
            ]),
            _: 3
          }, 8, ["for", "class"])) : ne("", !0),
          b.description || o.description ? (x(), oe("p", {
            key: 1,
            class: N(w.value.description({ class: n.ui?.description }))
          }, [
            q(b.$slots, "description", { description: b.description }, () => [
              Ce(we(b.description), 1)
            ])
          ], 2)) : ne("", !0)
        ], 2)) : ne("", !0)
      ]),
      _: 3
    }, 8, ["as", "class"]));
  }
}), sg = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "ColorModeSwitch",
  setup(e) {
    const { t } = kn(), n = Co(), o = Ie(), r = y({
      get() {
        return n.value === "dark";
      },
      set(i) {
        n.preference = i ? "dark" : "light";
      }
    });
    return (i, a) => (x(), I(Wf, K({
      modelValue: r.value,
      "onUpdate:modelValue": a[0] || (a[0] = (s) => r.value = s),
      "checked-icon": d(o).ui.icons.dark,
      "unchecked-icon": d(o).ui.icons.light,
      "aria-label": r.value ? d(t)("colorMode.switchToLight") : d(t)("colorMode.switchToDark")
    }, i.$attrs), null, 16, ["modelValue", "checked-icon", "unchecked-icon", "aria-label"]));
  }
}), aa = /^[a-z0-9]+(-[a-z0-9]+)*$/, En = (e, t, n, o = "") => {
  const r = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    o = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const s = r.pop(), u = r.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : o,
      prefix: u,
      name: s
    };
    return t && !un(c) ? null : c;
  }
  const i = r[0], a = i.split("-");
  if (a.length > 1) {
    const s = {
      provider: o,
      prefix: a.shift(),
      name: a.join("-")
    };
    return t && !un(s) ? null : s;
  }
  if (n && o === "") {
    const s = {
      provider: o,
      prefix: "",
      name: i
    };
    return t && !un(s, n) ? null : s;
  }
  return null;
}, un = (e, t) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && e.prefix === "" || e.prefix) && e.name) : !1, sa = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), wn = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Tn = Object.freeze({
  ...sa,
  ...wn
}), co = Object.freeze({
  ...Tn,
  body: "",
  hidden: !1
});
function Kf(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const o = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return o && (n.rotate = o), n;
}
function Rr(e, t) {
  const n = Kf(e, t);
  for (const o in co)
    o in wn ? o in e && !(o in n) && (n[o] = wn[o]) : o in t ? n[o] = t[o] : o in e && (n[o] = e[o]);
  return n;
}
function Gf(e, t) {
  const n = e.icons, o = e.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function i(a) {
    if (n[a])
      return r[a] = [];
    if (!(a in r)) {
      r[a] = null;
      const s = o[a] && o[a].parent, u = s && i(s);
      u && (r[a] = [s].concat(u));
    }
    return r[a];
  }
  return Object.keys(n).concat(Object.keys(o)).forEach(i), r;
}
function Uf(e, t, n) {
  const o = e.icons, r = e.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function a(s) {
    i = Rr(
      o[s] || r[s],
      i
    );
  }
  return a(t), n.forEach(a), Rr(e, i);
}
function la(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return n;
  e.not_found instanceof Array && e.not_found.forEach((r) => {
    t(r, null), n.push(r);
  });
  const o = Gf(e);
  for (const r in o) {
    const i = o[r];
    i && (t(r, Uf(e, r, i)), n.push(r));
  }
  return n;
}
const Yf = {
  provider: "",
  aliases: {},
  not_found: {},
  ...sa
};
function Nn(e, t) {
  for (const n in t)
    if (n in e && typeof e[n] != typeof t[n])
      return !1;
  return !0;
}
function ua(e) {
  if (typeof e != "object" || e === null)
    return null;
  const t = e;
  if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !Nn(e, Yf))
    return null;
  const n = t.icons;
  for (const r in n) {
    const i = n[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof i.body != "string" || // Check other props
      !Nn(
        i,
        co
      )
    )
      return null;
  }
  const o = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in o) {
    const i = o[r], a = i.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof a != "string" || !n[a] && !o[a] || // Check other props
      !Nn(
        i,
        co
      )
    )
      return null;
  }
  return t;
}
const Dr = /* @__PURE__ */ Object.create(null);
function Qf(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Tt(e, t) {
  const n = Dr[e] || (Dr[e] = /* @__PURE__ */ Object.create(null));
  return n[t] || (n[t] = Qf(e, t));
}
function ca(e, t) {
  return ua(t) ? la(t, (n, o) => {
    o ? e.icons[n] = o : e.missing.add(n);
  }) : [];
}
function Jf(e, t, n) {
  try {
    if (typeof n.body == "string")
      return e.icons[t] = { ...n }, !0;
  } catch {
  }
  return !1;
}
let Ut = !1;
function da(e) {
  return typeof e == "boolean" && (Ut = e), Ut;
}
function Xf(e) {
  const t = typeof e == "string" ? En(e, !0, Ut) : e;
  if (t) {
    const n = Tt(t.provider, t.prefix), o = t.name;
    return n.icons[o] || (n.missing.has(o) ? null : void 0);
  }
}
function Zf(e, t) {
  const n = En(e, !0, Ut);
  if (!n)
    return !1;
  const o = Tt(n.provider, n.prefix);
  return t ? Jf(o, n.name, t) : (o.missing.add(n.name), !0);
}
function ep(e, t) {
  if (typeof e != "object")
    return !1;
  if (typeof t != "string" && (t = e.provider || ""), Ut && !t && !e.prefix) {
    let r = !1;
    return ua(e) && (e.prefix = "", la(e, (i, a) => {
      Zf(i, a) && (r = !0);
    })), r;
  }
  const n = e.prefix;
  if (!un({
    prefix: n,
    name: "a"
  }))
    return !1;
  const o = Tt(t, n);
  return !!ca(o, e);
}
const fa = Object.freeze({
  width: null,
  height: null
}), pa = Object.freeze({
  // Dimensions
  ...fa,
  // Transformations
  ...wn
}), tp = /(-?[0-9.]*[0-9]+[0-9.]*)/g, np = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Nr(e, t, n) {
  if (t === 1)
    return e;
  if (n = n || 100, typeof e == "number")
    return Math.ceil(e * t * n) / n;
  if (typeof e != "string")
    return e;
  const o = e.split(tp);
  if (o === null || !o.length)
    return e;
  const r = [];
  let i = o.shift(), a = np.test(i);
  for (; ; ) {
    if (a) {
      const s = parseFloat(i);
      isNaN(s) ? r.push(i) : r.push(Math.ceil(s * t * n) / n);
    } else
      r.push(i);
    if (i = o.shift(), i === void 0)
      return r.join("");
    a = !a;
  }
}
function op(e, t = "defs") {
  let n = "";
  const o = e.indexOf("<" + t);
  for (; o >= 0; ) {
    const r = e.indexOf(">", o), i = e.indexOf("</" + t);
    if (r === -1 || i === -1)
      break;
    const a = e.indexOf(">", i);
    if (a === -1)
      break;
    n += e.slice(r + 1, i).trim(), e = e.slice(0, o).trim() + e.slice(a + 1);
  }
  return {
    defs: n,
    content: e
  };
}
function rp(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function ip(e, t, n) {
  const o = op(e);
  return rp(o.defs, t + o.content + n);
}
const ap = (e) => e === "unset" || e === "undefined" || e === "none";
function sp(e, t) {
  const n = {
    ...Tn,
    ...e
  }, o = {
    ...pa,
    ...t
  }, r = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let i = n.body;
  [n, o].forEach((h) => {
    const v = [], w = h.hFlip, S = h.vFlip;
    let b = h.rotate;
    w ? S ? b += 2 : (v.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), v.push("scale(-1 1)"), r.top = r.left = 0) : S && (v.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), v.push("scale(1 -1)"), r.top = r.left = 0);
    let C;
    switch (b < 0 && (b -= Math.floor(b / 4) * 4), b = b % 4, b) {
      case 1:
        C = r.height / 2 + r.top, v.unshift(
          "rotate(90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
      case 2:
        v.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        C = r.width / 2 + r.left, v.unshift(
          "rotate(-90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
    }
    b % 2 === 1 && (r.left !== r.top && (C = r.left, r.left = r.top, r.top = C), r.width !== r.height && (C = r.width, r.width = r.height, r.height = C)), v.length && (i = ip(
      i,
      '<g transform="' + v.join(" ") + '">',
      "</g>"
    ));
  });
  const a = o.width, s = o.height, u = r.width, c = r.height;
  let l, f;
  a === null ? (f = s === null ? "1em" : s === "auto" ? c : s, l = Nr(f, u / c)) : (l = a === "auto" ? u : a, f = s === null ? Nr(l, c / u) : s === "auto" ? c : s);
  const g = {}, m = (h, v) => {
    ap(v) || (g[h] = v.toString());
  };
  m("width", l), m("height", f);
  const p = [r.left, r.top, u, c];
  return g.viewBox = p.join(" "), {
    attributes: g,
    viewBox: p,
    body: i
  };
}
const lp = /\sid="(\S+)"/g, up = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let cp = 0;
function dp(e, t = up) {
  const n = [];
  let o;
  for (; o = lp.exec(e); )
    n.push(o[1]);
  if (!n.length)
    return e;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((i) => {
    const a = typeof t == "function" ? t(i) : t + (cp++).toString(), s = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + a + r + "$3"
    );
  }), e = e.replace(new RegExp(r, "g"), ""), e;
}
const fo = /* @__PURE__ */ Object.create(null);
function fp(e, t) {
  fo[e] = t;
}
function po(e) {
  return fo[e] || fo[""];
}
function Wo(e) {
  let t;
  if (typeof e.resources == "string")
    t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const Ko = /* @__PURE__ */ Object.create(null), qt = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], cn = [];
for (; qt.length > 0; )
  qt.length === 1 || Math.random() > 0.5 ? cn.push(qt.shift()) : cn.push(qt.pop());
Ko[""] = Wo({
  resources: ["https://api.iconify.design"].concat(cn)
});
function pp(e, t) {
  const n = Wo(t);
  return n === null ? !1 : (Ko[e] = n, !0);
}
function Go(e) {
  return Ko[e];
}
const gp = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let jr = gp();
function mp(e, t) {
  const n = Go(e);
  if (!n)
    return 0;
  let o;
  if (!n.maxURL)
    o = 0;
  else {
    let r = 0;
    n.resources.forEach((a) => {
      r = Math.max(r, a.length);
    });
    const i = t + ".json?icons=";
    o = n.maxURL - r - n.path.length - i.length;
  }
  return o;
}
function vp(e) {
  return e === 404;
}
const hp = (e, t, n) => {
  const o = [], r = mp(e, t), i = "icons";
  let a = {
    type: i,
    provider: e,
    prefix: t,
    icons: []
  }, s = 0;
  return n.forEach((u, c) => {
    s += u.length + 1, s >= r && c > 0 && (o.push(a), a = {
      type: i,
      provider: e,
      prefix: t,
      icons: []
    }, s = u.length), a.icons.push(u);
  }), o.push(a), o;
};
function bp(e) {
  if (typeof e == "string") {
    const t = Go(e);
    if (t)
      return t.path;
  }
  return "/";
}
const yp = (e, t, n) => {
  if (!jr) {
    n("abort", 424);
    return;
  }
  let o = bp(t.provider);
  switch (t.type) {
    case "icons": {
      const i = t.prefix, s = t.icons.join(","), u = new URLSearchParams({
        icons: s
      });
      o += i + ".json?" + u.toString();
      break;
    }
    case "custom": {
      const i = t.uri;
      o += i.slice(0, 1) === "/" ? i.slice(1) : i;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let r = 503;
  jr(e + o).then((i) => {
    const a = i.status;
    if (a !== 200) {
      setTimeout(() => {
        n(vp(a) ? "abort" : "next", a);
      });
      return;
    }
    return r = 501, i.json();
  }).then((i) => {
    if (typeof i != "object" || i === null) {
      setTimeout(() => {
        i === 404 ? n("abort", i) : n("next", r);
      });
      return;
    }
    setTimeout(() => {
      n("success", i);
    });
  }).catch(() => {
    n("next", r);
  });
}, wp = {
  prepare: hp,
  send: yp
};
function xp(e) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  e.sort((r, i) => r.provider !== i.provider ? r.provider.localeCompare(i.provider) : r.prefix !== i.prefix ? r.prefix.localeCompare(i.prefix) : r.name.localeCompare(i.name));
  let o = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((r) => {
    if (o.name === r.name && o.prefix === r.prefix && o.provider === r.provider)
      return;
    o = r;
    const i = r.provider, a = r.prefix, s = r.name, u = n[i] || (n[i] = /* @__PURE__ */ Object.create(null)), c = u[a] || (u[a] = Tt(i, a));
    let l;
    s in c.icons ? l = t.loaded : a === "" || c.missing.has(s) ? l = t.missing : l = t.pending;
    const f = {
      provider: i,
      prefix: a,
      name: s
    };
    l.push(f);
  }), t;
}
function ga(e, t) {
  e.forEach((n) => {
    const o = n.loaderCallbacks;
    o && (n.loaderCallbacks = o.filter((r) => r.id !== t));
  });
}
function kp(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let n = !1;
    const o = e.provider, r = e.prefix;
    t.forEach((i) => {
      const a = i.icons, s = a.pending.length;
      a.pending = a.pending.filter((u) => {
        if (u.prefix !== r)
          return !0;
        const c = u.name;
        if (e.icons[c])
          a.loaded.push({
            provider: o,
            prefix: r,
            name: c
          });
        else if (e.missing.has(c))
          a.missing.push({
            provider: o,
            prefix: r,
            name: c
          });
        else
          return n = !0, !0;
        return !1;
      }), a.pending.length !== s && (n || ga([e], i.id), i.callback(
        a.loaded.slice(0),
        a.missing.slice(0),
        a.pending.slice(0),
        i.abort
      ));
    });
  }));
}
let Cp = 0;
function Sp(e, t, n) {
  const o = Cp++, r = ga.bind(null, n, o);
  if (!t.pending.length)
    return r;
  const i = {
    id: o,
    icons: t,
    callback: e,
    abort: r
  };
  return n.forEach((a) => {
    (a.loaderCallbacks || (a.loaderCallbacks = [])).push(i);
  }), r;
}
function _p(e, t = !0, n = !1) {
  const o = [];
  return e.forEach((r) => {
    const i = typeof r == "string" ? En(r, t, n) : r;
    i && o.push(i);
  }), o;
}
var Ap = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Ip(e, t, n, o) {
  const r = e.resources.length, i = e.random ? Math.floor(Math.random() * r) : e.index;
  let a;
  if (e.random) {
    let $ = e.resources.slice(0);
    for (a = []; $.length > 1; ) {
      const T = Math.floor(Math.random() * $.length);
      a.push($[T]), $ = $.slice(0, T).concat($.slice(T + 1));
    }
    a = a.concat($);
  } else
    a = e.resources.slice(i).concat(e.resources.slice(0, i));
  const s = Date.now();
  let u = "pending", c = 0, l, f = null, g = [], m = [];
  typeof o == "function" && m.push(o);
  function p() {
    f && (clearTimeout(f), f = null);
  }
  function h() {
    u === "pending" && (u = "aborted"), p(), g.forEach(($) => {
      $.status === "pending" && ($.status = "aborted");
    }), g = [];
  }
  function v($, T) {
    T && (m = []), typeof $ == "function" && m.push($);
  }
  function w() {
    return {
      startTime: s,
      payload: t,
      status: u,
      queriesSent: c,
      queriesPending: g.length,
      subscribe: v,
      abort: h
    };
  }
  function S() {
    u = "failed", m.forEach(($) => {
      $(void 0, l);
    });
  }
  function b() {
    g.forEach(($) => {
      $.status === "pending" && ($.status = "aborted");
    }), g = [];
  }
  function C($, T, E) {
    const j = T !== "success";
    switch (g = g.filter((H) => H !== $), u) {
      case "pending":
        break;
      case "failed":
        if (j || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (T === "abort") {
      l = E, S();
      return;
    }
    if (j) {
      l = E, g.length || (a.length ? A() : S());
      return;
    }
    if (p(), b(), !e.random) {
      const H = e.resources.indexOf($.resource);
      H !== -1 && H !== e.index && (e.index = H);
    }
    u = "completed", m.forEach((H) => {
      H(E);
    });
  }
  function A() {
    if (u !== "pending")
      return;
    p();
    const $ = a.shift();
    if ($ === void 0) {
      if (g.length) {
        f = setTimeout(() => {
          p(), u === "pending" && (b(), S());
        }, e.timeout);
        return;
      }
      S();
      return;
    }
    const T = {
      status: "pending",
      resource: $,
      callback: (E, j) => {
        C(T, E, j);
      }
    };
    g.push(T), c++, f = setTimeout(A, e.rotate), n($, t, T.callback);
  }
  return setTimeout(A), w;
}
function ma(e) {
  const t = {
    ...Ap,
    ...e
  };
  let n = [];
  function o() {
    n = n.filter((s) => s().status === "pending");
  }
  function r(s, u, c) {
    const l = Ip(
      t,
      s,
      u,
      (f, g) => {
        o(), c && c(f, g);
      }
    );
    return n.push(l), l;
  }
  function i(s) {
    return n.find((u) => s(u)) || null;
  }
  return {
    query: r,
    find: i,
    setIndex: (s) => {
      t.index = s;
    },
    getIndex: () => t.index,
    cleanup: o
  };
}
function Hr() {
}
const jn = /* @__PURE__ */ Object.create(null);
function Op(e) {
  if (!jn[e]) {
    const t = Go(e);
    if (!t)
      return;
    const n = ma(t), o = {
      config: t,
      redundancy: n
    };
    jn[e] = o;
  }
  return jn[e];
}
function Ep(e, t, n) {
  let o, r;
  if (typeof e == "string") {
    const i = po(e);
    if (!i)
      return n(void 0, 424), Hr;
    r = i.send;
    const a = Op(e);
    a && (o = a.redundancy);
  } else {
    const i = Wo(e);
    if (i) {
      o = ma(i);
      const a = e.resources ? e.resources[0] : "", s = po(a);
      s && (r = s.send);
    }
  }
  return !o || !r ? (n(void 0, 424), Hr) : o.query(t, r, n)().abort;
}
function Wr() {
}
function Tp(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, kp(e);
  }));
}
function zp(e) {
  const t = [], n = [];
  return e.forEach((o) => {
    (o.match(aa) ? t : n).push(o);
  }), {
    valid: t,
    invalid: n
  };
}
function Ft(e, t, n) {
  function o() {
    const r = e.pendingIcons;
    t.forEach((i) => {
      r && r.delete(i), e.icons[i] || e.missing.add(i);
    });
  }
  if (n && typeof n == "object")
    try {
      if (!ca(e, n).length) {
        o();
        return;
      }
    } catch (r) {
      console.error(r);
    }
  o(), Tp(e);
}
function Kr(e, t) {
  e instanceof Promise ? e.then((n) => {
    t(n);
  }).catch(() => {
    t(null);
  }) : t(e);
}
function Pp(e, t) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: n, prefix: o } = e, r = e.iconsToLoad;
    if (delete e.iconsToLoad, !r || !r.length)
      return;
    const i = e.loadIcon;
    if (e.loadIcons && (r.length > 1 || !i)) {
      Kr(
        e.loadIcons(r, o, n),
        (l) => {
          Ft(e, r, l);
        }
      );
      return;
    }
    if (i) {
      r.forEach((l) => {
        const f = i(l, o, n);
        Kr(f, (g) => {
          const m = g ? {
            prefix: o,
            icons: {
              [l]: g
            }
          } : null;
          Ft(e, [l], m);
        });
      });
      return;
    }
    const { valid: a, invalid: s } = zp(r);
    if (s.length && Ft(e, s, null), !a.length)
      return;
    const u = o.match(aa) ? po(n) : null;
    if (!u) {
      Ft(e, a, null);
      return;
    }
    u.prepare(n, o, a).forEach((l) => {
      Ep(n, l, (f) => {
        Ft(e, l.icons, f);
      });
    });
  }));
}
const Bp = (e, t) => {
  const n = _p(e, !0, da()), o = xp(n);
  if (!o.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        o.loaded,
        o.missing,
        o.pending,
        Wr
      );
    }), () => {
      u = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), i = [];
  let a, s;
  return o.pending.forEach((u) => {
    const { provider: c, prefix: l } = u;
    if (l === s && c === a)
      return;
    a = c, s = l, i.push(Tt(c, l));
    const f = r[c] || (r[c] = /* @__PURE__ */ Object.create(null));
    f[l] || (f[l] = []);
  }), o.pending.forEach((u) => {
    const { provider: c, prefix: l, name: f } = u, g = Tt(c, l), m = g.pendingIcons || (g.pendingIcons = /* @__PURE__ */ new Set());
    m.has(f) || (m.add(f), r[c][l].push(f));
  }), i.forEach((u) => {
    const c = r[u.provider][u.prefix];
    c.length && Pp(u, c);
  }), t ? Sp(t, o, i) : Wr;
};
function $p(e, t) {
  const n = {
    ...e
  };
  for (const o in t) {
    const r = t[o], i = typeof r;
    o in fa ? (r === null || r && (i === "string" || i === "number")) && (n[o] = r) : i === typeof n[o] && (n[o] = o === "rotate" ? r % 4 : r);
  }
  return n;
}
const Lp = /[\s,]+/;
function Mp(e, t) {
  t.split(Lp).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function qp(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function o(r) {
    for (; r < 0; )
      r += 4;
    return r % 4;
  }
  if (n === "") {
    const r = parseInt(e);
    return isNaN(r) ? 0 : o(r);
  } else if (n !== e) {
    let r = 0;
    switch (n) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let i = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(i) ? 0 : (i = i / r, i % 1 === 0 ? o(i) : 0);
    }
  }
  return t;
}
function Fp(e, t) {
  let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const o in t)
    n += " " + o + '="' + t[o] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function Vp(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Rp(e) {
  return "data:image/svg+xml," + Vp(e);
}
function Dp(e) {
  return 'url("' + Rp(e) + '")';
}
const Gr = {
  ...pa,
  inline: !1
}, Np = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, jp = {
  display: "inline-block"
}, go = {
  backgroundColor: "currentColor"
}, va = {
  backgroundColor: "transparent"
}, Ur = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Yr = {
  webkitMask: go,
  mask: go,
  background: va
};
for (const e in Yr) {
  const t = Yr[e];
  for (const n in Ur)
    t[e + n] = Ur[n];
}
const dn = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  dn[e + "-flip"] = t, dn[e.slice(0, 1) + "-flip"] = t, dn[e + "Flip"] = t;
});
function Qr(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Jr = (e, t) => {
  const n = $p(Gr, t), o = { ...Np }, r = t.mode || "svg", i = {}, a = t.style, s = typeof a == "object" && !(a instanceof Array) ? a : {};
  for (let h in t) {
    const v = t[h];
    if (v !== void 0)
      switch (h) {
        // Properties to ignore
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          n[h] = v === !0 || v === "true" || v === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof v == "string" && Mp(n, v);
          break;
        // Color: override style
        case "color":
          i.color = v;
          break;
        // Rotation as string
        case "rotate":
          typeof v == "string" ? n[h] = qp(v) : typeof v == "number" && (n[h] = v);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          v !== !0 && v !== "true" && delete o["aria-hidden"];
          break;
        default: {
          const w = dn[h];
          w ? (v === !0 || v === "true" || v === 1) && (n[w] = !0) : Gr[h] === void 0 && (o[h] = v);
        }
      }
  }
  const u = sp(e, n), c = u.attributes;
  if (n.inline && (i.verticalAlign = "-0.125em"), r === "svg") {
    o.style = {
      ...i,
      ...s
    }, Object.assign(o, c);
    let h = 0, v = t.id;
    return typeof v == "string" && (v = v.replace(/-/g, "_")), o.innerHTML = dp(u.body, v ? () => v + "ID" + h++ : "iconifyVue"), je("svg", o);
  }
  const { body: l, width: f, height: g } = e, m = r === "mask" || (r === "bg" ? !1 : l.indexOf("currentColor") !== -1), p = Fp(l, {
    ...c,
    width: f + "",
    height: g + ""
  });
  return o.style = {
    ...i,
    "--svg": Dp(p),
    width: Qr(c.width),
    height: Qr(c.height),
    ...jp,
    ...m ? go : va,
    ...s
  }, je("span", o);
};
da(!0);
fp("", wp);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((o) => {
      try {
        // Check if item is an object and not null/array
        (typeof o != "object" || o === null || o instanceof Array || // Check for 'icons' and 'prefix'
        typeof o.icons != "object" || typeof o.prefix != "string" || // Add icon set
        !ep(o)) && console.error(n);
      } catch {
        console.error(n);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let n in t) {
        const o = "IconifyProviders[" + n + "] is invalid.";
        try {
          const r = t[n];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          pp(n, r) || console.error(o);
        } catch {
          console.error(o);
        }
      }
  }
}
const Hp = {
  ...Tn,
  body: ""
}, Wp = F((e, { emit: t }) => {
  const n = D(null);
  function o() {
    n.value && (n.value.abort?.(), n.value = null);
  }
  const r = D(!!e.ssr), i = D(""), a = Ne(null);
  function s() {
    const c = e.icon;
    if (typeof c == "object" && c !== null && typeof c.body == "string")
      return i.value = "", {
        data: c
      };
    let l;
    if (typeof c != "string" || (l = En(c, !1, !0)) === null)
      return null;
    let f = Xf(l);
    if (!f) {
      const p = n.value;
      return (!p || p.name !== c) && (f === null ? n.value = {
        name: c
      } : n.value = {
        name: c,
        abort: Bp([l], u)
      }), null;
    }
    o(), i.value !== c && (i.value = c, he(() => {
      t("load", c);
    }));
    const g = e.customise;
    if (g) {
      f = Object.assign({}, f);
      const p = g(f.body, l.name, l.prefix, l.provider);
      typeof p == "string" && (f.body = p);
    }
    const m = ["iconify"];
    return l.prefix !== "" && m.push("iconify--" + l.prefix), l.provider !== "" && m.push("iconify--" + l.provider), { data: f, classes: m };
  }
  function u() {
    const c = s();
    c ? c.data !== a.value?.data && (a.value = c) : a.value = null;
  }
  return r.value ? u() : Se(() => {
    r.value = !0, u();
  }), fe(() => e.icon, u), vt(o), () => {
    const c = a.value;
    if (!c)
      return Jr(Hp, e);
    let l = e;
    return c.classes && (l = {
      ...e,
      class: c.classes.join(" ")
    }), Jr({
      ...Tn,
      ...c.data
    }, l);
  };
}, {
  props: [
    // Icon and render mode
    "icon",
    "mode",
    "ssr",
    // Layout and style
    "width",
    "height",
    "style",
    "color",
    "inline",
    // Transformations
    "rotate",
    "hFlip",
    "horizontalFlip",
    "vFlip",
    "verticalFlip",
    "flip",
    // Misc
    "id",
    "ariaHidden",
    "customise",
    "title"
  ],
  emits: ["load"]
}), lg = /* @__PURE__ */ F({
  __name: "Icon",
  props: {
    name: {}
  },
  setup(e) {
    return (t, n) => typeof t.name == "string" ? (x(), I(d(Wp), {
      key: 0,
      icon: t.name.replace(/^i-/, "")
    }, null, 8, ["icon"])) : (x(), I(Nt(t.name), { key: 1 }));
  }
}), Kp = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Gp = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Up = /^([/\\]\s*){2,}[^/\\]/;
function Yp(e, t = {}) {
  return typeof t == "boolean" && (t = { acceptRelative: t }), t.strict ? Kp.test(e) : Gp.test(e) || (t.acceptRelative ? Up.test(e) : !1);
}
const ug = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "Link",
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    active: { type: Boolean, default: void 0 },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: { default: "" },
    custom: { type: Boolean },
    raw: { type: Boolean },
    class: {},
    to: {},
    href: {},
    external: { type: Boolean },
    target: {},
    rel: {},
    noRel: { type: Boolean },
    prefetchedClass: {},
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    activeClass: { default: "" },
    exactActiveClass: {},
    ariaCurrentValue: { default: "page" },
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(e) {
    const t = e, n = mi(), o = Ie(), r = yt(si(t, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "class")), i = y(() => be({
      extend: be(ia),
      ...ot({
        variants: {
          active: {
            true: t.activeClass,
            false: t.inactiveClass
          }
        }
      }, o.ui?.link || {})
    })), a = y(() => t.to ?? t.href), s = y(() => t.external ? !0 : a.value ? typeof a.value == "string" && Yp(a.value, { acceptRelative: !0 }) : !1);
    function u({ route: l, isActive: f, isExactActive: g }) {
      if (t.active !== void 0)
        return t.active;
      if (!a.value)
        return !1;
      if (t.exactQuery === "partial") {
        if (!na(l.query, n.query)) return !1;
      } else if (t.exactQuery === !0 && !Fe(l.query, n.query))
        return !1;
      return t.exactHash && l.hash !== n.hash ? !1 : !!(t.exact && g || !t.exact && f);
    }
    function c({ route: l, isActive: f, isExactActive: g } = {}) {
      const m = u({ route: l, isActive: f, isExactActive: g });
      return t.raw ? [t.class, m ? t.activeClass : t.inactiveClass] : i.value({ class: t.class, active: m, disabled: t.disabled });
    }
    return (l, f) => !s.value && a.value ? (x(), I(d(xs), K({ key: 0 }, d(r), {
      to: a.value,
      custom: ""
    }), {
      default: B(({ href: g, navigate: m, route: p, isActive: h, isExactActive: v }) => [
        l.custom ? q(l.$slots, "default", qe(K({ key: 0 }, {
          ...l.$attrs,
          ...l.exact && v ? { "aria-current": t.ariaCurrentValue } : {},
          as: l.as,
          type: l.type,
          disabled: l.disabled,
          href: g,
          navigate: m,
          active: u({ route: p, isActive: h, isExactActive: v })
        }))) : (x(), I(yn, K({ key: 1 }, {
          ...l.$attrs,
          ...l.exact && v ? { "aria-current": t.ariaCurrentValue } : {},
          as: l.as,
          type: l.type,
          disabled: l.disabled,
          href: g,
          navigate: m
        }, {
          class: c({ route: p, isActive: h, isExactActive: v })
        }), {
          default: B(() => [
            q(l.$slots, "default", {
              active: u({ route: p, isActive: h, isExactActive: v })
            })
          ]),
          _: 2
        }, 1040, ["class"]))
      ]),
      _: 3
    }, 16, ["to"])) : (x(), oe($e, { key: 1 }, [
      l.custom ? q(l.$slots, "default", qe(K({ key: 0 }, {
        ...l.$attrs,
        as: l.as,
        type: l.type,
        disabled: l.disabled,
        href: a.value,
        target: s.value ? "_blank" : void 0,
        active: l.active,
        isExternal: s.value
      }))) : (x(), I(yn, K({ key: 1 }, {
        ...l.$attrs,
        as: l.as,
        type: l.type,
        disabled: l.disabled,
        href: a.value,
        target: s.value ? "_blank" : void 0,
        isExternal: s.value
      }, {
        class: c()
      }), {
        default: B(() => [
          q(l.$slots, "default", { active: l.active })
        ]),
        _: 3
      }, 16, ["class"]))
    ], 64));
  }
}), Qp = {
  slots: {
    root: "w-full",
    item: "border-b border-default last:border-b-0",
    header: "flex",
    trigger: "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0",
    content: "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
    body: "text-sm pb-3.5",
    leadingIcon: "shrink-0 size-5",
    trailingIcon: "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
    label: "text-start break-words"
  },
  variants: {
    disabled: {
      true: {
        trigger: "cursor-not-allowed opacity-75"
      }
    }
  }
}, cg = /* @__PURE__ */ F({
  __name: "Accordion",
  props: {
    as: {},
    items: {},
    trailingIcon: {},
    labelKey: { default: "label" },
    class: {},
    ui: {},
    collapsible: { type: Boolean, default: !0 },
    defaultValue: {},
    modelValue: {},
    type: { default: "single" },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = zt(), i = Ie(), a = To(Yt(n, "as", "collapsible", "defaultValue", "disabled", "modelValue", "type", "unmountOnHide"), o), s = y(() => be({ extend: be(Qp), ...i.ui?.accordion || {} })({
      disabled: n.disabled
    }));
    return (u, c) => (x(), I(d(Bl), K(d(a), {
      class: s.value.root({ class: [n.ui?.root, n.class] })
    }), {
      default: B(() => [
        (x(!0), oe($e, null, Rt(n.items, (l, f) => (x(), I(d(Ml), {
          key: f,
          value: l.value || String(f),
          disabled: l.disabled,
          class: N(s.value.item({ class: [n.ui?.item, l.ui?.item, l.class] }))
        }, {
          default: B(({ open: g }) => [
            ie(d(Rl), {
              as: "div",
              class: N(s.value.header({ class: [n.ui?.header, l.ui?.header] }))
            }, {
              default: B(() => [
                ie(d(Nl), {
                  class: N(s.value.trigger({ class: [n.ui?.trigger, l.ui?.trigger], disabled: l.disabled }))
                }, {
                  default: B(() => [
                    q(u.$slots, "leading", {
                      item: l,
                      index: f,
                      open: g
                    }, () => [
                      l.icon ? (x(), I(Ae, {
                        key: 0,
                        name: l.icon,
                        class: N(s.value.leadingIcon({ class: [n.ui?.leadingIcon, l?.ui?.leadingIcon] }))
                      }, null, 8, ["name", "class"])) : ne("", !0)
                    ]),
                    d(Le)(l, n.labelKey) || r.default ? (x(), oe("span", {
                      key: 0,
                      class: N(s.value.label({ class: [n.ui?.label, l.ui?.label] }))
                    }, [
                      q(u.$slots, "default", {
                        item: l,
                        index: f,
                        open: g
                      }, () => [
                        Ce(we(d(Le)(l, n.labelKey)), 1)
                      ])
                    ], 2)) : ne("", !0),
                    q(u.$slots, "trailing", {
                      item: l,
                      index: f,
                      open: g
                    }, () => [
                      ie(Ae, {
                        name: l.trailingIcon || u.trailingIcon || d(i).ui.icons.chevronDown,
                        class: N(s.value.trailingIcon({ class: [n.ui?.trailingIcon, l.ui?.trailingIcon] }))
                      }, null, 8, ["name", "class"])
                    ])
                  ]),
                  _: 2
                }, 1032, ["class"])
              ]),
              _: 2
            }, 1032, ["class"]),
            l.content || r.content || l.slot && r[l.slot] || r.body || l.slot && r[`${l.slot}-body`] ? (x(), I(d(Fl), {
              key: 0,
              class: N(s.value.content({ class: [n.ui?.content, l.ui?.content] }))
            }, {
              default: B(() => [
                q(u.$slots, l.slot || "content", {
                  item: l,
                  index: f,
                  open: g
                }, () => [
                  Je("div", {
                    class: N(s.value.body({ class: [n.ui?.body, l.ui?.body] }))
                  }, [
                    q(u.$slots, l.slot ? `${l.slot}-body` : "body", {
                      item: l,
                      index: f,
                      open: g
                    }, () => [
                      Ce(we(l.content), 1)
                    ])
                  ], 2)
                ])
              ]),
              _: 2
            }, 1032, ["class"])) : ne("", !0)
          ]),
          _: 2
        }, 1032, ["value", "disabled", "class"]))), 128))
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Jp = {
  slots: {
    root: "",
    wrapper: "",
    labelWrapper: "flex content-center items-center justify-between",
    label: "block font-medium text-default",
    container: "mt-1 relative",
    description: "text-muted",
    error: "mt-2 text-error",
    hint: "text-muted",
    help: "mt-2 text-muted"
  },
  variants: {
    size: {
      xs: {
        root: "text-xs"
      },
      sm: {
        root: "text-xs"
      },
      md: {
        root: "text-sm"
      },
      lg: {
        root: "text-sm"
      },
      xl: {
        root: "text-base"
      }
    },
    required: {
      true: {
        label: "after:content-['*'] after:ms-0.5 after:text-error"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
}, Xp = ["id"], Zp = ["id"], eg = ["id"], tg = ["id"], dg = /* @__PURE__ */ F({
  __name: "FormField",
  props: {
    as: {},
    name: {},
    errorPattern: {},
    label: {},
    description: {},
    help: {},
    error: { type: [Boolean, String] },
    hint: {},
    size: {},
    required: { type: Boolean },
    eagerValidation: { type: Boolean },
    validateOnInputDelay: {},
    class: {},
    ui: {}
  },
  setup(e) {
    const t = e, n = zt(), o = Ie(), r = y(() => be({ extend: be(Jp), ...o.ui?.formField || {} })({
      size: t.size,
      required: t.required
    })), i = xe(Rd, null), a = y(() => t.error || i?.value?.find((c) => c.name && (c.name === t.name || t.errorPattern && c.name.match(t.errorPattern)))?.message), s = D(oi()), u = s.value;
    return pt(Ni, s), pt(no, y(() => ({
      error: a.value,
      name: t.name,
      size: t.size,
      eagerValidation: t.eagerValidation,
      validateOnInputDelay: t.validateOnInputDelay,
      errorPattern: t.errorPattern,
      hint: t.hint,
      description: t.description,
      help: t.help,
      ariaId: u
    }))), (c, l) => (x(), I(d(re), {
      as: c.as,
      class: N(r.value.root({ class: [t.ui?.root, t.class] }))
    }, {
      default: B(() => [
        Je("div", {
          class: N(r.value.wrapper({ class: t.ui?.wrapper }))
        }, [
          c.label || n.label ? (x(), oe("div", {
            key: 0,
            class: N(r.value.labelWrapper({ class: t.ui?.labelWrapper }))
          }, [
            ie(d(Di), {
              for: s.value,
              class: N(r.value.label({ class: t.ui?.label }))
            }, {
              default: B(() => [
                q(c.$slots, "label", { label: c.label }, () => [
                  Ce(we(c.label), 1)
                ])
              ]),
              _: 3
            }, 8, ["for", "class"]),
            c.hint || n.hint ? (x(), oe("span", {
              key: 0,
              id: `${d(u)}-hint`,
              class: N(r.value.hint({ class: t.ui?.hint }))
            }, [
              q(c.$slots, "hint", { hint: c.hint }, () => [
                Ce(we(c.hint), 1)
              ])
            ], 10, Xp)) : ne("", !0)
          ], 2)) : ne("", !0),
          c.description || n.description ? (x(), oe("p", {
            key: 1,
            id: `${d(u)}-description`,
            class: N(r.value.description({ class: t.ui?.description }))
          }, [
            q(c.$slots, "description", { description: c.description }, () => [
              Ce(we(c.description), 1)
            ])
          ], 10, Zp)) : ne("", !0)
        ], 2),
        Je("div", {
          class: N([(c.label || !!n.label || c.description || !!n.description) && r.value.container({ class: t.ui?.container })])
        }, [
          q(c.$slots, "default", { error: a.value }),
          typeof a.value == "string" && a.value || n.error ? (x(), oe("div", {
            key: 0,
            id: `${d(u)}-error`,
            class: N(r.value.error({ class: t.ui?.error }))
          }, [
            q(c.$slots, "error", { error: a.value }, () => [
              Ce(we(a.value), 1)
            ])
          ], 10, eg)) : c.help || n.help ? (x(), oe("div", {
            key: 1,
            id: `${d(u)}-help`,
            class: N(r.value.help({ class: t.ui?.help }))
          }, [
            q(c.$slots, "help", { help: c.help }, () => [
              Ce(we(c.help), 1)
            ])
          ], 10, tg)) : ne("", !0)
        ], 2)
      ]),
      _: 3
    }, 8, ["as", "class"]));
  }
});
export {
  cg as UAccordion,
  ig as UColorModeButton,
  ag as UColorModeSelect,
  sg as UColorModeSwitch,
  dg as UFormField,
  lg as UIcon,
  ug as ULink,
  yn as ULinkBase,
  Ie as useAppConfig
};