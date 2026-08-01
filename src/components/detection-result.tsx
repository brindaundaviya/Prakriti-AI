import { AlertTriangle, Leaf, Percent, Ruler, ShieldCheck, FlaskConical, Sparkles, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DISEASES, SEVERITY_KEY, type DetectionResult, type Severity } from "@/lib/crop-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SEVERITY_STYLE: Record<Severity, string> = {
  low: "bg-success/15 text-success border-success/30",
  moderate: "bg-warning/15 text-warning border-warning/30",
  high: "bg-accent/15 text-accent border-accent/30",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const { t } = useI18n();
  return (
    <Badge variant="outline" className={cn("rounded-full px-3 py-1", SEVERITY_STYLE[severity])}>
      {t(SEVERITY_KEY[severity])}
    </Badge>
  );
}

function AdviceList({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: typeof Leaf;
  title: string;
  items: string[];
  tone: "primary" | "accent" | "muted";
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary/12 text-primary ring-primary/25"
      : tone === "accent"
        ? "bg-accent/12 text-accent ring-accent/25"
        : "bg-secondary text-foreground ring-border";

  return (
    <Card className="surface-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <span className={cn("grid size-9 place-items-center rounded-xl ring-1", toneClass)}>
            <Icon className="size-4.5" aria-hidden />
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function DetectionResultView({ result }: { result: DetectionResult }) {
  const { t, tl } = useI18n();
  const disease = DISEASES.find((d) => d.id === result.diseaseId) ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="surface-card overflow-hidden">
        <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <img
            src={result.imageDataUrl}
            alt={tl(result.name)}
            className="aspect-square w-full rounded-2xl border border-border object-cover"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/10 text-primary">
                {t("detect.crop")}: {tl(result.crop)}
              </Badge>
              <SeverityBadge severity={result.severity} />
            </div>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{tl(result.name)}</h2>
            {disease ? (
              <>
                <p className="mt-1 text-xs italic text-muted-foreground">{disease.pathogen}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tl(disease.summary)}
                </p>
              </>
            ) : (
              <p className="mt-3 flex items-center gap-2 text-sm text-success">
                <ShieldCheck className="size-4" aria-hidden />
                {tl(result.name)}
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-secondary/60 p-4">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Percent className="size-3.5" aria-hidden />
                  {t("detect.confidence")}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-primary">
                  {result.confidence}%
                </p>
                <Progress value={result.confidence} className="mt-2 h-1.5" />
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <AlertTriangle className="size-3.5" aria-hidden />
                  {t("detect.severity")}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {t(SEVERITY_KEY[result.severity])}
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-4">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Ruler className="size-3.5" aria-hidden />
                  {t("detect.affected")}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">{result.affectedArea}%</p>
                <Progress value={result.affectedArea} className="mt-2 h-1.5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {disease ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <AdviceList
            icon={Stethoscope}
            tone="muted"
            title={t("treat.symptoms")}
            items={disease.symptoms.map(tl)}
          />
          <AdviceList
            icon={Leaf}
            tone="primary"
            title={t("treat.organic")}
            items={disease.organic.map(tl)}
          />
          <AdviceList
            icon={FlaskConical}
            tone="accent"
            title={t("treat.chemical")}
            items={disease.chemical.map(tl)}
          />
          <AdviceList
            icon={ShieldCheck}
            tone="primary"
            title={t("treat.prevention")}
            items={disease.prevention.map(tl)}
          />
          <div className="lg:col-span-2">
            <AdviceList
              icon={Sparkles}
              tone="muted"
              title={t("treat.care")}
              items={disease.care.map(tl)}
            />
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
