/** KPMG × AI recap — English (as provided by the ESCP AI team). */
const en = {
  summary: `
*An evening with KPMG on artificial intelligence, hosted for business-school students (ESCP). Two KPMG speakers — a partner (Xavier) with an audit and Transaction Services background, and an analyst from the Transaction Services / Deal Advisory practice — shared how AI is reshaping the profession, how firms should adopt it, and gave a live demo of an in-house AI tool built with Anthropic's Claude.*

## Overview

The session opened with a simple question to the room — *who here uses ChatGPT?* — and a provocation: schools often discourage students from using AI, yet at KPMG, AI is already part of consultants' daily work. The speakers' core message was that AI is not about replacing people, but about rethinking businesses around it.

## Key takeaways

**AI is a transformation, not a tool.** KPMG has worked on AI for four years. The firm's view is that simply automating existing tasks destroys value; the real opportunity is to redesign operating models, offerings, delivery and careers around AI. "Transform or decline" — echoing investor David S. Rose, the speakers argued that any company that fails to transform within about three years risks being pushed out of its market.

**People remain the differentiator.** Citing a study of leading digital-economy firms (KPMG, Accenture, Apple and others), the speakers noted the decisive competitive factor is not proprietary models or platforms, but people. For students, the advice was to combine finance expertise with data and AI skills — a strong, increasingly sought-after combination. KPMG is accelerating, not cutting, its recruitment of these "dual" profiles.

**The audit profession keeps expanding.** Audit has moved from purely financial audit, to extra-financial / sustainability audit (CSRD, ESG), and now to auditing technology itself. A concrete example: a French software vendor asked KPMG to "open the black box" of its AI-driven credit-decisioning tool and certify it — a new kind of AI attestation covering governance, data security, cyber and EU AI Act compliance.

**Scaling AI depends on trust and change management.** Moving from a handful of use cases to firm-wide adoption requires (1) trust in the technology and (2) change management. The hardest bottleneck is middle management, whose established routines slow adoption. KPMG's answer is continuous support — "Wake Up Call" workshops, hackathons — framed as 7,000 individual transformations across its people, not one top-down program.

**Four tech themes recur with CFOs and boards:** scaling trusted AI; redefining roles within the finance function; technological resilience; and data and technology sovereignty (where data is stored, dependence on a single IT provider, the "kill-switch" risk). On cyber, the speakers highlighted a sharp rise in attacks — including attacks reaching the physical world and a surge in AI-generated fake documents and expense claims — and the role of watermarking and traceability. A closing example used Delta Air Lines to show that much of a company's value can sit in its data (e.g. a loyalty programme) rather than its core activity.

## Live demo — Transaction Services & Anthropic

The Transaction Services / Deal Advisory practice (~300 professionals in France) advises on buy-side and sell-side deals, normalising financials such as EBITDA to reach a fair enterprise value. A few months ago KPMG signed a partnership with **Anthropic** to give teams access to **Claude**.

The practice set up a **"Lighthouse"** AI centre of excellence running two workstreams: training all staff (2–4 day programmes, concrete cases, building and orchestrating agents) and building internal solutions. Staff are taught a simple **"4D" framework** for using AI responsibly:

- **Delegation** — decide what to hand to AI (summarising, anomaly detection, document review) while never delegating professional judgment; keep a human in the loop.
- **Description** — write good prompts: assign a role, give context, cite sources, specify the output format. This cuts hallucinations, iterations and wasted tokens.
- **Discernment** — treat AI as a thinking partner and always challenge its answers.
- **Diligence** — review and take ownership of every AI output. The job shifts from production toward review.

Tools shown included Microsoft **Copilot** (connected across the Microsoft environment) and **Digital Gateway**, a platform built with Anthropic that automates data-book creation from raw ERP extracts in minutes. The headline demo was the **"VDD Flash Reader"**: in a buy-side context, an analyst drags and drops a Vendor Due Diligence report, and the tool produces a high-level summary (key financials, legal structure, business overview), generates ~30 targeted questions for the counterparty, and links every statement back to its source page so reviewers can verify it against the original and catch any hallucination. Built on a retrieval-augmented approach over the firm's private knowledge, it accelerates tight-deadline reviews — getting analysts to grips with a document within an hour or two — and is due for wider internal release within weeks, pending integration and security sign-off.
`,
  transcript: `
*This is an edited English transcription of the event audio. The recording was transcribed automatically and then translated and lightly cleaned for readability. The meaning and flow follow the original French closely, but exact wording has been smoothed, and some proper nouns and figures (marked where uncertain) could not be confirmed from the audio. Speaker labels are approximate.*

---

## Introduction

**Host / KPMG:** Good evening everyone. Let me quickly introduce the team with us tonight — colleagues from our Digital and Transaction Services teams, including a manager and a senior analyst in Transaction Services. I'll hand over to Xavier.

**Xavier (KPMG Partner):** This slide isn't the most interesting — it just shows the firm's clients. We work with pretty much the entire CAC 40 and many large groups. Before we start, let me ask you a question, because tonight we're going to talk a lot about artificial intelligence: who here uses ChatGPT?

*(Most of the room responds.)*

**Xavier:** Right — almost everyone. And does ESCP teach you to use AI as part of your courses?

*(Mixed response from the room.)*

**Xavier:** That's often a role I think schools will increasingly have to play. Students are told not to use AI — yet tomorrow, and really already today, AI is part of the daily work of our teams and our consultants. If anything, I think your professors should be teaching you to use AI better, day to day.

We've been working on artificial intelligence for four years now. My innovation team and I have worked hard on it. Looking back, we didn't get everything right, but we've made a lot of progress. At the start we worked on a huge number of use cases. Today we have a much clearer sense of what works well and what works less well — and not only in finance-related work.

## Return on investment, and what AI is really for

**Xavier:** With hindsight, the obvious question is: what's the return on investment? In my role I deal with many CFOs and finance departments of CAC 40 companies, and the first question they ask is exactly that — the ROI, the productivity gains: are you measuring them, and will you share those productivity gains with us? The answer isn't simple. If you look into it, I don't think anyone still questions whether AI lets you save time — everyone agrees it does.

But there are deeper questions behind that. The first is: what are we going to do with those gains? You could imagine companies that are already under pressure saying, "The first thing I'll do to improve profitability is cut headcount." And where would they start? Unfortunately for you, often with the youngest people — those entering the job market in the coming years. We can already feel a certain tension in the recruitment market, and not just abroad — among French companies too.

I think that would be a mistake. We needed a study to understand the differentiating factor among digital-economy companies — the likes of KPMG, Accenture, Apple and others. Why that sector? Because it's a bit ahead of the curve in its thinking and development, which makes sense, since these firms themselves help other companies transform. And do you know what they said the differentiating factor is? It's not proprietary models or internally developed platforms or agents — even though we talk a lot about agents. It's people. The men and women come first.

The point is this: the future is not about replacing white-collar workers with AI. That doesn't mean we won't use AI — but if all we do is automate the tasks our teams perform today, then at the scale of the firm, and of the economy, we actually destroy value. That's not good. The real question is what we do with AI: not sprinkling AI across the company, but rethinking the company — rethinking the models — around AI. We're adapting our offerings, our go-to-market, the way we deliver our engagements around AI, and the skills of our teams.

## Advice on skills

**Xavier:** Until now, in finance, we mainly recruited people from business schools and similar backgrounds — simply because we needed people who speak the same language as our clients and understand how companies are organised. That's essential. But with the turn of the 2010s, data became essential to business. Data is the starting point for any executive making a decision, and for controlling their business and activity. So data is the second pillar of our strategy.

So in terms of skills, here's my recommendation: keep that appetite for finance — that's essential — but also build real skills in data and artificial intelligence. I think you've chosen a good combination. Today you have to combine these skills to be even more attractive on the market.

Why do I say this? Because if companies don't transform — and if we ourselves don't undertake a deep transformation of all our models, not just how we deliver but our offerings, our people, our academy, our career paths — then within three years we won't just be less competitive or less profitable; we'll be completely out of the market, both in terms of attractiveness to clients and to our own teams. We'll no longer be relevant, and that's decline. It's the idea of "click or decline." This applies to firms like ours, and to every company in the world. There really is no sector today that is sheltered from this transformation.

You have both the opportunity — and it's not a passive moment for you either, given the tension in recruitment — and the chance to live through this transformation, and to be the first generation that is AI-native. It's moving very fast. You're digitally native by nature. That's why we haven't reduced our recruitment — on the contrary, we're accelerating, hiring dual profiles combining finance and AI. You're the generation that will let us deliver our own transformation, and that matters.

## Xavier's career and advice

**Xavier:** Why did I join KPMG? There were several factors. The first was working in a firm with a genuine international dimension — that was essential.

Let me tell you a short story. For a long time I worked on the audit of a large IT-services company. A French manager who was running the US side had to come back to France, and I was told I'd replace him abroad. In the end he never came back — but it opened things up for me. Later I was told, since it wasn't going to be the US, I'd be sent to London, to start with the UK partners. That was meant to be September 2015.

Then, just before — around the end of June / start of July 2015, two months earlier — the firm made its largest acquisition at the time: an Indian pure-player. So three weeks later I landed in Bangalore. I stayed seven months — a wonderful experience, both professionally and personally. India is a country I grew very attached to. I worked with the local KPMG India teams, who are hugely talented and hugely committed.

When I came back to France, I decided to set up a Franco-Indian relations desk. Unlike IT-services companies that offshored tasks to India — what's called "offshoring," you've all heard of it — I did the opposite. I said: let's bring the best Indian talent to France to work on our engagements. I brought over dozens of Indian managers — enriching both for them and for our teams.

All of this to say: opportunities will come in your careers. You have to give a lot for them to arise, and you have to know how to seize them and how to bounce back. If you have an idea — "I'd like to develop a new service, a new offering" — don't hesitate, whatever your background. We're happiest when someone proposes to expand our playing field. That's possible in a firm too: from the outside a firm can look closed and rigid, but inside it's quite the opposite. Tony can speak to that as well.

## The digitalisation — and expansion — of audit

**Xavier:** Why did I come to KPMG and this practice? I was interested in finance, but I was also always passionate about tech — the digital side. Most of my portfolio was linked to the technology sector — software publishers and so on.

A few years ago we took over what's called the digital audit — digitalising the audit itself. I taught external audit for a long time, and even then I found it a bit old-fashioned: we'd go back to paper worksheets. I'm not sure it inspired much passion. We told ourselves this simply wasn't tenable any more — we can't ask our teams to work as if it were still the 1980s. So we started to digitalise, helped a lot by the transformation happening at our clients, who had dematerialised and launched their own digital programmes. Today there's software everywhere, so the auditor naturally builds on the client's transformation. We now have agents everywhere to help in every step of the audit process — and the same is true in consulting and our other businesses. It's quite impressive.

Our professions have completely transformed. But you might think the road is finished — on the contrary, it's just beginning. AI's promise isn't only about saving time.

To give a concrete example: for 18–20 years we did only financial audit. Financial audit is, in effect, a comfort statement on the financial reporting of large French companies. Then two or three years ago we took a second turn: extra-financial audit. CSRD, ESG — you've all heard of it. Large companies must now prepare reports on their actions to reduce their carbon footprint, promote inclusion, and so on. So that's a second hat for the auditor: the financial auditor and the extra-financial auditor.

And now we're becoming auditors of technology too. That may sound a little strange, so let me explain. Increasingly, with AI, it's not just a data-availability or data-quality question — most companies have more or less dealt with that. The real issue is scaling: moving from a few use cases here and there to massive use of AI across the company. If only 10% of employees use AI, it doesn't transform the business. And scaling doesn't happen unconditionally — there are several conditions. The first is trust.

## Trust in the technology

**Xavier:** Trust is hugely important. Think about it: if 20 years ago, when you'd just passed your driving test, someone had asked you to get into a fully autonomous car — no steering wheel, no pedals, like the latest robotaxis — I don't think I'd have done it. Likewise, if you ask a 40-year-old who has always used Excel and checks every formula in every cell to suddenly trust an AI, they'll have real reservations. So trust in the technology is essential.

Here's an example. We were contacted by a French software vendor whose software lets banks give a quick yes/no on a mortgage credit application. When you buy an apartment and go to your bank, it's not your advisor who decides based on whether they like you — they have software that recalculates the fair market value of the asset you're buying and compares it to the price you're paying. If you're paying well above the software's estimated value, the bank says, "I'll finance you, but not 100% — maybe 70%, or 30%."

That vendor — our client — came to us and said, essentially, "I have an AI problem." The issue is the black box: AI suffers from the black-box syndrome. When people don't understand what's inside, trust drops, and that slows adoption of the software. So they asked us simply to come and open the black box, shed light on it, and above all certify it — to provide a kind of attestation around the technology.

I mention this because it's new — no one had ever asked us for an attestation on AI before. If you develop AI solutions and want to sell them to companies, those companies may say: "Fine, but did you address governance, data security, cyber? Did you put internal controls around your solution? Did you make sure it complies with the EU AI Act?" Maybe not — you wanted to move fast and ship, which is normal. But you may need a trusted third party to put a stamp on it, to build confidence. That's what we're now being asked to do.

So auditors who used to do only financial audit, then sustainability audit, are now opening a new playing field: the audit of technology. We do it on AI; we may do it on quantum computing too — that's dropped off the radar for now, but it will come back. The point is that ours is a profession in constant motion, one that adapts to its world and tries to create value through new services. I really believe it's the technology — and people — that let us do that. That's my optimistic side: the future, as I see it, is positive, even if there are reasons for pessimism in what we see around us.

Let me make you think about one thing. Do you know David S. Rose, the investor? His point — and it's exactly what I was saying — is that if you don't transform within three years, you're out of the market, whatever your sector. Even Amazon could be challenged. So: transform.

## Change management

**Xavier:** I said there are two factors to drive fast, strong adoption. The first is trust, which we've just covered. The second is change management.

You're not really concerned yet — you're AI-native, you're just starting out. This is more about people with 5 to 10 years' experience — typically some managers. Why? Because they've built a routine. After four or five years doing a job, you settle into a kind of comfort zone; every day you do things well, so changing your routine and adopting new tools is hard. It's very hard when you've used the same approach for ten years and suddenly you're told to switch tomorrow — to RAG, or something else.

A study of more than 1,000 clients looked at AI adoption across executives, leaders, frontline workers and middle management, and asked where the big bottleneck was. Systematically, it comes back to the managers — because they've created routines, and changing them is complicated.

And again, the idea isn't just to tell people to use a bit of Microsoft Copilot, or ChatGPT, or whatever. Just automating what you do today adds little value. The idea is to rethink the role and responsibilities of managers, and the roles you assign to staff. That's very hard to do. We're really talking about human transformation — not a technology problem, but a human one. That's the greatest challenge every company faces: evolving people, and rethinking the whole model — delivery, offerings, careers — around AI.

We're not claiming we've cracked it, but we're taking it head-on. We've created workshops. I wanted to call them something a bit edgy, so we called them "The Wake Up Call." The point is to make our managers conscious that our transformation won't happen just because some small transformation team decided to transform the firm — it'll happen because each of us contributes in our own way. We don't have one firm-wide transformation to deliver; we have 7,000 individual transformations to deliver — one per person. It's not a mandatory once-a-year training that changes anything; it's continuous support. We also run a lot of hackathons and many other initiatives to support change within our teams.

## Four tech topics that keep coming up with CFOs and boards

**Xavier:** In constant contact with CFOs, boards and company leaders, there are four tech topics that come up almost systematically.

**1. "AI everywhere" means nothing — so, scaling and trusted AI.** How do you scale, and how do you secure it — the famous "trusted AI"?

**2. Redefining roles and responsibilities within the finance function.** What will the management controller do tomorrow? Certainly something different, at different moments, from what they do today.

**3. Technological resilience** — knowing that if there's a problem, things keep working. Who knows what technological resilience is?

**4. Data and technology sovereignty.** Two years ago I'd have talked about data sovereignty — where our data is stored. We prefer data stored in Europe, because if it's stored in the US, the American government can, under certain laws, access it. That's a concern for all companies, especially European ones. But today we go much further, to technology sovereignty: which IT provider do you use? If you're 100% on an American IT provider — you've heard about the "kill switch" — someone could, in theory, press a button and cut Microsoft services to a company. No more Microsoft services means no more email; if your billing software depends on it you can't invoice; if your ERP depends on it you lose your accounting, and so on. That's clearly complicated. So today we're able to measure technological dependence — the corollary of sovereignty — and we help clients build a strategy. Not all data has the same level of sensitivity and criticality, but some data is hyper-critical and must be well protected. That's essential.

## Cyber

**Xavier:** On cybersecurity — you've all seen the latest attacks; the surge is simply incredible. You may have heard of an attack on a refrigeration / cold-storage system. There was a food-safety risk: had someone raised the temperature to 4°C and disabled or suppressed the alarms, no one would have noticed, and you could have contaminated something like a million people. In the end the alarms went off and it was caught fairly quickly. A lot of products had to be discarded, but thankfully no one bought and consumed them afterwards. Still, it's a real cyber issue — this is where the digital world attacks the physical world.

Until recently, attacks were mostly about stealing data and holding a ransom against its release. Today, attacks are more targeted. We also see "fake documents" — documents generated or falsified by AI. In a company, someone might create fake purchase accounts; there are more and more fake expense reports. The other day we saw a case — it was public, and not great — where it was acknowledged that 10% of expense claims were fake. And since it was a publicly funded body paying, that's a serious problem. It has never been so easy to generate a fake expense report.

This is a real topic, and for those interested, it's one we're looking at closely. Some models are starting to integrate watermarks, to trace rather than just verify what's been generated.

## Where is the value? The Delta example

**Xavier:** The last example — quickly, because it's interesting. The question is: where is the value? Take an airline. Is the value in the activity — flying planes with paying passengers — which generates some revenue? Or is it in the loyalty programme?

*(The room guesses the activity.)*

**Xavier:** In fact it's the loyalty programme, and by a wide margin. The order of magnitude for the loyalty programme was something like $30 billion. It was Delta's head of M&A who ran this analysis. In the end they didn't spin it off and IPO it, because the two are linked — if your core activity suffers, the programme does too.

Your loyalty programme isn't just points. It's data on your customers: where they travel, in which class, what they spend — including with partners. You earn miles by flying and spending with merchants and through other programmes. The idea behind it is the customer data — what they do day to day — which you can then resell to other companies. And that's exactly what they do: they resell all that information. Companies are sitting on a goldmine of data, and few of them monetise it well. So — GDPR and everything else aside — tech is good, but it's the data you really work. That's where the value is.

---

## Transaction Services — presentation and demo

**TS Analyst (KPMG, Transaction Services):** Good evening everyone — I hope this is working. I'm an analyst at KPMG. I joined KPMG three years ago.

Before we start, a quick word on our business. As Xavier explained, with artificial intelligence — let me first explain what Transaction Services is.

We work in transactional contexts. We're advisors, on either the sell side or the buy side. In a seller's context, we advise on the sell side; our clients can be founders, shareholders, or a private equity fund that calls on our services to prepare a company in its portfolio for sale. Before the company goes to market, you have to prepare the financials — the story around the numbers — which later serves the investment bankers to run the process and contact potential buyers.

We also work on the buy side. Imagine a European or American private equity fund trying to make an acquisition in France. It needs a deeper view, so we study the company's history to give a true picture of the numbers — the revenue, the adjusted figures, a normalised record.

Transaction Services is a deal-advisory practice at KPMG France — around 300 professionals, over the FY23–25 period. *(Some example deal figures were cited here but could not be reliably transcribed — e.g. an enterprise value in the range of tens of millions of euros.)*

I'm part of the generalist team, which works across retail, energy, financial services, real estate and other industries. Over the last three years it's been a very rich experience, with a steep learning curve and excellent exposure — you can find yourself in a room with CFOs and senior executives. It's an excellent initiation to corporate finance.

More concretely, what do we bring to our client? Let me give a simple example. We receive raw financial data — say, a reported EBITDA. EBITDA is the key metric for valuing a company; it serves as the basis for a buyer to calculate the price to pay. Our analysis is a genuine investigative exercise: we try to identify everything that affects current performance and adjust it to reflect a more realistic view for the purchase price and for the company's future performance. Each adjustment to EBITDA, combined with the EBITDA multiple — a multiple used to derive enterprise value by industry — can move the valuation significantly. We do the same exercise on other angles too, including revenue.

## AI at KPMG Transaction Services

**TS Analyst:** Today, in the age of AI, KPMG is transforming — and so are we in Transaction Services. A few months ago, KPMG signed a partnership with **Anthropic** to give access to the **Claude** models. The idea is that we bring our business expertise — which remains the cornerstone — coupled with the productivity and objectivity gains that AI can bring.

Recently, within our business unit, we created what we call a **"Lighthouse"** — an AI centre of excellence. These are people who are fairly fluent in AI, who help drive this change and propose internal solutions; it's very much part of the partnership approach. I've been part of this centre of excellence for four or five months now. We work mainly on two workstreams.

The **first workstream is training the staff.** In September–October we ran AI bootcamps with concrete cases to train people in orchestrating agents and getting the most from the tools available to us.

The **second workstream is building solutions.** Business expertise is still the entry ticket — you always need engineers for security and integration — but with our domain expertise we can create automations and solutions for our business unit. Alongside this, people join the cell on a rotating mandate of four to five months — two people at a time. During that period they don't do finance; they do AI watch and market monitoring, and they solve problems for staff working on live engagements. Every week there's a new feature: Claude released a feature a few days ago; a couple of weeks ago there were new assistants. So each week we stay tuned to what's coming to market, to discuss internally what we can integrate and how it fits into our future.

## Training and the "4D" framework

**TS Analyst:** On training — it concerns all populations, from analysts to associates, with the same pillars but differentiated formats, lasting two to four days. Today everyone can do things with AI, but it's very important to know when there's a real risk with AI. With a rigorous approach — for example careful prompting — we can avoid a lot of hallucination issues, and that's something we try to explain to our teams.

There's a framework I wanted to share, called the **4D**. Before each use of AI, there are four things to keep in mind:

**1. Delegation.** Ask yourself whether or not to delegate this task to AI. AI steps in to accelerate time-consuming tasks — it can summarise notes, spot anomalies in a large Excel data book, help read a long document to find a particular clause or red flags (for EBITDA or net-debt adjustments, for example). But the judgment part must never be delegated to AI. We remain the orchestrator. It's up to us to decide what to keep and what not to, to keep control over the most sensitive and critical topics — a review, for instance, is something we do often and must never hand to AI. Always "human in the loop" — never lose that reflex.

**2. Description (prompting).** A good prompt dramatically reduces the risk of hallucination and improves performance on token consumption. If I'm a poor prompter, I'll be disappointed by the result, do a second and third iteration — wasting time and burning tokens. My advice for a good prompt: give it a role. If you want analytics for one of your courses, tell it to act accordingly; if it's finance, tell it to act as a TS advisor or an investment banker. So: specify the hat / the role, then the context. For our work, buy-side and sell-side approaches differ — buy-side is more critical, more audit-like. State the role, specify the context, cite which file to search, ask it to bring back the source — which page or which information the statement came from — ask for that kind of backup, and specify what the output should look like: a table, an Excel, a PowerPoint. A well-crafted prompt saves time and adds far more value than a high-level one.

**3. Discernment.** Imagine you're working with AI as your thinking partner — you can brainstorm together. When it gives a first answer, always push the reflection further: challenge it, ask whether it looked at all the sources, whether it's sure, whether this contradicts that. Push for deeper reasoning.

**4. Diligence.** At no point should it be "AI did the job" or "AI helped and we stop there." We always take ownership of the work done by AI, after reviewing it. Our job is shifting: a bit less production, and much more review — and we need to keep people aligned on that. Whatever AI assists you with, in the end it's you who presents the work to your client.

## Tools and demo — VDD Flash Reader

**TS Analyst:** More concretely, on the innovation side, in our business unit we have access to **Copilot** — Microsoft's AI assistant, connected across our whole Microsoft environment, with variants in Excel and Word that let us work directly inside the file. This helps everyone create **agents** that are relevant to each engagement. The approach isn't that a few people build agents for everyone and the staff just use them — the point of running the training seminar for all staff is that everyone, depending on their context, can build their own agent for their own need, with the right connectors and the right instructions.

**Digital Gateway** — a quick aside — is a platform that's partly the fruit of our collaboration with Anthropic. It automates data books: imagine you have raw data, an ERP extract from SAP or elsewhere; you drag and drop the raw data, and within a few minutes you have your data book ready and can start your analytical review, after checking the document's mechanics of course. It works on Excel but also on slides. It reduces our production work and dramatically increases our review work — that's where the business transforms.

Let me show you a short demo of a solution we built internally. We decided to call it the **VDD Flash Reader.** In a buy-side context we receive documentation — typically VDDs (Vendor Due Diligence reports), IMs (Information Memoranda), teasers, and so on. We need to read certain topics quickly, identify the key points, and potentially put questions to the counterparty, often under tight deadlines. So it's a reading assistant.

Here's what the solution looks like. The initial dashboard shows all the documents available on the platform. Say you're a buy-side advisor in Transaction Services and you receive a new VDD from another advisor — still in the Big Four. You create a new VDD entry and drag and drop your document. Let me run a quick test.

From a document you need a few ideas for questions to ask. So I tell it: I want around thirty questions on topics like revenue — the priority topics to ask about. Then I launch the analysis; it takes a few minutes, but it's essentially done in moments. I'll stop it and show you an earlier result so we can look at the token usage.

So, here's a first result. This is on public data, so no issue. The idea is that it produces a high-level summary with the key financial figures, the VDD context, the legal chart, the business overview, what's happening around the deal, and the historical performance. In our review work, when we have a statement we want to verify, we always have the source page from the VDD — click on it and you get a snapshot, so you can check it hasn't hallucinated or misread anything. That's one view; there's also a view by section, following the table of contents.

It also shows the questions I asked for at the start — it generated a set of questions. I can review them, keep them, export them to Excel to edit and enrich them. And here there's a bot integrated into the platform that lets us chat with the VDD directly to ask it questions.

## Q&A

**Q (audience):** What you've built — is it a RAG?

**TS Analyst:** Yes. You have your knowledge base — things you've done in the past — plus access to our private data. It's not just the base model generating; there's knowledge and access to our private data as well. That's where the solution's added value comes from. I can't necessarily disclose everything at this level, but that's the idea.

**Q:** Thanks for the presentation. With this agent in place, how long did it take to analyse a document before?

**TS Analyst:** We still do the full work even with the agent. It comes in to accelerate tight-deadline contexts, where we need to read quickly or zoom in on critical topics. At no point do we stop reading the document. It acts as an accelerator — a reading tool to zoom in on a given topic — and lets you get a grip on the subject within one to two hours of receiving the first document. We increasingly work under tight deadlines, with more client demand on speed, so this helps us keep up. We haven't measured the exact time saved, because it depends on the VDD — some are 500 pages, some are 80. We haven't yet rolled it out to our staff, so you've had a bit of a preview. It's been requested by our staff — we ran workshops to discuss suggestions — and it brings real value to our people.

**Q:** When will you release it to your people?

**TS Analyst:** It's under discussion. It should arrive in the next few weeks, but there are integration and security topics to handle first, plus administrator access, which takes some time.

**Host:** Thank you very much.

*(End of recording.)*
`,
};

export default en;
