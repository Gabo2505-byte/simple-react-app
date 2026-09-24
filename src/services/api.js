export const fetchProducts = async () => {
    try {
        // Obtenemos el valor o usamos la URL limpia por defecto
        let baseUrl = process.env.REACT_APP_API_URL || 'https://gabriel-api-management.azure-api.net';
        let apiKey = process.env.REACT_APP_API_KEY || '';

        // Limpieza estricta: elimina corchetes [, ], comillas " y '
        baseUrl = baseUrl.replace(/[\[\]"']/g, '').trim();
        apiKey = apiKey.replace(/[\[\]"']/g, '').trim();

        // Si por alguna razón la URL quedó vacía o relativa, forzamos la de APIM
        if (!baseUrl.startsWith('http')) {
            baseUrl = 'https://gabriel-api-management.azure-api.net';
        }

        const endpoint = baseUrl.endsWith('/ProductsG') ? baseUrl : `${baseUrl}/ProductsG`;

        console.log("Haciendo petición a:", endpoint); // Para verificar en consola

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error consultando la API de productos:", error);
        return [];
    }
};
