# MuziK - ConnexionBanger
Application web de streaming musical moderne avec gestion de playlists, système de likes et lecteur audio complet.

## Structure du dépot
```bash
/index.html               <-- Structure HTML principale
/logo.svg                 <-- Logo principale de Connexion banger
/README.md                <-- Documentation du site
/assets/                  <-- Dossier ressources par defaut
/src/                     <-- fichier static
    ├── script.js         <-- Algorithmes Logique principale (navigation, playlists, recherche)
    ├── player.js         <-- Lecteur audio et contrôles de lecture
    ├── style.css         <-- Styles CSS de l'application
/.docs/                   <-- Documentation 
    ├── notice.txt        <-- Notice d'utilisation 
/img/                     <-- Photos, illustrations, vidéos, sons…
    ├── mockup.png        <-- Captures d'ecrans ...
/libs/                    <-- Ressources réutilisables ou fichiers du projet.
    ├── resources         <-- badges, logos etc...
/media/                   <-- Dossier contenant les données des artistes
    ├── artistes          <-- covers, sons, lyrics, etc.
```

## Configuration des Ressources

### URLs de Base
```javascript
// Images et covers - GitHub
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/CX-Banger/cx-muzik/main';

// Audio - Supabase Storage
const SUPABASE_STORAGE_URL = 'https://hrzmagjjobctkfxayokt.supabase.co/storage/v1/object/public/sons/';

// Paroles - GitHub
const LYRICS_BASE_URL = 'https://raw.githubusercontent.com/CX-Banger/cx-muzik/main/media/lyrics';
```

![Muzikly](https://github.com/CX-Banger/cx-muzikly-1.2/blob/main/img/synai.png?raw=true)
