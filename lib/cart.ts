"use client";

import { useSyncExternalStore } from "react";

/**
 * Shop cart, kept in this browser only (localStorage). Ordering isn't open yet,
 * so the cart stops at checkout; it is ready for when it is.
 */
export type CartLine = { product: string; size: string | null; qty: number };
type CartState = { lines: CartLine[]; open: boolean };

const KEY = "escp-ai-cart-v1";
const MAX_QTY = 10;
const EMPTY: CartState = { lines: [], open: false };

let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    if (Array.isArray(saved)) {
      state = {
        ...state,
        lines: saved
          .filter((l) => l && typeof l.product === "string" && Number.isInteger(l.qty) && l.qty > 0)
          .map((l) => ({ product: l.product, size: typeof l.size === "string" ? l.size : null, qty: Math.min(l.qty, MAX_QTY) })),
      };
    }
  } catch {
    // Storage blocked or corrupt: start with an empty cart.
  }
}

function set(next: Partial<CartState>) {
  state = { ...state, ...next };
  if (next.lines) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {
      // Private mode: the cart still works for this visit.
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  // Keep tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      state = { ...state, lines: [] };
      load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const same = (l: CartLine, product: string, size: string | null) => l.product === product && l.size === size;

export const cart = {
  add(product: string, size: string | null) {
    load();
    const existing = state.lines.find((l) => same(l, product, size));
    const lines = existing
      ? state.lines.map((l) => (l === existing ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l))
      : [...state.lines, { product, size, qty: 1 }];
    set({ lines, open: true });
  },
  setQty(product: string, size: string | null, qty: number) {
    const lines =
      qty <= 0
        ? state.lines.filter((l) => !same(l, product, size))
        : state.lines.map((l) => (same(l, product, size) ? { ...l, qty: Math.min(qty, MAX_QTY) } : l));
    set({ lines });
  },
  remove(product: string, size: string | null) {
    set({ lines: state.lines.filter((l) => !same(l, product, size)) });
  },
  open: () => set({ open: true }),
  close: () => set({ open: false }),
  maxQty: MAX_QTY,
};

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY,
  );
}
