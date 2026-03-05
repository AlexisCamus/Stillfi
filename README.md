# StillFi - Site Web avec Formulaire de Contact

Ce projet contient le site web de StillFi avec un formulaire de contact qui envoie les demandes par email.

## Installation

1. Installe les dépendances :
   ```bash
   npm install
   ```

2. Configure ton email SMTP dans `server.js` :
   - Remplace `'ton-email@gmail.com'` par ton adresse email
   - Remplace `'ton-mot-de-passe-app'` par ton mot de passe d'application Gmail

   Pour Gmail :
   - Active la vérification en 2 étapes
   - Génère un "mot de passe d'application" : https://support.google.com/accounts/answer/185833
   - Utilise ce mot de passe (pas ton mot de passe normal)

3. Lance le serveur :
   ```bash
   npm start
   ```

4. Ouvre http://localhost:3000 dans ton navigateur

## Configuration Email

Le serveur utilise Nodemailer pour envoyer les emails. Tu peux utiliser :
- Gmail (comme dans l'exemple)
- Outlook/Hotmail
- Tout autre fournisseur SMTP

### Variables d'environnement (optionnel)

Au lieu de modifier directement `server.js`, tu peux créer un fichier `.env` :

```
EMAIL_USER=ton-email@gmail.com
EMAIL_PASS=ton-mot-de-passe-app
```

Et installer `dotenv` :
```bash
npm install dotenv
```

Puis ajouter en haut de `server.js` :
```javascript
require('dotenv').config();
```

## Fonctionnement

- Le formulaire envoie les données au serveur
- Le serveur compose un email HTML avec les informations
- L'email est envoyé à `contact@stillfi.fr`
- Un message de succès apparaît dans le modal

## Déploiement

Pour déployer en production :
- Configure un vrai serveur (Heroku, Vercel, etc.)
- Utilise un service email professionnel (SendGrid, Mailgun, etc.)
- Assure-toi que le domaine est en HTTPS