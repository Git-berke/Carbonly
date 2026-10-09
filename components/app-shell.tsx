import Link from "next/link";
import {
  BarChart3,
  Calculator,
  Database,
  Gauge,
  Leaf,
  Menu
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/calculator", label: "Hesaplayici", icon: Calculator },
  { href: "/analytics", label: "Analizler", icon: BarChart3 },
  { href: "/emission-factors", label: "Faktorler", icon: Database }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-sidebar px-4 py-5 lg:block">
        <Brand />
        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <Link
              className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 rounded-lg border border-border bg-surface p-4">
          <Badge tone="amber">Demo modu hazir</Badge>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Kullanici kayitlari bu tarayicida saklanir; sunucuya gonderilmez.
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <Button aria-label="Menuyu ac" size="icon" variant="ghost">
              <Menu className="size-5" />
            </Button>
            <Brand compact />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-muted-foreground">
              Girişsiz karbon emisyonu hesaplama paneli
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="emerald">Yerel veri</Badge>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
          {children}
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-background lg:hidden">
          {navigation.map((item) => (
            <Link
              className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground"
              href={item.href}
              key={item.href}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="flex items-center gap-3" href="/">
      <span className="flex size-10 items-center justify-center rounded-md bg-emerald-600 text-white">
        <Leaf className="size-5" />
      </span>
      {!compact ? (
        <span>
          <span className="block text-lg font-semibold tracking-normal">
            Carbonly
          </span>
          <span className="block text-xs text-muted-foreground">
            Emisyon analiz MVP
          </span>
        </span>
      ) : (
        <span className="text-base font-semibold">Carbonly</span>
      )}
    </Link>
  );
}
