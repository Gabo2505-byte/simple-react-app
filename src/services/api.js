export const fetchProducts = async () => {
    try {
        let baseUrl = process.env.REACT_APP_API_URL || 'https://gabriel-api-management.azure-api.net';
        let apiKey = process.env.REACT_APP_API_KEY || '';

        // Expresión regular corregida sin escapes innecesarios
        baseUrl = baseUrl.replace(/[[\]"']/g, '').trim();
        apiKey = apiKey.replace(/[[\]"']/g, '').trim();

        if (!baseUrl.startsWith('http')) {
            baseUrl = 'https://gabriel-api-management.azure-api.net';
        }

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
