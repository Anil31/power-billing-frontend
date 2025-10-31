💻 Power Billing Frontend – React + TypeScript + Vite

Dieses Projekt ist das Frontend der Anwendung Power Billing, die im Rahmen des SCRUM-Klassenprojekts im Fach Softwaretechnologie & Datenmanagement (SDM) entwickelt wird.
Das Ziel ist eine moderne Weboberfläche zur Verwaltung von Kunden- und Verbrauchsdaten eines Stromkraftwerks.

🧩 Technologien

React mit TypeScript – Hauptframework für die Benutzeroberfläche

Vite – Entwicklungsumgebung für schnelles Build & Hot Reload

TailwindCSS – für das responsive Design

shadcn/ui – für moderne, wiederverwendbare UI-Komponenten

React Router – für Seiten-Navigation (z. B. Login, Kunden, Verbrauch)

fetch/Axios – für die Kommunikation mit dem Backend (REST-API)

⚙️ Voraussetzungen

Node.js (Version 18 oder höher)

npm oder pnpm als Paketmanager

Ein beliebiger Code-Editor (z. B. Visual Studio Code)

🚀 Projekt starten

Repository klonen oder lokal herunterladen:

git clone https://github.com/<BENUTZERNAME>/power-billing-frontend.git
cd power-billing-frontend


Abhängigkeiten installieren:

npm install


Entwicklungsserver starten:

npm run dev


Anwendung im Browser öffnen:

http://localhost:5173

🧱 Projektstruktur
src/
├── components/      # Wiederverwendbare UI-Komponenten (z. B. Button, Card)
├── pages/           # Seiten (Login, Kunden, Verbrauch)
├── layout/          # AppShell und Grundstruktur
├── assets/          # Bilder, Logos
├── App.tsx          # Haupteinstiegspunkt
└── main.tsx         # React-Root

🎯 Aktueller Stand (Sprint 1)

 Frontend-Projekt erstellt (Vite + React + TypeScript)

 UI-Bibliothek installiert (Tailwind + shadcn/ui)

 Grundlayout (AppShell mit Header/Content)

 Login-Seite (Mockup)

 Kundenliste (Demo-Daten)

📚 Ziel des Projekts

Das Frontend soll eine einfache, übersichtliche Oberfläche bieten, über die:

Kunden angelegt, angezeigt und bearbeitet werden können,

Verbrauchsdaten dargestellt werden,

Abrechnungen als PDF oder Excel exportiert werden.

Die Anwendung wird im Team nach dem SCRUM-Modell entwickelt.
Das Frontend kommuniziert über eine REST-API mit dem Backend, welches von den Systemintegratoren bereitgestellt wird.

👥 Team
Rolle	Name	Aufgaben
Frontend (AE)	[Dein Name]	GUI, Layout, Formulare, API-Anbindung
Backend (AE)	[Kollege]	Datenbank, API, Berechnungen
Systemintegration (SI)	[Namen]	Server, Container, Netzwerke
Kaufmann (KA)	[Name]	Anforderungen, Dokumentation, Präsentation
🏫 Hinweis für Lehrkräfte

Dieses Repository ist Teil der Projektarbeit IT-25-03 und dient ausschließlich schulischen Zwecken.
Der Code wird im Unterricht regelmäßig weiterentwickelt und dokumentiert.

Nutzwertanalyse:
„Wir haben verschiedene Frameworks verglichen und uns bewusst für React mit Vite und TypeScript entschieden,
weil es für unser Team die beste Kombination aus Geschwindigkeit, Wartbarkeit und Teamtauglichkeit bietet.
React erlaubt uns eine klare Komponentenstruktur, Vite sorgt für extrem schnelle Entwicklungszyklen,
und TypeScript schützt uns vor vielen Fehlern und erleichtert die Zusammenarbeit zwischen Frontend und Backend.
Besonders im SCRUM-Projekt, wo mehrere Auszubildende gleichzeitig am Code arbeiten, war das ein entscheidender Vorteil.“

Gewichtete Auswertung
Kriterium	Gewicht	React + Vite + TS	Angular	Vue.js	Plain JS
Entwicklungsgeschwindigkeit	0.15	0.75	0.45	0.60	0.30
Lernaufwand / Einstieg	0.10	0.40	0.20	0.50	0.30
Performance	0.15	0.75	0.60	0.60	0.45
Wartbarkeit / Codequalität	0.20	1.00	0.80	0.80	0.40
Teamfähigkeit / Zusammenarbeit	0.15	0.75	0.60	0.45	0.15
Ökosystem / Community	0.10	0.50	0.40	0.40	0.20
Integration mit Backend	0.15	0.75	0.60	0.60	0.45
Gesamtwert	1.00	4.90	3.65	3.75	2.25
 
Ergebnis & Begründung

React + Vite + TypeScript erreicht mit 4.9 von 5 Punkten den höchsten Nutzwert.

Begründung:

Durch Vite ist die Entwicklungsumgebung extrem schnell (Hot Reloads in Millisekunden).

React bietet eine komponentenbasierte Architektur, perfekt für die Aufteilung in Module wie Kunden, Anlagen, Wartung usw.

TypeScript erhöht die Codequalität und verhindert viele Integrationsfehler zwischen Frontend und Backend.

Die Trennung in Features und Pages sorgt für eine hohe Wartbarkeit und gute Erweiterbarkeit.

Das System ist leicht auf der VM auszuliefern (statischer Build).

Die Teamarbeit im SCRUM-Kontext profitiert von Typensicherheit, klaren Schnittstellen und schnellem Feedback.