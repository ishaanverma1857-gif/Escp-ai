/** KPMG × KI — Rückblick auf Deutsch (mit KI aus der englischen Fassung übersetzt). */
const de = {
  summary: `
*Ein Abend mit KPMG zum Thema künstliche Intelligenz, organisiert für Business-School-Studierende (ESCP). Zwei Referenten von KPMG — ein Partner (Xavier) mit Hintergrund in Wirtschaftsprüfung und Transaction Services sowie ein Analyst aus dem Bereich Transaction Services / Deal Advisory — erklärten, wie KI den Beruf verändert und wie Unternehmen sie einführen sollten, und zeigten live ein intern mit Claude von Anthropic entwickeltes KI-Tool.*

## Überblick

Die Veranstaltung begann mit einer einfachen Frage an den Saal — *Wer von euch nutzt ChatGPT?* — und einer Provokation: Hochschulen raten Studierenden oft von KI ab, dabei gehört KI bei KPMG längst zum Arbeitsalltag der Beraterinnen und Berater. Die Kernbotschaft der Referenten: Bei KI geht es nicht darum, Menschen zu ersetzen, sondern Unternehmen um sie herum neu zu denken.

## Wichtigste Erkenntnisse

**KI ist eine Transformation, kein Werkzeug.** KPMG arbeitet seit vier Jahren an KI. Aus Sicht des Unternehmens zerstört es Wert, bestehende Aufgaben nur zu automatisieren; die eigentliche Chance liegt darin, Betriebsmodelle, Angebote, Leistungserbringung und Karrierewege rund um KI neu zu gestalten. „Transformieren oder untergehen“ — in Anlehnung an den Investor David S. Rose argumentierten die Referenten, dass jedes Unternehmen, das sich nicht innerhalb von etwa drei Jahren wandelt, Gefahr läuft, aus seinem Markt gedrängt zu werden.

**Menschen bleiben der Unterschied.** Unter Verweis auf eine Studie zu führenden Unternehmen der Digitalwirtschaft (KPMG, Accenture, Apple und andere) betonten die Referenten, dass der entscheidende Wettbewerbsvorteil nicht in eigenen Modellen oder Plattformen liegt, sondern in den Menschen. Der Rat an die Studierenden: Finanzwissen mit Daten- und KI-Kompetenzen verbinden — eine starke und zunehmend gefragte Kombination. KPMG baut die Einstellung solcher „doppelten“ Profile aus, statt sie zu kürzen.

**Der Beruf der Wirtschaftsprüfung wird immer breiter.** Die Prüfung hat sich von der reinen Finanzprüfung über die nichtfinanzielle / Nachhaltigkeitsprüfung (CSRD, ESG) bis hin zur Prüfung der Technologie selbst entwickelt. Ein konkretes Beispiel: Ein französischer Softwareanbieter bat KPMG, die „Black Box“ seines KI-gestützten Tools für Kreditentscheidungen zu öffnen und es zu zertifizieren — eine neue Art von KI-Bestätigung, die Governance, Datensicherheit, Cybersicherheit und die Einhaltung des EU AI Act abdeckt.

**KI zu skalieren hängt von Vertrauen und Change Management ab.** Der Schritt von einigen wenigen Anwendungsfällen zur unternehmensweiten Nutzung erfordert (1) Vertrauen in die Technologie und (2) Change Management. Der größte Engpass ist das mittlere Management, dessen eingespielte Routinen die Einführung bremsen. Die Antwort von KPMG ist kontinuierliche Begleitung — „Wake Up Call“-Workshops, Hackathons —, verstanden als 7.000 individuelle Transformationen seiner Mitarbeitenden statt eines von oben verordneten Programms.

**Vier Technologiethemen tauchen bei Finanzvorständen und Aufsichtsgremien immer wieder auf:** vertrauenswürdige KI skalieren; Rollen innerhalb der Finanzfunktion neu definieren; technologische Resilienz; sowie Daten- und Technologiesouveränität (wo Daten gespeichert sind, Abhängigkeit von einem einzigen IT-Anbieter, das „Kill-Switch“-Risiko). Zur Cybersicherheit hoben die Referenten den starken Anstieg von Angriffen hervor — auch solcher, die bis in die physische Welt reichen — sowie eine Welle KI-generierter gefälschter Dokumente und Spesenabrechnungen und die Rolle von Wasserzeichen und Rückverfolgbarkeit. Ein abschließendes Beispiel mit Delta Air Lines zeigte, dass ein großer Teil des Werts eines Unternehmens in seinen Daten liegen kann (etwa in einem Kundenbindungsprogramm) und nicht im Kerngeschäft.

## Live-Demo — Transaction Services & Anthropic

Der Bereich Transaction Services / Deal Advisory (rund 300 Fachleute in Frankreich) berät bei Transaktionen auf Käufer- und Verkäuferseite und normalisiert Finanzkennzahlen wie das EBITDA, um zu einem fairen Unternehmenswert zu gelangen. Vor einigen Monaten hat KPMG eine Partnerschaft mit **Anthropic** geschlossen, um den Teams Zugang zu **Claude** zu geben.

Der Bereich hat ein KI-Kompetenzzentrum, das **„Lighthouse“**, mit zwei Arbeitssträngen aufgebaut: alle Mitarbeitenden schulen (Programme von 2–4 Tagen, konkrete Fälle, Aufbau und Orchestrierung von Agenten) und interne Lösungen entwickeln. Den Mitarbeitenden wird ein einfaches **„4D“-Rahmenmodell** für den verantwortungsvollen Umgang mit KI vermittelt:

- **Delegation** — entscheiden, was man an die KI abgibt (Zusammenfassen, Erkennen von Auffälligkeiten, Dokumentenprüfung), ohne je das fachliche Urteil abzugeben; immer einen Menschen im Prozess behalten.
- **Description** — gute Prompts schreiben: eine Rolle zuweisen, Kontext geben, Quellen nennen, das Ausgabeformat festlegen. Das reduziert Halluzinationen, Iterationen und verschwendete Tokens.
- **Discernment** — die KI als Denkpartner behandeln und ihre Antworten stets hinterfragen.
- **Diligence** — jedes KI-Ergebnis prüfen und dafür Verantwortung übernehmen. Die Arbeit verlagert sich von der Erstellung hin zur Prüfung.

Gezeigte Tools waren unter anderem Microsoft **Copilot** (mit der gesamten Microsoft-Umgebung verbunden) und **Digital Gateway**, eine mit Anthropic entwickelte Plattform, die aus rohen ERP-Exporten in wenigen Minuten Databooks erstellt. Die Hauptdemo war der **„VDD Flash Reader“**: Auf der Käuferseite zieht ein Analyst einen Vendor-Due-Diligence-Bericht in das Tool, das daraufhin eine Zusammenfassung auf hoher Ebene erstellt (zentrale Finanzkennzahlen, rechtliche Struktur, Geschäftsüberblick), rund 30 gezielte Fragen an die Gegenseite generiert und jede Aussage mit ihrer Quellseite verknüpft, damit Prüfende sie im Original nachvollziehen und Halluzinationen erkennen können. Das Tool basiert auf Retrieval-Augmented Generation (RAG) über die private Wissensbasis des Unternehmens, beschleunigt Prüfungen unter Zeitdruck — Analysten können sich innerhalb von ein bis zwei Stunden in ein Dokument einarbeiten — und soll in einigen Wochen intern breiter ausgerollt werden, sobald Integration und Sicherheit freigegeben sind.
`,
  transcript: `
*Dies ist eine bearbeitete deutsche Transkription der Veranstaltung. Die Aufnahme wurde automatisch transkribiert, ins Englische übersetzt und zur besseren Lesbarkeit leicht überarbeitet; diese deutsche Fassung wurde anschließend mit KI aus der englischen Transkription übersetzt. Inhalt und Ablauf folgen eng dem französischen Original, der genaue Wortlaut entspricht jedoch nicht dem im Saal Gesagten, und einige Eigennamen und Zahlen (wo unsicher, gekennzeichnet) ließen sich anhand der Aufnahme nicht bestätigen. Die Zuordnung der Sprecher ist ungefähr.*

---

## Einführung

**Moderation / KPMG:** Guten Abend zusammen. Ich stelle kurz das Team vor, das heute Abend bei uns ist — Kolleginnen und Kollegen aus unseren Teams Digital und Transaction Services, darunter ein Manager und ein Senior Analyst aus Transaction Services. Ich übergebe an Xavier.

**Xavier (Partner bei KPMG):** Diese Folie ist nicht die spannendste — sie zeigt einfach die Kunden des Unternehmens. Wir arbeiten mit praktisch dem gesamten CAC 40 und vielen großen Konzernen. Bevor wir anfangen, eine Frage an euch, denn heute Abend sprechen wir viel über künstliche Intelligenz: Wer von euch nutzt ChatGPT?

*(Der Großteil des Saals meldet sich.)*

**Xavier:** Genau — fast alle. Und bringt euch die ESCP in euren Kursen bei, KI zu nutzen?

*(Gemischte Reaktionen im Saal.)*

**Xavier:** Ich glaube, das ist eine Rolle, die Hochschulen zunehmend übernehmen müssen. Studierenden wird gesagt, sie sollen keine KI nutzen — dabei ist KI morgen, und eigentlich schon heute, Teil der täglichen Arbeit unserer Teams und Berater. Ich finde sogar, eure Professorinnen und Professoren sollten euch beibringen, KI im Alltag besser zu nutzen.

Wir arbeiten jetzt seit vier Jahren an künstlicher Intelligenz. Mein Innovationsteam und ich haben viel Arbeit hineingesteckt. Rückblickend haben wir nicht alles richtig gemacht, aber wir haben große Fortschritte erzielt. Am Anfang haben wir an einer riesigen Zahl von Anwendungsfällen gearbeitet. Heute wissen wir viel genauer, was gut funktioniert und was weniger — und zwar nicht nur bei finanznahen Tätigkeiten.

## Return on Investment — und wofür KI wirklich da ist

**Xavier:** Im Rückblick lautet die naheliegende Frage: Wie hoch ist der Return on Investment? In meiner Rolle habe ich mit vielen Finanzvorständen und Finanzabteilungen von CAC-40-Unternehmen zu tun, und ihre erste Frage ist genau diese — der ROI, die Produktivitätsgewinne: Messt ihr sie, und gebt ihr diese Gewinne an uns weiter? Die Antwort ist nicht einfach. Wenn man genauer hinschaut, glaube ich nicht, dass noch jemand bezweifelt, dass KI Zeit spart — darüber sind sich alle einig.

Aber dahinter stehen tiefere Fragen. Die erste lautet: Was machen wir mit diesen Gewinnen? Man kann sich Unternehmen vorstellen, die ohnehin unter Druck stehen und sagen: „Um meine Rentabilität zu verbessern, baue ich als Erstes Personal ab.“ Und wo würden sie anfangen? Leider für euch oft bei den Jüngsten — bei denen, die in den nächsten Jahren in den Arbeitsmarkt eintreten. Man spürt bereits eine gewisse Anspannung auf dem Arbeitsmarkt, und zwar nicht nur im Ausland, sondern auch bei französischen Unternehmen.

Ich halte das für einen Fehler. Es brauchte eine Studie, um den entscheidenden Unterschied zwischen Unternehmen der Digitalwirtschaft zu verstehen — Firmen wie KPMG, Accenture, Apple und andere. Warum dieser Sektor? Weil er in seinem Denken und seiner Entwicklung etwas voraus ist, was naheliegt, da diese Firmen selbst anderen Unternehmen bei der Transformation helfen. Und wisst ihr, was sie als entscheidenden Faktor genannt haben? Nicht eigene Modelle, nicht intern entwickelte Plattformen oder Agenten — auch wenn wir viel über Agenten reden. Es sind die Menschen. Die Frauen und Männer stehen an erster Stelle.

Der Punkt ist: Die Zukunft besteht nicht darin, Büroangestellte durch KI zu ersetzen. Das heißt nicht, dass wir keine KI nutzen werden — aber wenn wir nur die Aufgaben automatisieren, die unsere Teams heute erledigen, dann zerstören wir auf Ebene des Unternehmens und der Wirtschaft tatsächlich Wert. Das ist nicht gut. Die eigentliche Frage ist, was wir mit KI machen: nicht KI ein bisschen übers Unternehmen streuen, sondern das Unternehmen — die Modelle — rund um KI neu denken. Wir passen unsere Angebote, unseren Go-to-Market, die Art, wie wir unsere Mandate rund um KI erbringen, und die Kompetenzen unserer Teams an.

## Ratschläge zu Kompetenzen

**Xavier:** Bisher haben wir im Finanzbereich vor allem Leute von Business Schools und mit ähnlichem Hintergrund eingestellt — schlicht weil wir Menschen brauchten, die dieselbe Sprache wie unsere Kunden sprechen und verstehen, wie Unternehmen organisiert sind. Das ist essenziell. Aber mit der Wende der 2010er-Jahre wurden Daten für Unternehmen unverzichtbar. Daten sind der Ausgangspunkt jeder Führungskraft, die eine Entscheidung trifft und ihr Unternehmen und ihre Geschäftstätigkeit steuert. Daten sind also die zweite Säule unserer Strategie.

Bei den Kompetenzen ist deshalb meine Empfehlung: Behaltet euer Interesse an Finanzen — das ist essenziell —, baut aber auch echte Kompetenzen in Daten und künstlicher Intelligenz auf. Ich glaube, ihr habt eine gute Kombination gewählt. Heute muss man diese Fähigkeiten verbinden, um auf dem Markt noch attraktiver zu sein.

Warum sage ich das? Weil wir, wenn Unternehmen sich nicht wandeln — und wenn wir selbst keine tiefgreifende Transformation all unserer Modelle angehen, nicht nur der Leistungserbringung, sondern auch unserer Angebote, unserer Mitarbeitenden, unserer Academy, unserer Karrierewege —, in drei Jahren nicht nur weniger wettbewerbsfähig oder weniger profitabel sein werden; wir werden komplett aus dem Markt sein, was die Attraktivität sowohl für Kunden als auch für unsere eigenen Teams angeht. Wir wären nicht mehr relevant, und das ist der Niedergang. Das ist die Idee von „click or decline“. Das gilt für Firmen wie unsere und für jedes Unternehmen auf der Welt. Es gibt heute wirklich keinen Sektor, der vor dieser Transformation geschützt ist.

Ihr habt sowohl die Chance — und es ist auch für euch kein passiver Moment, angesichts der Anspannung bei den Einstellungen — als auch die Gelegenheit, diese Transformation mitzuerleben und die erste KI-native Generation zu sein. Es geht sehr schnell. Ihr seid von Natur aus Digital Natives. Deshalb haben wir unsere Einstellungen nicht reduziert — im Gegenteil, wir beschleunigen und stellen doppelte Profile ein, die Finanzen und KI verbinden. Ihr seid die Generation, mit der wir unsere eigene Transformation umsetzen werden, und das ist wichtig.

## Xaviers Werdegang und Ratschläge

**Xavier:** Warum bin ich zu KPMG gekommen? Es gab mehrere Gründe. Der erste war, in einem Unternehmen mit echter internationaler Dimension zu arbeiten — das war entscheidend.

Ich erzähle euch eine kurze Geschichte. Lange habe ich an der Prüfung eines großen IT-Dienstleisters gearbeitet. Ein französischer Manager, der das US-Geschäft leitete, sollte nach Frankreich zurückkehren, und mir wurde gesagt, ich würde ihn im Ausland ersetzen. Am Ende kam er nie zurück — aber es hat mir Türen geöffnet. Später hieß es, da es nicht die USA würden, schicke man mich nach London, um mit den britischen Partnern zu beginnen. Das sollte im September 2015 sein.

Dann, kurz davor — etwa Ende Juni / Anfang Juli 2015, zwei Monate vorher — tätigte das Unternehmen seine bis dahin größte Übernahme: einen indischen Pure Player. Drei Wochen später landete ich also in Bangalore. Ich blieb sieben Monate — eine wunderbare Erfahrung, beruflich wie persönlich. Indien ist ein Land, das mir sehr ans Herz gewachsen ist. Ich habe mit den lokalen Teams von KPMG India gearbeitet, die enorm talentiert und enorm engagiert sind.

Zurück in Frankreich beschloss ich, einen Desk für französisch-indische Beziehungen aufzubauen. Anders als IT-Dienstleister, die Aufgaben nach Indien verlagerten — das sogenannte „Offshoring“, davon habt ihr alle gehört —, habe ich das Gegenteil gemacht. Ich habe gesagt: Holen wir die besten indischen Talente nach Frankreich, damit sie an unseren Mandaten arbeiten. Ich habe Dutzende indische Manager hergeholt — eine Bereicherung für sie wie für unsere Teams.

Das alles, um zu sagen: In eurer Karriere werden sich Chancen ergeben. Man muss viel geben, damit sie entstehen, und man muss sie ergreifen und auch wieder aufstehen können. Wenn ihr eine Idee habt — „ich würde gern einen neuen Service, ein neues Angebot entwickeln“ —, zögert nicht, egal welchen Hintergrund ihr habt. Wir freuen uns am meisten, wenn jemand vorschlägt, unser Spielfeld zu erweitern. Das geht auch in einer großen Firma: Von außen wirkt sie vielleicht verschlossen und starr, von innen ist es genau umgekehrt. Tony kann das auch bestätigen.

## Die Digitalisierung — und Erweiterung — der Wirtschaftsprüfung

**Xavier:** Warum bin ich zu KPMG und in diesen Bereich gekommen? Finanzen haben mich interessiert, aber ich war auch immer begeistert von Technologie — vom Digitalen. Der größte Teil meines Portfolios hatte mit dem Technologiesektor zu tun — Softwareanbieter und so weiter.

Vor einigen Jahren haben wir die sogenannte digitale Prüfung übernommen — die Digitalisierung der Abschlussprüfung selbst. Ich habe lange externe Prüfung unterrichtet und fand sie schon damals etwas altmodisch: Man griff auf Arbeitspapiere aus Papier zurück. Ich bin nicht sicher, ob das viel Begeisterung geweckt hat. Wir haben uns gesagt, dass das einfach nicht mehr haltbar ist — wir können von unseren Teams nicht verlangen, so zu arbeiten wie in den 1980er-Jahren. Also haben wir begonnen zu digitalisieren, stark unterstützt durch die Transformation bei unseren Kunden, die ihre Prozesse digitalisiert und eigene Digitalprogramme gestartet hatten. Heute gibt es überall Software, und der Prüfer baut ganz natürlich auf der Transformation des Kunden auf. Inzwischen haben wir überall Agenten, die in jedem Schritt des Prüfungsprozesses helfen — und dasselbe gilt in der Beratung und unseren anderen Geschäftsbereichen. Das ist ziemlich beeindruckend.

Unsere Berufe haben sich komplett verändert. Aber ihr könntet denken, der Weg sei zu Ende — im Gegenteil, er fängt gerade erst an. Das Versprechen der KI besteht nicht nur darin, Zeit zu sparen.

Ein konkretes Beispiel: 18 bis 20 Jahre lang haben wir nur Finanzprüfung gemacht. Die Finanzprüfung ist im Grunde eine Bestätigung der Finanzberichterstattung großer französischer Unternehmen. Dann, vor zwei oder drei Jahren, kam die zweite Wende: die nichtfinanzielle Prüfung. CSRD, ESG — davon habt ihr alle gehört. Große Unternehmen müssen jetzt über ihre Maßnahmen zur Senkung ihres CO₂-Fußabdrucks, zur Förderung von Inklusion und so weiter berichten. Das ist also ein zweiter Hut für den Prüfer: Finanzprüfer und Prüfer nichtfinanzieller Informationen.

Und jetzt werden wir auch Prüfer von Technologie. Das klingt vielleicht etwas seltsam, also erkläre ich es. Mit KI geht es zunehmend nicht nur um die Verfügbarkeit oder Qualität von Daten — das haben die meisten Unternehmen mehr oder weniger gelöst. Das eigentliche Thema ist die Skalierung: von ein paar Anwendungsfällen hier und da zu einer massiven Nutzung von KI im ganzen Unternehmen. Wenn nur 10 % der Mitarbeitenden KI nutzen, verändert das das Geschäft nicht. Und Skalierung geschieht nicht bedingungslos — es gibt mehrere Voraussetzungen. Die erste ist Vertrauen.

## Vertrauen in die Technologie

**Xavier:** Vertrauen ist enorm wichtig. Stellt euch vor: Wenn euch vor 20 Jahren, direkt nach der Führerscheinprüfung, jemand gebeten hätte, in ein vollautonomes Auto zu steigen — ohne Lenkrad, ohne Pedale, wie die neuesten Robotaxis —, ich glaube nicht, dass ich das getan hätte. Genauso wird jemand mit 40, der immer Excel benutzt und jede Formel in jeder Zelle prüft, große Vorbehalte haben, wenn er plötzlich einer KI vertrauen soll. Vertrauen in die Technologie ist also entscheidend.

Ein Beispiel. Wir wurden von einem französischen Softwareanbieter kontaktiert, dessen Software Banken ermöglicht, schnell Ja oder Nein zu einem Immobilienkreditantrag zu sagen. Wenn ihr eine Wohnung kauft und zu eurer Bank geht, entscheidet nicht euer Berater danach, ob er euch sympathisch findet — er hat eine Software, die den fairen Marktwert der Immobilie neu berechnet und mit dem Kaufpreis vergleicht. Wenn ihr deutlich mehr zahlt als den von der Software geschätzten Wert, sagt die Bank: „Ich finanziere, aber nicht zu 100 % — vielleicht zu 70 % oder zu 30 %.“

Dieser Anbieter — unser Kunde — kam zu uns und sagte im Kern: „Ich habe ein KI-Problem.“ Das Problem ist die Black Box: KI leidet unter dem Black-Box-Syndrom. Wenn Menschen nicht verstehen, was darin passiert, sinkt das Vertrauen, und das bremst die Verbreitung der Software. Sie baten uns also schlicht, die Black Box zu öffnen, sie zu durchleuchten und sie vor allem zu zertifizieren — eine Art Bestätigung für die Technologie auszustellen.

Ich erwähne das, weil es neu ist — noch nie hatte uns jemand um eine Bestätigung zu KI gebeten. Wenn ihr KI-Lösungen entwickelt und sie an Unternehmen verkaufen wollt, können diese sagen: „Schön, aber habt ihr Governance, Datensicherheit und Cybersicherheit berücksichtigt? Habt ihr interne Kontrollen rund um eure Lösung eingerichtet? Habt ihr sichergestellt, dass sie den EU AI Act einhält?“ Vielleicht nicht — ihr wolltet schnell sein und liefern, was normal ist. Aber vielleicht braucht ihr einen vertrauenswürdigen Dritten, der einen Stempel darauf setzt, um Vertrauen zu schaffen. Genau darum werden wir jetzt gebeten.

So eröffnen Prüfer, die früher nur Finanzprüfung und dann Nachhaltigkeitsprüfung gemacht haben, jetzt ein neues Spielfeld: die Prüfung von Technologie. Wir machen das bei KI; wir könnten es auch beim Quantencomputing tun — das ist im Moment vom Radar verschwunden, kommt aber wieder. Der Punkt ist: Unser Beruf ist ständig in Bewegung, passt sich seiner Welt an und versucht, durch neue Dienstleistungen Wert zu schaffen. Ich glaube wirklich, dass es die Technologie — und die Menschen — sind, die uns das ermöglichen. Das ist meine optimistische Seite: Die Zukunft ist, wie ich sie sehe, positiv, auch wenn es in dem, was wir um uns herum sehen, Gründe für Pessimismus gibt.

Ich gebe euch einen Gedanken mit. Kennt ihr David S. Rose, den Investor? Seine These — und das ist genau, was ich gesagt habe — lautet: Wenn ihr euch nicht innerhalb von drei Jahren transformiert, seid ihr aus dem Markt, egal in welcher Branche. Selbst Amazon könnte infrage gestellt werden. Also: Transformiert euch.

## Change Management

**Xavier:** Ich habe gesagt, es gibt zwei Faktoren für eine schnelle, starke Einführung. Der erste ist Vertrauen, über das wir gerade gesprochen haben. Der zweite ist Change Management.

Ihr seid davon noch nicht wirklich betroffen — ihr seid KI-nativ, ihr fangt gerade erst an. Es betrifft eher Menschen mit 5 bis 10 Jahren Berufserfahrung — typischerweise manche Manager. Warum? Weil sie eine Routine aufgebaut haben. Nach vier oder fünf Jahren im selben Job richtet man sich in einer Art Komfortzone ein; jeden Tag macht man die Dinge gut, also fällt es schwer, die Routine zu ändern und neue Tools zu übernehmen. Es ist sehr schwer, wenn man seit zehn Jahren denselben Ansatz verfolgt und plötzlich hört, man solle morgen umsteigen — auf RAG oder etwas anderes.

Eine Studie mit mehr als 1.000 Kunden hat die KI-Nutzung bei Führungskräften, Verantwortlichen, operativen Mitarbeitenden und dem mittleren Management untersucht und gefragt, wo der große Engpass liegt. Systematisch landet man beim Management — weil es Routinen geschaffen hat, und die zu ändern ist kompliziert.

Und noch einmal: Es geht nicht nur darum, den Leuten zu sagen, sie sollen ein bisschen Microsoft Copilot oder ChatGPT oder was auch immer nutzen. Nur das zu automatisieren, was man heute tut, bringt wenig Mehrwert. Es geht darum, die Rolle und die Verantwortung der Manager und die Rollen der Mitarbeitenden neu zu denken. Das ist sehr schwierig. Wir sprechen wirklich von einer menschlichen Transformation — kein technisches, sondern ein menschliches Problem. Das ist die größte Herausforderung jedes Unternehmens: Menschen weiterzuentwickeln und das ganze Modell — Leistungserbringung, Angebote, Karrieren — rund um KI neu zu denken.

Wir behaupten nicht, die Lösung gefunden zu haben, aber wir packen es direkt an. Wir haben Workshops entwickelt. Ich wollte ihnen einen etwas provokanten Namen geben, also haben wir sie „The Wake Up Call“ genannt. Ziel ist es, unseren Managern bewusst zu machen, dass unsere Transformation nicht geschieht, weil ein kleines Transformationsteam beschlossen hat, das Unternehmen zu verändern — sie geschieht, weil jede und jeder auf eigene Weise beiträgt. Wir haben nicht eine unternehmensweite Transformation umzusetzen, sondern 7.000 individuelle Transformationen — eine pro Person. Es ist keine Pflichtschulung einmal im Jahr, die etwas verändert; es ist kontinuierliche Begleitung. Wir veranstalten auch viele Hackathons und zahlreiche weitere Initiativen, um den Wandel in unseren Teams zu unterstützen.

## Vier Technologiethemen, die bei Finanzvorständen und Gremien immer wieder auftauchen

**Xavier:** Im ständigen Austausch mit Finanzvorständen, Aufsichtsgremien und Unternehmensleitungen tauchen fast systematisch vier Technologiethemen auf.

**1. „KI überall“ heißt gar nichts — also: Skalierung und vertrauenswürdige KI.** Wie skaliert man, und wie sichert man sie ab — die berühmte „Trusted AI“?

**2. Rollen und Verantwortlichkeiten in der Finanzfunktion neu definieren.** Was wird der Controller morgen tun? Sicher etwas anderes, zu anderen Zeitpunkten, als heute.

**3. Technologische Resilienz** — zu wissen, dass bei einem Problem alles weiterläuft. Wer weiß, was technologische Resilienz ist?

**4. Daten- und Technologiesouveränität.** Vor zwei Jahren hätte ich über Datensouveränität gesprochen — wo unsere Daten gespeichert sind. Wir bevorzugen Daten, die in Europa gespeichert sind, denn wenn sie in den USA liegen, kann die US-Regierung aufgrund bestimmter Gesetze darauf zugreifen. Das beschäftigt alle Unternehmen, besonders europäische. Heute gehen wir aber viel weiter, hin zur Technologiesouveränität: Welchen IT-Anbieter nutzt ihr? Wenn ihr zu 100 % auf einen amerikanischen IT-Anbieter setzt — ihr habt vom „Kill Switch“ gehört —, könnte theoretisch jemand einen Knopf drücken und einem Unternehmen die Microsoft-Dienste abschalten. Keine Microsoft-Dienste heißt keine E-Mails mehr; hängt eure Abrechnungssoftware davon ab, könnt ihr keine Rechnungen stellen; hängt euer ERP davon ab, verliert ihr eure Buchhaltung und so weiter. Das ist eindeutig kompliziert. Heute können wir deshalb technologische Abhängigkeit messen — die Kehrseite der Souveränität — und helfen Kunden, eine Strategie aufzubauen. Nicht alle Daten sind gleich sensibel und kritisch, aber manche sind hochkritisch und müssen gut geschützt werden. Das ist entscheidend.

## Cybersicherheit

**Xavier:** Zur Cybersicherheit — ihr habt alle die jüngsten Angriffe gesehen; der Anstieg ist schlicht unglaublich. Vielleicht habt ihr von einem Angriff auf ein Kühl- / Kühllagersystem gehört. Es gab ein Lebensmittelsicherheitsrisiko: Hätte jemand die Temperatur auf 4 °C erhöht und die Alarme deaktiviert oder unterdrückt, hätte es niemand bemerkt, und man hätte so etwas wie eine Million Menschen gefährden können. Am Ende gingen die Alarme los, und es wurde recht schnell entdeckt. Viele Produkte mussten entsorgt werden, aber zum Glück hat sie danach niemand gekauft und verzehrt. Trotzdem ist es ein echtes Cyberthema — hier greift die digitale Welt die physische an.

Bis vor Kurzem ging es bei Angriffen meist darum, Daten zu stehlen und Lösegeld für ihre Freigabe zu verlangen. Heute sind Angriffe gezielter. Wir sehen auch „Fake-Dokumente“ — Dokumente, die mit KI erzeugt oder gefälscht wurden. In einem Unternehmen könnte jemand gefälschte Einkaufskonten anlegen; es gibt immer mehr gefälschte Spesenabrechnungen. Neulich haben wir einen Fall gesehen — öffentlich, und kein schöner —, in dem eingeräumt wurde, dass 10 % der Spesenabrechnungen gefälscht waren. Und da eine öffentlich finanzierte Einrichtung zahlte, ist das ein ernstes Problem. Noch nie war es so einfach, eine gefälschte Spesenabrechnung zu erzeugen.

Das ist ein echtes Thema, und für alle, die es interessiert: Wir beobachten es genau. Einige Modelle beginnen, Wasserzeichen zu integrieren, um Erzeugtes nachverfolgen und nicht nur prüfen zu können.

## Wo liegt der Wert? Das Beispiel Delta

**Xavier:** Das letzte Beispiel — kurz, weil es spannend ist. Die Frage lautet: Wo liegt der Wert? Nehmt eine Fluggesellschaft. Liegt der Wert im Geschäft — Flugzeuge mit zahlenden Passagieren fliegen zu lassen —, das einen gewissen Umsatz erzeugt? Oder im Kundenbindungsprogramm?

*(Der Saal tippt auf das Geschäft.)*

**Xavier:** Tatsächlich ist es das Kundenbindungsprogramm, und zwar mit großem Abstand. Die Größenordnung für das Programm lag bei etwa 30 Milliarden Dollar. Der M&A-Chef von Delta hat diese Analyse durchgeführt. Am Ende haben sie es nicht abgespalten und an die Börse gebracht, weil beides zusammenhängt — leidet das Kerngeschäft, leidet auch das Programm.

Euer Kundenbindungsprogramm besteht nicht nur aus Punkten. Es sind Daten über eure Kunden: wohin sie reisen, in welcher Klasse, was sie ausgeben — auch bei Partnern. Man sammelt Meilen durch Fliegen und durch Ausgaben bei Händlern und über andere Programme. Die Idee dahinter sind die Kundendaten — was sie tagtäglich tun —, die man anschließend an andere Unternehmen weiterverkaufen kann. Und genau das tun sie: Sie verkaufen all diese Informationen weiter. Unternehmen sitzen auf einer Goldmine an Daten, und nur wenige monetarisieren sie gut. Also — DSGVO und alles andere beiseite — Technologie ist gut, aber es sind die Daten, mit denen man wirklich arbeitet. Dort liegt der Wert.

---

## Transaction Services — Präsentation und Demo

**TS-Analyst (KPMG, Transaction Services):** Guten Abend zusammen — ich hoffe, das funktioniert. Ich bin Analyst bei KPMG. Ich bin vor drei Jahren zu KPMG gekommen.

Bevor wir anfangen, kurz ein Wort zu unserem Geschäft. Wie Xavier erklärt hat, mit künstlicher Intelligenz — lasst mich zuerst erklären, was Transaction Services ist.

Wir arbeiten im Transaktionsumfeld. Wir sind Berater, entweder auf der Verkäufer- oder auf der Käuferseite. Bei einem Verkauf beraten wir die Verkäuferseite; unsere Kunden können Gründer, Gesellschafter oder ein Private-Equity-Fonds sein, der uns beauftragt, ein Unternehmen aus seinem Portfolio für den Verkauf vorzubereiten. Bevor das Unternehmen an den Markt geht, müssen die Finanzzahlen vorbereitet werden — die Geschichte hinter den Zahlen —, die später den Investmentbanken dient, um den Prozess zu führen und potenzielle Käufer anzusprechen.

Wir arbeiten auch auf der Käuferseite. Stellt euch einen europäischen oder amerikanischen Private-Equity-Fonds vor, der in Frankreich eine Übernahme tätigen will. Er braucht einen tieferen Einblick, also untersuchen wir die Historie des Unternehmens, um ein realistisches Bild der Zahlen zu vermitteln — Umsatz, bereinigte Kennzahlen, eine normalisierte Historie.

Transaction Services ist ein Transaktionsberatungsbereich von KPMG Frankreich — rund 300 Fachleute im Zeitraum FY23–25. *(Hier wurden einige Transaktionszahlen genannt, die sich nicht zuverlässig transkribieren ließen — etwa ein Unternehmenswert im Bereich von einigen zehn Millionen Euro.)*

Ich gehöre zum Generalisten-Team, das in Handel, Energie, Finanzdienstleistungen, Immobilien und anderen Branchen arbeitet. Die letzten drei Jahre waren eine sehr bereichernde Erfahrung, mit einer steilen Lernkurve und hervorragender Sichtbarkeit — man kann mit Finanzvorständen und Top-Führungskräften in einem Raum sitzen. Es ist ein ausgezeichneter Einstieg in die Unternehmensfinanzierung.

Konkreter: Was bringen wir unserem Kunden? Ein einfaches Beispiel. Wir erhalten rohe Finanzdaten — etwa ein berichtetes EBITDA. Das EBITDA ist die zentrale Kennzahl zur Unternehmensbewertung; es dient dem Käufer als Grundlage, um den Kaufpreis zu berechnen. Unsere Analyse ist echte Detektivarbeit: Wir versuchen alles zu identifizieren, was die aktuelle Leistung beeinflusst, und es zu bereinigen, um ein realistischeres Bild für den Kaufpreis und die künftige Entwicklung des Unternehmens zu zeichnen. Jede Bereinigung des EBITDA kann zusammen mit dem EBITDA-Multiple — einem branchenspezifischen Multiplikator, aus dem der Unternehmenswert abgeleitet wird — die Bewertung erheblich verändern. Dieselbe Übung machen wir auch aus anderen Blickwinkeln, unter anderem beim Umsatz.

## KI bei KPMG Transaction Services

**TS-Analyst:** Heute, im Zeitalter der KI, wandelt sich KPMG — und wir bei Transaction Services ebenfalls. Vor einigen Monaten hat KPMG eine Partnerschaft mit **Anthropic** geschlossen, um Zugang zu den **Claude**-Modellen zu bekommen. Die Idee ist, unsere Fachexpertise — die der Grundpfeiler bleibt — mit den Produktivitäts- und Objektivitätsgewinnen zu verbinden, die KI bringen kann.

Vor Kurzem haben wir in unserer Business Unit ein sogenanntes **„Lighthouse“** gegründet — ein KI-Kompetenzzentrum. Das sind Leute, die sich mit KI recht gut auskennen, diesen Wandel vorantreiben und interne Lösungen vorschlagen; das ist fester Bestandteil des Partnerschaftsansatzes. Ich bin seit vier oder fünf Monaten Teil dieses Kompetenzzentrums. Wir arbeiten hauptsächlich an zwei Strängen.

Der **erste Strang ist die Schulung der Mitarbeitenden.** Im September und Oktober haben wir KI-Bootcamps mit konkreten Fällen durchgeführt, um die Leute darin zu schulen, Agenten zu orchestrieren und das Beste aus den verfügbaren Tools herauszuholen.

Der **zweite Strang ist die Entwicklung von Lösungen.** Fachexpertise bleibt die Eintrittskarte — für Sicherheit und Integration braucht man immer Ingenieure —, aber mit unserem Fachwissen können wir Automatisierungen und Lösungen für unsere Business Unit entwickeln. Parallel kommen Kolleginnen und Kollegen im Rotationsverfahren für vier bis fünf Monate in die Einheit — jeweils zwei Personen gleichzeitig. In dieser Zeit machen sie keine Finanzarbeit; sie beobachten die KI- und Marktentwicklung und lösen Probleme für Kolleginnen und Kollegen, die an laufenden Mandaten arbeiten. Jede Woche gibt es eine neue Funktion: Claude hat vor ein paar Tagen eine Funktion veröffentlicht; vor ein paar Wochen gab es neue Assistenten. Also verfolgen wir jede Woche, was auf den Markt kommt, um intern zu besprechen, was wir integrieren können und wie es in unsere Zukunft passt.

## Schulung und das „4D“-Modell

**TS-Analyst:** Zur Schulung — sie betrifft alle Ebenen, von Analysten bis zu Associates, mit denselben Säulen, aber unterschiedlichen Formaten, über zwei bis vier Tage. Heute kann jeder etwas mit KI machen, aber es ist sehr wichtig zu wissen, wann ein echtes Risiko besteht. Mit einem sorgfältigen Vorgehen — zum Beispiel gutem Prompting — lassen sich viele Halluzinationsprobleme vermeiden, und das versuchen wir unseren Teams zu vermitteln.

Es gibt ein Modell, das ich teilen wollte: die **4D**. Vor jeder Nutzung von KI sollte man vier Dinge im Kopf haben:

**1. Delegation.** Fragt euch, ob ihr diese Aufgabe an die KI delegiert oder nicht. KI beschleunigt zeitaufwendige Aufgaben — sie kann Notizen zusammenfassen, Auffälligkeiten in einem großen Excel-Databook erkennen, beim Lesen eines langen Dokuments helfen, um eine bestimmte Klausel oder Red Flags zu finden (zum Beispiel für EBITDA- oder Nettoverschuldungs-Bereinigungen). Aber das Urteil darf nie an die KI delegiert werden. Wir bleiben die Orchestratoren. Es liegt an uns zu entscheiden, was wir behalten und was nicht, und die Kontrolle über die sensibelsten und kritischsten Themen zu behalten — eine Prüfung zum Beispiel machen wir oft und dürfen sie nie an die KI abgeben. Immer „Human in the Loop“ — diesen Reflex nie verlieren.

**2. Description (Prompting).** Ein guter Prompt senkt das Halluzinationsrisiko drastisch und verbessert die Effizienz beim Token-Verbrauch. Wenn ich schlecht prompte, bin ich vom Ergebnis enttäuscht, mache eine zweite und dritte Iteration — verliere Zeit und verbrenne Tokens. Mein Rat für einen guten Prompt: Gebt ihm eine Rolle. Wenn ihr Analysen für einen eurer Kurse wollt, sagt ihm, es soll entsprechend handeln; geht es um Finanzen, sagt ihm, es soll wie ein TS-Berater oder Investmentbanker agieren. Also: den Hut / die Rolle festlegen, dann den Kontext. In unserer Arbeit unterscheiden sich Buy-Side- und Sell-Side-Ansatz — die Buy-Side ist kritischer, prüfungsähnlicher. Rolle nennen, Kontext präzisieren, angeben, in welcher Datei gesucht werden soll, verlangen, dass die Quelle genannt wird — von welcher Seite oder aus welcher Information die Aussage stammt —, solche Belege einfordern und festlegen, wie das Ergebnis aussehen soll: eine Tabelle, ein Excel, ein PowerPoint. Ein gut gebauter Prompt spart Zeit und bringt weit mehr Mehrwert als ein allgemeiner.

**3. Discernment.** Stellt euch vor, ihr arbeitet mit der KI als Denkpartner — ihr könnt gemeinsam brainstormen. Wenn sie eine erste Antwort gibt, treibt die Überlegung immer weiter: Hinterfragt sie, fragt, ob sie alle Quellen angeschaut hat, ob sie sicher ist, ob das jenem widerspricht. Fordert tieferes Nachdenken ein.

**4. Diligence.** Es darf nie heißen „die KI hat die Arbeit gemacht“ oder „die KI hat geholfen, und dabei bleibt es“. Wir übernehmen immer die Verantwortung für die Arbeit der KI, nachdem wir sie geprüft haben. Unser Beruf verschiebt sich: etwas weniger Erstellung, deutlich mehr Prüfung — und wir müssen die Leute darauf ausrichten. Wobei auch immer die KI euch hilft, am Ende seid ihr es, die die Arbeit dem Kunden präsentieren.

## Tools und Demo — VDD Flash Reader

**TS-Analyst:** Konkreter, auf der Innovationsseite: In unserer Business Unit haben wir Zugang zu **Copilot** — dem KI-Assistenten von Microsoft, verbunden mit unserer gesamten Microsoft-Umgebung, mit Varianten in Excel und Word, sodass man direkt in der Datei arbeiten kann. Das hilft allen, **Agenten** zu erstellen, die für das jeweilige Mandat relevant sind. Der Ansatz ist nicht, dass ein paar Leute Agenten für alle bauen und die anderen sie nur benutzen — der Sinn des Trainingsseminars für alle Mitarbeitenden ist, dass jede und jeder je nach Kontext einen eigenen Agenten für den eigenen Bedarf bauen kann, mit den richtigen Konnektoren und den richtigen Anweisungen.

**Digital Gateway** — kurz am Rande — ist eine Plattform, die zum Teil aus unserer Zusammenarbeit mit Anthropic entstanden ist. Sie automatisiert Databooks: Stellt euch vor, ihr habt Rohdaten, einen ERP-Export aus SAP oder einem anderen System; ihr zieht die Rohdaten per Drag-and-drop hinein, und nach wenigen Minuten ist euer Databook fertig und ihr könnt mit der analytischen Durchsicht beginnen — nachdem ihr natürlich die Mechanik des Dokuments geprüft habt. Das funktioniert in Excel, aber auch für Folien. Es reduziert unsere Erstellungsarbeit und erhöht unsere Prüfungsarbeit erheblich — genau dort verändert sich das Geschäft.

Ich zeige euch eine kurze Demo einer Lösung, die wir intern entwickelt haben. Wir haben sie **VDD Flash Reader** genannt. Auf der Käuferseite erhalten wir Unterlagen — typischerweise VDDs (Vendor-Due-Diligence-Berichte), IMs (Information Memoranda), Teaser und so weiter. Wir müssen bestimmte Themen schnell lesen, die Kernpunkte erkennen und gegebenenfalls Fragen an die Gegenseite stellen, oft unter engen Fristen. Es ist also ein Leseassistent.

So sieht die Lösung aus. Das Start-Dashboard zeigt alle auf der Plattform verfügbaren Dokumente. Angenommen, ihr seid Buy-Side-Berater bei Transaction Services und erhaltet einen neuen VDD von einem anderen Berater — ebenfalls aus den Big Four. Ihr legt einen neuen VDD-Eintrag an und zieht euer Dokument hinein. Ich mache einen kurzen Test.

Aus einem Dokument braucht ihr ein paar Ideen für Fragen. Also sage ich ihm: Ich möchte rund dreißig Fragen zu Themen wie dem Umsatz — den vorrangigen Themen, zu denen man fragen sollte. Dann starte ich die Analyse; das dauert ein paar Minuten, ist aber praktisch im Nu erledigt. Ich halte es an und zeige euch ein früheres Ergebnis, damit wir uns den Token-Verbrauch ansehen können.

Hier ist ein erstes Ergebnis. Es basiert auf öffentlichen Daten, also kein Problem. Die Idee ist, dass es eine Zusammenfassung auf hoher Ebene erstellt, mit den wichtigsten Finanzkennzahlen, dem Kontext des VDD, dem gesellschaftsrechtlichen Organigramm, dem Geschäftsüberblick, dem Geschehen rund um den Deal und der historischen Entwicklung. Wenn wir bei unserer Prüfung eine Aussage verifizieren wollen, haben wir immer die Quellseite aus dem VDD — ein Klick, und man bekommt einen Ausschnitt, um zu prüfen, dass nichts halluziniert oder falsch gelesen wurde. Das ist eine Ansicht; es gibt auch eine Ansicht nach Abschnitten, entlang des Inhaltsverzeichnisses.

Es zeigt auch die Fragen, die ich anfangs angefordert habe — es hat eine Reihe von Fragen erzeugt. Ich kann sie prüfen, behalten und nach Excel exportieren, um sie zu bearbeiten und zu ergänzen. Und hier ist ein in die Plattform integrierter Bot, mit dem man direkt mit dem VDD chatten und ihm Fragen stellen kann.

## Fragen und Antworten

**F (Publikum):** Ist das, was ihr gebaut habt, ein RAG?

**TS-Analyst:** Ja. Ihr habt eure Wissensbasis — Dinge, die ihr in der Vergangenheit gemacht habt — plus Zugriff auf unsere privaten Daten. Es generiert nicht nur das Basismodell; es gibt zusätzlich Wissen und Zugriff auf unsere privaten Daten. Daher kommt der Mehrwert der Lösung. Ich kann auf dieser Ebene nicht unbedingt alles offenlegen, aber das ist die Idee.

**F:** Danke für die Präsentation. Wie lange hat es vor diesem Agenten gedauert, ein Dokument zu analysieren?

**TS-Analyst:** Wir machen auch mit dem Agenten weiterhin die vollständige Arbeit. Er hilft, in Situationen mit engen Fristen schneller zu werden, wenn man schnell lesen oder auf kritische Themen fokussieren muss. Wir hören zu keinem Zeitpunkt auf, das Dokument zu lesen. Er wirkt wie ein Beschleuniger — ein Lesewerkzeug, um auf ein bestimmtes Thema zu zoomen — und ermöglicht es, sich innerhalb von ein bis zwei Stunden nach Erhalt des ersten Dokuments in das Thema einzuarbeiten. Wir arbeiten immer öfter unter engen Fristen, mit höheren Anforderungen der Kunden an die Geschwindigkeit, und das hilft uns, Schritt zu halten. Die genaue Zeitersparnis haben wir nicht gemessen, weil sie vom VDD abhängt — manche haben 500 Seiten, andere 80. Wir haben es noch nicht für unsere Mitarbeitenden ausgerollt, ihr habt also eine kleine Vorschau bekommen. Unsere Mitarbeitenden haben es sich gewünscht — wir haben Workshops gemacht, um Vorschläge zu sammeln —, und es bringt unseren Leuten echten Mehrwert.

**F:** Wann gebt ihr es für eure Mitarbeitenden frei?

**TS-Analyst:** Das wird gerade besprochen. Es sollte in den nächsten Wochen kommen, aber zuerst müssen Integrations- und Sicherheitsthemen sowie Administratorzugänge geklärt werden, und das braucht etwas Zeit.

**Moderation:** Vielen Dank.

*(Ende der Aufnahme.)*
`,
};

export default de;
