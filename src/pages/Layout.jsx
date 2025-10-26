

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BarChart3, Home, Moon, Sun, Globe, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Set the document title
  useEffect(() => {
    document.title = "Create comprehensive IndiaPulse with 20+ data domains and smart visualization engine";
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <style>{`
        .dark {
          background: linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a);
        }
        @keyframes slide-in {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        darkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-white to-green-500 p-0.5 shadow-lg">
                <div className={`w-full h-full rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} flex items-center justify-center`}>
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent'}`}>
                  IndiaPulse
                </h1>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ask India Anything
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                to={createPageUrl("Home")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === createPageUrl("Home")
                    ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-900'
                    : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50/50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to={createPageUrl("Dashboard")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === createPageUrl("Dashboard")
                    ? darkMode ? 'bg-slate-800 text-white' : 'bg-blue-50 text-blue-900'
                    : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50/50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className={`rounded-lg ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </nav>
          </div>
        </div>

        {/* Sponsor Banner - Always Visible */}
        <div className={`border-t ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50'} py-2`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className={`font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Powered by:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a href="https://indiastack.online" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-blue-200 dark:border-slate-700">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold text-blue-900 dark:text-blue-400">IndiaStack.Online</span>
                </a>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-green-200 dark:border-slate-700">
                  <Globe className="w-3.5 h-3.5 text-green-600" />
                  <span className="font-semibold text-green-900 dark:text-green-400">LatLong API</span>
                </a>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:hover:shadow-md transition-all border border-orange-200 dark:border-slate-700">
                  <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
                  <span className="font-semibold text-orange-900 dark:text-orange-400">eSamudaay</span>
                </a>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-purple-200 dark:border-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span className="font-semibold text-purple-900 dark:text-purple-400">Knobly Media</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-0">
        {children}
      </main>

      {/* Enhanced Footer with Sponsor Details */}
      <footer className={`mt-20 border-t ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl">🇮🇳</span>
              <h3 className="text-2xl font-bold text-white">IndiaPulse</h3>
            </div>
            <p className="text-slate-300 text-sm mb-6">AI-Powered Data Intelligence for India</p>
          </div>
          
          {/* Sponsor Showcase */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-orange-400" />
                <h4 className="font-bold text-white">IndiaStack.Online</h4>
              </div>
              <p className="text-xs text-slate-300 mb-2">Digital Public Infrastructure</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded">Aadhaar Auth</span>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded">UPI Insights</span>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded">DigiLocker</span>
              </div>
            </div>
            
            <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-green-400" />
                <h4 className="font-bold text-white">LatLong API</h4>
              </div>
              <p className="text-xs text-slate-300 mb-2">Geolocation & Mapping</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">District Maps</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">Heatmaps</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded">Geocoding</span>
              </div>
            </div>
            
            <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h4 className="font-bold text-white">eSamudaay</h4>
              </div>
              <p className="text-xs text-slate-300 mb-2">MSME & Local Economy</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">MSME Growth</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">Business Data</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">Local Insights</span>
              </div>
            </div>
            
            <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h4 className="font-bold text-white">Knobly Media</h4>
              </div>
              <p className="text-xs text-slate-300 mb-2">Visual Storytelling</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">Insight Cards</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">Data Stories</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">Social Media</span>
              </div>
            </div>
          </div>

          <div className="text-center text-slate-400 text-sm border-t border-white/10 pt-6">
            <p className="mb-2">© 2025 IndiaPulse. Empowering India with Data Intelligence.</p>
            <p className="text-xs text-slate-500 flex flex-wrap justify-center gap-x-2">
              <span className="font-semibold text-slate-300">Languages:</span> Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Odia, Assamese, Urdu, Sanskrit. <span className="mx-1">•</span> Real-time Data <span className="mx-1">•</span> Open APIs <span className="mx-1">•</span> Built for India's Digital Future
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

