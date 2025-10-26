
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, Loader2, Globe, TrendingUp, Heart,
  GraduationCap, Leaf, Building2, Download, Share2, X, Zap, Sparkles
} from "lucide-react";
import { base44 } from "@/api/base44Client";

import MSMEChart from "../components/dashboard/MSMEChart";
import UPIChart from "../components/dashboard/UPIChart";
import InfrastructureChart from "../components/dashboard/InfrastructureChart";
import StateComparison from "../components/dashboard/StateComparison";
import AIInsightPanel from "../components/dashboard/AIInsightPanel";
import EnvironmentChart from "../components/dashboard/EnvironmentChart";
import HealthChart from "../components/dashboard/HealthChart";
import EducationChart from "../components/dashboard/EducationChart";
import CleanestCitiesChart from "../components/dashboard/CleanestCitiesChart";
import SafestCitiesChart from "../components/dashboard/SafestCitiesChart";
import HealthcareChart from "../components/dashboard/HealthcareChart";
import DynamicDataChart from "../components/dashboard/DynamicDataChart";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [relevantCharts, setRelevantCharts] = useState([]);
  const [aiInsight, setAiInsight] = useState(null);
  const [specificData, setSpecificData] = useState(null);
  const [dynamicChartData, setDynamicChartData] = useState(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "or", name: "ଓଡ଼ିଆ" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "as", name: "অসমীয়া" },
    { code: "ur", name: "اردو" },
    { code: "sa", name: "संस्कृत" },
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: Sparkles },
    { id: "economy", name: "Economy", icon: TrendingUp },
    { id: "health", name: "Health", icon: Heart },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "environment", name: "Environment", icon: Leaf },
    { id: "governance", name: "Governance", icon: Building2 },
  ];

  const categoryQuestions = {
    economy: [
      "Show MSME growth trends in India",
      "Compare UPI transactions across states",
      "Which states have the highest business registrations?",
      "How is digital payment adoption growing?",
      "Show me MSME revenue growth over time"
    ],
    health: [
      "Which states have the best healthcare infrastructure?",
      "Compare hospital beds per capita across India",
      "Show life expectancy by state",
      "Which state has the best healthcare system?",
      "Compare healthcare indicators between Kerala and Bihar"
    ],
    education: [
      "Compare literacy rates across Indian states",
      "Which states have the highest education dropout rates?",
      "Show literacy trends in Bihar vs Kerala",
      "Compare education indicators across top 5 states",
      "What is the literacy rate in rural vs urban areas?"
    ],
    environment: [
      "Top 5 cleanest cities in India",
      "Compare air pollution in Delhi vs Karnataka",
      "Show AQI trends over the past 5 years",
      "Which city has the worst air quality?",
      "Compare pollution levels across major cities",
      "Show Swachh Survekshan rankings"
    ],
    governance: [
      "Show digital infrastructure adoption by state",
      "Compare 4G/5G coverage across India",
      "Which states lead in smart city initiatives?",
      "Show broadband penetration rates",
      "Compare digital infrastructure between states"
    ]
  };

  const translations = {
    en: {
      searchPlaceholder: "Ask anything about India...",
      analyzing: "Analyzing",
      visualizationsFound: "visualizations found",
      for: "for",
      searchButton: "Search",
      allCategories: "All Categories",
      economy: "Economy",
      health: "Health",
      education: "Education",
      environment: "Environment",
      governance: "Governance",
      download: "Download",
      share: "Share",
      aiInsightTitle: "🎯 AI Insight",
      loadingMessage: "🔍 AI is analyzing your query...",
      loadingSubMessage: "Translating • Finding data • Generating insights",
      noVizFoundTitle: "No visualizations found",
      noVizFoundMessage: "Try rephrasing your question or explore by category",
      startNewSearch: "Start New Search",
      emptyStateTitle: "Ask Anything About India",
      emptyStateMessage: "Use the search bar above or select a category",
      linkCopied: "✅ Link copied!",
      tryTheseQuestions: "Try these questions:",
      clickToSearch: "Click to search"
    },
    hi: {
      searchPlaceholder: "भारत के बारे में कुछ भी पूछें...",
      analyzing: "विश्लेषण",
      visualizationsFound: "विज़ुअलाइज़ेशन मिले",
      for: "के लिए",
      searchButton: "खोजें",
      allCategories: "सभी श्रेणियां",
      economy: "अर्थव्यवस्था",
      health: "स्वास्थ्य",
      education: "शिक्षा",
      environment: "पर्यावरण",
      governance: "शासन",
      download: "डाउनलोड",
      share: "साझा करें",
      aiInsightTitle: "🎯 एआई अंतर्दृष्टि",
      loadingMessage: "🔍 एआई आपके प्रश्न का विश्लेषण कर रहा है...",
      loadingSubMessage: "अनुवाद • डेटा खोज • अंतर्दृष्टि उत्पन्न",
      noVizFoundTitle: "कोई विज़ुअलाइज़ेशन नहीं मिला",
      noVizFoundMessage: "अपना प्रश्न पुनः वाक्यांशित करें या श्रेणी द्वारा एक्सप्लोर करें",
      startNewSearch: "नई खोज शुरू करें",
      emptyStateTitle: "भारत के बारे में कुछ पूछें",
      emptyStateMessage: "ऊपर खोज बार का उपयोग करें या श्रेणी चुनें",
      linkCopied: "✅ लिंक कॉपी किया गया!",
      tryTheseQuestions: "ये प्रश्न आज़माएं:",
      clickToSearch: "खोजने के लिए क्लिक करें"
    },
    ta: {
      searchPlaceholder: "இந்தியாவைப் பற்றி எதையும் கேளுங்கள்...",
      analyzing: "பகுப்பாய்வு",
      visualizationsFound: "காட்சிப்படுத்தல்கள் கண்டறியப்பட்டன",
      for: "க்கு",
      searchButton: "தேடு",
      allCategories: "அனைத்து பிரிவுகள்",
      economy: "பொருளாதாரம்",
      health: "சுகாதாரம்",
      education: "கல்வி",
      environment: "சுற்றுச்சூழல்",
      governance: "ஆட்சி",
      download: "பதிவிறக்கு",
      share: "பகிர்",
      aiInsightTitle: "🎯 AI நுண்ணறிவு",
      loadingMessage: "🔍 AI உங்கள் கேள்வியை பகுப்பாய்வு செய்கிறது...",
      loadingSubMessage: "மொழிபெயர்ப்பு • தரவு தேடல் • நுண்ணறிவு உருவாக்கம்",
      noVizFoundTitle: "காட்சிப்படுத்தல்கள் எதுவும் கண்டறியப்படவில்லை",
      noVizFoundMessage: "உங்கள் கேள்வியை மீண்டும் உருவாக்கவும் அல்லது வகையின் அடிப்படையில் ஆராயவும்",
      startNewSearch: "புதிய தேடலைத் தொடங்கு",
      emptyStateTitle: "இந்தியாவைப் பற்றி எதையும் கேளுங்கள்",
      emptyStateMessage: "மேலேயுள்ள தேடல் பட்டியைப் பயன்படுத்தவும் அல்லது ஒரு வகையைத் தேர்ந்தெடுக்கவும்",
      linkCopied: "✅ இணைப்பு நகலெடுக்கப்பட்டது!",
      tryTheseQuestions: "இந்த கேள்விகளை முயற்சிக்கவும்:",
      clickToSearch: "தேட கிளிக் செய்க"
    },
    te: {
      searchPlaceholder: "భారతదేశం గురించి ఏదైనా అడగండి...",
      analyzing: "విశ్లేషణ",
      visualizationsFound: "విజువలైజేషన్లు కనుగొనబడ్డాయి",
      for: "కోసం",
      searchButton: "వెతకండి",
      allCategories: "అన్ని వర్గాలు",
      economy: "ఆర్థిక",
      health: "ఆరోగ్యం",
      education: "విద్య",
      environment: "పర్యావరణం",
      governance: "పాలన",
      download: "డౌన్‌లోడ్",
      share: "భాగస్వామ్యం చేయండి",
      aiInsightTitle: "🎯 AI అంతర్దృష్టి",
      loadingMessage: "🔍 AI మీ ప్రశ్నను విశ్లేషిస్తోంది...",
      loadingSubMessage: "అనువాదం • డేటా శోధన • అంతర్దృష్టులను రూపొందించడం",
      noVizFoundTitle: "విజువలైజేషన్లు కనుగొనబడలేదు",
      noVizFoundMessage: "మీ ప్రశ్నను తిరిగి వివరించడానికి ప్రయత్నించండి లేదా వర్గం ద్వారా అన్వేషించండి",
      startNewSearch: "కొత్త శోధనను ప్రారంభించండి",
      emptyStateTitle: "భారతదేశం గురించి ఏదైనా అడగండి",
      emptyStateMessage: "పైన శోధన పట్టీని ఉపయోగించండి లేదా వర్గాన్ని ఎంచుకోండి",
      linkCopied: "✅ లింక్ కాపీ చేయబడింది!",
      tryTheseQuestions: "ఈ ప్రశ్నలను ప్రయత్నించండి:",
      clickToSearch: "శోధించడానికి క్లిక్ చేయండి"
    }
  };

  const t = translations[selectedLanguage] || translations.en;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const lang = urlParams.get('lang') || 'en';
    const category = urlParams.get('category');

    if (lang) setSelectedLanguage(lang);
    if (category) setSelectedCategory(category);
    if (query) {
      setSearchQuery(query);
      handleSearch(query, lang);
    } else if (category && category !== 'all') {
      filterByCategory(category);
    }
  }, []);

  const handleSearch = async (query = searchQuery, lang = selectedLanguage) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setDynamicChartData(null);
    
    try {
      // AUTO-ADD "India" if not mentioned
      let indiaQuery = query;
      if (!query.toLowerCase().includes('india') && 
          !query.toLowerCase().includes('indian') &&
          !query.toLowerCase().includes('bharat')) {
        indiaQuery = `${query} in India`;
      }

      // ULTRA-PRECISE query understanding
      const analysisPrompt = `Analyze: "${indiaQuery}"

**CRITICAL: INDIA-ONLY DATA**

**AVAILABLE INDIAN DATA:**
1. "cleanest_cities" - Swachh Survekshan (Indore, Surat, Bhopal are top examples)
2. "safest_cities" - NCRB crime data (Kolkata safest, Delhi less safe examples)
3. "environment" - Air pollution AQI trends (Delhi worst, Karnataka cleaner example)
4. "healthcare" - Hospital beds & life expectancy by state (Kerala, Delhi, Maharashtra examples)
5. "education" - Literacy rates by state (Kerala 96%, Bihar 61% examples)
6. "msme" - MSME business growth trends in India
7. "upi" - UPI transaction data by state in India
8. "infrastructure" - Digital infrastructure (4G/5G coverage) by state in India
9. "health" - General health metrics (life expectancy, mortality) by state in India

**YOUR TASK:**
- ALWAYS try to match query to one of these charts.
- If query is about data we DON'T have from above list, but can be found for India, set "has_local_data": false and "charts": ["dynamic"].
- NEVER return empty charts array if it's an India-related query.

Return JSON:
{
  "has_local_data": true/false,
  "charts": ["chart_id"] or ["dynamic"],
  "category": "category_name"
}

**IMPORTANT:** Even if confidence is low, still return best matching chart or "dynamic"!`;

      const analysisResult = await base44.integrations.Core.InvokeLLM({
        prompt: analysisPrompt,
        response_json_schema: {
          type: "object",
          properties: {
            has_local_data: { type: "boolean" },
            charts: { type: "array", items: { type: "string" } },
            category: { type: "string" }
          },
          required: ["has_local_data", "charts", "category"]
        }
      });

      const charts = analysisResult.charts || [];

      // If we have local charts, show them
      if (analysisResult.has_local_data && charts.length > 0 && !charts.includes('dynamic')) {
        const insightPrompt = `Query: "${indiaQuery}"

Write a SHORT social media post (MAX 2 sentences):
- Include 2-3 KEY NUMBERS with units
- Use emojis
- Make it engaging & shareable
- INDIA-SPECIFIC only. NO global data.

Example: "🏆 Indore is India's cleanest city with 97.5 score! Surat (95.8) & Bhopal (94.2) follow close. #SwachhBharat"

Language: ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'Telugu'}`;

        const insight = await base44.integrations.Core.InvokeLLM({
          prompt: insightPrompt
        });

        setRelevantCharts(charts);
        setSearchResult(indiaQuery);
        setAiInsight(insight);
        setSpecificData({ category: analysisResult.category });
        
        await base44.entities.Query.create({
          question: indiaQuery,
          language: lang,
          translated_question: indiaQuery,
          category: analysisResult.category || "general",
          state: '',
          insights: insight,
          insights_translated: insight
        });

        setIsSearching(false);
        return;
      }

      // Fetch INDIA-SPECIFIC data from web
      const webDataPrompt = `**CRITICAL: INDIA-ONLY DATA REQUEST**

Query: "${indiaQuery}"

**MANDATORY REQUIREMENTS:**
1. Get data ONLY for Indian states/cities.
2. NO global/world data.
3. AT LEAST 5 data points from Indian locations with real numbers.
4. Verify data is from Indian government or reputable official sources.
5. If the query cannot be satisfied with INDIA-SPECIFIC data, return "is_india_specific": false.

**EXAMPLE for "water-stressed states":**
CORRECT: Maharashtra, Karnataka, Tamil Nadu, Rajasthan, Gujarat (These are Indian states)
WRONG: California, Australia, Middle East (These are not Indian locations)

Return JSON:
{
  "title": "Clear chart title (must mention India or Indian states/cities)",
  "subtitle": "One line context about the Indian data",
  "data": [
    {"name": "Indian State/City 1", "value": 123.45},
    {"name": "Indian State/City 2", "value": 98.76},
    ...minimum 5 items, all with INDIAN names
  ],
  "unit": "Unit (₹ Cr, mm, %, etc.)",
  "chartType": "bar",
  "dataKey": "value",
  "insight": "SHORT 2-sentence social post with TOP 3 INDIAN numbers & emojis",
  "is_india_specific": true // Set to false if no India-specific data can be found
}

**VALIDATION:**
- All "name" fields must clearly refer to Indian states, cities, or regions.
- Data must be from Indian government/official sources.
- If no Indian data found, set "is_india_specific": false.`;

      const webData = await base44.integrations.Core.InvokeLLM({
        prompt: webDataPrompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            subtitle: { type: "string" },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  value: { type: "number" }
                },
                required: ["name", "value"]
              }
            },
            unit: { type: "string" },
            chartType: { type: "string" },
            dataKey: { type: "string" },
            insight: { type: "string" },
            is_india_specific: { type: "boolean" }
          },
          required: ["title", "data", "unit", "insight", "is_india_specific"]
        }
      });

      // VALIDATE: Client-side check to ensure data is actually India-specific
      const indianLocationsKeywords = [
        'andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 
        'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 
        'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 
        'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 
        'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura', 
        'uttar pradesh', 'uttarakhand', 'west bengal', 'delhi', 'up',
        'mumbai', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 
        'pune', 'ahmedabad', 'surat', 'jaipur', 'lucknow', 'kanpur',
        'nagpur', 'indore', 'thane', 'bhopal', 'visakhapatnam', 'pimpri',
        'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'agra', 'nashik',
        'india', 'indian', 'bharat', 'ncr' // Added common Indian regions/terms
      ];

      const isActuallyIndian = webData.is_india_specific !== false && 
                               webData.data && 
                               webData.data.length > 0 &&
                               webData.data.some(item => 
                                 indianLocationsKeywords.some(loc => 
                                   item.name.toLowerCase().includes(loc)
                                 )
                               );

      if (isActuallyIndian && webData.data.length >= 3) { // Ensure at least 3 data points for a meaningful chart
        setDynamicChartData(webData);
        setRelevantCharts(['dynamic']);
        setSearchResult(indiaQuery);
        setAiInsight(webData.insight);
        setSpecificData({ category: "india_web_data" });
        
        await base44.entities.Query.create({
          question: indiaQuery,
          language: lang,
          translated_question: indiaQuery,
          category: "dynamic_india_data",
          state: '',
          insights: webData.insight,
          insights_translated: webData.insight
        });
      } else {
        // NOT India-specific data or insufficient data points
        setRelevantCharts([]);
        setSearchResult(indiaQuery);
        setAiInsight(`⚠️ Could not find relevant India-specific data for "${query}". Please try rephrasing your question or choose from categories like cleanest cities, safest cities, pollution levels, literacy rates, or healthcare rankings for which we have rich data.`);
      }

    } catch (error) {
      console.error("Search error:", error);
      setRelevantCharts([]);
      setSearchResult(query); // Use original query for error display
      setAiInsight("❌ Error processing query. Please try again. Ensure your query is about India.");
    }
    setIsSearching(false);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    const categoryCharts = {
      'all': [],
      'economy': ['msme', 'upi'],
      'health': ['healthcare', 'health'],
      'education': ['education'],
      'environment': ['environment', 'cleanest_cities'],
      'governance': ['infrastructure', 'safest_cities'],
    };
    const chartsToDisplay = categoryCharts[category] || [];

    setRelevantCharts(chartsToDisplay);
    setSearchResult(category === 'all' ? null : `${t[category]} data`);
    if (category === 'all') {
      setAiInsight(null);
      setSpecificData(null);
      setDynamicChartData(null);
    } else {
      setAiInsight(t.emptyStateMessage);
      setSpecificData(null);
      setDynamicChartData(null);
    }
  };

  const shouldShowChart = (chartId) => {
    return relevantCharts.includes(chartId);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResult(null);
    setRelevantCharts([]);
    setSelectedCategory("all");
    setAiInsight(null);
    setSpecificData(null);
    setDynamicChartData(null);
  };

  const handleDownload = () => {
    alert(`📥 ${t.download}\n\nWould generate comprehensive PDF report.`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IndiaPulse Insights',
          text: aiInsight || 'Check out IndiaPulse',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t.linkCopied);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="sticky top-0 z-40 mb-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <Search className="w-5 h-5 text-slate-400" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 focus-visible:ring-0 bg-transparent dark:text-white"
              />
              {searchResult && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 dark:bg-slate-900/50 dark:border-slate-700 dark:text-white">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 shadow-lg"
              >
                {isSearching ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t.analyzing}</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" />{t.searchButton}</>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => cat.id === 'all' ? clearSearch() : filterByCategory(cat.id)}
                className={`transition-all ${selectedCategory === cat.id ? "bg-blue-600 text-white shadow-lg" : "dark:border-slate-700 dark:text-slate-300 hover:border-blue-300"}`}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {t[cat.id] || cat.name}
              </Button>
            ))}
          </div>

          {selectedCategory !== 'all' && categoryQuestions[selectedCategory] && !searchResult && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t.tryTheseQuestions}
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                {categoryQuestions[selectedCategory].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(question);
                      handleSearch(question);
                    }}
                    className="text-left px-4 py-3 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md group"
                  >
                    <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 font-medium">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {aiInsight && !isSearching && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3 text-lg">
                    {t.aiInsightTitle}
                  </h3>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-base font-medium whitespace-pre-line">{aiInsight}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleDownload} className="dark:border-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    {t.download}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleShare} className="dark:border-slate-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t.share}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isSearching && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 shadow-xl">
            <CardContent className="p-12 flex flex-col items-center gap-4">
              <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
              <div className="text-center">
                <p className="text-blue-900 dark:text-blue-300 font-semibold text-lg mb-2">
                  {t.loadingMessage}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {t.loadingSubMessage}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {searchResult && !isSearching && relevantCharts.length > 0 && (
          <div className="mb-6 flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 text-sm font-semibold">
                ✓ {relevantCharts.length} {t.visualizationsFound}
              </Badge>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {t.for}: <span className="font-semibold dark:text-white">"{searchResult}"</span>
              </span>
            </div>
          </div>
        )}

        {(searchResult || relevantCharts.length > 0) && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {shouldShowChart('dynamic') && dynamicChartData && (
                <DynamicDataChart
                  title={dynamicChartData.title}
                  subtitle={dynamicChartData.subtitle}
                  data={dynamicChartData.data}
                  chartType={dynamicChartData.chartType}
                  dataKey={dynamicChartData.dataKey}
                  unit={dynamicChartData.unit}
                  language={selectedLanguage}
                />
              )}

              {shouldShowChart('cleanest_cities') && <CleanestCitiesChart language={selectedLanguage} />}
              {shouldShowChart('safest_cities') && <SafestCitiesChart language={selectedLanguage} />}
              {shouldShowChart('healthcare') && <HealthcareChart language={selectedLanguage} />}

              {shouldShowChart('environment') && (
                <EnvironmentChart
                  locations={specificData?.locations}
                  language={selectedLanguage}
                  isComparison={specificData?.isComparison}
                />
              )}

              {shouldShowChart('education') && (
                <EducationChart
                  locations={specificData?.locations}
                  language={selectedLanguage}
                  isComparison={specificData?.isComparison}
                />
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {shouldShowChart('msme') && <MSMEChart language={selectedLanguage} />}
                {shouldShowChart('upi') && <UPIChart language={selectedLanguage} />}
              </div>

              {shouldShowChart('infrastructure') && <InfrastructureChart language={selectedLanguage} />}
              {shouldShowChart('health') && <HealthChart language={selectedLanguage} />}
              {shouldShowChart('comparison') && <StateComparison language={selectedLanguage} />}
            </div>

            <div className="lg:col-span-1">
              <AIInsightPanel
                searchQuery={searchResult}
                language={selectedLanguage}
                specificData={specificData}
                aiInsight={aiInsight}
              />
            </div>
          </div>
        )}

        {!searchResult && !isSearching && relevantCharts.length === 0 && selectedCategory === 'all' && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t.emptyStateTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {t.emptyStateMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
