<script setup>
import Ticker from './Ticker.vue'
import { TICKER_TEXT } from '../constants/archiveWords.js'
</script>

<template>
  <div class="about-shell">
    <section class="font-mono flex flex-col" style="min-height: 100vh">

      <div class="flex-1 about-grid">

        <p class="intro text-[11px] md:text-xs uppercase leading-relaxed tracking-wide md:text-right">
          Un <strong class="font-black">archivio creativo</strong> per designer e
          non solo. Un sistema che esplora i principali concetti dei movimenti
          artistici che hanno definito il digital design, dagli albori fino ad oggi.
        </p>

        <h1 class="title text-[clamp(2rem,7vw,4.5rem)] uppercase font-normal leading-[1.05] tracking-tight">
          L'asterisco è simbolo<br />
          dell'archivio: <strong class="font-black">non<br />conclude, rimanda.</strong>
        </h1>

        <p class="subtitle text-[11px] md:text-xs uppercase leading-relaxed tracking-wide">
          Le estetiche non sono linee, sono reti.<br />
          Non sono ordine, sono connessioni<br />
          in continua espansione.
        </p>

        <p class="segno text-[11px] md:text-xs uppercase leading-relaxed tracking-wide md:text-right">
          Segno tipografico di nota, un punto che
          interrompe il testo e apre un ulteriore
          livello di lettura. Non aggiunge
          contenuto, lo sposta.
        </p>

        <p class="forma text-[11px] md:text-xs uppercase leading-relaxed tracking-wide md:text-right">
          La sua forma è radiale e minimale: un centro da cui
          partono direzioni. Non rappresenta un oggetto, ma una struttura.<br />
          È presente in tipografia, codice e linguaggi tecnici
          con la stessa funzione: indicare un'estensione
          possibile del significato.
        </p>

      </div>

      <Ticker :text="TICKER_TEXT" />

    </section>
  </div>
</template>
