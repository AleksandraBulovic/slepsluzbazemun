# Šlep Služba Zemun — V2

## Kako otvoriti u VS Code-u

1. Raspakuj ZIP.
2. U VS Code-u idi na **File → Open Folder...** i izaberi folder `slep-sluzba-zemun-v2`.
3. Idi na **Extensions** (`Cmd + Shift + X`).
4. Instaliraj **Live Server** od *Ritwick Dey*.
5. Otvori `index.html`.
6. Desni klik na `index.html` → **Open with Live Server**.

Ako nema te opcije, otvori `Cmd + Shift + P` → ukucaj `Live Server: Open with Live Server`.

Alternativa bez ekstenzije:
- Terminal → `cd` u folder projekta
- `python3 -m http.server 5500`
- otvori `http://localhost:5500`

## Šta je V2 dodala
- jači Dribbble/Towy-inspired vizuelni stil
- animacije pri skrolovanju
- floating CTA na mobilnom
- galerija sa lightboxom
- animacija statistike
- automatski carousel recenzija
- responsive mobile meni
- 24/7 CTA i oba telefonska broja

## Logo i slike
Zameni `assets/logo-placeholder.svg` pravim logom i slike u `index.html` svojim fotografijama.

## Ručno uređivanje recenzija
Recenzije se nalaze u `reviews.js`. Svaki unos ima `reviewer`, `rating`, `text`, `date`, opciono `image` i oznaku `isExample`. Primeri su izmišljeni sadržaj za prikaz i nisu stvarne Google recenzije. Zamenite ili uklonite ih stvarnim, odobrenim recenzijama u toj datoteci; postavite `isExample: false` kada unos više nije primer. Ne menjajte HTML ni logiku carousel-a.

Carousel menja prikaz na svakih šest sekundi. Dugmad sa strelicama i tačkama omogućavaju ručno kretanje. Veza „Google profil” samo otvara poslovni profil; recenzije se ne preuzimaju sa Google-a.
