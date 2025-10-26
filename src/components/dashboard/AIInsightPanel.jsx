
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Download, Loader2, Share2, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function AIInsightPanel({ searchQuery, language = "en", specificData, aiInsight }) {
  const [insight, setInsight] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cardUrl, setCardUrl] = useState(null);

  useEffect(() => {
    if (aiInsight) {
      setInsight({
        title: language === 'hi' ? "डेटा अंतर्दृष्टि" : language === 'ta' ? "தரவு நுண்ணறிவு" : language === 'te' ? "డేటా అంతర్దృష్టి" : "Data Insight",
        content: aiInsight,
        language: language,
        category: specificData?.category || "general"
      });
    }
  }, [aiInsight, language]);

  const translations = {
    en: {
      title: "📊 AI Insight",
      exportCard: "🎨 Export Visual Card",
      generating: "Creating card...",
      download: "Download Card",
      share: "Share Card",
      tagline: "by Knobly Media"
    },
    hi: {
      title: "📊 एआई अंतर्दृष्टि",
      exportCard: "🎨 विज़ुअल कार्ड बनाएं",
      generating: "कार्ड बना रहे हैं...",
      download: "डाउनलोड करें",
      share: "साझा करें",
      tagline: "Knobly Media द्वारा"
    },
    ta: {
      title: "📊 AI நுண்ணறிவு",
      exportCard: "🎨 காட்சி அட்டை உருவாக்கு",
      generating: "அட்டையை உருவாக்குகிறது...",
      download: "பதிவிறக்கு",
      share: "பகிர்",
      tagline: "Knobly Media மூலம்"
    },
    te: {
      title: "📊 AI అంతర్దృష్టి",
      exportCard: "🎨 విజువల్ కార్డ్ సృష్టించండి",
      generating: "కార్డ్ తయారుచేస్తోంది...",
      download: "డౌన్‌లోడ్",
      share: "భాగస్వామ్యం",
      tagline: "Knobly Media ద్వారా"
    },
    kn: {
      title: "📊 AI ಒಳನೋಟ",
      exportCard: "🎨 ದೃಶ್ಯ ಕಾರ್ಡ್ ರಚಿಸಿ",
      generating: "ಕಾರ್ಡ್ ರಚಿಸಲಾಗುತ್ತಿದೆ...",
      download: "ಡೌನ್‌ಲೋಡ್",
      share: "ಹಂಚಿಕೊಳ್ಳಿ",
      tagline: "Knobly Media ಮೂಲಕ"
    }
  };

  const t = translations[language] || translations.en;

  const exportInsightCard = async () => {
    setIsExporting(true);
    setCardUrl(null);
    
    try {
      // Clean, short insight for card
      const shortInsight = insight.content.split('.').slice(0, 2).join('.') + '.';
      
      const imagePrompt = `Create a STUNNING social media card (1200x630px):

**Header (100px):**
- Indian flag gradient background (saffron-white-green)
- Text: "🇮🇳 IndiaPulse" (bold white, centered)

**Main (430px):
- Deep blue to purple gradient background
- Text: "${shortInsight}"
- HUGE white text (52px), centered, max 2 lines
- Extract ALL NUMBERS and make them BRIGHT ORANGE (#FB923C) and LARGER (64px)
- Clean, minimal design

**Footer (100px):**
- Dark gradient (#1E293B)
- Text: "Powered by AI • Real-time Data"
- Small white text (14px), centered

Make numbers POP. Clean design. HIGH contrast.`;

      const response = await base44.integrations.Core.GenerateImage({
        prompt: imagePrompt
      });

      if (response && response.url) {
        setCardUrl(response.url);
        await base44.entities.Insight.create({
          ...insight,
          card_image_url: response.url
        });
      }
    } catch (error) {
      console.error("Error generating card:", error);
      alert("❌ Error generating card. Please try again.");
    }
    
    setIsExporting(false);
  };

  const downloadCard = () => {
    if (cardUrl) {
      const link = document.createElement('a');
      link.href = cardUrl;
      link.download = `indiapulse-insight-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareCard = async () => {
    if (navigator.share && cardUrl) {
      try {
        await navigator.share({
          title: 'IndiaPulse Insight',
          text: insight.content,
          url: cardUrl
        });
      } catch (error) {
        navigator.clipboard.writeText(cardUrl);
        alert('✅ Link copied to clipboard!');
      }
    } else if (cardUrl) {
      navigator.clipboard.writeText(cardUrl);
      alert('✅ Image link copied!');
    }
  };

  if (!insight) return null;

  return (
    <Card className="shadow-2xl border-0 sticky top-36 dark:bg-slate-800/50 overflow-hidden animate-in fade-in duration-500">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <p className="text-xs text-blue-100 mt-1">{t.tagline}</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-xl mb-6 border-2 border-blue-200 dark:border-blue-800 animate-in slide-in-from-bottom duration-300">
          <p className="text-lg leading-relaxed text-slate-900 dark:text-slate-100 font-semibold whitespace-pre-line">
            {insight.content}
          </p>
        </div>

        {cardUrl && (
          <div className="mb-6 rounded-xl overflow-hidden border-4 border-green-500 dark:border-green-600 shadow-2xl animate-in zoom-in duration-300">
            <img src={cardUrl} alt="IndiaPulse Insight Card" className="w-full" />
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-900 dark:text-green-300">
                Card ready to share!
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {!cardUrl && (
            <Button
              onClick={exportInsightCard}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t.generating}
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  {t.exportCard}
                </>
              )}
            </Button>
          )}

          {cardUrl && (
            <>
              <Button onClick={downloadCard} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 shadow-lg hover:shadow-xl transition-all">
                <Download className="w-5 h-5 mr-2" />
                {t.download}
              </Button>
              <Button onClick={shareCard} variant="outline" className="w-full py-6 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all">
                <Share2 className="w-5 h-5 mr-2" />
                {t.share}
              </Button>
            </>
          )}
        </div>

        {/* Sponsor Attribution */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 via-white to-green-50 dark:from-orange-900/10 dark:via-slate-900/10 dark:to-green-900/10 rounded-xl border-l-4 border-orange-500">
          <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mb-2">
            🎨 Visual Storytelling:
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Powered by <span className="font-bold text-purple-600">Knobly Media</span> - Transform data into compelling visual stories
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
