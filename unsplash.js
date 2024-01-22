// Clé API Unsplash
const unsplashApiKey = "CH-JOMBQJgVhJiJ_ae0nY5r-eKERC_ySua7FidoxQgg";

// Fonction pour récupérer une photo de la ville depuis l'API Unsplash
export async function getCityPhoto(city) {
    // Paramètres pour obtenir des images au format paysage, ajustées en size cover
    const unsplashParams = {
        orientation: 'landscape',
        fit: 'crop',
        w: 1200, // Largeur souhaitée
        h: 800,  // Hauteur souhaitée
    };

    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}&orientation=${unsplashParams.orientation}&fit=${unsplashParams.fit}&w=${unsplashParams.w}&h=${unsplashParams.h}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();

        // Vérifier si l'objet data contient la propriété errors
        if (data.errors && data.errors.length > 0) {
            console.error("Erreur lors de la récupération de la photo de la ville :", data.errors[0]);
            return null;
        }

        // Récupérer l'URL de l'image directement depuis l'objet de réponse
        if (data.urls && data.urls.full) {
            return data.urls.full; // Vous pouvez utiliser 'full' ou d'autres propriétés selon vos besoins
        } else {
            console.error("La propriété 'urls.full' est indéfinie dans la réponse de l'API Unsplash.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la photo de la ville : " + error);
        return null;
    }
}

