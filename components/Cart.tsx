"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cart, useCart } from "@/lib/cart";
import type { Dictionary } from "@/content/en";

type CartCopy = Dictionary["shop"]["cart"];
export type CartProduct = { key: string; name: string; price: number; image: string };

const EASE = [0.22, 1, 0.36, 1] as const;

function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

/** Header button: shows how many items are in the cart and opens it. */
export function CartButton({ label, className = "" }: { label: string; className?: string }) {
  const { lines } = useCart();
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return (
    <button
      type="button"
      onClick={cart.open}
      aria-label={count ? `${label} (${count})` : label}
      className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-fog ${className}`}
    >
      <BagIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1 text-[0.7rem] font-bold text-paper tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}

/** Size picker + button on each product. */
export function AddToCart({ product, sizes, copy }: { product: string; sizes: readonly string[]; copy: CartCopy }) {
  const [size, setSize] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [missing, setMissing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const add = () => {
    if (sizes.length && !size) {
      setMissing(true);
      return;
    }
    cart.add(product, sizes.length ? size : null);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="grid gap-3">
      {sizes.length > 0 ? (
        <fieldset>
          <legend className={`text-sm font-bold ${missing ? "text-[#c2264b]" : "text-ink"}`}>{missing ? copy.chooseSize : copy.size}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name={`size-${product}`}
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s);
                    setMissing(false);
                  }}
                  className="peer sr-only"
                />
                <span className="flex h-11 min-w-11 items-center justify-center rounded-full border border-ink/20 px-3 text-sm font-bold transition-colors hover:border-ink peer-checked:border-royal peer-checked:bg-royal peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-signal peer-focus-visible:ring-offset-2">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="text-sm font-bold text-slate">{copy.oneSize}</p>
      )}
      <button
        type="button"
        onClick={add}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-royal px-6 font-bold text-paper transition-colors duration-300 hover:bg-ink"
      >
        <BagIcon className="h-5 w-5" />
        <span aria-live="polite">{added ? `✓ ${copy.added}` : copy.add}</span>
      </button>
    </div>
  );
}

/** Slide-in cart. Mounted once in the layout so it works from any page. */
export function CartDrawer({ copy, products, intl, orderSoon }: { copy: CartCopy; products: CartProduct[]; intl: string; orderSoon: string }) {
  const { lines, open } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const price = new Intl.NumberFormat(intl, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const items = lines
    .map((l) => ({ ...l, product: products.find((p) => p.key === l.product) }))
    .filter((l): l is typeof l & { product: CartProduct } => !!l.product);
  const subtotal = items.reduce((n, l) => n + l.qty * l.product.price, 0);
  const count = items.reduce((n, l) => n + l.qty, 0);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open]);

  const stepper = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-lg leading-none transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cart.close}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            tabIndex={-1}
            data-lenis-prevent
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-[-20px_0_60px_-30px_rgba(11,27,77,0.5)] outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl font-extrabold uppercase text-royal">
                {copy.title}
                {count > 0 && <span className="ml-2 text-base font-bold normal-case text-slate">· {count} {copy.itemsLabel}</span>}
              </h2>
              <button type="button" onClick={cart.close} aria-label={copy.close} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-fog">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <BagIcon className="h-14 w-14 text-royal/30" />
                <p className="text-lead text-slate">{copy.empty}</p>
                <button type="button" onClick={cart.close} className="link-underline cursor-pointer font-bold text-royal">
                  {copy.continue}
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  {items.map((l) => (
                    <li key={`${l.product.key}-${l.size}`} className="flex gap-4 py-5">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#efefef]">
                        <Image src={l.product.image} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold leading-snug">{l.product.name}</p>
                            <p className="text-sm text-slate">
                              {copy.size}: {l.size ?? copy.oneSize}
                            </p>
                          </div>
                          <p className="font-bold tabular-nums">{price.format(l.qty * l.product.price)}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className={stepper}
                              aria-label={copy.decrease}
                              onClick={() => cart.setQty(l.product.key, l.size, l.qty - 1)}
                            >
                              −
                            </button>
                            <span className="min-w-5 text-center font-bold tabular-nums" aria-live="polite">
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              className={stepper}
                              aria-label={copy.increase}
                              disabled={l.qty >= cart.maxQty}
                              onClick={() => cart.setQty(l.product.key, l.size, l.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button type="button" onClick={() => cart.remove(l.product.key, l.size)} className="cursor-pointer text-sm text-slate underline underline-offset-4 hover:text-ink">
                            {copy.remove}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold">{copy.subtotal}</span>
                    <span className="font-display text-2xl font-extrabold text-royal tabular-nums">{price.format(subtotal)}</span>
                  </div>
                  <button
                    type="button"
                    disabled
                    aria-label={`${copy.checkout}: ${orderSoon}`}
                    aria-describedby="cart-closed-note"
                    className="mt-4 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-royal px-6 font-bold text-paper opacity-45"
                  >
                    {orderSoon}
                  </button>
                  <p id="cart-closed-note" className="mt-3 text-center text-sm text-slate">
                    {copy.closedNote}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
