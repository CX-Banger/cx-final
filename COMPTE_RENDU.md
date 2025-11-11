Compte rendu 

| Date | Auteur | Description des changements | Fichiers | Remarques |
|------|---------|-----------------------------|------------------------------|------------|
| 2025-11-11 | @paguielng | Mise en place du fichier par défaut pour les sons à venir | `./libs` | Les covers des sons à la une seront désormais uploadées directement dans le dossier de l’artiste concerné. |
| 2025-11-11 | @paguielng | Suppression du dossier `avenir` dans `./media` | `./media` | Correction du lien entre les albums à la une et les artistes : le système utilise désormais un `trackIndex` pour jouer le bon son, et le comptage des `artistIndex` commence à 0 afin d’éviter les décalages avec le tableau `artists`. |
| 2025-11-11 | @paguielng | Correction du système `featuredAlbums` pour l’affichage à la une | `script.js` | Ajustement du chargement dynamique des sons et des covers. |
| … | … | … | … | … |

> 🧩 *Chaque nouvelle modification du projet doit être inscrite ici dans l’ordre chronologique (du plus récent au plus ancien).* ;)
