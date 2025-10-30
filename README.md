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