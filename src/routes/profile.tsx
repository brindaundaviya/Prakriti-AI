import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LANGUAGES, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Farmer Profile & Settings — Prakriti AI" },
      {
        name: "description",
        content:
          "Manage your farm details, preferred language, alert preferences and offline scan settings.",
      },
      { property: "og:title", content: "Farmer Profile & Settings — Prakriti AI" },
      {
        property: "og:description",
        content: "Farm details, language preference and alert settings.",
      },
    ],
  }),
  component: ProfilePage,
});

type Profile = {
  name: string;
  village: string;
  landSize: string;
  mainCrop: string;
  phone: string;
};

const EMPTY: Profile = { name: "", village: "", landSize: "", mainCrop: "", phone: "" };
const KEY = "prakriti.profile";

function ProfilePage() {
  const { t, language, setLanguage } = useI18n();
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [alerts, setAlerts] = useState({ outbreak: true, weather: true, offline: false });

  useEffect(() => {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      try {
        setProfile({ ...EMPTY, ...(JSON.parse(raw) as Profile) });
      } catch {
        /* ignore malformed profile */
      }
    }
  }, []);

  const field = (key: keyof Profile, label: string, placeholder: string, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        type={type}
        value={profile[key]}
        placeholder={placeholder}
        onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
        className="h-12 rounded-xl bg-secondary/40"
      />
    </div>
  );

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="flex min-w-0 items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
            <User className="size-6" aria-hidden />
          </span>
          <h1 className="truncate text-3xl font-semibold sm:text-4xl">{t("profile.title")}</h1>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-base">{t("profile.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {field("name", t("profile.name"), "Ramesh Patel")}
              {field("village", t("profile.village"), "Gondal, Rajkot")}
              {field("landSize", t("profile.landSize"), "5", "number")}
              {field("mainCrop", t("profile.mainCrop"), "Groundnut")}
              {field("phone", t("profile.phone"), "98765 43210", "tel")}
              <Button
                className="h-12 w-full rounded-xl text-base font-semibold"
                onClick={() => {
                  window.localStorage.setItem(KEY, JSON.stringify(profile));
                  toast.success(t("profile.saved"));
                }}
              >
                {t("profile.save")}
              </Button>
            </CardContent>
          </Card>

          <Card className="surface-card h-fit">
            <CardHeader>
              <CardTitle className="text-base">{t("profile.settings")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>{t("nav.language")}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLanguage(l.code)}
                      className={cn(
                        "rounded-xl border border-border bg-secondary/40 px-3 py-3 text-sm font-medium transition-colors hover:border-primary/40",
                        language === l.code && "border-primary bg-primary/15 text-primary",
                      )}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { key: "outbreak" as const, label: t("profile.notify") },
                { key: "weather" as const, label: t("profile.weatherAlerts") },
                { key: "offline" as const, label: t("profile.offline") },
              ].map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl bg-secondary/40 px-4 py-3"
                >
                  <Label htmlFor={row.key} className="min-w-0 text-sm font-normal">
                    {row.label}
                  </Label>
                  <Switch
                    id={row.key}
                    checked={alerts[row.key]}
                    onCheckedChange={(v) => setAlerts((a) => ({ ...a, [row.key]: v }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
