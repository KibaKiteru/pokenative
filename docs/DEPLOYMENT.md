# Déploiement en production

Ce projet est configuré pour les builds EAS (Expo Application Services) avec `eas.json` et les identifiants d’app dans `app.json`.

Prérequis:
- Compte Expo (https://expo.dev) et connexion via la CLI.
- iOS: compte Apple Developer (payant) pour TestFlight/App Store.
- Android: compte Google Play Console.

Identifiants (modifiez si besoin dans `app.json`):
- iOS: `ios.bundleIdentifier` = `com.kibakiteru.pokenative`, `buildNumber` = `1`
- Android: `android.package` = `com.kibakiteru.pokenative`, `versionCode` = `1`

## 1) Installer la CLI EAS

```zsh
npm i -g eas-cli
```

(Alternative: utilisez `npx eas` car `eas-cli` est ajouté en devDependency via les scripts.)

## 2) Se connecter à Expo

```zsh
npm run eas:login
```

## 3) Lancer un build de production

Android (AAB pour Play Console):
```zsh
npm run build:android
```

iOS (IPA pour TestFlight):
```zsh
npm run build:ios
```

Conseils:
- Lors du premier build, laissez EAS gérer automatiquement les certificats.
- Incrémentez `android.versionCode` et `ios.buildNumber` pour les nouvelles soumissions si `autoIncrement` ne suffit pas.

## 4) Soumettre aux stores

Android:
```zsh
npm run submit:android
```

iOS:
```zsh
npm run submit:ios
```

Vous serez guidé pour vous authentifier (Google Play et App Store Connect) si ce n’est pas déjà fait.

## 5) Mises à jour OTA (EAS Update) (optionnel)

Le projet est configuré avec `runtimeVersion: { policy: "appVersion" }`. Publiez une mise à jour sur un canal:

```zsh
eas update --branch production --message "Correctifs mineurs"
```

Assurez-vous que votre app installée est associée au bon canal (`channel`) via le profil de build (`eas.json`).

## Build Web (optionnel)

Générer un site statique:
```zsh
expo export -p web
```
Les fichiers seront dans `dist/`. Hébergez-les sur un service statique (Netlify, Vercel, S3, etc.).
