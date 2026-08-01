import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Inbox, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DetectionResultView, SeverityBadge } from "@/components/detection-result";
import { useDetectionHistory } from "@/hooks/use-detection-history";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Detection History — Prakriti AI" },
      {
        name: "description",
        content: "Review every crop scan you have run, with diagnosis, severity and treatment details.",
      },
      { property: "og:title", content: "Detection History — Prakriti AI" },
      {
        property: "og:description",
        content: "Your saved crop scans with diagnosis, severity and treatment details.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { t, tl } = useI18n();
  const { history, loaded, clear } = useDetectionHistory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = history.find((h) => h.id === selectedId) ?? history[0] ?? null;

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <h1 className="truncate text-3xl font-semibold sm:text-4xl">{t("hist.title")}</h1>
          {history.length > 0 ? (
            <Button
              variant="outline"
              className="shrink-0 rounded-2xl"
              onClick={() => {
                clear();
                setSelectedId(null);
                toast.success(t("hist.cleared"));
              }}
            >
              <Trash2 className="size-4" aria-hidden />
              {t("hist.clear")}
            </Button>
          ) : null}
        </header>

        {!loaded ? (
          <div className="mt-8 space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <Card className="surface-card mt-8">
            <CardContent className="flex flex-col items-center gap-3 py-20 text-center">
              <span className="grid size-16 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                <Inbox className="size-7" aria-hidden />
              </span>
              <p className="text-lg font-semibold">{t("hist.empty")}</p>
              <p className="max-w-xs text-sm text-muted-foreground">{t("hist.emptyDesc")}</p>
              <Button asChild className="mt-3 h-12 rounded-2xl px-6 font-semibold">
                <Link to="/detect">{t("cta.start")}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <ul className="space-y-3">
              {history.map((h, i) => (
                <motion.li
                  key={h.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(h.id)}
                    className={cn(
                      "grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40",
                      selected?.id === h.id && "border-primary/60 bg-primary/10",
                    )}
                  >
                    <img
                      src={h.imageDataUrl}
                      alt={tl(h.name)}
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{tl(h.name)}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {tl(h.crop)} · {new Date(h.createdAt).toLocaleString()}
                      </span>
                      <span className="mt-1.5 block">
                        <SeverityBadge severity={h.severity} />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <div>{selected ? <DetectionResultView result={selected} /> : null}</div>
          </div>
        )}
      </div>
    </div>
  );
}
