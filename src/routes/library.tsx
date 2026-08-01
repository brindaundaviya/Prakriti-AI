import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Leaf, FlaskConical, ShieldCheck, SearchX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DISEASES } from "@/lib/crop-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Crop Disease Library — Prakriti AI" },
      {
        name: "description",
        content:
          "Searchable field guide to common Indian crop diseases with symptoms, organic and chemical treatments and prevention.",
      },
      { property: "og:title", content: "Crop Disease Library — Prakriti AI" },
      {
        property: "og:description",
        content: "Symptoms, treatments and prevention for common Indian crop diseases.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { t, tl } = useI18n();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DISEASES;
    return DISEASES.filter((d) =>
      [...d.name, ...d.crop, d.pathogen].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-4xl">
        <header>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t("lib.title")}</h1>
          <p className="mt-3 text-base text-muted-foreground">{t("lib.subtitle")}</p>
        </header>

        <div className="relative mt-8">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("lib.search")}
            className="h-14 rounded-2xl border-border bg-card pl-12 text-base"
          />
        </div>

        {results.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-muted-foreground">
              <SearchX className="size-6" aria-hidden />
            </span>
            <p className="text-muted-foreground">{t("lib.empty")}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6"
          >
            <Card className="surface-card">
              <CardContent className="p-2 sm:p-4">
                <Accordion type="single" collapsible className="w-full">
                  {results.map((d) => (
                    <AccordionItem key={d.id} value={d.id} className="border-border/70">
                      <AccordionTrigger className="px-3 py-5 text-left hover:no-underline">
                        <span className="grid min-w-0 gap-1.5">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-semibold">{tl(d.name)}</span>
                            <Badge
                              variant="outline"
                              className="rounded-full border-primary/30 bg-primary/10 text-primary"
                            >
                              {tl(d.crop)}
                            </Badge>
                          </span>
                          <span className="text-xs italic text-muted-foreground">{d.pathogen}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-6">
                        <p className="text-sm leading-relaxed text-muted-foreground">{tl(d.summary)}</p>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          {[
                            { icon: Search, title: t("treat.symptoms"), items: d.symptoms },
                            { icon: Leaf, title: t("treat.organic"), items: d.organic },
                            { icon: FlaskConical, title: t("treat.chemical"), items: d.chemical },
                            { icon: ShieldCheck, title: t("treat.prevention"), items: d.prevention },
                          ].map((block) => (
                            <div key={block.title} className="rounded-2xl bg-secondary/50 p-4">
                              <p className="flex items-center gap-2 text-sm font-semibold">
                                <block.icon className="size-4 text-primary" aria-hidden />
                                {block.title}
                              </p>
                              <ul className="mt-3 space-y-2">
                                {block.items.map((item) => (
                                  <li
                                    key={item[0]}
                                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                                  >
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                                    {tl(item)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
