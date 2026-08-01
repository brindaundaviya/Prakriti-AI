import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Image as ImageIcon, Loader2, RefreshCw, ScanLine, Sun, Focus, Hand, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { detectDisease, type DetectionResult } from "@/lib/crop-data";
import { useDetectionHistory } from "@/hooks/use-detection-history";
import { useI18n } from "@/lib/i18n";
import { DetectionResultView } from "@/components/detection-result";
import { WeatherWidget } from "@/components/weather-widget";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/detect")({
  head: () => ({
    meta: [
      { title: "Detect Crop Disease — Prakriti AI" },
      {
        name: "description",
        content:
          "Upload or capture a leaf photo and get an instant AI diagnosis with confidence, severity, affected area and treatment steps.",
      },
      { property: "og:title", content: "Detect Crop Disease — Prakriti AI" },
      {
        property: "og:description",
        content: "Instant AI crop disease diagnosis from a single leaf photo.",
      },
    ],
  }),
  component: DetectPage,
});

function DetectPage() {
  const { t } = useI18n();
  const { add } = useDetectionHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ f, url }: { f: File; url: string }) => detectDisease(f, url),
    onSuccess: (data) => {
      setResult(data);
      add(data);
      toast.success(t("detect.saved"));
    },
    onError: () => toast.error(t("detect.error")),
  });

  const acceptFile = useCallback((f: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFile(f);
      setPreview(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(f);
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setCameraOn(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch {
      toast.error(t("detect.cameraError"));
    }
  }, [t]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 720;
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      acceptFile(new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" }));
      stopCamera();
    }, "image/jpeg", 0.92);
  }, [acceptFile, stopCamera]);

  const analyzing = mutation.isPending;

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold sm:text-4xl">{t("detect.title")}</h1>
          <p className="mt-3 text-base text-muted-foreground">{t("detect.subtitle")}</p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Card className="surface-card">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {cameraOn ? (
                  <motion.div
                    key="camera"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-black">
                      <video ref={videoRef} playsInline muted className="aspect-video w-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button onClick={capture} size="lg" className="h-14 flex-1 rounded-2xl text-base font-semibold">
                        <Camera className="size-5" aria-hidden />
                        {t("detect.capture")}
                      </Button>
                      <Button
                        onClick={stopCamera}
                        size="lg"
                        variant="outline"
                        className="h-14 rounded-2xl text-base"
                      >
                        <X className="size-5" aria-hidden />
                        {t("detect.cancel")}
                      </Button>
                    </div>
                  </motion.div>
                ) : preview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-border">
                      <img src={preview} alt="Selected crop leaf" className="aspect-video w-full object-cover" />
                      {analyzing ? (
                        <>
                          <div className="absolute inset-0 bg-background/55 backdrop-blur-[2px]" aria-hidden />
                          <div className="absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-primary/45 to-transparent" aria-hidden />
                          <div className="absolute inset-0 grid place-items-center">
                            <span className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium">
                              <Loader2 className="size-4 animate-spin text-primary" aria-hidden />
                              {t("detect.analyzing")}
                            </span>
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        disabled={analyzing || !file}
                        onClick={() => file && preview && mutation.mutate({ f: file, url: preview })}
                        className="h-14 flex-1 rounded-2xl text-base font-semibold"
                      >
                        {analyzing ? (
                          <Loader2 className="size-5 animate-spin" aria-hidden />
                        ) : (
                          <ScanLine className="size-5" aria-hidden />
                        )}
                        {analyzing ? t("detect.analyzing") : t("detect.analyze")}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        disabled={analyzing}
                        onClick={() => {
                          setPreview(null);
                          setFile(null);
                          setResult(null);
                        }}
                        className="h-14 rounded-2xl text-base"
                      >
                        <RefreshCw className="size-5" aria-hidden />
                        {t("detect.retake")}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        const f = e.dataTransfer.files?.[0];
                        if (f) acceptFile(f);
                      }}
                      className={cn(
                        "flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border px-6 py-16 text-center transition-colors hover:border-primary/50 hover:bg-primary/5",
                        dragging && "border-primary bg-primary/10",
                      )}
                    >
                      <span className="grid size-16 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25">
                        <ImageIcon className="size-7" aria-hidden />
                      </span>
                      <span className="text-lg font-semibold">{t("detect.upload")}</span>
                      <span className="max-w-xs text-sm text-muted-foreground">{t("detect.dropHint")}</span>
                    </button>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        onClick={() => inputRef.current?.click()}
                        className="h-14 flex-1 rounded-2xl text-base font-semibold"
                      >
                        <ImageIcon className="size-5" aria-hidden />
                        {t("detect.upload")}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={startCamera}
                        className="h-14 flex-1 rounded-2xl text-base font-semibold"
                      >
                        <Camera className="size-5" aria-hidden />
                        {t("detect.camera")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) acceptFile(f);
                  e.target.value = "";
                }}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t("detect.tipsTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Sun, text: t("detect.tip1") },
                  { icon: Focus, text: t("detect.tip2") },
                  { icon: Hand, text: t("detect.tip3") },
                ].map((tip) => (
                  <div key={tip.text} className="flex items-center gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                      <tip.icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-sm text-muted-foreground">{tip.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <WeatherWidget />
          </div>
        </div>

        <div className="mt-10">
          {analyzing ? (
            <div className="space-y-4">
              <Skeleton className="h-56 w-full rounded-3xl" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-40 rounded-3xl" />
                <Skeleton className="h-40 rounded-3xl" />
              </div>
            </div>
          ) : result ? (
            <DetectionResultView result={result} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
