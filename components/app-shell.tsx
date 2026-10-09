import Link from "next/link";
import { Leaf } from "lucide-react";
import { MobileNavigation, SidebarNavigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-sidebar px-4 py-5 lg:block">
        <Brand />
        <SidebarNavigation />
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
            <Brand compact />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-muted-foreground">
              Girissiz karbon emisyonu hesaplama paneli
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

        <MobileNavigation />
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
