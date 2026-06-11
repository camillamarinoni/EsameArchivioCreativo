<script setup>
import Ticker from './Ticker.vue'
import { TICKER_TEXT } from '../constants/archiveWords.js'
</script>

<template>
  <div class="about-shell">
    <section class="about-section font-mono flex flex-col">

      <div class="flex-1 about-grid">

        <p class="intro text-[11px] md:text-xs uppercase leading-relaxed tracking-wide">
          Un <strong class="font-black">archivio creativo</strong> per designer e
          non solo. Un sistema che esplora i principali concetti dei movimenti
          artistici che hanno definito il digital design, dagli albori fino ad oggi.
        </p>

        <h1 class="title uppercase font-normal leading-[0.95] tracking-tight" style="font-size: clamp(2.5rem, 6vw, 6rem)">
          <span class="font-light">L'ASTERISCO È SIMBOLO<br />
          DELL'ARCHIVIO: </span><strong class="font-black">NON<br />CONCLUDE, RIMANDA.</strong>
        </h1>

        <p class="subtitle text-[11px] md:text-xs uppercase leading-relaxed tracking-wide">
          Le estetiche non sono linee, sono reti.<br />
          Non sono ordine, sono <strong class="font-black">connessioni</strong><br />
          in continua espansione.
        </p>

        <p class="segno text-[11px] md:text-xs uppercase leading-relaxed tracking-wide">
          Segno tipografico di nota, un punto che
          interrompe il testo e <strong class="font-black">apre un ulteriore
          livello di lettura.</strong> Non aggiunge
          contenuto, lo sposta.
        </p>

        <p class="forma text-[11px] md:text-xs uppercase leading-relaxed tracking-wide">
          La sua forma è radiale e minimale: un centro da cui
          partono direzioni. <strong class="font-black">Non rappresenta un oggetto, ma una struttura.</strong>
          È presente in tipografia, codice e linguaggi tecnici
          con la stessa funzione: indicare un'estensione
          possibile del significato.
        </p>

      </div>

      <Ticker :text="TICKER_TEXT" />

    </section>
  </div>
</template>
