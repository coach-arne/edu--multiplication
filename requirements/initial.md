# Requirements Document — Maaltafels Avonturenapp

## 1. Doel van de applicatie

Deze applicatie is een **front-end only leerapp** voor een **7-jarig hoogbegaafd kind** om de maaltafels van 1 t.e.m. 10 op een speelse, motiverende en visueel duidelijke manier te oefenen op een **iPad-first interface**. De app moet eenvoudig genoeg zijn om zelfstandig te gebruiken, maar tegelijk voldoende motiverend en uitdagend aanvoelen door middel van **gamification**, **levels**, **titels** en **directe feedback**.

De volledige applicatie moet **volledig Nederlandstalig** zijn.

---

## 2. Productvisie

De applicatie moet aanvoelen als een klein fantasie-avontuur waarin de speler groeit van beginnende leerling naar legendarische rekenheld. De kern van de ervaring is:

- snel en intuïtief oefenen van maaltafels;
- positieve motivatie via punten, levels en titels;
- duidelijke visuele voortgang;
- ondersteuning via hints, maar met een duidelijke trade-off in puntenverlies;
- grote knoppen en een interface die optimaal werkt op een iPad.

---

## 3. Doelgroep

### Primaire doelgroep

- Kinderen rond **7 jaar**.
- Kinderen die zelfstandig met een tablet kunnen werken.
- Kinderen die nood hebben aan een speelse maar duidelijke leerervaring.

### Specifieke context

- De applicatie moet ook goed aansluiten bij een **hoogbegaafd kind**:
  - snel begrip van regels;
  - nood aan motivatie en progression loops;
  - geen kinderachtige of te trage flow;
  - voldoende gevoel van autonomie en vooruitgang.

---

## 4. Scope

### In scope

- Oefenen van de maaltafels **1 t.e.m. 10**.
- Oefensessies met vragen en antwoordselectie via grote knoppen.
- Puntensysteem.
- Hint-systeem via maaltafelmatrix met puntenverlies.
- Progress bar en level-systeem.
- Fantasievolle titels per level.
- Simpele persistente opslag in Local Storage.
- Volledig Nederlandstalige UI.

### Out of scope

- Back-end.
- Login of gebruikersaccounts.
- Multiplayer.
- Audio-opname, spraakherkenning of complexe animatie-engines.
- Externe API’s.
- CMS of adminpaneel.

---

## 5. Technische requirements

### 5.1 Stack

De applicatie moet gebouwd worden met:

- **React**
- **Vite**
- **Tailwind CSS**
- **ShadCN UI**
- **Jotai** voor state management

### 5.2 Architectuur

- De applicatie is **front-end only**.
- Er mogen **geen class components** gebruikt worden.
- De codebase moet uitsluitend bestaan uit **functional components** en hooks.
- State moet op een eenvoudige, voorspelbare manier beheerd worden met **Jotai atoms**.
- Persistente gegevens moeten lokaal worden opgeslagen via **Local Storage**.

### 5.3 Persistentie

De volgende gegevens moeten minimaal bewaard blijven in Local Storage:

- huidig level;
- huidige titel;
- totaal aantal punten;
- voortgang per maaltafel;
- eventueel hoogste score of statistieken;
- voorkeuren zoals geselecteerde maaltafels indien relevant.

### 5.4 Device-first benadering

- De applicatie moet ontworpen worden voor **iPad-first gebruik**.
- De primaire viewport is tabletformaat in **portrait mode**.
- UI-elementen moeten groot genoeg zijn voor touch-interactie.
- Er moet rekening worden gehouden met:
  - voldoende padding;
  - grote klikzones;
  - leesbare typografie;
  - weinig visuele ruis;
  - snelle scanbaarheid.

### 5.5 Taal

- Alle zichtbare tekst in de applicatie moet in het **Nederlands** staan.
- Dit geldt voor:
  - navigatie;
  - knoppen;
  - foutmeldingen;
  - feedback;
  - titels;
  - uitleg;
  - progressieboodschappen.

---

## 6. Functionele requirements

## 6.1 Maaltafels oefenen

De gebruiker moet maaltafels van **1 t.e.m. 10** kunnen oefenen.

### Requirements

- De gebruiker moet een of meerdere maaltafels kunnen selecteren om te oefenen.
- De app moet sommen genereren op basis van de gekozen maaltafels.
- Een som moet visueel groot en duidelijk getoond worden.
- Voorbeeld: `6 × 7 = ?`
- De gebruiker moet een antwoord kunnen kiezen via grote, duidelijke antwoordknoppen.

### Acceptatiecriteria

- De gebruiker kan minstens elke tafel van 1 t.e.m. 10 apart oefenen.
- De gebruiker kan een oefensessie starten zonder complexe configuratie.
- Elke oefenvraag toont exact één vermenigvuldiging.

---

## 6.2 Antwoorden aanduiden met grote knoppen

De gebruiker moet antwoorden makkelijk kunnen aanduiden via touch.

### Requirements

- Antwoordopties moeten als **grote knoppen** worden weergegeven.
- Er moeten voldoende contrast en duidelijke leesbaarheid zijn.
- Het aantal antwoordopties moet beperkt en overzichtelijk zijn.
- De knoppen moeten ruim genoeg staan zodat foutief tikken vermeden wordt.

### Acceptatiecriteria

- Alle antwoordknoppen zijn comfortabel bruikbaar op een iPad.
- De gebruiker hoeft niet te typen.
- Eén tik is voldoende om een antwoord te selecteren.

---

## 6.3 Hint via maaltafelmatrix

De gebruiker moet een hint kunnen oproepen in de vorm van een maaltafelmatrix.

### Requirements

- Tijdens een oefenvraag moet een hintknop beschikbaar zijn.
- Bij activatie moet een **maaltafelmatrix** zichtbaar worden.
- De matrix moet leesbaar en eenvoudig interpreteerbaar zijn.
- Het gebruik van een hint moet leiden tot **puntenverlies**.
- De UI moet duidelijk maken dat een hint gebruiken een kost heeft.

### Acceptatiecriteria

- De hint is beschikbaar tijdens het beantwoorden van een vraag.
- Na gebruik van de hint worden minder punten toegekend voor die vraag.
- De hint mag de flow ondersteunen, maar niet gratis zijn.

---

## 6.4 Gamification

Gamification moet centraal aanwezig zijn in de applicatie.

### Requirements

- De gebruiker moet punten kunnen verdienen voor correcte antwoorden.
- Foute antwoorden mogen minder of geen punten opleveren.
- Gebruik van hints verlaagt de puntenopbrengst.
- Er moet een zichtbaar gevoel van vooruitgang zijn.
- De app moet positieve feedback geven bij goede prestaties.

### Mogelijke game-elementen

- punten per correct antwoord;
- bonus voor meerdere juiste antwoorden na elkaar;
- level progression;
- fantasietitels;
- visuele viering bij level-up.

### Acceptatiecriteria

- Na een correct antwoord krijgt de gebruiker directe feedback.
- Het puntensysteem is zichtbaar of begrijpelijk voor de gebruiker.
- Gamification motiveert zonder de interface te overladen.

---

## 6.5 Progress bar en levels

De gebruiker moet een progress bar zien die vult naarmate er geoefend wordt.

### Requirements

- De app moet een **progress bar** tonen tijdens of overheen de sessie.
- Bij voldoende voortgang of XP stijgt de gebruiker een level.
- Bij een level-up krijgt de gebruiker een nieuwe titel.
- De progress bar moet visueel duidelijk zijn voor een kind.

### Acceptatiecriteria

- De gebruiker ziet op elk relevant moment hoeveel vooruitgang al is geboekt.
- Wanneer de balk vol is, stijgt het level automatisch.
- Na level-up wordt de nieuwe titel zichtbaar getoond.

---

## 6.6 Fantasievolle titels

De gebruiker moet bij hogere levels een avontuurlijke fantasietitel krijgen.

### Requirements

- Elk level of levelcluster moet gekoppeld zijn aan een titel.
- De titels moeten motiverend, fantasierijk en kindvriendelijk zijn.
- De titels moeten volledig Nederlandstalig zijn.

### Voorstel voor naming scheme

1. Rekenleerling
2. Tafelverkenner
3. Cijferwacht
4. Sommenridder
5. Schilddrager van de Tafels
6. Rekenmagiër
7. Bewaker van de Matrix
8. Meester van de Tafels
9. Grootmeester van Getallen
10. Legende van het Rekenrijk

### Acceptatiecriteria

- Bij level-up wordt een nieuwe titel toegekend zodra een drempel bereikt wordt.
- De titel is zichtbaar in het profiel- of voortgangsgedeelte.

---

## 6.7 Volledig Nederlandstalige ervaring

De volledige applicatie moet in het Nederlands zijn.

### Requirements

- Alle labels, feedbackteksten en meldingen moeten Nederlandstalig zijn.
- De toon moet helder, vriendelijk en licht avontuurlijk zijn.
- Teksten moeten begrijpelijk zijn voor een jong kind.

### Voorbeelden van toon

- “Goed gedaan!”
- “Bijna! Probeer nog eens.”
- “Hint gebruikt — je verdient deze keer minder sterren.”
- “Level omhoog! Je bent nu een Sommenridder!”

---

## 7. UX requirements

## 7.1 iPad-first interface

- Ontwerp voor tabletgebruik, niet desktop-first.
- Belangrijkste acties moeten binnen duimbereik liggen.
- De layout moet rust uitstralen.
- De interface moet speels zijn, maar niet druk.

## 7.2 Toegankelijkheid en kindvriendelijkheid

- Grote typografie voor de sommen.
- Grote touch targets.
- Duidelijke visuele hiërarchie.
- Beperkt aantal keuzes per scherm.
- Onmiddellijke feedback na interactie.

## 7.3 Gebruiksgemak

- De gebruiker moet snel een sessie kunnen starten.
- Er moet minimale cognitieve overhead zijn.
- De flow moet logisch zijn:
  1. kies maaltafels;
  2. start sessie;
  3. beantwoord vragen;
  4. zie score, voortgang en level.

---

## 8. Schermen en functionele onderdelen

## 8.1 Startscherm

### Doel

De gebruiker laten starten met oefenen.

### Inhoud

- Titel van de app.
- Huidig level en titel.
- Totaal aantal punten.
- Knop om een sessie te starten.
- Knop of sectie om maaltafels te kiezen.

---

## 8.2 Selectiescherm voor maaltafels

### Doel

Kiezen welke tafels geoefend worden.

### Inhoud

- Selectie van tafels 1 t.e.m. 10.
- Mogelijkheid om één of meerdere tafels te selecteren.
- Duidelijke startknop.

---

## 8.3 Oefenscherm

### Doel

Het beantwoorden van sommen.

### Inhoud

- Grote weergave van de huidige som.
- Grote antwoordknoppen.
- Hintknop.
- Progress bar.
- Eventueel zichtbare score of sessiepunten.
- Directe feedback na antwoord.

---

## 8.4 Level-up / feedbackmoment

### Doel

Belonen en motiveren.

### Inhoud

- Visuele melding bij level-up.
- Nieuwe titel.
- Positieve feedback.

---

## 8.5 Voortgangsscherm of samenvatting

### Doel

Tonen van voortgang en motivatie.

### Inhoud

- Huidig level.
- Huidige titel.
- Totaal aantal punten.
- Eventuele voortgang per tafel.
- Eventueel hoogste streak of beste prestaties.

---

## 9. State management requirements met Jotai

De state moet opgesplitst worden in logische atoms, bijvoorbeeld:

- `selectedTablesAtom`
- `currentQuestionAtom`
- `scoreAtom`
- `progressAtom`
- `levelAtom`
- `titleAtom`
- `hintUsedAtom`
- `sessionStatsAtom`
- `userProgressAtom`

### Requirements

- Globale UI- en domeinstate wordt beheerd met Jotai.
- Local Storage synchronisatie gebeurt gecontroleerd en eenvoudig.
- Atoms moeten begrijpelijk en onderhoudbaar blijven.

---

## 10. Local Storage requirements

### Te bewaren data

- totaal aantal punten;
- huidig level;
- huidige titel;
- voortgang richting volgend level;
- statistieken per tafel;
- eventuele streaks of badges indien later toegevoegd.

### Requirements

- Bij herladen van de pagina moet voortgang behouden blijven.
- De app moet veilig omgaan met ontbrekende of corrupte local storage data.
- Er moet een eenvoudige fallback naar defaults zijn.

---

## 11. Niet-functionele requirements

## 11.1 Performance

- De app moet snel laden.
- Interacties moeten direct reageren.
- Er is geen zware dependency op netwerkcalls.

## 11.2 Onderhoudbaarheid

- Heldere componentstructuur.
- Herbruikbare UI-componenten.
- Duidelijke scheiding tussen domeinlogica en presentatie.
- Geen over-engineering.

## 11.3 Leesbaarheid van code

- Function components only.
- Duidelijke naamgeving.
- Kleine, begrijpelijke hooks en helpers.
- Geen classes.

## 11.4 Schaalbaarheid

De initiële versie is simpel, maar de architectuur mag uitbreiding toelaten naar bijvoorbeeld:

- delen en oefenen per moeilijkheidsgraad;
- extra spelmodi;
- badges;
- dagelijkse uitdagingen;
- optellen/aftrekken in de toekomst.

---

## 12. Visuele richting

### Gewenste stijl

- Speels en avontuurlijk.
- Fantasievol, maar niet te donker.
- Duidelijke UI met veel witruimte.
- Grote kaarten, knoppen en statuselementen.

### UI-richtlijnen

- Gebruik **ShadCN componenten** als basis.
- Styling via **Tailwind**.
- Grote buttons met duidelijke states.
- Progress bar moet prominent zichtbaar zijn.
- Titels en rewards mogen wat meer karakter hebben.

---

## 13. Functionele regels

## 13.1 Puntentoekenning

Voorbeeldregels:

- Correct antwoord zonder hint: volle punten.
- Correct antwoord met hint: verminderde punten.
- Fout antwoord: geen punten of beperkte straf.
- Eventuele streak bonus bij meerdere correcte antwoorden na elkaar.

De exacte puntenschaal mag in implementatie worden verfijnd, zolang volgende principes gelden:

- correct gedrag belonen;
- hints nuttig maar niet gratis maken;
- progressie voelbaar maken.

## 13.2 Level progression

- Progressie moet gebaseerd zijn op verzamelde XP of punten.
- Elke gevulde progress bar leidt tot één level-up.
- Na level-up start de volgende progress bar opnieuw.

## 13.3 Hint-penalty

- De hint moet altijd een duidelijke kost hebben.
- Die kost moet zichtbaar of begrijpelijk zijn in de UX.

---

## 14. Acceptatiecriteria op hoog niveau

De applicatie is geslaagd wanneer:

1. Een kind op een iPad zelfstandig een oefensessie kan starten.
2. Maaltafels 1 t.e.m. 10 correct geoefend kunnen worden.
3. Antwoorden geselecteerd kunnen worden via grote touch-vriendelijke knoppen.
4. Een maaltafelmatrix als hint getoond kan worden.
5. Het gebruik van hints punten kost.
6. Een progress bar zichtbaar is en levels ondersteunt.
7. Level-ups leiden tot nieuwe fantasietitels.
8. De volledige applicatie in het Nederlands staat.
9. Voortgang bewaard blijft via Local Storage.
10. De codebase React + Vite + Tailwind + ShadCN + Jotai gebruikt, met uitsluitend functional components.

---

## 15. Aanbevolen mapstructuur

```txt
src/
  components/
    ui/
    game/
    progress/
    tables/
  hooks/
  atoms/
  lib/
  data/
  pages/
  types/
  App.tsx
  main.tsx
```

### Richtlijn

- `components/game`: oefenflow, vraagkaart, antwoordknoppen
- `components/progress`: level, xp bar, titelweergave
- `components/tables`: selectie van maaltafels, matrix/hint
- `atoms`: Jotai atoms
- `lib`: local storage helpers, scoreberekening, level logic
- `data`: level titles, configuratie, vaste content

---

## 16. Suggestie voor MVP

### MVP bevat minimaal

- selectie van maaltafels 1-10;
- genereren van vragen;
- antwoordselectie via grote knoppen;
- score en punten;
- hintmatrix met puntenverlies;
- progress bar;
- levels en titels;
- local storage persistente voortgang;
- volledig Nederlandstalige interface.

---

## 17. Suggesties voor latere uitbreidingen

- Dagelijkse uitdaging.
- Badges of achievements.
- Verschillende moeilijkheidsgraden.
- Tijdmodus.
- Vrije oefenmodus vs avontuurmodus.
- Animaties en kleine sound effects.
- Ouder-dashboard met voortgangsoverzicht.

---

## 18. Prompting context voor Cursor

Gebruik dit document als bron voor de implementatie van een **front-end only iPad-first React app** met:

- React + Vite
- Tailwind CSS
- ShadCN UI
- Jotai
- functional components only
- local storage persistence
- volledige Nederlandstalige UI

Belangrijke implementatieprincipes:

- houd de componenten klein en herbruikbaar;
- ontwerp mobile/tablet first met focus op iPad;
- gebruik grote touch targets;
- vermijd classes;
- gebruik begrijpelijke state atoms;
- maak de UX speels, rustig en motiverend;
- implementeer een duidelijke gamification loop met score, progress bar, levels en fantasietitels.
