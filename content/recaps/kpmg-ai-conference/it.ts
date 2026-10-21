/** KPMG × IA — recap in italiano (tradotto con l'IA dalla versione inglese). */
const it = {
  summary: `
*Una serata con KPMG dedicata all'intelligenza artificiale, organizzata per gli studenti di business school (ESCP). Due relatori di KPMG — un partner (Xavier), con un percorso in audit e Transaction Services, e un analista del team Transaction Services / Deal Advisory — hanno spiegato come l'IA sta trasformando la professione, come le aziende dovrebbero adottarla, e hanno mostrato dal vivo uno strumento di IA sviluppato internamente con Claude di Anthropic.*

## Panoramica

La sessione si è aperta con una domanda semplice alla sala — *chi di voi usa ChatGPT?* — e con una provocazione: le scuole spesso scoraggiano gli studenti dall'usare l'IA, eppure in KPMG l'IA fa già parte del lavoro quotidiano dei consulenti. Il messaggio centrale dei relatori: l'IA non serve a sostituire le persone, ma a ripensare le aziende intorno a essa.

## Punti chiave

**L'IA è una trasformazione, non uno strumento.** KPMG lavora sull'IA da quattro anni. Secondo la società, limitarsi ad automatizzare le attività esistenti distrugge valore; la vera opportunità è riprogettare modelli operativi, offerte, modalità di erogazione dei servizi e percorsi di carriera intorno all'IA. «Trasformarsi o declinare» — riprendendo l'investitore David S. Rose, i relatori hanno sostenuto che qualsiasi azienda che non si trasformi entro circa tre anni rischia di essere spinta fuori dal proprio mercato.

**Le persone restano il fattore distintivo.** Citando uno studio sulle principali aziende dell'economia digitale (KPMG, Accenture, Apple e altre), i relatori hanno osservato che il vantaggio competitivo decisivo non sono i modelli o le piattaforme proprietarie, ma le persone. Il consiglio agli studenti: unire competenze di finanza a competenze di data e IA — una combinazione forte e sempre più ricercata. KPMG sta accelerando, non riducendo, l'assunzione di questi profili «doppi».

**La professione dell'audit continua ad ampliarsi.** L'audit è passato dall'audit puramente finanziario all'audit non finanziario / di sostenibilità (CSRD, ESG), e ora all'audit della tecnologia stessa. Un esempio concreto: un'azienda software francese ha chiesto a KPMG di «aprire la scatola nera» del suo strumento di valutazione del credito basato sull'IA e di certificarlo — un nuovo tipo di attestazione sull'IA che copre governance, sicurezza dei dati, cybersecurity e conformità all'AI Act europeo.

**Scalare l'IA dipende da fiducia e gestione del cambiamento.** Passare da pochi casi d'uso a un'adozione in tutta l'azienda richiede (1) fiducia nella tecnologia e (2) gestione del cambiamento. Il collo di bottiglia più difficile è il middle management, le cui routine consolidate rallentano l'adozione. La risposta di KPMG è un supporto continuo — workshop «Wake Up Call», hackathon — inteso come 7.000 trasformazioni individuali tra le sue persone, non come un programma calato dall'alto.

**Quattro temi tecnologici ricorrono con CFO e consigli di amministrazione:** scalare un'IA affidabile; ridefinire i ruoli all'interno della funzione finanza; la resilienza tecnologica; e la sovranità dei dati e della tecnologia (dove sono conservati i dati, la dipendenza da un unico fornitore IT, il rischio di «kill switch»). Sulla cybersecurity, i relatori hanno evidenziato il forte aumento degli attacchi — compresi attacchi che raggiungono il mondo fisico — e la crescita di documenti e note spese falsi generati dall'IA, oltre al ruolo del watermarking e della tracciabilità. Un esempio finale, Delta Air Lines, ha mostrato che gran parte del valore di un'azienda può risiedere nei suoi dati (ad esempio un programma fedeltà) più che nella sua attività principale.

## Demo dal vivo — Transaction Services & Anthropic

Il team Transaction Services / Deal Advisory (circa 300 professionisti in Francia) assiste operazioni lato acquirente e lato venditore, normalizzando indicatori finanziari come l'EBITDA per arrivare a un enterprise value equo. Qualche mese fa KPMG ha firmato una partnership con **Anthropic** per dare ai suoi team accesso a **Claude**.

Il team ha creato un centro di eccellenza sull'IA, il **«Lighthouse»**, con due filoni di lavoro: formare tutto il personale (programmi di 2–4 giorni, casi concreti, creazione e orchestrazione di agenti) e sviluppare soluzioni interne. Al personale viene insegnato un semplice **framework delle «4D»** per usare l'IA in modo responsabile:

- **Delega** — decidere cosa affidare all'IA (sintesi, individuazione di anomalie, revisione di documenti) senza mai delegare il giudizio professionale; mantenere sempre un essere umano nel processo.
- **Descrizione** — scrivere buoni prompt: assegnare un ruolo, dare il contesto, citare le fonti, specificare il formato di output. Questo riduce allucinazioni, iterazioni e token sprecati.
- **Discernimento** — trattare l'IA come un partner di ragionamento e mettere sempre in discussione le sue risposte.
- **Diligenza** — rivedere ogni risultato dell'IA e assumersene la responsabilità. Il lavoro si sposta dalla produzione verso la revisione.

Tra gli strumenti mostrati: Microsoft **Copilot** (collegato a tutto l'ambiente Microsoft) e **Digital Gateway**, una piattaforma costruita con Anthropic che automatizza in pochi minuti la creazione di data book a partire da estrazioni ERP grezze. La demo principale è stata il **«VDD Flash Reader»**: lato acquirente, un analista trascina un report di Vendor Due Diligence e lo strumento produce una sintesi di alto livello (dati finanziari chiave, struttura legale, panoramica del business), genera circa 30 domande mirate per la controparte e collega ogni affermazione alla sua pagina di origine, così che i revisori possano verificarla sull'originale e individuare eventuali allucinazioni. Basato su un approccio di retrieval-augmented generation (RAG) sulla knowledge base privata della società, accelera le revisioni con scadenze strette — permettendo agli analisti di padroneggiare un documento in una o due ore — e sarà distribuito più ampiamente all'interno entro qualche settimana, in attesa del via libera su integrazione e sicurezza.
`,
  transcript: `
*Questa è una trascrizione italiana rivista dell'evento. La registrazione è stata trascritta automaticamente, tradotta in inglese e leggermente ripulita per la leggibilità; questa versione italiana è stata poi tradotta con l'IA dalla trascrizione inglese. Il senso e lo svolgimento seguono fedelmente l'originale francese, ma la formulazione esatta non è quella pronunciata in sala, e alcuni nomi propri e cifre (segnalati quando incerti) non è stato possibile confermarli dall'audio. L'attribuzione degli interventi è approssimativa.*

---

## Introduzione

**Moderatore / KPMG:** Buonasera a tutti. Vi presento rapidamente il team che è con noi stasera — colleghi dei nostri team Digital e Transaction Services, tra cui un manager e un senior analyst del Transaction Services. Passo la parola a Xavier.

**Xavier (partner KPMG):** Questa slide non è la più interessante — mostra semplicemente i clienti della società. Lavoriamo praticamente con tutto il CAC 40 e con molti grandi gruppi. Prima di iniziare vi faccio una domanda, perché stasera parleremo molto di intelligenza artificiale: chi di voi usa ChatGPT?

*(La maggior parte della sala risponde.)*

**Xavier:** Ecco — quasi tutti. E l'ESCP vi insegna a usare l'IA nei vostri corsi?

*(Risposte contrastanti dalla sala.)*

**Xavier:** Credo che questo sia un ruolo che le scuole dovranno svolgere sempre di più. Agli studenti si dice di non usare l'IA — eppure domani, e in realtà già oggi, l'IA fa parte del lavoro quotidiano dei nostri team e dei nostri consulenti. Anzi, penso che i vostri professori dovrebbero insegnarvi a usare meglio l'IA, ogni giorno.

Lavoriamo sull'intelligenza artificiale da quattro anni. Io e il mio team innovazione ci abbiamo lavorato molto. Guardando indietro, non abbiamo fatto tutto bene, ma abbiamo fatto molti progressi. All'inizio abbiamo lavorato su un numero enorme di casi d'uso. Oggi abbiamo un'idea molto più chiara di cosa funziona bene e cosa meno — e non solo nelle attività legate alla finanza.

## Ritorno sull'investimento, e a cosa serve davvero l'IA

**Xavier:** Col senno di poi, la domanda ovvia è: qual è il ritorno sull'investimento? Nel mio ruolo mi confronto con molti CFO e direzioni finanziarie del CAC 40, e la prima domanda che fanno è proprio questa — il ROI, i guadagni di produttività: li misurate, e li condividerete con noi? La risposta non è semplice. Se si approfondisce, non credo che qualcuno metta ancora in dubbio che l'IA permetta di risparmiare tempo — tutti sono d'accordo.

Ma dietro ci sono domande più profonde. La prima è: cosa faremo con questi guadagni? Si possono immaginare aziende già sotto pressione che dicono: «La prima cosa che farò per migliorare la redditività è tagliare il personale.» E da chi comincerebbero? Purtroppo per voi, spesso dai più giovani — quelli che entrano nel mondo del lavoro nei prossimi anni. Si percepisce già una certa tensione nel mercato del lavoro, e non solo all'estero — anche nelle aziende francesi.

Credo che sarebbe un errore. È servito uno studio per capire il fattore distintivo tra le aziende dell'economia digitale — realtà come KPMG, Accenture, Apple e altre. Perché quel settore? Perché è un po' in anticipo nel suo modo di pensare e di svilupparsi, il che ha senso, visto che queste aziende aiutano a loro volta altre aziende a trasformarsi. E sapete qual è, secondo loro, il fattore distintivo? Non sono i modelli proprietari né le piattaforme o gli agenti sviluppati internamente — anche se si parla molto di agenti. Sono le persone. Le donne e gli uomini prima di tutto.

Il punto è questo: il futuro non consiste nel sostituire i colletti bianchi con l'IA. Non significa che non useremo l'IA — ma se tutto ciò che facciamo è automatizzare le attività che i nostri team svolgono oggi, allora su scala della società, e dell'economia, in realtà distruggiamo valore. Non va bene. La vera domanda è cosa facciamo con l'IA: non spargere un po' di IA nell'azienda, ma ripensare l'azienda — ripensare i modelli — intorno all'IA. Stiamo adattando le nostre offerte, il nostro go-to-market, il modo in cui svolgiamo i nostri incarichi intorno all'IA, e le competenze dei nostri team.

## Consigli sulle competenze

**Xavier:** Finora, in finanza, abbiamo assunto soprattutto persone provenienti da business school e percorsi simili — semplicemente perché avevamo bisogno di persone che parlassero la stessa lingua dei nostri clienti e capissero come sono organizzate le aziende. È essenziale. Ma con la svolta degli anni 2010, i dati sono diventati essenziali per il business. I dati sono il punto di partenza di ogni dirigente che prende una decisione e che governa la propria azienda e attività. Quindi i dati sono il secondo pilastro della nostra strategia.

In termini di competenze, ecco il mio consiglio: mantenete questa passione per la finanza — è essenziale — ma sviluppate anche vere competenze in data e intelligenza artificiale. Penso che abbiate scelto una buona combinazione. Oggi bisogna combinare queste competenze per essere ancora più attrattivi sul mercato.

Perché lo dico? Perché se le aziende non si trasformano — e se noi stessi non intraprendiamo una profonda trasformazione di tutti i nostri modelli, non solo del modo in cui lavoriamo ma delle nostre offerte, delle nostre persone, della nostra academy, dei nostri percorsi di carriera — allora entro tre anni non saremo solo meno competitivi o meno redditizi; saremo completamente fuori dal mercato, in termini di attrattività sia per i clienti sia per i nostri team. Non saremo più rilevanti, ed è il declino. È l'idea del «click or decline». Vale per società come la nostra e per ogni azienda al mondo. Oggi non c'è davvero nessun settore al riparo da questa trasformazione.

Avete sia l'opportunità — e non è un momento passivo nemmeno per voi, vista la tensione nelle assunzioni — sia la possibilità di vivere questa trasformazione, e di essere la prima generazione nativa dell'IA. Si muove tutto molto in fretta. Siete nativi digitali per natura. Per questo non abbiamo ridotto le assunzioni — al contrario, stiamo accelerando, assumendo profili doppi che uniscono finanza e IA. Siete la generazione che ci permetterà di realizzare la nostra trasformazione, ed è importante.

## Il percorso di Xavier e i suoi consigli

**Xavier:** Perché sono entrato in KPMG? C'erano diversi motivi. Il primo era lavorare in una società con una vera dimensione internazionale — era essenziale.

Vi racconto una breve storia. Per molto tempo ho lavorato all'audit di una grande società di servizi IT. Un manager francese che guidava la parte americana doveva rientrare in Francia, e mi dissero che sarei andato a sostituirlo all'estero. Alla fine non è mai rientrato — ma questo mi ha aperto delle porte. Più tardi mi dissero che, visto che non sarebbero stati gli Stati Uniti, mi avrebbero mandato a Londra, per iniziare con i partner britannici. Doveva essere a settembre 2015.

Poi, poco prima — verso fine giugno / inizio luglio 2015, due mesi prima — la società ha fatto la sua più grande acquisizione dell'epoca: un pure player indiano. Così tre settimane dopo atterravo a Bangalore. Ci sono rimasto sette mesi — un'esperienza meravigliosa, sia professionalmente sia personalmente. L'India è un paese a cui mi sono molto affezionato. Ho lavorato con i team locali di KPMG India, estremamente talentuosi ed estremamente impegnati.

Tornato in Francia, ho deciso di creare un desk dedicato alle relazioni franco-indiane. A differenza delle società di servizi IT che delocalizzavano attività in India — il cosiddetto «offshoring», ne avete tutti sentito parlare — io ho fatto il contrario. Mi sono detto: portiamo in Francia i migliori talenti indiani a lavorare sui nostri incarichi. Ho fatto venire decine di manager indiani — un arricchimento sia per loro sia per i nostri team.

Tutto questo per dire: nella vostra carriera arriveranno delle opportunità. Bisogna dare molto perché si presentino, e bisogna saperle cogliere e saper ripartire. Se avete un'idea — «vorrei sviluppare un nuovo servizio, una nuova offerta» — non esitate, qualunque sia il vostro percorso. Siamo felicissimi quando qualcuno propone di ampliare il nostro campo d'azione. È possibile anche in una grande società: da fuori può sembrare chiusa e rigida, ma da dentro è tutto il contrario. Anche Tony può confermarlo.

## La digitalizzazione — e l'espansione — dell'audit

**Xavier:** Perché sono venuto in KPMG e in questo mestiere? La finanza mi interessava, ma sono sempre stato anche appassionato di tecnologia — il digitale. Gran parte del mio portafoglio era legata al settore tecnologico — software house e simili.

Qualche anno fa abbiamo preso in mano quello che si chiama audit digitale — la digitalizzazione dell'audit stesso. Ho insegnato a lungo revisione esterna, e già allora la trovavo un po' antiquata: si tornava ai fogli di lavoro cartacei. Non sono sicuro che suscitasse molta passione. Ci siamo detti che semplicemente non era più sostenibile — non possiamo chiedere ai nostri team di lavorare come negli anni Ottanta. Così abbiamo iniziato a digitalizzare, molto aiutati dalla trasformazione dei nostri clienti, che avevano dematerializzato e avviato i propri programmi digitali. Oggi il software è ovunque, quindi il revisore si appoggia naturalmente sulla trasformazione del cliente. Ora abbiamo agenti ovunque che aiutano in ogni fase del processo di audit — e lo stesso vale nella consulenza e nelle altre nostre attività. È piuttosto impressionante.

Le nostre professioni si sono completamente trasformate. Ma potreste pensare che la strada sia finita — al contrario, è appena iniziata. La promessa dell'IA non riguarda solo il risparmio di tempo.

Per fare un esempio concreto: per 18–20 anni abbiamo fatto solo audit finanziario. L'audit finanziario è, di fatto, una garanzia sull'informativa finanziaria delle grandi aziende francesi. Poi, due o tre anni fa, abbiamo fatto una seconda svolta: l'audit non finanziario. CSRD, ESG — ne avete tutti sentito parlare. Le grandi aziende devono ora rendicontare le loro azioni per ridurre l'impronta di carbonio, promuovere l'inclusione e così via. È quindi un secondo cappello per il revisore: il revisore finanziario e il revisore non finanziario.

E ora stiamo diventando anche revisori della tecnologia. Può sembrare un po' strano, quindi mi spiego. Sempre di più, con l'IA, non è solo una questione di disponibilità o qualità dei dati — la maggior parte delle aziende l'ha più o meno affrontata. Il vero tema è la scalabilità: passare da qualche caso d'uso qua e là a un uso massiccio dell'IA in tutta l'azienda. Se solo il 10% dei dipendenti usa l'IA, il business non si trasforma. E la scalabilità non avviene senza condizioni — ce ne sono diverse. La prima è la fiducia.

## La fiducia nella tecnologia

**Xavier:** La fiducia è importantissima. Pensateci: se 20 anni fa, appena presa la patente, qualcuno vi avesse chiesto di salire su un'auto completamente autonoma — senza volante, senza pedali, come gli ultimi robotaxi — non credo che l'avrei fatto. Allo stesso modo, se chiedete a un quarantenne che ha sempre usato Excel e controlla ogni formula in ogni cella di fidarsi improvvisamente di un'IA, avrà serie riserve. Quindi la fiducia nella tecnologia è essenziale.

Ecco un esempio. Siamo stati contattati da un'azienda software francese il cui software permette alle banche di dare un sì o un no rapido a una richiesta di mutuo. Quando comprate un appartamento e andate in banca, non è il vostro consulente a decidere in base alla simpatia — ha un software che ricalcola il valore di mercato equo dell'immobile che state comprando e lo confronta con il prezzo che pagate. Se pagate molto più del valore stimato dal software, la banca dice: «Vi finanzio, ma non al 100% — magari al 70%, o al 30%.»

Quell'azienda — nostro cliente — è venuta da noi dicendo, in sostanza: «Ho un problema di IA.» Il problema è la scatola nera: l'IA soffre della sindrome della scatola nera. Quando le persone non capiscono cosa c'è dentro, la fiducia cala, e questo rallenta l'adozione del software. Ci hanno quindi chiesto semplicemente di venire ad aprire la scatola nera, di farci luce e soprattutto di certificarla — di fornire una sorta di attestazione sulla tecnologia.

Lo cito perché è nuovo — nessuno ci aveva mai chiesto prima un'attestazione sull'IA. Se sviluppate soluzioni di IA e volete venderle alle aziende, quelle aziende potrebbero dirvi: «Va bene, ma avete affrontato governance, sicurezza dei dati, cybersecurity? Avete messo controlli interni intorno alla vostra soluzione? Vi siete assicurati che sia conforme all'AI Act europeo?» Magari no — volevate andare veloci e rilasciare, il che è normale. Ma potreste aver bisogno di una terza parte affidabile che ci metta un timbro, per creare fiducia. È quello che ora ci viene chiesto.

Così, revisori che prima facevano solo audit finanziario, poi audit di sostenibilità, stanno aprendo un nuovo campo d'azione: l'audit della tecnologia. Lo facciamo sull'IA; potremmo farlo anche sul quantum computing — per ora è uscito dai radar, ma tornerà. Il punto è che la nostra è una professione in continuo movimento, che si adatta al suo mondo e cerca di creare valore attraverso nuovi servizi. Credo davvero che siano la tecnologia — e le persone — a permettercelo. È il mio lato ottimista: il futuro, per come lo vedo, è positivo, anche se ci sono motivi di pessimismo in ciò che vediamo intorno a noi.

Vi lascio una riflessione. Conoscete David S. Rose, l'investitore? La sua tesi — ed è esattamente ciò che dicevo — è che se non vi trasformate entro tre anni, siete fuori dal mercato, qualunque sia il vostro settore. Persino Amazon potrebbe essere messa in discussione. Quindi: trasformatevi.

## Gestione del cambiamento

**Xavier:** Ho detto che ci sono due fattori per un'adozione rapida e forte. Il primo è la fiducia, di cui abbiamo appena parlato. Il secondo è la gestione del cambiamento.

Voi non siete ancora davvero interessati — siete nativi dell'IA, state appena iniziando. Riguarda di più le persone con 5–10 anni di esperienza — tipicamente alcuni manager. Perché? Perché hanno costruito una routine. Dopo quattro o cinque anni nello stesso lavoro ci si sistema in una sorta di zona di comfort; ogni giorno si fanno bene le cose, quindi cambiare routine e adottare nuovi strumenti è difficile. È molto difficile quando si usa lo stesso approccio da dieci anni e improvvisamente ti dicono di cambiare domani — di passare al RAG, o a qualcos'altro.

Uno studio su più di 1.000 clienti ha esaminato l'adozione dell'IA tra dirigenti, responsabili, personale operativo e middle management, chiedendosi dove fosse il grande collo di bottiglia. Sistematicamente, si torna ai manager — perché hanno creato routine, e cambiarle è complicato.

E ancora una volta, l'idea non è solo dire alle persone di usare un po' Microsoft Copilot, o ChatGPT, o altro. Automatizzare semplicemente ciò che si fa oggi aggiunge poco valore. L'idea è ripensare il ruolo e le responsabilità dei manager, e i ruoli assegnati al personale. È molto difficile da fare. Parliamo davvero di trasformazione umana — non di un problema tecnologico, ma umano. È la sfida più grande per ogni azienda: far evolvere le persone e ripensare l'intero modello — erogazione, offerte, carriere — intorno all'IA.

Non pretendiamo di aver trovato la soluzione, ma affrontiamo il tema di petto. Abbiamo creato dei workshop. Volevo dar loro un nome un po' provocatorio, così li abbiamo chiamati «The Wake Up Call». L'obiettivo è far prendere coscienza ai nostri manager che la nostra trasformazione non avverrà solo perché un piccolo team di trasformazione ha deciso di trasformare la società — avverrà perché ognuno di noi contribuisce a modo suo. Non abbiamo una trasformazione aziendale da realizzare; abbiamo 7.000 trasformazioni individuali da realizzare — una per persona. Non è una formazione obbligatoria una volta l'anno che cambia le cose; è un supporto continuo. Organizziamo anche molti hackathon e tante altre iniziative per accompagnare il cambiamento nei nostri team.

## Quattro temi tecnologici che ricorrono con CFO e consigli di amministrazione

**Xavier:** Nel contatto costante con CFO, consigli di amministrazione e vertici aziendali, ci sono quattro temi tecnologici che emergono quasi sistematicamente.

**1. «IA ovunque» non significa nulla — quindi: scalabilità e IA affidabile.** Come scalare, e come metterla in sicurezza — la famosa «trusted AI»?

**2. Ridefinire ruoli e responsabilità all'interno della funzione finanza.** Cosa farà domani il controller di gestione? Sicuramente qualcosa di diverso, in momenti diversi, rispetto a oggi.

**3. Resilienza tecnologica** — sapere che, se c'è un problema, tutto continua a funzionare. Chi sa cos'è la resilienza tecnologica?

**4. Sovranità dei dati e della tecnologia.** Due anni fa avrei parlato di sovranità dei dati — dove sono conservati i nostri dati. Preferiamo dati conservati in Europa, perché se sono conservati negli Stati Uniti, il governo americano può, in base a certe leggi, accedervi. È una preoccupazione per tutte le aziende, soprattutto europee. Ma oggi si va molto oltre, verso la sovranità tecnologica: quale fornitore IT usate? Se siete al 100% su un fornitore IT americano — avete sentito parlare del «kill switch» — qualcuno potrebbe, in teoria, premere un pulsante e interrompere i servizi Microsoft a un'azienda. Niente più servizi Microsoft significa niente più email; se il vostro software di fatturazione ne dipende non potete fatturare; se il vostro ERP ne dipende perdete la contabilità, e così via. È chiaramente complicato. Oggi quindi siamo in grado di misurare la dipendenza tecnologica — il corollario della sovranità — e aiutiamo i clienti a costruire una strategia. Non tutti i dati hanno lo stesso livello di sensibilità e criticità, ma alcuni dati sono ipercritici e vanno protetti bene. È essenziale.

## Cybersecurity

**Xavier:** Sulla cybersecurity — avete tutti visto gli ultimi attacchi; l'aumento è semplicemente incredibile. Forse avete sentito di un attacco a un sistema di refrigerazione / conservazione a freddo. C'era un rischio per la sicurezza alimentare: se qualcuno avesse alzato la temperatura a 4 °C e disattivato o soppresso gli allarmi, nessuno se ne sarebbe accorto, e si sarebbe potuto contaminare qualcosa come un milione di persone. Alla fine gli allarmi sono scattati ed è stato individuato abbastanza in fretta. Molti prodotti sono stati buttati, ma per fortuna nessuno li ha poi acquistati e consumati. Resta un vero tema cyber — è qui che il mondo digitale attacca il mondo fisico.

Fino a poco tempo fa, gli attacchi miravano soprattutto a rubare dati e a chiedere un riscatto per restituirli. Oggi gli attacchi sono più mirati. Vediamo anche «documenti falsi» — documenti generati o falsificati dall'IA. In un'azienda qualcuno potrebbe creare falsi conti fornitori; ci sono sempre più note spese false. L'altro giorno abbiamo visto un caso — pubblico, e non bello — in cui è stato ammesso che il 10% delle note spese era falso. E poiché a pagare era un ente finanziato con denaro pubblico, è un problema serio. Non è mai stato così facile generare una nota spese falsa.

È un tema reale, e per chi è interessato, è un tema che seguiamo da vicino. Alcuni modelli stanno iniziando a integrare watermark, per tracciare e non solo verificare ciò che è stato generato.

## Dov'è il valore? L'esempio di Delta

**Xavier:** L'ultimo esempio — rapidamente, perché è interessante. La domanda è: dov'è il valore? Prendete una compagnia aerea. Il valore è nell'attività — far volare aerei con passeggeri paganti — che genera un certo fatturato? O nel programma fedeltà?

*(La sala punta sull'attività.)*

**Xavier:** In realtà è il programma fedeltà, e con un ampio margine. L'ordine di grandezza del programma fedeltà era qualcosa come 30 miliardi di dollari. È stato il responsabile M&A di Delta a fare questa analisi. Alla fine non l'hanno scorporato per quotarlo in Borsa, perché le due cose sono legate — se l'attività principale soffre, ne soffre anche il programma.

Il vostro programma fedeltà non sono solo punti. Sono dati sui vostri clienti: dove viaggiano, in quale classe, quanto spendono — anche presso i partner. Si accumulano miglia volando e spendendo presso esercenti e tramite altri programmi. L'idea che c'è dietro sono i dati dei clienti — cosa fanno ogni giorno — che si possono poi rivendere ad altre aziende. Ed è esattamente quello che fanno: rivendono tutte queste informazioni. Le aziende sono sedute su una miniera d'oro di dati, e poche la monetizzano bene. Quindi — GDPR e tutto il resto a parte — la tecnologia è importante, ma sono i dati che si lavorano davvero. È lì che sta il valore.

---

## Transaction Services — presentazione e demo

**Analista TS (KPMG, Transaction Services):** Buonasera a tutti — spero che funzioni. Sono un analista in KPMG. Sono entrato in KPMG tre anni fa.

Prima di iniziare, una parola veloce sul nostro lavoro. Come ha spiegato Xavier, con l'intelligenza artificiale — lasciatemi prima spiegare cos'è il Transaction Services.

Lavoriamo in contesti transazionali. Siamo advisor, lato venditore o lato acquirente. In un contesto di vendita, assistiamo il venditore; i nostri clienti possono essere fondatori, azionisti, o un fondo di private equity che si rivolge a noi per preparare alla vendita una società del suo portafoglio. Prima che la società venga messa sul mercato, bisogna preparare i dati finanziari — la storia dietro i numeri — che servirà poi alle banche d'affari per gestire il processo e contattare i potenziali acquirenti.

Lavoriamo anche lato acquirente. Immaginate un fondo di private equity europeo o americano che cerca di fare un'acquisizione in Francia. Ha bisogno di una visione più approfondita, quindi studiamo lo storico della società per dare un quadro fedele dei numeri — il fatturato, i dati rettificati, uno storico normalizzato.

Il Transaction Services è un'attività di consulenza sulle operazioni di KPMG France — circa 300 professionisti, nel periodo FY23–25. *(Qui sono state citate alcune cifre di operazioni che non è stato possibile trascrivere in modo affidabile — ad esempio un enterprise value nell'ordine di alcune decine di milioni di euro.)*

Faccio parte del team generalista, che lavora su retail, energia, servizi finanziari, immobiliare e altri settori. Negli ultimi tre anni è stata un'esperienza molto ricca, con una curva di apprendimento ripida e un'ottima esposizione — ci si può ritrovare in una stanza con CFO e alti dirigenti. È un'ottima introduzione alla finanza aziendale.

Più concretamente, cosa portiamo al nostro cliente? Vi faccio un esempio semplice. Riceviamo dati finanziari grezzi — diciamo, un EBITDA riportato. L'EBITDA è la metrica chiave per valutare una società; serve all'acquirente come base per calcolare il prezzo da pagare. La nostra analisi è un vero lavoro investigativo: cerchiamo di individuare tutto ciò che incide sulla performance attuale e di rettificarlo per riflettere una visione più realistica, sia per il prezzo di acquisto sia per la performance futura della società. Ogni rettifica dell'EBITDA, combinata con il multiplo dell'EBITDA — un multiplo usato per settore per ricavare l'enterprise value — può spostare in modo significativo la valutazione. Facciamo lo stesso esercizio anche da altre angolazioni, compreso il fatturato.

## L'IA nel Transaction Services di KPMG

**Analista TS:** Oggi, nell'era dell'IA, KPMG si sta trasformando — e anche noi nel Transaction Services. Qualche mese fa, KPMG ha firmato una partnership con **Anthropic** per dare accesso ai modelli **Claude**. L'idea è portare la nostra competenza di business — che resta la pietra angolare — insieme ai guadagni di produttività e di oggettività che l'IA può offrire.

Di recente, all'interno della nostra business unit, abbiamo creato quello che chiamiamo un **«Lighthouse»** — un centro di eccellenza sull'IA. Sono persone piuttosto a loro agio con l'IA, che aiutano a guidare questo cambiamento e propongono soluzioni interne; fa pienamente parte dell'approccio della partnership. Faccio parte di questo centro di eccellenza da quattro o cinque mesi. Lavoriamo principalmente su due filoni.

Il **primo filone è la formazione del personale.** A settembre–ottobre abbiamo organizzato bootcamp sull'IA con casi concreti per formare le persone a orchestrare agenti e a sfruttare al meglio gli strumenti a nostra disposizione.

Il **secondo filone è lo sviluppo di soluzioni.** La competenza di business resta il biglietto d'ingresso — servono sempre ingegneri per sicurezza e integrazione — ma con la nostra competenza di dominio possiamo creare automazioni e soluzioni per la nostra business unit. In parallelo, alcune persone entrano nella cellula con un mandato a rotazione di quattro–cinque mesi — due persone alla volta. In quel periodo non fanno finanza; fanno monitoraggio dell'IA e del mercato, e risolvono i problemi del personale che lavora su incarichi in corso. Ogni settimana c'è una nuova funzionalità: Claude ha rilasciato una funzionalità qualche giorno fa; un paio di settimane fa ci sono stati nuovi assistenti. Quindi ogni settimana restiamo aggiornati su cosa arriva sul mercato, per discutere internamente cosa possiamo integrare e come si inserisce nel nostro futuro.

## La formazione e il framework delle «4D»

**Analista TS:** Sulla formazione — riguarda tutte le popolazioni, dagli analisti agli associate, con gli stessi pilastri ma formati differenziati, della durata di due–quattro giorni. Oggi tutti possono fare cose con l'IA, ma è molto importante sapere quando c'è un rischio reale. Con un approccio rigoroso — per esempio un prompting accurato — si possono evitare molti problemi di allucinazione, ed è ciò che cerchiamo di spiegare ai nostri team.

C'è un framework che volevo condividere, chiamato le **4D**. Prima di ogni utilizzo dell'IA, ci sono quattro cose da tenere a mente:

**1. Delega.** Chiedetevi se delegare o meno questa attività all'IA. L'IA interviene per accelerare le attività che richiedono tempo — può riassumere appunti, individuare anomalie in un grande data book Excel, aiutare a leggere un documento lungo per trovare una clausola particolare o dei red flag (per rettifiche di EBITDA o di indebitamento netto, per esempio). Ma la parte di giudizio non va mai delegata all'IA. Restiamo noi l'orchestratore. Sta a noi decidere cosa tenere e cosa no, mantenere il controllo sui temi più sensibili e critici — una revisione, per esempio, è qualcosa che facciamo spesso e che non dobbiamo mai affidare all'IA. Sempre «human in the loop» — non perdete mai questo riflesso.

**2. Descrizione (il prompting).** Un buon prompt riduce drasticamente il rischio di allucinazione e migliora le prestazioni in termini di consumo di token. Se scrivo male i prompt, resterò deluso dal risultato, farò una seconda e una terza iterazione — perdendo tempo e consumando token. Il mio consiglio per un buon prompt: dategli un ruolo. Se volete analisi per uno dei vostri corsi, ditegli di comportarsi di conseguenza; se si tratta di finanza, ditegli di agire come un advisor TS o un banchiere d'affari. Quindi: specificate il cappello / il ruolo, poi il contesto. Nel nostro lavoro, gli approcci buy-side e sell-side sono diversi — il buy-side è più critico, più simile all'audit. Indicate il ruolo, specificate il contesto, citate in quale file cercare, chiedetegli di riportare la fonte — da quale pagina o informazione proviene l'affermazione — chiedete questo tipo di riscontro, e specificate come deve essere l'output: una tabella, un Excel, un PowerPoint. Un prompt ben costruito fa risparmiare tempo e aggiunge molto più valore di uno troppo generico.

**3. Discernimento.** Immaginate di lavorare con l'IA come partner di ragionamento — potete fare brainstorming insieme. Quando vi dà una prima risposta, spingete sempre la riflessione più in là: mettetela in discussione, chiedetele se ha guardato tutte le fonti, se è sicura, se questo contraddice quello. Spingete verso un ragionamento più profondo.

**4. Diligenza.** In nessun momento deve essere «l'IA ha fatto il lavoro» o «l'IA ha aiutato e ci fermiamo lì». Ci assumiamo sempre la responsabilità del lavoro fatto dall'IA, dopo averlo rivisto. Il nostro lavoro sta cambiando: un po' meno produzione e molta più revisione — e dobbiamo mantenere le persone allineate su questo. Qualunque cosa l'IA vi aiuti a fare, alla fine siete voi a presentare il lavoro al cliente.

## Strumenti e demo — VDD Flash Reader

**Analista TS:** Più concretamente, sul fronte dell'innovazione, nella nostra business unit abbiamo accesso a **Copilot** — l'assistente IA di Microsoft, collegato a tutto il nostro ambiente Microsoft, con varianti in Excel e Word che permettono di lavorare direttamente nel file. Questo aiuta tutti a creare **agenti** pertinenti per ogni incarico. L'approccio non è che poche persone costruiscano agenti per tutti e il personale si limiti a usarli — lo scopo del seminario di formazione per tutto il personale è che ciascuno, a seconda del proprio contesto, possa costruire il proprio agente per la propria esigenza, con i connettori e le istruzioni giuste.

**Digital Gateway** — una breve parentesi — è una piattaforma nata in parte dalla nostra collaborazione con Anthropic. Automatizza i data book: immaginate di avere dati grezzi, un'estrazione ERP da SAP o da altro; trascinate i dati grezzi e in pochi minuti il vostro data book è pronto e potete iniziare la revisione analitica, dopo aver controllato la meccanica del documento, ovviamente. Funziona su Excel ma anche sulle slide. Riduce il nostro lavoro di produzione e aumenta drasticamente il lavoro di revisione — è lì che il mestiere si trasforma.

Vi mostro una breve demo di una soluzione che abbiamo sviluppato internamente. Abbiamo deciso di chiamarla **VDD Flash Reader.** In un contesto buy-side riceviamo documentazione — tipicamente VDD (Vendor Due Diligence report), IM (Information Memorandum), teaser e così via. Dobbiamo leggere rapidamente certi temi, individuare i punti chiave ed eventualmente porre domande alla controparte, spesso con scadenze strette. È quindi un assistente alla lettura.

Ecco come si presenta la soluzione. La dashboard iniziale mostra tutti i documenti disponibili sulla piattaforma. Diciamo che siete un advisor buy-side nel Transaction Services e ricevete una nuova VDD da un altro advisor — sempre tra le Big Four. Create una nuova voce VDD e trascinate il documento. Faccio un test veloce.

Da un documento vi servono alcune idee di domande da porre. Quindi gli dico: voglio una trentina di domande su temi come il fatturato — i temi prioritari su cui fare domande. Poi lancio l'analisi; ci vogliono pochi minuti, ma è praticamente fatto in pochi istanti. La interrompo e vi mostro un risultato precedente, così guardiamo il consumo di token.

Ecco un primo risultato. Riguarda dati pubblici, quindi nessun problema. L'idea è che produce una sintesi di alto livello con i dati finanziari chiave, il contesto della VDD, l'organigramma legale, la panoramica del business, cosa succede intorno all'operazione e la performance storica. Nel nostro lavoro di revisione, quando abbiamo un'affermazione da verificare, abbiamo sempre la pagina di origine della VDD — cliccandoci si ottiene un'istantanea, così si può controllare che non abbia avuto allucinazioni o letto male qualcosa. Questa è una vista; ce n'è anche una per sezione, che segue l'indice.

Mostra anche le domande che avevo chiesto all'inizio — ha generato una serie di domande. Posso rivederle, tenerle, esportarle in Excel per modificarle e arricchirle. E qui c'è un bot integrato nella piattaforma che permette di chattare direttamente con la VDD per farle domande.

## Domande e risposte

**D (pubblico):** Quello che avete costruito — è un RAG?

**Analista TS:** Sì. C'è la vostra knowledge base — cose che avete fatto in passato — più l'accesso ai nostri dati privati. Non è solo il modello di base che genera; ci sono anche conoscenza e accesso ai nostri dati privati. È da lì che viene il valore aggiunto della soluzione. Non posso necessariamente rivelare tutto a questo livello, ma l'idea è questa.

**D:** Grazie per la presentazione. Con questo agente in funzione, quanto tempo ci voleva prima per analizzare un documento?

**Analista TS:** Facciamo sempre il lavoro completo, anche con l'agente. Interviene per accelerare nei contesti con scadenze strette, quando bisogna leggere in fretta o concentrarsi su temi critici. In nessun momento smettiamo di leggere il documento. Funziona come un acceleratore — uno strumento di lettura per concentrarsi su un tema specifico — e permette di padroneggiare l'argomento entro una o due ore dalla ricezione del primo documento. Lavoriamo sempre più con scadenze strette, con clienti che chiedono più velocità, quindi questo ci aiuta a stare al passo. Non abbiamo misurato il tempo esatto risparmiato, perché dipende dalla VDD — alcune sono di 500 pagine, altre di 80. Non l'abbiamo ancora distribuito al personale, quindi avete avuto un'anteprima. È stato richiesto dal nostro personale — abbiamo organizzato workshop per raccogliere suggerimenti — e porta un valore reale alle nostre persone.

**D:** Quando lo rilascerete al vostro personale?

**Analista TS:** È in discussione. Dovrebbe arrivare nelle prossime settimane, ma prima ci sono temi di integrazione e sicurezza da gestire, oltre agli accessi amministratore, il che richiede un po' di tempo.

**Moderatore:** Grazie mille.

*(Fine della registrazione.)*
`,
};

export default it;
