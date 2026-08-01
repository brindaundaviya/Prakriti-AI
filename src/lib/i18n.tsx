import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, [string, string, string]>;

/** [English, Hindi, Gujarati] */
const DICT: Dict = {
  "brand.name": ["Prakriti AI", "प्रकृति AI", "પ્રકૃતિ AI"],
  "brand.tagline": [
    "Nature Meets Intelligence",
    "प्रकृति से मिली बुद्धिमत्ता",
    "પ્રકૃતિ મળે બુદ્ધિમત્તાને",
  ],

  "nav.home": ["Home", "होम", "હોમ"],
  "nav.detect": ["Detect", "पहचान", "તપાસ"],
  "nav.dashboard": ["Dashboard", "डैशबोर्ड", "ડેશબોર્ડ"],
  "nav.library": ["Disease Library", "रोग पुस्तकालय", "રોગ પુસ્તકાલય"],
  "nav.history": ["History", "इतिहास", "ઇતિહાસ"],
  "nav.profile": ["Profile", "प्रोफ़ाइल", "પ્રોફાઇલ"],
  "nav.language": ["Language", "भाषा", "ભાષા"],
  "nav.menu": ["Menu", "मेन्यू", "મેનૂ"],

  "cta.start": ["Start Detection", "पहचान शुरू करें", "તપાસ શરૂ કરો"],
  "cta.explore": ["Explore Features", "विशेषताएँ देखें", "વિશેષતાઓ જુઓ"],
  "cta.viewAll": ["View all", "सभी देखें", "બધું જુઓ"],

  "hero.subtitle": [
    "Snap a photo of your crop leaf and get an instant AI diagnosis, severity score and a treatment plan you can actually use in the field.",
    "अपनी फसल की पत्ती की फोटो लें और तुरंत AI निदान, गंभीरता स्कोर और खेत में काम आने वाला उपचार पाएं।",
    "તમારા પાકના પાનનો ફોટો લો અને તરત જ AI નિદાન, ગંભીરતા સ્કોર અને ખેતરમાં ઉપયોગી સારવાર મેળવો.",
  ],
  "hero.stat1": ["Diseases detected", "रोगों की पहचान", "રોગોની ઓળખ"],
  "hero.stat2": ["Model accuracy", "मॉडल सटीकता", "મોડેલ ચોકસાઈ"],
  "hero.stat3": ["Farmers helped", "किसानों की मदद", "ખેડૂતોને મદદ"],
  "hero.scroll": ["Scroll to explore", "और देखने के लिए स्क्रॉल करें", "વધુ જોવા સ્ક્રોલ કરો"],

  "features.title": ["Everything your farm needs", "आपके खेत के लिए सब कुछ", "તમારા ખેતર માટે બધું"],
  "features.subtitle": [
    "Built with farmers, for farmers. Simple screens, clear answers.",
    "किसानों के साथ, किसानों के लिए बनाया गया। सरल स्क्रीन, स्पष्ट जवाब।",
    "ખેડૂતો સાથે, ખેડૂતો માટે બનાવેલ. સરળ સ્ક્રીન, સ્પષ્ટ જવાબ.",
  ],
  "features.f1.title": ["Instant AI Diagnosis", "तुरंत AI निदान", "તરત AI નિદાન"],
  "features.f1.desc": [
    "Upload a photo or use your camera. Results in seconds.",
    "फोटो अपलोड करें या कैमरा चलाएँ। कुछ ही सेकंड में परिणाम।",
    "ફોટો અપલોડ કરો અથવા કૅમેરા વાપરો. સેકન્ડોમાં પરિણામ.",
  ],
  "features.f2.title": ["Severity & Affected Area", "गंभीरता और प्रभावित क्षेत्र", "ગંભીરતા અને અસરગ્રસ્ત વિસ્તાર"],
  "features.f2.desc": [
    "Know how far the infection has spread before it costs you a harvest.",
    "फसल बर्बाद होने से पहले जानें संक्रमण कितना फैला है।",
    "પાક બગડે તે પહેલાં જાણો ચેપ કેટલો ફેલાયો છે.",
  ],
  "features.f3.title": ["Organic & Chemical Care", "जैविक और रासायनिक उपचार", "સજીવ અને રાસાયણિક સારવાર"],
  "features.f3.desc": [
    "Two treatment paths with dosage, timing and local availability.",
    "मात्रा, समय और स्थानीय उपलब्धता के साथ दो उपचार विकल्प।",
    "માત્રા, સમય અને સ્થાનિક ઉપલબ્ધતા સાથે બે સારવાર વિકલ્પ.",
  ],
  "features.f4.title": ["Weather Aware", "मौसम की जानकारी", "હવામાનની જાણ"],
  "features.f4.desc": [
    "Spraying advice that respects rain, humidity and wind.",
    "बारिश, नमी और हवा को ध्यान में रखकर छिड़काव सलाह।",
    "વરસાદ, ભેજ અને પવન ધ્યાનમાં રાખી છંટકાવ સલાહ.",
  ],
  "features.f5.title": ["Disease Library", "रोग पुस्तकालय", "રોગ પુસ્તકાલય"],
  "features.f5.desc": [
    "Searchable guide of common crop diseases across India.",
    "भारत के आम फसल रोगों की खोजने योग्य गाइड।",
    "ભારતના સામાન્ય પાક રોગોની શોધી શકાય તેવી માર્ગદર્શિકા.",
  ],
  "features.f6.title": ["Your Scan History", "आपका स्कैन इतिहास", "તમારો સ્કેન ઇતિહાસ"],
  "features.f6.desc": [
    "Every scan saved so you can track your field season by season.",
    "हर स्कैन सुरक्षित, ताकि आप हर मौसम अपने खेत पर नज़र रख सकें।",
    "દરેક સ્કેન સચવાય, જેથી તમે દર સીઝન ખેતર પર નજર રાખી શકો.",
  ],

  "how.title": ["How it works", "यह कैसे काम करता है", "તે કેવી રીતે કામ કરે છે"],
  "how.s1.title": ["Capture the leaf", "पत्ती की फोटो लें", "પાનનો ફોટો લો"],
  "how.s1.desc": [
    "Hold your phone close to the affected leaf in daylight.",
    "दिन के उजाले में प्रभावित पत्ती के पास फोन रखें।",
    "દિવસના પ્રકાશમાં અસરગ્રસ્ત પાન પાસે ફોન રાખો.",
  ],
  "how.s2.title": ["AI analyses it", "AI जाँच करता है", "AI તપાસે છે"],
  "how.s2.desc": [
    "Our vision model compares it against thousands of field images.",
    "हमारा विज़न मॉडल हज़ारों खेत तस्वीरों से तुलना करता है।",
    "અમારું વિઝન મોડેલ હજારો ખેતર તસવીરો સાથે સરખાવે છે.",
  ],
  "how.s3.title": ["Act on the plan", "उपचार अपनाएँ", "સારવાર અપનાવો"],
  "how.s3.desc": [
    "Follow the step-by-step treatment and prevention advice.",
    "चरण-दर-चरण उपचार और रोकथाम सलाह अपनाएँ।",
    "તબક્કાવાર સારવાર અને નિવારણ સલાહ અપનાવો.",
  ],

  "benefits.title": ["Why farmers choose us", "किसान हमें क्यों चुनते हैं", "ખેડૂતો અમને કેમ પસંદ કરે છે"],
  "benefits.b1": ["Save up to 30% on pesticide spend", "कीटनाशक खर्च में 30% तक बचत", "જંતુનાશક ખર્ચમાં 30% સુધી બચત"],
  "benefits.b2": ["Catch outbreaks 5–7 days earlier", "प्रकोप 5–7 दिन पहले पकड़ें", "રોગચાળો 5–7 દિવસ વહેલો પકડો"],
  "benefits.b3": ["Works in your own language", "आपकी अपनी भाषा में", "તમારી પોતાની ભાષામાં"],
  "benefits.b4": ["No agronomist visit required", "कृषि विशेषज्ञ की ज़रूरत नहीं", "કૃષિ નિષ્ણાતની જરૂર નહીં"],

  "team.title": ["The team behind Prakriti", "प्रकृति के पीछे की टीम", "પ્રકૃતિ પાછળની ટીમ"],
  "team.subtitle": [
    "Agronomists, ML engineers and designers working with farm communities.",
    "कृषि विशेषज्ञ, ML इंजीनियर और डिज़ाइनर, किसान समुदायों के साथ।",
    "કૃષિ નિષ્ણાતો, ML ઇજનેરો અને ડિઝાઇનરો, ખેડૂત સમુદાયો સાથે.",
  ],

  "detect.title": ["Crop Disease Detection", "फसल रोग पहचान", "પાક રોગ તપાસ"],
  "detect.subtitle": [
    "Upload a clear photo of the affected leaf or capture one with your camera.",
    "प्रभावित पत्ती की साफ़ फोटो अपलोड करें या कैमरे से लें।",
    "અસરગ્રસ્ત પાનનો સ્પષ્ટ ફોટો અપલોડ કરો અથવા કૅમેરાથી લો.",
  ],
  "detect.upload": ["Upload image", "इमेज अपलोड करें", "ઇમેજ અપલોડ કરો"],
  "detect.camera": ["Use camera", "कैमरा चलाएँ", "કૅમેરા વાપરો"],
  "detect.dropHint": [
    "Drag & drop a JPG or PNG, or tap to browse",
    "JPG या PNG खींचकर छोड़ें, या ब्राउज़ करें",
    "JPG અથવા PNG ખેંચીને મૂકો, અથવા બ્રાઉઝ કરો",
  ],
  "detect.analyze": ["Analyse crop", "फसल जाँचें", "પાક તપાસો"],
  "detect.analyzing": ["Analysing leaf…", "पत्ती की जाँच हो रही है…", "પાનની તપાસ ચાલુ છે…"],
  "detect.retake": ["Choose another photo", "दूसरी फोटो चुनें", "બીજો ફોટો પસંદ કરો"],
  "detect.tipsTitle": ["Photo tips", "फोटो सुझाव", "ફોટો સૂચનો"],
  "detect.tip1": ["Use natural daylight", "प्राकृतिक रोशनी में लें", "કુદરતી પ્રકાશમાં લો"],
  "detect.tip2": ["Fill the frame with one leaf", "एक पत्ती से फ्रेम भरें", "એક પાનથી ફ્રેમ ભરો"],
  "detect.tip3": ["Keep the camera steady", "कैमरा स्थिर रखें", "કૅમેરા સ્થિર રાખો"],
  "detect.result": ["Diagnosis", "निदान", "નિદાન"],
  "detect.confidence": ["Confidence", "विश्वास स्तर", "વિશ્વાસ સ્તર"],
  "detect.severity": ["Severity", "गंभीरता", "ગંભીરતા"],
  "detect.affected": ["Affected area", "प्रभावित क्षेत्र", "અસરગ્રસ્ત વિસ્તાર"],
  "detect.crop": ["Crop", "फसल", "પાક"],
  "detect.saved": ["Scan saved to your history", "स्कैन इतिहास में सेव हुआ", "સ્કેન ઇતિહાસમાં સેવ થયો"],
  "detect.error": ["Could not analyse that image. Try again.", "इमेज जाँच नहीं हो सकी। फिर कोशिश करें।", "ઇમેજ તપાસી શકાઈ નહીં. ફરી પ્રયાસ કરો."],
  "detect.cameraError": ["Camera unavailable on this device", "इस डिवाइस पर कैमरा उपलब्ध नहीं", "આ ડિવાઇસ પર કૅમેરા ઉપલબ્ધ નથી"],
  "detect.capture": ["Capture", "फोटो लें", "ફોટો લો"],
  "detect.cancel": ["Cancel", "रद्द करें", "રદ કરો"],

  "treat.organic": ["Organic treatment", "जैविक उपचार", "સજીવ સારવાર"],
  "treat.chemical": ["Chemical treatment", "रासायनिक उपचार", "રાસાયણિક સારવાર"],
  "treat.prevention": ["Preventive measures", "रोकथाम के उपाय", "નિવારણના ઉપાય"],
  "treat.care": ["Crop care tips", "फसल देखभाल सुझाव", "પાક સંભાળ સૂચનો"],
  "treat.symptoms": ["Symptoms", "लक्षण", "લક્ષણો"],

  "sev.low": ["Low", "कम", "ઓછી"],
  "sev.moderate": ["Moderate", "मध्यम", "મધ્યમ"],
  "sev.high": ["High", "अधिक", "વધુ"],
  "sev.critical": ["Critical", "गंभीर", "ગંભીર"],

  "dash.title": ["Dashboard", "डैशबोर्ड", "ડેશબોર્ડ"],
  "dash.welcome": ["Welcome back", "फिर से स्वागत है", "ફરી સ્વાગત છે"],
  "dash.totalScans": ["Total scans", "कुल स्कैन", "કુલ સ્કેન"],
  "dash.healthy": ["Healthy results", "स्वस्थ परिणाम", "સ્વસ્થ પરિણામ"],
  "dash.avgConfidence": ["Avg. confidence", "औसत विश्वास", "સરેરાશ વિશ્વાસ"],
  "dash.needAction": ["Need action", "कार्रवाई ज़रूरी", "પગલાં જરૂરી"],
  "dash.recent": ["Recent scans", "हाल के स्कैन", "તાજેતરના સ્કેન"],
  "dash.trend": ["Scans this week", "इस सप्ताह के स्कैन", "આ અઠવાડિયાના સ્કેન"],

  "weather.title": ["Weather & spraying", "मौसम और छिड़काव", "હવામાન અને છંટકાવ"],
  "weather.humidity": ["Humidity", "नमी", "ભેજ"],
  "weather.wind": ["Wind", "हवा", "પવન"],
  "weather.rain": ["Rain chance", "बारिश की संभावना", "વરસાદની શક્યતા"],
  "weather.advice": [
    "Good conditions for spraying this evening.",
    "आज शाम छिड़काव के लिए अच्छी स्थिति।",
    "આજે સાંજે છંટકાવ માટે સારી સ્થિતિ.",
  ],

  "lib.title": ["Disease Library", "रोग पुस्तकालय", "રોગ પુસ્તકાલય"],
  "lib.subtitle": [
    "Field guide to the crop diseases we detect.",
    "हम जिन फसल रोगों की पहचान करते हैं उनकी गाइड।",
    "અમે જે પાક રોગો ઓળખીએ છીએ તેની માર્ગદર્શિકા.",
  ],
  "lib.search": ["Search disease or crop…", "रोग या फसल खोजें…", "રોગ કે પાક શોધો…"],
  "lib.empty": ["No diseases match your search.", "आपकी खोज से कोई रोग नहीं मिला।", "તમારી શોધ સાથે કોઈ રોગ મળ્યો નથી."],

  "hist.title": ["Detection History", "पहचान इतिहास", "તપાસ ઇતિહાસ"],
  "hist.empty": ["No scans yet", "अभी कोई स्कैन नहीं", "હજી કોઈ સ્કેન નથી"],
  "hist.emptyDesc": [
    "Run your first crop scan and it will appear here.",
    "पहला फसल स्कैन करें, वह यहाँ दिखेगा।",
    "પ્રથમ પાક સ્કેન કરો, તે અહીં દેખાશે.",
  ],
  "hist.clear": ["Clear history", "इतिहास हटाएँ", "ઇતિહાસ કાઢો"],
  "hist.cleared": ["History cleared", "इतिहास हटाया गया", "ઇતિહાસ કાઢી નાખ્યો"],

  "profile.title": ["Farmer Profile", "किसान प्रोफ़ाइल", "ખેડૂત પ્રોફાઇલ"],
  "profile.name": ["Full name", "पूरा नाम", "પૂરું નામ"],
  "profile.village": ["Village / District", "गाँव / ज़िला", "ગામ / જિલ્લો"],
  "profile.landSize": ["Land size (acres)", "ज़मीन (एकड़)", "જમીન (એકર)"],
  "profile.mainCrop": ["Main crop", "मुख्य फसल", "મુખ્ય પાક"],
  "profile.phone": ["Phone number", "फ़ोन नंबर", "ફોન નંબર"],
  "profile.save": ["Save profile", "प्रोफ़ाइल सेव करें", "પ્રોફાઇલ સેવ કરો"],
  "profile.saved": ["Profile saved", "प्रोफ़ाइल सेव हुई", "પ્રોફાઇલ સેવ થઈ"],
  "profile.settings": ["Settings", "सेटिंग्स", "સેટિંગ્સ"],
  "profile.notify": ["Disease outbreak alerts", "रोग प्रकोप अलर्ट", "રોગ ફેલાવા અંગે ચેતવણી"],
  "profile.weatherAlerts": ["Weather advisories", "मौसम सलाह", "હવામાન સલાહ"],
  "profile.offline": ["Save scans for offline use", "ऑफ़लाइन के लिए स्कैन सेव करें", "ઑફલાઇન માટે સ્કેન સેવ કરો"],

  "common.today": ["Today", "आज", "આજે"],
  "common.back": ["Back to home", "होम पर वापस", "હોમ પર પાછા"],
  "common.footer": [
    "Built for Indian farmers. Prakriti AI is a decision-support tool, not a replacement for local agronomic advice.",
    "भारतीय किसानों के लिए बनाया गया। प्रकृति AI सलाह में मदद करता है, स्थानीय कृषि सलाह का विकल्प नहीं है।",
    "ભારતીય ખેડૂતો માટે બનાવેલ. પ્રકૃતિ AI નિર્ણયમાં મદદ કરે છે, સ્થાનિક કૃષિ સલાહનો વિકલ્પ નથી.",
  ],
};

const INDEX: Record<LanguageCode, 0 | 1 | 2> = { en: 0, hi: 1, gu: 2 };
const STORAGE_KEY = "prakriti.language";

type I18nValue = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  /** Pick a value from a localized triple stored in data. */
  tl: (value: [string, string, string]) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hi" || stored === "gu") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const i = INDEX[language];
    return {
      language,
      setLanguage,
      t: (key) => DICT[key]?.[i] ?? key,
      tl: (triple) => triple?.[i] ?? triple?.[0] ?? "",
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
