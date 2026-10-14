import { LanguageCode } from '../types/health';

export interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  buildProfileCTA: string;
  exploreDemoCTA: string;
  nav: {
    overview: string;
    profile: string;
    upload: string;
    documents: string;
    prescriptions: string;
    labReports: string;
    timeline: string;
    copilot: string;
    abdmFhir: string;
    settings: string;
    signIn: string;
    signOut: string;
    features: string;
    howItWorks: string;
    privacy: string;
  };
  dashboard: {
    welcome: string;
    subGreeting: string;
    totalDocs: string;
    activeMeds: string;
    analyzedLabs: string;
    timelineEntries: string;
    recentDocs: string;
    criticalObservations: string;
    quickUpload: string;
    askCopilot: string;
    viewAll: string;
    explainReport: string;
    verified: string;
    unverified: string;
    disclaimerTitle: string;
    disclaimerText: string;
  };
  upload: {
    title: string;
    subtitle: string;
    dragDropText: string;
    browseFiles: string;
    supportedFormats: string;
    docCategory: string;
    analyzingDocument: string;
    confidenceScore: string;
    reviewExtracted: string;
    saveToProfile: string;
    cancel: string;
    successUploaded: string;
    ocrNotice: string;
  };
  summary: {
    simpleSummary: string;
    importantFindings: string;
    abnormalValues: string;
    whatThisMayMean: string;
    questionsForDoctor: string;
    nextSteps: string;
    sources: string;
    switchLanguage: string;
  };
  copilot: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    suggestedQuestions: string;
    sourcesCited: string;
    copyResponse: string;
    copied: string;
    disclaimer: string;
  };
  common: {
    normal: string;
    borderline: string;
    abnormal: string;
    critical: string;
    active: string;
    completed: string;
    discontinued: string;
    doctor: string;
    date: string;
    action: string;
    status: string;
    delete: string;
    download: string;
    preview: string;
    edit: string;
    save: string;
    close: string;
    loading: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'HealthSphere AI',
    tagline: 'Personal Health Copilot',
    heroHeadline: 'Your Health Records. One Intelligent Companion.',
    heroSubheadline:
      'Understand your medical reports, organize prescriptions, and discover meaningful health insights — all in one secure, AI-powered health profile.',
    buildProfileCTA: 'Build My Health Profile',
    exploreDemoCTA: 'Explore Demo',
    nav: {
      overview: 'Overview',
      profile: 'My Health Profile',
      upload: 'Upload Documents',
      documents: 'Medical Records',
      prescriptions: 'Prescriptions',
      labReports: 'Lab Reports',
      timeline: 'Health Timeline',
      copilot: 'AI Health Copilot',
      abdmFhir: 'ABDM / FHIR Gateway',
      settings: 'Settings & Privacy',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      features: 'Features',
      howItWorks: 'How It Works',
      privacy: 'Privacy & Security',
    },
    dashboard: {
      welcome: 'Welcome back',
      subGreeting: 'Here is your unified health summary and recent clinical updates.',
      totalDocs: 'Medical Documents',
      activeMeds: 'Active Prescriptions',
      analyzedLabs: 'Lab Markers Tracked',
      timelineEntries: 'Health Milestones',
      recentDocs: 'Recent Medical Records',
      criticalObservations: 'Values to Discuss with Doctor',
      quickUpload: 'Upload New Record',
      askCopilot: 'Ask Copilot About Records',
      viewAll: 'View Details',
      explainReport: 'Explain My Report',
      verified: 'Confirmed by Patient',
      unverified: 'Pending Review',
      disclaimerTitle: 'Clinical Safety & Informational Notice',
      disclaimerText:
        'HealthSphere AI organizes and explains documented health information. It is not a diagnostic device and does not substitute professional medical care, diagnosis, or emergency treatment.',
    },
    upload: {
      title: 'Medical Document OCR & Intake Studio',
      subtitle: 'Upload laboratory panels, prescriptions, discharge letters, or diagnostic imaging reports for structured extraction.',
      dragDropText: 'Drag and drop your medical files here, or',
      browseFiles: 'browse files',
      supportedFormats: 'Supports PDF, JPG, JPEG, and PNG files up to 25MB',
      docCategory: 'Select Document Category',
      analyzingDocument: 'Extracting clinical text and parameters...',
      confidenceScore: 'OCR Confidence Score',
      reviewExtracted: 'Review & Confirm Extracted Data',
      saveToProfile: 'Confirm & Add to Health Profile',
      cancel: 'Discard',
      successUploaded: 'Document successfully parsed and indexed in your health profile!',
      ocrNotice: 'Extracted with high-precision vision OCR. Please verify values against your original paper report.',
    },
    summary: {
      simpleSummary: 'Simple Summary (Plain Language)',
      importantFindings: 'Important Findings',
      abnormalValues: 'Abnormal or Out-of-Range Values',
      whatThisMayMean: 'What This May Mean',
      questionsForDoctor: 'Questions to Ask Your Doctor',
      nextSteps: 'Recommended Next Steps',
      sources: 'Document Provenance & Source Citations',
      switchLanguage: 'Summary Language',
    },
    copilot: {
      title: 'AI Health Copilot',
      subtitle: 'Ask questions grounded strictly in your verified medical records and reports.',
      placeholder: 'Ask about your test results, medication timings, or hospital reports...',
      send: 'Ask Copilot',
      suggestedQuestions: 'Suggested Inquiries',
      sourcesCited: 'Sources & Document Evidence',
      copyResponse: 'Copy Answer',
      copied: 'Copied to clipboard!',
      disclaimer: 'Copilot answers are strictly grounded in your uploaded documents. Always consult your doctor for medical advice.',
    },
    common: {
      normal: 'Normal',
      borderline: 'Borderline',
      abnormal: 'Elevated / Attention',
      critical: 'Critical Alert',
      active: 'Active',
      completed: 'Completed',
      discontinued: 'Discontinued',
      doctor: 'Doctor',
      date: 'Date',
      action: 'Action',
      status: 'Status',
      delete: 'Delete',
      download: 'Download',
      preview: 'Preview',
      edit: 'Edit',
      save: 'Save',
      close: 'Close',
      loading: 'Loading...',
    },
  },
  te: {
    appName: 'హెల్త్‌స్పియర్ AI',
    tagline: 'వ్యక్తిగత ఆరోగ్య సహచరి',
    heroHeadline: 'మీ వైద్య నివేదికలు. ఒకే తెలివైన ఆరోగ్య సహచరి.',
    heroSubheadline:
      'మీ మెడికల్ రిపోర్టులను అర్థం చేసుకోండి, ప్రిస్క్రిప్షన్లను క్రమబద్ధీకరించండి మరియు సమగ్ర ఆరోగ్య సమాచారాన్ని సురక్షితమైన ప్రొఫైల్‌లో పొందండి.',
    buildProfileCTA: 'నా హెల్త్ ప్రొఫైల్ ప్రారంభించండి',
    exploreDemoCTA: 'డెమో చూడండి',
    nav: {
      overview: 'అవలోకనం',
      profile: 'నా హెల్త్ ప్రొఫైల్',
      upload: 'పత్రాలు అప్‌లోడ్ చేయండి',
      documents: 'వైద్య పత్రాలు',
      prescriptions: 'మందుల చీటీలు',
      labReports: 'ల్యాబ్ రిపోర్టులు',
      timeline: 'ఆరోగ్య కాలక్రమం',
      copilot: 'AI హెల్త్ కోపైలట్',
      abdmFhir: 'ABDM / FHIR గేట్‌వే',
      settings: 'సెట్టింగ్‌లు & గోప్యత',
      signIn: 'లాగిన్',
      signOut: 'లాగౌట్',
      features: 'ఫీచర్లు',
      howItWorks: 'ఎలా పనిచేస్తుంది',
      privacy: 'భద్రత & గోప్యత',
    },
    dashboard: {
      welcome: 'స్వాగతం',
      subGreeting: 'ఇక్కడ మీ సమీకృత ఆరోగ్య సారాంశం మరియు తాజా వివరాలు ఉన్నాయి.',
      totalDocs: 'వైద్య పత్రాలు',
      activeMeds: 'ప్రస్తుత మందులు',
      analyzedLabs: 'ల్యాబ్ పరీక్షలు',
      timelineEntries: 'ఆరోగ్య మైలురాళ్ళు',
      recentDocs: 'ఇటీవలి నివేదికలు',
      criticalObservations: 'డాక్టర్‌తో చర్చించాల్సిన అంశాలు',
      quickUpload: 'కొత్త నివేదిక అప్‌లోడ్',
      askCopilot: 'కోపైలట్‌ని అడగండి',
      viewAll: 'వివరాలు చూడండి',
      explainReport: 'నా రిపోర్టును వివరించు',
      verified: 'ధృవీకరించబడింది',
      unverified: 'సమీక్షలో ఉంది',
      disclaimerTitle: 'వైద్య భద్రతా సమాచారం',
      disclaimerText:
        'హెల్త్‌స్పియర్ AI మీ పత్రాలను అర్థం చేసుకోవడానికి సహాయపడుతుంది. ఇది వైద్య సలహా లేదా అత్యవసర చికిత్సకు ప్రత్యామ్నాయం కాదు.',
    },
    upload: {
      title: 'మెడికల్ డాక్యుమెంట్ OCR స్టూడియో',
      subtitle: 'ల్యాబ్ రిపోర్టులు, ప్రిస్క్రిప్షన్లు లేదా డిశ్చార్జ్ సమ్మరీలను అప్‌లోడ్ చేయండి.',
      dragDropText: 'ఫైళ్లను ఇక్కడ డ్రాగ్ చేయండి, లేదా',
      browseFiles: 'ఫైల్ ఎంచుకోండి',
      supportedFormats: 'PDF, JPG, JPEG, మరియు PNG ఫైళ్లు 25MB వరకు అనుమతించబడతాయి',
      docCategory: 'పత్రం రకం ఎంచుకోండి',
      analyzingDocument: 'వైద్య సమాచారాన్ని సంగ్రహిస్తోంది...',
      confidenceScore: 'OCR ఖచ్చితత్వ స్కోరు',
      reviewExtracted: 'వివరాలను సరిచూసుకోండి',
      saveToProfile: 'ప్రొఫైల్‌లో భద్రపరచు',
      cancel: 'రద్దు చేయి',
      successUploaded: 'పత్రం విజయవంతంగా చేర్చబడింది!',
      ocrNotice: 'ఖచ్చితమైన విజన్ OCR ద్వారా సంగ్రహించబడింది. దయచేసి అసలు కాగితంతో సరిచూసుకోండి.',
    },
    summary: {
      simpleSummary: 'సరళమైన సారాంశం (సాధారణ భాష)',
      importantFindings: 'ముఖ్యమైన పరిశీలనలు',
      abnormalValues: 'పరిమితికి మించిన విలువలు',
      whatThisMayMean: 'దీని అర్థం ఏమిటి',
      questionsForDoctor: 'డాక్టర్‌ని అడగవలసిన ప్రశ్నలు',
      nextSteps: 'తదుపరి సూచనలు',
      sources: 'పత్ర మూలాలు మరియు సూచనలు',
      switchLanguage: 'సారాంశ భాష',
    },
    copilot: {
      title: 'AI హెల్త్ కోపైలట్',
      subtitle: 'మీ వైద్య పత్రాల ఆధారంగా నేరుగా ప్రశ్నలు అడగండి.',
      placeholder: 'మీ ల్యాబ్ పరీక్షలు, మందుల వేళల గురించి అడగండి...',
      send: 'ప్రశ్నించండి',
      suggestedQuestions: 'సూచించిన ప్రశ్నలు',
      sourcesCited: 'ఆధార పత్రాలు',
      copyResponse: 'సమాధానం కాపీ చేయి',
      copied: 'కాపీ చేయబడింది!',
      disclaimer: 'కోపైలట్ సమాధానాలు మీ పత్రాల ఆధారంగా మాత్రమే ఉంటాయి. డాక్టర్ సలహా తప్పనిసరి.',
    },
    common: {
      normal: 'సాధారణం',
      borderline: 'సరిహద్దులో',
      abnormal: 'ఎక్కువగా ఉంది',
      critical: 'తీవ్ర హెచ్చరిక',
      active: 'ప్రస్తుతం వాడుతున్నారు',
      completed: 'పూర్తయింది',
      discontinued: 'ఆపివేయబడింది',
      doctor: 'వైద్యులు',
      date: 'తేదీ',
      action: 'చర్య',
      status: 'స్థితి',
      delete: 'తొలగించు',
      download: 'డౌన్‌లోడ్',
      preview: 'చూడండి',
      edit: 'సవరించు',
      save: 'భద్రపరచు',
      close: 'మూసివేయి',
      loading: 'లోడ్ అవుతోంది...',
    },
  },
  hi: {
    appName: 'हेल्थस्फीयर AI',
    tagline: 'पर्सनल हेल्थ कोपायलट',
    heroHeadline: 'आपके मेडिकल रिकॉर्ड। एक बुद्धिमान स्वास्थ्य साथी।',
    heroSubheadline:
      'अपनी मेडिकल रिपोर्ट्स को आसानी से समझें, नुस्खे व्यवस्थित करें और एक सुरक्षित, AI-संचालित प्रोफाइल में स्वास्थ्य अंतर्दृष्टि प्राप्त करें।',
    buildProfileCTA: 'मेरी हेल्थ प्रोफाइल बनाएं',
    exploreDemoCTA: 'डेमो देखें',
    nav: {
      overview: 'अवलोकन',
      profile: 'मेरी हेल्थ प्रोफाइल',
      upload: 'दस्तावेज़ अपलोड करें',
      documents: 'मेडिकल रिकॉर्ड्स',
      prescriptions: 'दवाओं के पर्चे',
      labReports: 'लैब रिपोर्ट्स',
      timeline: 'स्वास्थ्य समयरेखा',
      copilot: 'AI हेल्थ कोपायलट',
      abdmFhir: 'ABDM / FHIR गेटवे',
      settings: 'सेटिंग्स और गोपनीयता',
      signIn: 'साइन इन',
      signOut: 'साइन आउट',
      features: 'विशेषताएं',
      howItWorks: 'यह कैसे काम करता है',
      privacy: 'सुरक्षा और गोपनीयता',
    },
    dashboard: {
      welcome: 'नमस्ते',
      subGreeting: 'यहाँ आपका एकीकृत स्वास्थ्य सारांश और नवीनतम अपडेट उपलब्ध हैं।',
      totalDocs: 'मेडिकल दस्तावेज़',
      activeMeds: 'सक्रिय दवाएं',
      analyzedLabs: 'ट्रैक किए गए लैब टेस्ट',
      timelineEntries: 'स्वास्थ्य पड़ाव',
      recentDocs: 'हाल के रिकॉर्ड्स',
      criticalObservations: 'डॉक्टर से चर्चा योग्य मान',
      quickUpload: 'नया रिकॉर्ड अपलोड करें',
      askCopilot: 'कोपायलट से पूछें',
      viewAll: 'सभी देखें',
      explainReport: 'मेरी रिपोर्ट समझाएं',
      verified: 'मरीज़ द्वारा सत्यापित',
      unverified: 'समीक्षा लंबित',
      disclaimerTitle: 'चिकित्सीय सुरक्षा सूचना',
      disclaimerText:
        'हेल्थस्फीयर AI दस्तावेज़ों को समझने और व्यवस्थित करने में मदद करता है। यह डॉक्टरी सलाह या आपातकालीन देखभाल का विकल्प नहीं है।',
    },
    upload: {
      title: 'मेडिकल दस्तावेज़ OCR स्टूडियो',
      subtitle: 'लैब रिपोर्ट, पर्चे या डिस्चार्ज सारांश अपलोड करें और संरचित डेटा प्राप्त करें।',
      dragDropText: 'यहाँ फाइलें खींचकर लाएं, या',
      browseFiles: 'फाइल चुनें',
      supportedFormats: 'PDF, JPG, JPEG और PNG फाइलें 25MB तक समर्थित हैं',
      docCategory: 'दस्तावेज़ की श्रेणी चुनें',
      analyzingDocument: 'मेडिकल जानकारी निकाली जा रही है...',
      confidenceScore: 'OCR सटीकता स्कोर',
      reviewExtracted: 'निकाले गए डेटा की समीक्षा करें',
      saveToProfile: 'प्रोफाइल में सहेजें',
      cancel: 'रद्द करें',
      successUploaded: 'दस्तावेज़ सफलतापूर्वक विश्लेषण कर जोड़ा गया!',
      ocrNotice: 'उच्च सटीकता विज़न OCR द्वारा निकाला गया। कृपया मूल कागजी रिपोर्ट से मिलान करें।',
    },
    summary: {
      simpleSummary: 'सरल सारांश (आम भाषा में)',
      importantFindings: 'महत्वपूर्ण निष्कर्ष',
      abnormalValues: 'असामान्य या सीमा से बाहर के मान',
      whatThisMayMean: 'इसका क्या अर्थ हो सकता है',
      questionsForDoctor: 'डॉक्टर से पूछने योग्य प्रश्न',
      nextSteps: 'अनुशंसित अगले कदम',
      sources: 'दस्तावेज़ स्रोत और संदर्भ',
      switchLanguage: 'सारांश भाषा',
    },
    copilot: {
      title: 'AI हेल्थ कोपायलट',
      subtitle: 'अपने अपलोड किए गए मेडिकल रिकॉर्ड्स के आधार पर सीधे सवाल पूछें।',
      placeholder: 'अपनी लैब रिपोर्ट, दवाओं के समय या डिस्चार्ज के बारे में पूछें...',
      send: 'पूछें',
      suggestedQuestions: 'सुझाए गए प्रश्न',
      sourcesCited: 'संदर्भित दस्तावेज़',
      copyResponse: 'जवाब कॉपी करें',
      copied: 'क्लिपबोर्ड में कॉपी किया गया!',
      disclaimer: 'कोपायलट के जवाब केवल आपके दस्तावेज़ों पर आधारित हैं। चिकित्सकीय सलाह हेतु डॉक्टर से संपर्क करें।',
    },
    common: {
      normal: 'सामान्य',
      borderline: 'सीमा रेखा',
      abnormal: 'बढ़ा हुआ / ध्यान दें',
      critical: 'गंभीर चेतावनी',
      active: 'सक्रिय',
      completed: 'पूर्ण',
      discontinued: 'बंद किया गया',
      doctor: 'चिकित्सक',
      date: 'तारीख',
      action: 'कार्रवाई',
      status: 'स्थिति',
      delete: 'हटाएं',
      download: 'डाउनलोड',
      preview: 'पूर्वावलोकन',
      edit: 'संपादित करें',
      save: 'सहेजें',
      close: 'बंद करें',
      loading: 'लोड हो रहा है...',
    },
  },
};
