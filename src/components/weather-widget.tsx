import { CloudSun, Droplets, Wind, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WEATHER } from "@/lib/crop-data";
import { useI18n } from "@/lib/i18n";

export function WeatherWidget() {
  const { t, tl } = useI18n();

  return (
    <Card className="surface-card overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CloudSun className="size-5 text-accent" aria-hidden />
          {t("weather.title")}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{WEATHER.location}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-5xl font-semibold leading-none">{WEATHER.tempC}°</p>
            <p className="mt-2 text-sm text-muted-foreground">{tl(WEATHER.condition)}</p>
          </div>
          <CloudSun className="size-14 text-accent/70 animate-float" aria-hidden />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Droplets, label: t("weather.humidity"), value: `${WEATHER.humidity}%` },
            { icon: Wind, label: t("weather.wind"), value: `${WEATHER.windKph} km/h` },
            { icon: CloudRain, label: t("weather.rain"), value: `${WEATHER.rainChance}%` },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-secondary/60 px-2 py-3">
              <item.icon className="mx-auto size-4 text-primary" aria-hidden />
              <p className="mt-1.5 text-sm font-semibold">{item.value}</p>
              <p className="truncate text-[10px] text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-1">
          {WEATHER.forecast.map((d) => (
            <div key={d.day[0]} className="flex-1 rounded-lg py-2 text-center">
              <p className="text-[11px] text-muted-foreground">{tl(d.day)}</p>
              <p className="mt-1 text-sm font-semibold">{d.tempC}°</p>
              <p className="text-[10px] text-primary">{d.rain}%</p>
            </div>
          ))}
        </div>

        <p className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5 text-xs leading-relaxed text-primary">
          {t("weather.advice")}
        </p>
      </CardContent>
    </Card>
  );
}
