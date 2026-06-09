<script setup>
import Ticker from './Ticker.vue'
import { TICKER_TEXT } from '../constants/archiveWords.js'
</script>

<template>
  <div class="min-h-screen">
    <section class="bg-bg text-fg min-h-screen flex flex-col">
      <div class="relative flex-1 px-6 md:px-12 py-16 overflow-hidden">
        <div class="relative z-10 flex justify-end mb-24 mt-8">
          <p class="text-[11px] md:text-xs uppercase leading-relaxed tracking-wide max-w-xs md:max-w-sm text-right">
            Un <strong class="font-black">archivio creativo</strong> per designer e
            non solo. Un sistema che esplora i
            principali concetti dei movimenti
            artistici che hanno definito il digital
            design, dagli albori fino ad oggi.
          </p>
        </div>

        <div class="relative z-10 mb-10">
          <h1 class="text-[clamp(2rem,7vw,4.5rem)] uppercase font-normal leading-[1.05] tracking-tight">
            L'asterisco è simbolo<br />
            dell'archivio: <strong class="font-black">non<br />conclude, rimanda.</strong>
          </h1>
          <p class="mt-4 text-[11px] md:text-xs uppercase leading-relaxed tracking-wide max-w-xs">
            Le estetiche non sono linee, sono reti.<br />
            Non sono ordine, sono connessioni<br />
            in continua espansione.
          </p>
        </div>

        <div class="relative z-10 flex justify-end mb-24">
          <p class="text-[11px] md:text-xs uppercase leading-relaxed tracking-wide max-w-xs md:max-w-sm text-right">
            Segno tipografico di nota, un punto che
            interrompe il testo e apre un ulteriore
            livello di lettura. Non aggiunge
            contenuto, lo sposta.
          </p>
        </div>

        <div class="relative z-10 flex justify-end mb-16">
          <p class="text-[11px] md:text-xs uppercase leading-relaxed tracking-wide max-w-xs md:max-w-sm text-right">
            La sua forma è radiale e minimale: un centro da cui
            partono direzioni. Non rappresenta un oggetto, ma
            una struttura.<br />
            È presente in tipografia, codice e linguaggi tecnici
            con la stessa funzione: indicare un'estensione
            possibile del significato.
          </p>
        </div>
      </div>

      <Ticker :text="TICKER_TEXT" />
    </section>
  </div>
</template>