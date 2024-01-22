// Importer la fonction createTemperatureChart depuis le fichier graphic.js
import { createTemperatureChart } from './graphic.js';
// Importer la fonction getCityPhoto depuis le fichier unsplash.js
import { getCityPhoto } from './unsplash.js'; // Assurez-vous de spécifier le chemin correct

import './style.css';

// Clé API OpenWeatherMap
const apiKey = "e712e2a639cd686c277fc5416e3d6590";

// Clé API Unsplash
const unsplashApiKey = "CH-JOMBQJgVhJiJ_ae0nY5r-eKERC_ySua7FidoxQgg";

// Déclarer les tableaux à un niveau supérieur
let temperatureData = [];
let humidityData = [];
let windData = [];
let sommeTemperature = 0;
let joursAafficher;

// Récupérer l'élément d'entrée du texte dans le DOM
const textInput = document.getElementById('inputCity');

// Récupérer la ville enregistrée depuis le stockage local
const savedCity = localStorage.getItem('userCity');

// Si une ville est enregistrée, définir la valeur de l'élément d'entrée du texte sur cette ville
if (savedCity) {
    textInput.value = savedCity;
}

// Fonction pour effectuer l'appel à l'API OpenWeatherMap et Unsplash
async function apiCall(city) {
    try {
        // Construire l'URL pour l'appel API OpenWeatherMap avec la ville spécifiée
        let openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=fr`;

        // Récupérer le conteneur une seule fois en dehors de la boucle
        let conteneurInfo = document.querySelector(".info_container");

        // Vider le contenu existant du conteneur
        conteneurInfo.innerHTML = "";

        // Effectuer la requête fetch vers l'API OpenWeatherMap
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();

        // Créer un élément h2 pour afficher le nom de la ville
        let nomVille = document.createElement("h2");
        nomVille.innerHTML = `${city}`;

        // Vérifier si l'élément ville existe, sinon créer un nouveau conteneur
        let ville = document.getElementById("ville");
        if (!ville) {
            ville = document.createElement("div");
            ville.id = "ville";
            document.body.appendChild(ville);
        }

        // Ajouter le nom de la ville à l'élément ville
        ville.innerHTML = "";
        ville.appendChild(nomVille);

        // Appeler la fonction pour récupérer une image depuis Unsplash
        const cityPhotoUrl = await getCityPhoto(city);

        // Vérifier si une URL d'image est disponible
        if (cityPhotoUrl) {
            // Appliquer l'image en tant que fond pour l'élément h2
            ville.style.backgroundImage = `url(${cityPhotoUrl})`;
        }

        // Définir le nombre de jours à afficher
        joursAafficher = 5;

        // Boucle pour afficher les données pour chaque jour
        for (let j = 0; j < joursAafficher; j++) {
            // Calculer l'indice correspondant à la journée actuelle
            const i = j * 8;

            // Créer un élément div pour afficher les informations de la journée
            let jour = document.createElement("div");
            jour.className = "infoWeek";

            // Remplir l'élément div avec les informations météorologiques
            jour.innerHTML =
                `   
                    <div id="date${j}" class="box"></div>
                    <div id="temp${j}" class="box"></div>
                    <div id="humidity${j}" class="box"></div>
                    <div id="wind${j}" class="box"></div>
                `;

            // Ajouter le jour au conteneur
            conteneurInfo.appendChild(jour);

            // Remplir chaque boîte avec les données météorologiques correspondantes
            let date = new Date(weatherData.list[i].dt * 1000);
            document.querySelector(`#date${j}`).innerHTML = date.toLocaleDateString();
            document.querySelector(`#temp${j}`).innerHTML = "<i class='fa-solid fa-temperature-empty'></i>" + weatherData.list[i].main.temp + "°";
            document.querySelector(`#humidity${j}`).innerHTML = "<i class='fa-solid fa-droplet'></i>" + weatherData.list[i].main.humidity + "%";
            document.querySelector(`#wind${j}`).innerHTML = "<i class='fa-solid fa-wind'></i>" + weatherData.list[i].wind.speed + "km/h";

            // Ajouter les données à chaque tableau
            temperatureData.push(weatherData.list[i].main.temp);
            humidityData.push(weatherData.list[i].main.humidity);
            windData.push(weatherData.list[i].wind.speed);

            // Ajouter la température à la somme
            sommeTemperature += weatherData.list[i].main.temp;
        }

        // Appeler la fonction pour créer le graphique
        createTemperatureChart(temperatureData, humidityData, windData);

        // Calculer la moyenne des températures
        const moyenneTemperature = sommeTemperature / joursAafficher;

        // Changer le fond en fonction de la moyenne des températures
        if (moyenneTemperature >= 0) {
            document.body.style.backgroundImage = `url('assets/abstract2.jpg')`;
        } else {
            document.body.style.backgroundImage = `url('assets/snow.jpg')`;
        }

    } catch (error) {
        console.error("Erreur lors de l'appel à l'API : " + error);
    }
}

// Attacher un gestionnaire d'événements lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
    // Attacher un gestionnaire d'événements pour le formulaire lorsqu'il est soumis
    document.querySelector("form").addEventListener("submit", function (e) {
        // Empêcher le comportement par défaut du formulaire
        e.preventDefault();

        // Récupérer la ville à partir de l'élément d'entrée du texte
        const city = textInput.value;

        // Enregistrer la ville dans le stockage local
        localStorage.setItem('userCity', city);

        // Appeler la fonction API avec la ville spécifiée
        apiCall(city);
    });
});

// Appeler initialement la fonction API avec une ville par défaut (Erquelinnes)
apiCall("Erquelinnes");

