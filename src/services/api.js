export const fetchProducts = async () => {
    try {
        // Se define una URL por defecto si process.env.REACT_APP_API_URL es undefined
        const baseUrl = process.env.REACT_APP_API_URL || 'https://gabriel-api-management.azure-api.net';
        const apiKey = process.env.REACT_APP_API_KEY || '';

        // Aseguramos la ruta correcta al endpoint de productos
        const endpoint = baseUrl.endsWith('/ProductsG') ? baseUrl : `${baseUrl}/ProductsG`;

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
