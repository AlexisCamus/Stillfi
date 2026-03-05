const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Configuration du transporteur email
// Remplace ces valeurs par tes propres credentials SMTP
const transporter = nodemailer.createTransporter({
  service: 'gmail', // ou ton fournisseur SMTP
  auth: {
    user: process.env.EMAIL_USER || 'ton-email@gmail.com', // Remplace par ton email
    pass: process.env.EMAIL_PASS || 'ton-mot-de-passe-app' // Mot de passe d'application Gmail
  }
});

// Route pour servir le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour traiter le formulaire
app.post('/contact', async (req, res) => {
  const { Nom, Prénom, Téléphone, Email, Profession } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'ton-email@gmail.com',
    to: 'contact@stillfi.fr',
    subject: 'Nouvelle demande de rendez-vous - StillFi',
    html: `
      <h2>Nouvelle demande de rendez-vous</h2>
      <p><strong>Nom :</strong> ${Nom}</p>
      <p><strong>Prénom :</strong> ${Prénom}</p>
      <p><strong>Téléphone :</strong> ${Téléphone}</p>
      <p><strong>Email :</strong> ${Email}</p>
      <p><strong>Profession :</strong> ${Profession}</p>
      <hr>
      <p>Cette demande a été envoyée depuis le site web StillFi.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});