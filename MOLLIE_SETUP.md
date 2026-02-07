# Mollie Betalingen Instellen

## Stap 1: Mollie Account Registratie

1. Ga naar [mollie.com](https://mollie.com) en maak een account
2. Vul je bedrijfsgegevens in (KvK-nummer, adres, etc.)
3. Wacht op verificatie (kan 1-2 werkdagen duren)

## Stap 2: API Key Ophalen

1. Log in op je Mollie dashboard
2. Ga naar **Developers** → **API keys**
3. Kopieer de **Test API key** (begint met `test_`) voor testen
4. Kopieer de **Live API key** (begint met `live_`) voor productie

## Stap 3: API Key Instellen in Supabase

1. Ga naar je Supabase project: https://app.supabase.com
2. Ga naar **Project Settings** → **Edge Functions**
3. Klik op **Manage Secrets**
4. Voeg een nieuwe secret toe:
   - **Name:** `MOLLIE_API_KEY`
   - **Value:** je Mollie API key (test_ of live_)

## Stap 4: Edge Functions Deployen

Run in je terminal:

```bash
cd /Users/sem/beletteringbestellen
npx supabase functions deploy create-mollie-payment
npx supabase functions deploy mollie-webhook
```

## Testen

1. Gebruik de **Test API key** om te testen
2. Mollie biedt test betaalmethodes die geen echt geld kosten
3. Na testen, wissel naar de **Live API key** voor echte betalingen

## Betaalmethodes

De volgende methodes zijn ingesteld:
- iDEAL (Nederlandse banken)
- Bancontact (Belgische banken)
- Creditcard (Visa, Mastercard, Amex)

Je kunt meer methodes activeren in je Mollie dashboard.

## Webhook

De webhook URL is automatisch ingesteld op:
```
https://ezpdvawqpymxlupblypw.supabase.co/functions/v1/mollie-webhook
```

Mollie stuurt automatisch updates naar deze URL wanneer een betaling voltooid of mislukt is.
