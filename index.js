require("dotenv").config();
const express = require("express"); // import du package express
const app = express(); // création du serveur
const axios = require("axios"); // import axios

const apiKey = process.env.MARVEL_API_KEY;

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur mon serveur");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    // le serveur peut recevoir les query skip, limit et name du front
    console.log("query =>", req.query);

    // appel à l'api avec le parametre query api key : grace au client axios
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
    );

    console.log(response.data);
    //mise en place des query "skip", "limit" et "name"

    return res.status(200).json("Route characters");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ajouter route manquante

app.get("/comics/:charactersId", (req, res) => {
  try {
    console.log(req.params);
    return res.status(200).json("Route en construction");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(3000, () => {
  // Mon serveur va écouter le port 3000
  console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});
