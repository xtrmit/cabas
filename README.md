# Cabas

Une liste de courses Android simple, qui fonctionne hors ligne. C'est une application web installable (PWA), sans serveur et sans compte utilisateur. La liste est enregistrée uniquement sur le téléphone.

## Les 3 versions

| Version | Où | Rôle | Icône |
|---|---|---|---|
| **LOCAL** | `http://localhost:8080` sur le PC | Développer et tester à chaud | balise LOCAL |
| **TEST** | `https://<compte>.github.io/cabas-test/` | Valider sur un téléphone | badge orange « T », « Cabas T » |
| **PROD** | `https://<compte>.github.io/cabas/` | Usage réel sur les téléphones | « Cabas » |

Chaque version garde ses propres données. Tester en TEST ne touche donc jamais la vraie liste.

## Mise en route (une seule fois)

```powershell
cd F:\CABAS
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # si PowerShell refuse les scripts
.\tools\setup-github.ps1
```

Ce script installe GitHub CLI si besoin, ouvre la connexion GitHub dans le navigateur, puis crée les dépôts `cabas-test` et `cabas`.

## Cycle de travail

1. **Modifier, puis tester sur le PC** : lancer `.\tools\serve.ps1`. Chrome s'ouvre sur la version LOCAL. Recharger la page (F5) suffit à voir les changements. Pour simuler un téléphone : F12, puis l'icône téléphone.
2. **Envoyer en TEST** : lancer `.\tools\deploy.ps1 test`. Le script enregistre les modifications et propose d'augmenter le numéro de version. Le site est en ligne 1 à 2 minutes après.
3. **Valider sur le téléphone**, avec l'app « Cabas T » (orange).
4. **Publier en PROD** : lancer `.\tools\deploy.ps1 prod`, puis taper `OUI` pour confirmer. Seul le code déjà passé par TEST est accepté.

## Installer sur un téléphone

1. Ouvrir l'adresse PROD (ou TEST) dans **Chrome**.
2. Menu ⋮ → **Ajouter à l'écran d'accueil** → **Installer**.
3. L'app Cabas apparaît parmi les applications. Elle s'ouvre en plein écran et fonctionne sans réseau.

## Mises à jour automatiques

À chaque ouverture de l'app avec du réseau, Cabas vérifie si une nouvelle version existe. Si c'est le cas, elle la télécharge en arrière-plan et se recharge toute seule, sans toucher à la liste. Un bandeau « Cabas mis à jour (vX.Y.Z) » le confirme. Dans ⚙️ Réglages, on trouve la version installée et le bouton « Rechercher une mise à jour ».

Le déclencheur d'une mise à jour est **le numéro de version dans `version.js`**. `deploy.ps1 test` le fait évoluer pour toi.

## Dictée vocale

Le bouton **Voix** utilise la reconnaissance vocale de Chrome. Il faut autoriser le micro la première fois, et elle a en général **besoin de réseau**. Sans réseau, utilise **Texte** puis le micro du clavier Google (Gboard) : il fonctionne hors ligne si le pack français est téléchargé (Gboard → Paramètres → Saisie vocale → Reconnaissance vocale hors connexion).

## Fichiers

```
index.html                 page de l'app
css/app.css                styles (clair / sombre, liserés par catégorie)
js/app.js                  logique (liste, tri, catégories, voix, réglages)
version.js                 numéro de version (déclenche les mises à jour)
sw.js                      service worker : hors ligne + mise à jour
manifest*.webmanifest      fiches d'installation (PROD / TEST)
icons/                     icônes (PROD, et TEST avec badge orange « T »)
tools/                     serve.ps1, setup-github.ps1, deploy.ps1
```

## Plus tard : Play Store

La même PWA peut être emballée en application Play Store, avec Bubblewrap ou PWABuilder (format « Trusted Web Activity »), sans réécrire le code. Il faut pour cela un compte développeur Google Play (25 $, à payer une seule fois).
