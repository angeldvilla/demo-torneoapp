"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { icon: "🏁", label: "Dashboard", href: "/admin" },
  { icon: "🏆", label: "Torneos", href: "/admin/torneo" },
  { icon: "👥", label: "Equipos", href: "/admin/torneo" },
  { icon: "🗓️", label: "Calendario", href: "/admin/torneo" },
  { icon: "📝", label: "Operación", href: "/admin/torneo" },
  { icon: "⚙️", label: "Configuración", href: "/admin/torneo" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`sticky top-0 h-screen overflow-hidden border-r border-gray-200 bg-slate-950 text-slate-100 transition-all duration-300 ${
        expanded ? "w-80" : "w-24"
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6 p-6">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-900/90 text-white shadow-sm transition hover:bg-slate-800 ${
              expanded ? "gap-3 px-4 py-3" : "p-3"
            }`}
          >
            <span className="text-lg">{expanded ? "⬅️" : "➡️"}</span>
            {expanded && (
              <span className="text-sm font-semibold">Contraer panel</span>
            )}
          </button>

          <div
            className={`rounded-3xl border border-slate-800 bg-[#0f172a] shadow-sm transition-all duration-300 ${
              expanded ? "p-5" : "p-4"
            }`}
          >
            {expanded && (
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Panel admin
              </p>
            )}
            <div
              className={`mt-4 flex items-center ${expanded ? "gap-3" : "justify-center"}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500 text-lg font-bold text-white">
                T
              </div>
              {expanded && (
                <div>
                  <p className="font-semibold text-white">TorneoApp</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Gestión de torneos
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={`group relative flex items-center gap-4 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-600/20 text-blue-300 border-l-2 border-blue-500"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                  title={item.label}
                >
                  <span className="text-lg">{item.icon}</span>
                  {expanded && (
                    <>
                      <span>{item.label}</span>
                      {active && (
                        <span className="ml-auto inline-flex h-2 w-2 rounded-full bg-blue-400"></span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="rounded-t-3xl border-t border-slate-800 bg-[#0f172a] p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-3xl bg-linear-to-br from-blue-500 to-cyan-400 p-3 text-center text-xl font-bold text-slate-950">
              A
            </div>
            {expanded && (
              <div>
                <p className="font-semibold text-white">Admin Torneo</p>
                <p className="text-sm text-slate-400">Administrador</p>
              </div>
            )}
          </div>
          {expanded && (
            <div className="mt-5 rounded-3xl bg-slate-900 p-4 text-sm text-slate-300">
              <p className="font-medium text-slate-100">Panel profesional</p>
              <p className="mt-2 text-xs text-slate-500">
                Administra torneos, equipos y resultados en un solo lugar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
