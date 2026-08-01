/** Localized string triple: [English, Hindi, Gujarati] */
export type L = [string, string, string];

export type Severity = "low" | "moderate" | "high" | "critical";

export type Disease = {
  id: string;
  crop: L;
  name: L;
  pathogen: string;
  summary: L;
  symptoms: L[];
  organic: L[];
  chemical: L[];
  prevention: L[];
  care: L[];
};

export const DISEASES: Disease[] = [
  {
    id: "tomato-late-blight",
    crop: ["Tomato", "टमाटर", "ટામેટા"],
    name: ["Late Blight", "पछेती झुलसा", "મોડો કરમાવો"],
    pathogen: "Phytophthora infestans",
    summary: [
      "A fast-moving water mould that can destroy a tomato field within a week of cool, wet weather.",
      "तेज़ी से फैलने वाला रोग जो ठंडे, गीले मौसम में एक सप्ताह में पूरा खेत बर्बाद कर सकता है।",
      "ઝડપથી ફેલાતો રોગ જે ઠંડા, ભીના હવામાનમાં એક અઠવાડિયામાં આખું ખેતર બગાડી શકે.",
    ],
    symptoms: [
      ["Dark water-soaked patches on leaf edges", "पत्ती के किनारों पर गहरे गीले धब्बे", "પાનની કિનારીએ ઘેરા ભીના ડાઘ"],
      ["White fuzzy growth under the leaf", "पत्ती के नीचे सफेद रुई जैसी परत", "પાનની નીચે સફેદ રૂ જેવી પરત"],
      ["Brown lesions on stems and fruit", "तने और फल पर भूरे घाव", "થડ અને ફળ પર ભૂરા ઘા"],
    ],
    organic: [
      ["Spray copper oxychloride 3g/L every 7 days", "कॉपर ऑक्सीक्लोराइड 3g/L हर 7 दिन छिड़कें", "કોપર ઓક્સીક્લોરાઇડ 3g/L દર 7 દિવસે છાંટો"],
      ["Apply Trichoderma viride soil drench", "ट्राइकोडर्मा विरिडी मिट्टी में डालें", "ટ્રાઇકોડર્મા વિરિડી જમીનમાં આપો"],
      ["Remove and burn infected plants", "संक्रमित पौधे निकालकर जलाएँ", "ચેપગ્રસ્ત છોડ કાઢી બાળો"],
    ],
    chemical: [
      ["Mancozeb 75% WP @ 2.5g/L", "मैंकोज़ेब 75% WP @ 2.5g/L", "મેન્કોઝેબ 75% WP @ 2.5g/L"],
      ["Metalaxyl + Mancozeb @ 2g/L at first sign", "पहला लक्षण दिखते ही मेटालैक्सिल + मैंकोज़ेब @ 2g/L", "પ્રથમ લક્ષણે મેટાલેક્સિલ + મેન્કોઝેબ @ 2g/L"],
      ["Do not spray within 7 days of harvest", "कटाई से 7 दिन पहले छिड़काव न करें", "લણણીના 7 દિવસ પહેલાં છંટકાવ ન કરો"],
    ],
    prevention: [
      ["Use certified blight-resistant seed", "प्रमाणित रोग-रोधी बीज लें", "પ્રમાણિત રોગ-પ્રતિરોધક બિયારણ લો"],
      ["Avoid overhead irrigation in the evening", "शाम को ऊपर से सिंचाई न करें", "સાંજે ઉપરથી પિયત ન કરો"],
      ["Rotate with cereals for two seasons", "दो मौसम अनाज की फसल लें", "બે સીઝન અનાજનો પાક લો"],
    ],
    care: [
      ["Stake plants to improve airflow", "पौधों को सहारा दें ताकि हवा लगे", "છોડને ટેકો આપો જેથી હવા મળે"],
      ["Mulch to stop soil splash", "मिट्टी के छींटे रोकने के लिए मल्च करें", "માટીના છાંટા રોકવા મલ્ચ કરો"],
    ],
  },
  {
    id: "wheat-yellow-rust",
    crop: ["Wheat", "गेहूँ", "ઘઉં"],
    name: ["Yellow Rust", "पीला रतुआ", "પીળો ગેરુ"],
    pathogen: "Puccinia striiformis",
    summary: [
      "Bright yellow stripes of spores along the leaf veins, common in cool north Indian winters.",
      "पत्ती की नसों पर चमकीली पीली धारियाँ, उत्तर भारत की ठंडी सर्दियों में आम।",
      "પાનની નસો પર ચમકતી પીળી પટ્ટીઓ, ઉત્તર ભારતના ઠંડા શિયાળામાં સામાન્ય.",
    ],
    symptoms: [
      ["Yellow powdery stripes on leaves", "पत्तियों पर पीली पाउडर जैसी धारियाँ", "પાન પર પીળી પાવડર જેવી પટ્ટીઓ"],
      ["Yellow dust on hands when touched", "छूने पर हाथ में पीला पाउडर", "અડકતાં હાથમાં પીળો પાવડર"],
      ["Early leaf drying and poor grain fill", "पत्तियाँ जल्दी सूखना, दाना कमज़ोर", "પાન વહેલા સુકાવા, દાણો નબળો"],
    ],
    organic: [
      ["Neem oil 5ml/L at weekly intervals", "नीम तेल 5ml/L साप्ताहिक", "લીમડાનું તેલ 5ml/L સાપ્તાહિક"],
      ["Sulphur dust 20kg/ha in early morning", "सुबह जल्दी गंधक चूर्ण 20kg/ha", "વહેલી સવારે ગંધક ભૂકી 20kg/ha"],
    ],
    chemical: [
      ["Propiconazole 25 EC @ 1ml/L", "प्रोपिकोनाज़ोल 25 EC @ 1ml/L", "પ્રોપિકોનાઝોલ 25 EC @ 1ml/L"],
      ["Repeat after 15 days if stripes persist", "धारियाँ रहें तो 15 दिन बाद दोहराएँ", "પટ્ટીઓ રહે તો 15 દિવસ પછી ફરી છાંટો"],
    ],
    prevention: [
      ["Sow resistant varieties like HD-3226", "HD-3226 जैसी रोधी किस्में बोएँ", "HD-3226 જેવી પ્રતિરોધક જાત વાવો"],
      ["Avoid excess nitrogen", "अधिक नाइट्रोजन न दें", "વધુ નાઇટ્રોજન ન આપો"],
      ["Scout fields weekly from January", "जनवरी से हर सप्ताह खेत देखें", "જાન્યુઆરીથી દર અઠવાડિયે ખેતર જુઓ"],
    ],
    care: [
      ["Keep field free of volunteer wheat", "खेत में बचा हुआ गेहूँ हटाएँ", "ખેતરમાં બચેલો ઘઉં કાઢો"],
      ["Balanced potash improves resistance", "संतुलित पोटाश प्रतिरोध बढ़ाता है", "સંતુલિત પોટાશ પ્રતિકાર વધારે છે"],
    ],
  },
  {
    id: "rice-blast",
    crop: ["Rice", "धान", "ડાંગર"],
    name: ["Rice Blast", "धान का झोंका रोग", "ડાંગરનો બ્લાસ્ટ"],
    pathogen: "Magnaporthe oryzae",
    summary: [
      "Spindle-shaped grey lesions that can break the neck of the panicle and empty the grain.",
      "तकली जैसे भूरे धब्बे जो बाली की गर्दन तोड़ देते हैं और दाना खाली रह जाता है।",
      "તકલી આકારના ભૂખરા ડાઘ જે કંટીની ડોક તોડે અને દાણો ખાલી રહે.",
    ],
    symptoms: [
      ["Diamond-shaped grey-brown leaf spots", "हीरे के आकार के भूरे धब्बे", "હીરા આકારના ભૂખરા ડાઘ"],
      ["Blackened neck below the panicle", "बाली के नीचे काली गर्दन", "કંટી નીચે કાળી ડોક"],
      ["Empty or chaffy grains", "खाली या हल्के दाने", "ખાલી કે હલકા દાણા"],
    ],
    organic: [
      ["Pseudomonas fluorescens seed treatment", "स्यूडोमोनास से बीज उपचार", "સ્યુડોમોનાસથી બીજ માવજત"],
      ["Spray cow-dung extract at tillering", "कल्ले फूटते समय गोबर घोल छिड़कें", "ફૂટ સમયે છાણનું દ્રાવણ છાંટો"],
    ],
    chemical: [
      ["Tricyclazole 75 WP @ 0.6g/L", "ट्राइसाइक्लाज़ोल 75 WP @ 0.6g/L", "ટ્રાયસાયક્લાઝોલ 75 WP @ 0.6g/L"],
      ["Carbendazim 50 WP @ 1g/L at boot leaf", "गोभ अवस्था पर कार्बेन्डाज़िम 50 WP @ 1g/L", "ગોભ અવસ્થાએ કાર્બેન્ડાઝિમ 50 WP @ 1g/L"],
    ],
    prevention: [
      ["Do not exceed recommended urea dose", "यूरिया की तय मात्रा से अधिक न दें", "યુરિયાની ભલામણ કરતાં વધુ ન આપો"],
      ["Drain the field periodically", "समय-समय पर खेत का पानी निकालें", "સમયાંતરે ખેતરનું પાણી કાઢો"],
    ],
    care: [
      ["Maintain 20x15cm plant spacing", "20x15 सेमी दूरी रखें", "20x15 સેમી અંતર રાખો"],
      ["Burn infected stubble after harvest", "कटाई के बाद संक्रमित ठूँठ जलाएँ", "લણણી પછી ચેપી ઠૂંઠા બાળો"],
    ],
  },
  {
    id: "cotton-leaf-curl",
    crop: ["Cotton", "कपास", "કપાસ"],
    name: ["Leaf Curl Virus", "पत्ती मरोड़ विषाणु", "પાન વળવાનો વાયરસ"],
    pathogen: "Cotton leaf curl virus (whitefly-borne)",
    summary: [
      "Whitefly-transmitted virus that curls leaves upward and stunts the whole plant.",
      "सफेद मक्खी से फैलने वाला विषाणु, पत्तियाँ ऊपर मुड़ती हैं और पौधा बौना रह जाता है।",
      "સફેદ માખીથી ફેલાતો વાયરસ, પાન ઉપર વળે અને છોડ ઠીંગણો રહે.",
    ],
    symptoms: [
      ["Upward curling of leaf margins", "पत्ती के किनारे ऊपर मुड़ना", "પાનની કિનારી ઉપર વળવી"],
      ["Thickened dark green veins", "मोटी गहरी हरी नसें", "જાડી ઘેરી લીલી નસો"],
      ["Stunted growth, few bolls", "बौना पौधा, कम टिंडे", "ઠીંગણો છોડ, ઓછા જીંડવા"],
    ],
    organic: [
      ["Install 10 yellow sticky traps per acre", "प्रति एकड़ 10 पीले चिपचिपे ट्रैप लगाएँ", "એકર દીઠ 10 પીળા સ્ટીકી ટ્રેપ મૂકો"],
      ["Neem seed kernel extract 5%", "नीम बीज गिरी अर्क 5%", "લીમડાના બીજનો અર્ક 5%"],
    ],
    chemical: [
      ["Diafenthiuron 50 WP @ 1g/L for whitefly", "सफेद मक्खी हेतु डायफेन्थ्यूरॉन 50 WP @ 1g/L", "સફેદ માખી માટે ડાયફેન્થ્યુરોન 50 WP @ 1g/L"],
      ["Rotate insecticide groups to avoid resistance", "प्रतिरोध से बचने हेतु दवा बदलें", "પ્રતિકાર ટાળવા દવા બદલો"],
    ],
    prevention: [
      ["Uproot and destroy infected plants early", "संक्रमित पौधे जल्दी उखाड़ें", "ચેપી છોડ વહેલા ઉખેડો"],
      ["Keep field borders weed-free", "खेत की मेड़ खरपतवार मुक्त रखें", "ખેતરની પાળ નીંદણ મુક્ત રાખો"],
    ],
    care: [
      ["Sow tolerant Bt hybrids", "सहनशील Bt संकर बोएँ", "સહનશીલ Bt હાઇબ્રિડ વાવો"],
      ["Avoid late sowing", "देर से बुवाई न करें", "મોડી વાવણી ટાળો"],
    ],
  },
  {
    id: "potato-early-blight",
    crop: ["Potato", "आलू", "બટાટા"],
    name: ["Early Blight", "अगेती झुलसा", "વહેલો કરમાવો"],
    pathogen: "Alternaria solani",
    summary: [
      "Concentric brown rings on older leaves, worsened by warm humid spells and weak plants.",
      "पुरानी पत्तियों पर गोल भूरे छल्ले, गर्म-नम मौसम और कमज़ोर पौधों में बढ़ता है।",
      "જૂના પાન પર ગોળ ભૂરા કૂંડાળા, ગરમ-ભેજવાળા હવામાનમાં વધે.",
    ],
    symptoms: [
      ["Target-like rings on lower leaves", "नीचे की पत्तियों पर निशाने जैसे छल्ले", "નીચેના પાન પર નિશાન જેવા કૂંડાળા"],
      ["Yellow halo around each spot", "हर धब्बे के चारों ओर पीला घेरा", "દરેક ડાઘ ફરતે પીળું વર્તુળ"],
      ["Premature leaf fall", "पत्तियाँ समय से पहले गिरना", "પાન વહેલા ખરવા"],
    ],
    organic: [
      ["Bacillus subtilis foliar spray", "बैसिलस सबटिलिस का छिड़काव", "બેસિલસ સબટિલિસનો છંટકાવ"],
      ["Compost tea every 10 days", "हर 10 दिन कम्पोस्ट चाय", "દર 10 દિવસે કમ્પોસ્ટ ટી"],
    ],
    chemical: [
      ["Chlorothalonil 75 WP @ 2g/L", "क्लोरोथैलोनिल 75 WP @ 2g/L", "ક્લોરોથેલોનિલ 75 WP @ 2g/L"],
      ["Azoxystrobin 23 SC @ 1ml/L", "एज़ोक्सिस्ट्रोबिन 23 SC @ 1ml/L", "એઝોક્સિસ્ટ્રોબિન 23 SC @ 1ml/L"],
    ],
    prevention: [
      ["Three-year crop rotation", "तीन साल की फसल चक्र", "ત્રણ વર્ષનું પાક ચક્ર"],
      ["Remove lower infected leaves", "नीचे की संक्रमित पत्तियाँ हटाएँ", "નીચેના ચેપી પાન કાઢો"],
    ],
    care: [
      ["Earth up plants to protect tubers", "कंद बचाने हेतु मिट्टी चढ़ाएँ", "કંદ બચાવવા માટી ચઢાવો"],
      ["Keep nitrogen and potash balanced", "नाइट्रोजन और पोटाश संतुलित रखें", "નાઇટ્રોજન અને પોટાશ સંતુલિત રાખો"],
    ],
  },
  {
    id: "groundnut-tikka",
    crop: ["Groundnut", "मूँगफली", "મગફળી"],
    name: ["Tikka Leaf Spot", "टिक्का पत्ती धब्बा", "ટીક્કા પાન ડાઘ"],
    pathogen: "Cercospora arachidicola",
    summary: [
      "Dark circular spots that defoliate the crop and cut pod filling in Saurashtra and Marathwada.",
      "गहरे गोल धब्बे जिससे पत्तियाँ झड़ती हैं और फली भरना घट जाता है।",
      "ઘેરા ગોળ ડાઘ જેથી પાન ખરે અને શીંગ ભરાવો ઘટે.",
    ],
    symptoms: [
      ["Dark brown circular leaf spots", "गहरे भूरे गोल धब्बे", "ઘેરા ભૂરા ગોળ ડાઘ"],
      ["Yellow ring around spots", "धब्बों के चारों ओर पीला घेरा", "ડાઘ ફરતે પીળું વર્તુળ"],
      ["Heavy leaf shedding before harvest", "कटाई से पहले पत्तियाँ झड़ना", "લણણી પહેલાં પાન ખરવા"],
    ],
    organic: [
      ["Neem cake 250kg/ha in soil", "मिट्टी में नीम खली 250kg/ha", "જમીનમાં લીમડાનો ખોળ 250kg/ha"],
      ["Trichoderma seed treatment @ 10g/kg", "ट्राइकोडर्मा बीज उपचार @ 10g/kg", "ટ્રાઇકોડર્મા બીજ માવજત @ 10g/kg"],
    ],
    chemical: [
      ["Hexaconazole 5 EC @ 2ml/L", "हेक्साकोनाज़ोल 5 EC @ 2ml/L", "હેક્સાકોનાઝોલ 5 EC @ 2ml/L"],
      ["Two sprays at 40 and 60 days", "40 और 60 दिन पर दो छिड़काव", "40 અને 60 દિવસે બે છંટકાવ"],
    ],
    prevention: [
      ["Use disease-free certified seed", "रोगमुक्त प्रमाणित बीज लें", "રોગમુક્ત પ્રમાણિત બિયારણ લો"],
      ["Deep summer ploughing", "गर्मी में गहरी जुताई", "ઉનાળામાં ઊંડી ખેડ"],
    ],
    care: [
      ["Apply gypsum at pegging stage", "सुई अवस्था पर जिप्सम दें", "સોય અવસ્થાએ જીપ્સમ આપો"],
      ["Avoid waterlogging in the field", "खेत में पानी न भरने दें", "ખેતરમાં પાણી ભરાવા ન દો"],
    ],
  },
];

export const HEALTHY: L = ["Healthy Crop", "स्वस्थ फसल", "સ્વસ્થ પાક"];

export type DetectionResult = {
  id: string;
  createdAt: string;
  imageDataUrl: string;
  diseaseId: string | null;
  crop: L;
  name: L;
  confidence: number;
  severity: Severity;
  affectedArea: number;
};

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Mock inference. Swap the body for a REST call to the AI backend, e.g.
 * `POST ${import.meta.env.VITE_API_URL}/predict` with the image as FormData.
 */
export async function detectDisease(
  file: File,
  imageDataUrl: string,
): Promise<DetectionResult> {
  await new Promise((r) => setTimeout(r, 2200));

  const seed = file.size + file.name.length;
  const roll = pseudoRandom(seed);
  const healthy = roll > 0.86;

  const disease =
    DISEASES[Math.floor(pseudoRandom(seed * 1.7) * DISEASES.length)] ?? DISEASES[0]!;
  const affectedArea = healthy ? 0 : Math.round(6 + pseudoRandom(seed * 2.3) * 62);
  const confidence = Math.round((healthy ? 90 : 82) + pseudoRandom(seed * 3.1) * 15);

  const severity: Severity = healthy
    ? "low"
    : affectedArea > 50
      ? "critical"
      : affectedArea > 32
        ? "high"
        : affectedArea > 15
          ? "moderate"
          : "low";

  return {
    id: `scan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    imageDataUrl,
    diseaseId: healthy ? null : disease.id,
    crop: healthy ? ["Mixed", "मिश्रित", "મિશ્ર"] : disease.crop,
    name: healthy ? HEALTHY : disease.name,
    confidence: Math.min(confidence, 99),
    severity,
    affectedArea,
  };
}

export const SEVERITY_KEY: Record<Severity, string> = {
  low: "sev.low",
  moderate: "sev.moderate",
  high: "sev.high",
  critical: "sev.critical",
};

export const WEATHER = {
  location: "Rajkot, Gujarat",
  tempC: 29,
  condition: ["Partly cloudy", "आंशिक बादल", "આંશિક વાદળછાયું"] as L,
  humidity: 62,
  windKph: 11,
  rainChance: 20,
  forecast: [
    { day: ["Mon", "सोम", "સોમ"] as L, tempC: 30, rain: 10 },
    { day: ["Tue", "मंगल", "મંગળ"] as L, tempC: 31, rain: 15 },
    { day: ["Wed", "बुध", "બુધ"] as L, tempC: 28, rain: 45 },
    { day: ["Thu", "गुरु", "ગુરુ"] as L, tempC: 27, rain: 60 },
    { day: ["Fri", "शुक्र", "શુક્ર"] as L, tempC: 29, rain: 20 },
  ],
};

export const TEAM = [
  {
    name: "Brinda Undaviya",
    role: ["AI Engineer", "एआई इंजीनियर", "AI ઇજનેર"] as L,
    initials: "BU",
  },
  {
    name: "Kavisha Kapoor",
    role: ["Machine Learning Engineer", "मशीन लर्निंग इंजीनियर", "મશીન લર્નિંગ ઇજનેર"] as L,
    initials: "KK",
  },
  {
    name: "Nena Dabhi",
    role: ["Computer Vision Engineer", "कंप्यूटर विज़न इंजीनियर", "કોમ્પ્યુટર વિઝન ઇજનેર"] as L,
    initials: "ND",
  },
];
