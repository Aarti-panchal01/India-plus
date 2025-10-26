<h1 align="center">🇮🇳✨ India Pulse — Data Intelligence for the Next Billion ✨</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Build-for_Billion_Hackathon-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Powered_by-India_Stack_&_Base44-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/AI-Data_Visualization-success?style=for-the-badge"/>
</p>

---

> 💬 **India Pulse** is an AI-powered, visual dashboard that brings India’s public data to life.  
> It empowers citizens, policymakers, and innovators to explore, compare, and understand India through **data, maps, and stories.**

---

## 🧠 What is *India Pulse*?

🔹 A **data intelligence web app** that converts open datasets and India Stack APIs into powerful visual insights.  
🔹 Designed for **everyone** — from rural entrepreneurs to urban planners.  
🔹 Uses **AI + Natural Language Processing (NLP)** to answer questions about India in *any* language.  
🔹 Displays results as **interactive maps, charts, and dynamic visual stories** — powered by Base44’s visualization SDK.

---

## 💡 Built During

🏆 **Build for Billion Hackathon** —  
A nationwide innovation challenge to build impactful solutions for India’s **Next Billion Users**.

---

## 🚀 Why *India Pulse*?

✅ Makes **public data accessible** and **easy to understand** — no coding or data science required.  
✅ Empowers users to **compare states, districts, and cities** instantly.  
✅ Promotes **data transparency, civic participation, and informed decision-making**.  
✅ Supports **multilingual queries** using Base44 + India Stack integrations.  

---

<p align="center">
  <img src="https://github.com/Aarti-panchal01/India-plus/assets/demo-screenshot.png" width="80%" alt="India Pulse Dashboard Screenshot"/>
</p>

---

> 🪄 *“Data for everyone, insights for billions.”*  
> 🌏 Built with ❤️ for India.


🔗 **Live App:** [india-pulse.vercel.app](https://india-pulse.vercel.app)  
💻 **Built With:** React + Vite + Tailwind + AI APIs + India Stack  

---

## 🌍 Problem Statement

While India generates vast amounts of open data — from pollution levels to UPI transactions — most citizens and even small businesses **struggle to access and interpret** this data.  
Existing dashboards are complex, non-interactive, and often English-only.

**Goal:**  
Build a data intelligence layer over India Stack that makes public data accessible, visual, multilingual, and queryable by anyone — empowering *India’s next billion users*.

---

## 🚀 Features

✅ Natural-language Q&A — “Compare air pollution in Delhi vs Karnataka over 5 years”  
✅ AI-generated charts, maps & summaries  
✅ Multi-language support (starting with English, Hindi, Kannada, Tamil)  
✅ India-wide datasets: demography, health, economy, crime, infrastructure  
✅ Realtime integration with **India Stack APIs**  
✅ Optimized for accessibility & mobile-first design  

---

## 🏗️ System Architecture

               ┌──────────────────────┐
               │  User Query (Text / Voice) │
               └─────────────┬────────┘
                             │
                  Natural Language Parser
                             │
                 (Gemini / GPT + LangChain)
                             │
       ┌─────────────────────┴─────────────────────┐
       │                                           │
Dataset Layer API Layer
(India Open Data, CSVs, Govt APIs) (India Stack & Sponsors)
│ │
┌───────┴───────────┐ ┌─────────┴──────────┐
│ Data Processing │ │ External Connectors│
│ (Python + JS) │ │ (UPI, Aadhaar, etc)│
└───────┬───────────┘ └─────────┬──────────┘
│ │
└────────────────────┬──────────────────────┘
│
Visualization Layer
(React + D3.js + Tailwind + Maps)

---

## 🧩 APIs & Integrations

| Sponsor                                | API                           | Purpose                                 |
|----------------------------------------|-------------------------------|-----------------------------------------|
| **IndiaStack.Online**                  | Aadhaar Auth, UPI, DigiLocker | Secure Identity, Payments, Digital Docs |
| **LatLong API**                        | Geolocation + Mapping         | City-wise data visualization            |
| **eSamudaay**                          | MSME, Local Economy           | Local commerce & rural data             |
| **Knobly Media**                       | Visual Storytelling API       | Interactive visual narratives           |
| **Open Government Data (data.gov.in)** | Various public datasets       | Crime, Health, Education, etc.          |

---

## 📊 Key Datasets Used

- Crime Records Bureau (NCRB)
- Pollution and Air Quality Index (CPCB)
- UPI Transaction Metrics
- State-wise Literacy & Education Index
- Cleanest City Rankings (Swachh Survekshan)
- Population & Census Data
- Agriculture Output by Region
- MSME & Start-up Index (eSamudaay)
- Health Indicators (National Health Mission)

---

## 🧠 Example Queries

1. “Which state currently has the highest/lowest unemployment rate among all states”  
2. “Compare literacy rate between Kerala and Bihar”  
3. “Show crime trend in Delhi from 2015–2024”  
4. “Show the top 10 cleanest cities in India in 2024”  
5. “Which states have the fastest MSME growth?”  

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), TailwindCSS, Recharts, Mapbox  
**Backend:** Node.js, Express, LangChain  
**AI Layer:** Gemini / GPT-4 API for query understanding  
**Data Storage:** JSON/CSV + API integrations  
**Deployment:** Vercel + GitHub  
**Version Control:** Git  

---

🧭 Future Scope
Integration with DigiLocker for document-based datasets

Multi-lingual dataset summaries with Indic NLP

Mobile app version for local entrepreneurs

Voice-based queries using India’s regional languages



👩‍💻 Team
Project Lead: Aarti Panchal
Hackathon: Build for Billion (Round 2)
Institution: PES University, Bangalore
Mentors & Sponsors: NITK & IndiaStack.Online, eSamudaay, LatLong, Knobly Media

🏆 Vision
Empowering India’s next billion users with accessible data intelligence — because data should speak the language of every Indian.

🧾 License
MIT License © 2025 Aarti Panchal
