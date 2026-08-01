import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Menu, Languages, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LANGUAGES, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/detect", key: "nav.detect" },
  { to: "/dashboard", key: "nav.dashboard" },
  { to: "/library", key: "nav.library" },
  { to: "/history", key: "nav.history" },
  { to: "/profile", key: "nav.profile" },
] as const;

function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("gap-2 rounded-full", className)}>
          <Languages className="size-4" aria-hidden />
          <span className="text-sm font-medium">{current?.native}</span>
          <span className="sr-only">{t("nav.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLanguage(l.code)}
            className="flex items-center justify-between gap-3"
          >
            <span>
              {l.native}
              <span className="ml-2 text-xs text-muted-foreground">{l.label}</span>
            </span>
            {l.code === language ? <Check className="size-4 text-primary" aria-hidden /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 w-[min(100%-1.5rem,72rem)] rounded-2xl glass-strong px-3 py-2 sm:px-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Leaf className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold leading-tight">
                {t("brand.name")}
              </span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                {t("brand.tagline")}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <nav className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    pathname === item.to && "bg-primary/15 text-primary",
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            <LanguageSwitcher />

            <Button asChild size="sm" className="hidden rounded-full font-semibold sm:inline-flex">
              <Link to="/detect">{t("cta.start")}</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" aria-hidden />
                  <span className="sr-only">{t("nav.menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-border bg-card p-6">
                <SheetTitle className="mb-6 font-display">{t("brand.name")}</SheetTitle>
                <nav className="flex flex-col gap-1">
                  {NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                        pathname === item.to && "bg-primary/15 text-primary",
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-6 w-full rounded-xl py-6 text-base font-semibold">
                  <Link to="/detect" onClick={() => setOpen(false)}>
                    {t("cta.start")}
                  </Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <span className="flex items-center gap-2 font-display text-sm font-semibold">
          <Leaf className="size-4 text-primary" aria-hidden />
          {t("brand.name")}
        </span>
        <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
          {t("common.footer")}
        </p>
      </div>
    </footer>
  );
}
