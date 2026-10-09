"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calculator, Database, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/calculator", label: "Hesaplayici", icon: Calculator },
  { href: "/analytics", label: "Analizler", icon: BarChart3 },
  { href: "/emission-factors", label: "Faktorler", icon: Database }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Ana navigasyon" className="mt-8 space-y-1">
      {navigation.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              active ? "bg-muted text-foreground" : "text-muted-foreground"
            )}
            href={item.href}
            key={item.href}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobil navigasyon"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-background lg:hidden"
    >
      {navigation.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
              active ? "text-emerald-600" : "text-muted-foreground"
            )}
            href={item.href}
            key={item.href}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
