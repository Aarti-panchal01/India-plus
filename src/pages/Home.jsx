
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, Sparkles, Globe, TrendingUp, Heart, GraduationCap,
  Leaf, Building2, MapPin, BarChart3, Zap, CreditCard, Wifi
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
    { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "as", name: "অসমীয়া", flag: "🇮🇳" },
    { code: "ur", name: "اردو", flag: "🇮🇳" },
    { code: "sa", name: "संस्कृत", flag: "🇮🇳" },
  ];

  const categories = [
    { id: "economy", name: "Economy", icon: TrendingUp, color: "blue", desc: "GDP, Trade, Employment" },
    { id: "health", name: "Health", icon: Heart, color: "red", desc: "Healthcare, Mortality, Diseases" },
    { id: "education", name: "Education", icon: GraduationCap, color: "purple", desc: "Literacy, Schools, Skills" },
    { id: "environment", name: "Environment", icon: Leaf, color: "green", desc: "Pollution, Climate, Resources" },
    { id: "governance", name: "Governance", icon: Building2, color: "orange", desc: "Policies, Infrastructure, Services" },
  ];

  const exampleQueries = [
    "Compare air pollution in Delhi vs Karnataka over 5 years",
    "दिल्ली में यूपीआई लेनदेन की वृद्धि दिखाएं",
    "Show MSME growth in Maharashtra",
    "கர்நாடக மற்றும் தமிழ்நாட்டில் கல்வியறிவு விகிதத்தை ஒப்பிடுக",
    "What is the literacy rate in Bihar?",
  ];

  const stats = [
    { icon: Building2, label: "MSME Tracked", value: "6.3 Cr+", color: "text-orange-600", bg: "bg-orange-50", sponsor: "eSamudaay" },
    { icon: CreditCard, label: "UPI Transactions", value: "15.3B", color: "text-blue-600", bg: "bg-blue-50", sponsor: "IndiaStack" },
    { icon: Wifi, label: "Digital Coverage", value: "78%", color: "text-green-600", bg: "bg-green-50", sponsor: "IndiaStack" },
    { icon: MapPin, label: "Districts Mapped", value: "750+", color: "text-purple-600", bg: "bg-purple-50", sponsor: "LatLong" }
  ];

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      navigate(createPageUrl("Dashboard") + `?query=${encodeURIComponent(query)}&lang=${selectedLanguage}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(createPageUrl("Dashboard") + `?category=${category}&lang=${selectedLanguage}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20 animate-slide-in">
              <span className="text-3xl">🇮🇳</span>
              <span className="text-white font-medium">Ask India Anything in Your Language</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight animate-slide-in">
              IndiaPulse
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 mb-4 font-light animate-slide-in">
              Multilingual AI-Powered Data Intelligence
            </p>
            <p className="text-base text-blue-200 max-w-3xl mx-auto mb-12 animate-slide-in">
              Ask questions in any Indian language • Get instant insights with charts, maps & AI summaries
            </p>

            {/* Language Selector */}
            <div className="flex justify-center mb-8">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 px-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <Input
                      placeholder={selectedLanguage === 'hi' ? 'कुछ भी पूछें...' : 'Ask anything about India...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="border-0 focus-visible:ring-0 text-base dark:bg-transparent dark:text-white"
                    />
                  </div>
                  <Button
                    onClick={() => handleSearch()}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 rounded-xl shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Example Queries */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="text-blue-200 text-sm">Try:</span>
              {exampleQueries.slice(0, 3).map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(query)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-lg text-sm text-white border border-white/20 transition-all"
                >
                  "{query.length > 40 ? query.substring(0, 40) + '...' : query}"
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate(createPageUrl("Dashboard"))}
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 px-10 py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all font-bold border-2 border-blue-200"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Explore Dashboard
              </Button>
              <Button
                onClick={() => handleSearch("Show me India's economic trends")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all font-bold"
              >
                <Search className="w-5 h-5 mr-2" />
                Try a Sample Query
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 dark:bg-slate-800/50 dark:backdrop-blur-xl"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-14 h-14 ${category.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : category.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' : category.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' : category.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' : category.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' : ''} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-7 h-7 ${category.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : category.color === 'red' ? 'text-red-600 dark:text-red-400' : category.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : category.color === 'green' ? 'text-green-600 dark:text-green-400' : category.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : ''}`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">{category.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Insight Cards (New Stats Section) */}
      <section className="max-w-7xl mx-auto px-6 py-12 dark:bg-slate-900 rounded-lg mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg dark:bg-slate-800/50">
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${stat.bg} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-slate-300 mb-1">{stat.label}</p>
                <h3 className={`text-4xl font-extrabold ${stat.color} mb-3`}>{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Powered by <span className="font-semibold text-gray-700 dark:text-white">{stat.sponsor}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 dark:bg-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            Powered by <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent">Intelligence</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real-time data • AI insights • Beautiful visualizations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-0 shadow-xl dark:bg-slate-800/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Multilingual</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ask in English, Hindi, Tamil, Telugu, and 10+ Indian languages
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl dark:bg-slate-800/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">AI-Powered</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Natural language understanding with intelligent data analysis
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl dark:bg-slate-800/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">State-wise Maps</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Interactive state-level data visualization across all metrics
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl dark:bg-slate-800/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Real-time Data</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Live updates from India Stack, eSamudaay & open datasets
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-20">
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-green-500/10"></div>
            <div className="relative">
              <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Exploring India's Data Universe
              </h2>
              <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
                Access millions of data points across economy, health, education, environment & governance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate(createPageUrl("Dashboard"))}
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-12 py-7 text-xl rounded-xl shadow-2xl font-bold border-2 border-blue-200"
                >
                  <BarChart3 className="w-6 h-6 mr-2" />
                  Open Dashboard
                </Button>
                <Button
                  onClick={() => handleSearch("Show me India's economic trends")}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-7 text-xl rounded-xl shadow-2xl font-bold"
                >
                  <Search className="w-6 h-6 mr-2" />
                  Try a Sample Query
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
