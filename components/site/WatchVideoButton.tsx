"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bolt, Close, Play } from "../ui/Icons";

export default function WatchVideoButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-none border border-ink-200 bg-white px-7 font-display text-[0.875rem] font-bold uppercase tracking-[0.12em] text-ink-900 transition-[border-color,background-color,transform] duration-200 hover:border-ink-900 hover:bg-ink-50 active:translate-y-px ${className}`}
      >
        <span className="grid h-6 w-6 place-items-center rounded-none bg-ink-900 text-white">
          <Play className="h-3 w-3" />
        </span>
        Watch Video
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="VOLTSPRINT brand film"
              className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            >
              <button
                type="button"
                aria-label="Close video"
                onClick={close}
                className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-sm"
              />
              <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-ink-950 shadow-2xl">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="absolute right-4 top-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <Close className="h-5 w-5" />
                </button>
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2c3239,#0a0c0e_70%)]" />
                  <div className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(115deg,transparent_0_38px,rgba(198,241,53,0.06)_38px_40px)]" />
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div className="px-6">
                      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-volt-500/40 text-volt-500">
                        <Bolt className="h-7 w-7" />
                      </span>
                      <p className="mt-6 font-display text-2xl font-extrabold uppercase tracking-[0.08em] text-white sm:text-3xl">
                        Voltsprint — Zero Limits
                      </p>
                      <p className="mx-auto mt-3 max-w-md text-sm text-ink-300">
                        The brand film is available on our media portal. Press play to stream
                        the full 4K cut.
                      </p>
                      <span className="mt-7 inline-flex items-center gap-3 rounded-full bg-volt-500 px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-900">
                        <Play className="h-4 w-4" />
                        Stream 04:12
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
