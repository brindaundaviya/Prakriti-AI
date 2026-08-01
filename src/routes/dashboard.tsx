import { createFileRoute, Link } from "@tanstack/react-router";
import { ScanLine, ShieldCheck, Percent, AlertTriangle, ArrowRight, Inbox } from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SeverityBadge } from "@/components/detection-result";
import { WeatherWidget } from "@/components/weather-widget";
import { useDetectionHistory } from "@/hooks/use-detection-history";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farm Dashboard — Prakriti AI" },
      {
        name: "description",
        content:
          "Track recent crop scans, detection statistics, weather conditions and spraying advice for your fields.",
      },
      { property: "og:title", content: "Farm Dashboard — Prakriti AI" },
      {
        property: "og:description",
        content: "Recent scans, detection stats and weather-aware spraying advice.",
      },
    ],
  }),
  component: DashboardPage,
});

const TREND = [
  { d: "Mon", scans: 2 },
  { d: "Tue", scans: 5 },
  { d: "Wed", scans: 3 },
  { d: "Thu", scans: 7 },
  { d: "Fri", scans: 4 },
  { d: "Sat", scans: 8 },
  { d: "Sun", scans: 6 },
];

function DashboardPage() {
  const { t, tl } = useI18n();
  const { history, loaded } = useDetectionHistory();

  const total = history.length;
  const healthy = history.filter((h) => !h.diseaseId).length;
  const needAction = history.filter((h) => h.severity === "high" || h.severity === "critical").length;
  const avgConfidence = total
    ? Math.round(history.reduce((s, h) => s + h.confidence, 0) / total)
    : 0;

  const stats = [
    { icon: ScanLine, label: t("dash.totalScans"), value: String(total), tone: "text-primary" },
    { icon: ShieldCheck, label: t("dash.healthy"), value: String(healthy), tone: "text-success" },
    { icon: Percent, label: t("dash.avgConfidence"), value: total ? `${avgConfidence}%` : "—", tone: "text-accent" },
    { icon: AlertTriangle, label: t("dash.needAction"), value: String(needAction), tone: "text-destructive" },
  ];

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{t("dash.welcome")}</p>
            <h1 className="truncate text-3xl font-semibold sm:text-4xl">{t("dash.title")}</h1>
          </div>
          <Button asChild className="shrink-0 rounded-2xl font-semibold">
            <Link to="/detect">{t("cta.start")}</Link>
          </Button>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="surface-card">
                <CardContent className="p-5">
                  <s.icon className={`size-5 ${s.tone}`} aria-hidden />
                  {loaded ? (
                    <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
                  ) : (
                    <Skeleton className="mt-3 h-9 w-16" />
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <Card className="surface-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("dash.trend")}</CardTitle>
              </CardHeader>
              <CardContent className="h-60 pl-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TREND} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="scanFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="d" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} width={28} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "0.75rem",
                        color: "var(--color-popover-foreground)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="scans"
                      stroke="var(--color-primary)"
                      strokeWidth={2.5}
                      fill="url(#scanFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base">{t("dash.recent")}</CardTitle>
                <Button asChild variant="ghost" size="sm" className="text-primary">
                  <Link to="/history">
                    {t("cta.viewAll")}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {!loaded ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                    ))}
                  </div>
                ) : history.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                      <Inbox className="size-6" aria-hidden />
                    </span>
                    <p className="font-semibold">{t("hist.empty")}</p>
                    <p className="max-w-xs text-sm text-muted-foreground">{t("hist.emptyDesc")}</p>
                    <Button asChild className="mt-2 rounded-xl font-semibold">
                      <Link to="/detect">{t("cta.start")}</Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {history.slice(0, 5).map((h) => (
                      <li
                        key={h.id}
                        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-secondary/50 p-3"
                      >
                        <img
                          src={h.imageDataUrl}
                          alt={tl(h.name)}
                          className="size-12 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{tl(h.name)}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {tl(h.crop)} · {new Date(h.createdAt).toLocaleDateString()} · {h.confidence}%
                          </p>
                        </div>
                        <SeverityBadge severity={h.severity} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <WeatherWidget />
        </div>
      </div>
    </div>
  );
}
