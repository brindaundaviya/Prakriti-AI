import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ScanLine,
  Gauge,
  Sprout,
  CloudSun,
  BookOpen,
  History,
  Camera,
  Cpu,
  ClipboardCheck,
  Check,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { TEAM } from "@/lib/crop-data";
import heroVideo from "@/assets/farm-hero.mp4.asset.json";
import heroPoster from "@/assets/farm-poster.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakriti AI — Nature Meets Intelligence" },
      {
        name: "description",
        content:
          "Snap a leaf photo and get an instant AI crop disease diagnosis with severity, affected area and organic or chemical treatment plans in English, Hindi and Gujarati.",
      },
      { property: "og:title", content: "Prakriti AI — Nature Meets Intelligence" },
      {
        property: "og:description",
        content:
          "AI-powered crop disease detection for Indian farmers: instant diagnosis, severity scoring and treatment plans.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

function Landing() {
  const { t, tl } = useI18n();

  const features = [
    { icon: ScanLine, title: t("features.f1.title"), desc: t("features.f1.desc") },
    { icon: Gauge, title: t("features.f2.title"), desc: t("features.f2.desc") },
    { icon: Sprout, title: t("features.f3.title"), desc: t("features.f3.desc") },
    { icon: CloudSun, title: t("features.f4.title"), desc: t("features.f4.desc") },
    { icon: BookOpen, title: t("features.f5.title"), desc: t("features.f5.desc") },
    { icon: History, title: t("features.f6.title"), desc: t("features.f6.desc") },
  ];

  const steps = [
    { icon: Camera, title: t("how.s1.title"), desc: t("how.s1.desc") },
    { icon: Cpu, title: t("how.s2.title"), desc: t("how.s2.desc") },
    { icon: ClipboardCheck, title: t("how.s3.title"), desc: t("how.s3.desc") },
  ];

  const benefits = [t("benefits.b1"), t("benefits.b2"), t("benefits.b3"), t("benefits.b4")];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          preload="metadata"
          aria-hidden
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/72" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80"
          aria-hidden
        />

        <div className="relative mx-auto w-[min(100%-2rem,72rem)] py-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
          >
            <Sprout className="size-3.5" aria-hidden />
            {t("brand.tagline")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            {t("brand.name")} <span className="text-gradient">— {t("brand.tagline")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="glow-ring h-14 w-full rounded-2xl px-8 text-base font-semibold sm:w-auto"
            >
              <Link to="/detect">
                {t("cta.start")}
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-2xl border-border/80 bg-background/40 px-8 text-base font-semibold backdrop-blur sm:w-auto"
            >
              <a href="#features">{t("cta.explore")}</a>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3"
          >
            {[
              { v: "38+", l: t("hero.stat1") },
              { v: "96.4%", l: t("hero.stat2") },
              { v: "12,400", l: t("hero.stat3") },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-3 py-4">
                <dt className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                  {s.v}
                </dt>
                <dd className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-xs">
                  {s.l}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <span className="flex animate-float flex-col items-center gap-1 text-[11px] text-muted-foreground">
            {t("hero.scroll")}
            <ChevronDown className="size-4" aria-hidden />
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow={t("nav.detect")}
              title={t("features.title")}
              subtitle={t("features.subtitle")}
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <Card className="surface-card group h-full transition-transform duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-colors group-hover:bg-primary/20">
                      <f.icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionHeading title={t("how.title")} />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="surface-card relative h-full rounded-3xl p-7">
                  <span className="absolute right-6 top-5 font-display text-5xl font-bold text-primary/12">
                    0{i + 1}
                  </span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/25">
                    <s.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">{t("benefits.title")}</h2>
              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-base text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-9 h-13 rounded-2xl px-7 text-base font-semibold">
                <Link to="/detect">
                  {t("cta.start")}
                  <ArrowRight className="size-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elegant)]">
              <img
                src={heroPoster}
                alt="Aerial view of healthy Indian farmland at sunrise"
                loading="lazy"
                width={1920}
                height={1080}
                className="size-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 glass rounded-2xl px-4 py-3">
                <p className="text-xs text-muted-foreground">{t("dash.avgConfidence")}</p>
                <p className="font-display text-2xl font-semibold text-primary">96.4%</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pb-28 pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center">
          <Reveal className="w-full">
            <SectionHeading title={t("team.title")} subtitle={t("team.subtitle")} />
          </Reveal>
          <div className="mt-14 grid w-full max-w-6xl justify-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07} className="w-full max-w-[280px]">
                <Card className="surface-card h-full w-full text-center">
                  <CardContent className="flex h-full flex-col items-center justify-center p-7">
                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/15 font-display text-xl font-semibold text-primary ring-1 ring-primary/25">
                      {m.initials}
                    </span>
                    <h3 className="mt-4 text-base font-semibold">{m.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tl(m.role)}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
