export const fetchProducts = async () => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;

        // Construimos la URL agregando el endpoint si el env no lo incluye
        const endpoint = apiUrl.endsWith('/ProductsG') ? apiUrl : `${apiUrl}/ProductsG`;

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
