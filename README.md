# Proposta di Consegna Ctrl + Play

## Descrizione

Ctrl+Play è un'applicazione web sviluppata con React e Vite che permette agli utenti di esplorare una vasta raccolta di videogiochi grazie all'integrazione con l'API di RAWG. Gli utenti possono filtrare i giochi per genere o cercare titoli specifici per trovare facilmente ciò che preferiscono.
Dopo l'autenticazione (gestita tramite Supabase per massima sicurezza), ogni utente ha accesso a un profilo personale dove può:
* Modificare i propri dati
* Gestire una lista di giochi preferiti
* Partecipare a chat in tempo reale dedicate a ciascun gioco

## API

* API: https://rawg.io/
* Database: https://supabase.com/

## Stile

* Tailwind: https://tailwindcss.com/
* DaisyUI: https://daisyui.com/

## Pagine

1. Pagina 1 - Home page con lista giochi.
2. Pagina 2 - Pagina dettaglio, mostra le informazioni dettagliate del  gioco selezionato.
3. Pagina 3 - Ricerca, mostra i risultati dei giochi per nome.
4. Pagina 4 - Pagina Genere, mostra la lista di giochi filtrati per un genere specifico.
3. Pagina 5 - Pagina Registrazione Utente.
4. Pagina 6 - Pagina Login Utente.
6. Pagina 7 - Pagina Setting utente, mostra i dati personali dell'utente e i giochi preferiti. 


## User Interactions

* Lista di interazioni che utenti autenticati e non posso fare nell'applicazione.

1. Utente non autenticato puo scrollare sui giochi in piattaforma;
2. Utente non autenticato puo filtrare per nome o categoria del gioco;
3. Utente non autenicato puo registrarsi con email e password;
4. Utente non autenicato puo vedere i messaggi degli altri utenti nella pagina di dettaglio;
5. Utente auteticato puo creare una lista di giochi favoriti;
6. Utente autenticato può accedere e modificare il proprio profilo;
7. Utente autenticato può caricare un avatar;
8. Utente autenticato può inviare messaggi in una realtime chat legata allo specifico gioco;
9. Utente autenticato può accedere all'elenco dei propri giochi preferiti ed eventualmente eliminarli.

## Context

* SessionContext: Gestisce globalmente la sessione dell'utente autenticato, fornendo funzionalità di accesso e logout in tutta l'applicazione.

* FavoritesContext: Mantiene e aggiorna la lista dei giochi preferiti dell'utente, sincronizzandosi in tempo reale con il database Supabase per garantire dati sempre aggiornati.

## Deployment

* Rimpiazza con il link online della tua App.