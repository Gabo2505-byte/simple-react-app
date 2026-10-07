// Construye la URL base y la clave de APIM a partir de las variables de entorno
const getConfig = () => {
    let baseUrl = process.env.REACT_APP_API_URL || 'https://gabriel-api-management.azure-api.net/v1';
    let apiKey = process.env.REACT_APP_API_KEY || '';

    // Limpia corchetes y comillas que puedan venir de la variable de entorno
    baseUrl = baseUrl.replace(/[[\]"']/g, '').trim();
    apiKey = apiKey.replace(/[[\]"']/g, '').trim();

    if (!baseUrl.startsWith('http')) {
        baseUrl = 'https://gabriel-api-management.azure-api.net/v1';
    }

    // Evita duplicar /Products si la variable ya lo incluye
    const endpoint = baseUrl.endsWith('/Products') ? baseUrl : `${baseUrl}/Products`;
    return { endpoint, apiKey };
};

// Pide una página de productos: GET /Products?page=0&size=10
// Devuelve { products: [...], page: { size, number, totalElements, totalPages } }
export const fetchProductsPage = async (page = 0, size = 10) => {
    try {
        const { endpoint, apiKey } = getConfig();

        const response = await fetch(`${endpoint}?page=${page}&size=${size}`, {
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

        return {
            products: data.content ?? [],
            page: data.page ?? { size, number: page, totalElements: 0, totalPages: 0 }
        };
    } catch (error) {
        console.error("Error consultando la API de productos:", error);
        return {
            products: [],
            page: { size, number: page, totalElements: 0, totalPages: 0 }
        };
    }
};

// Versión simple: devuelve solo la lista de la primera página
export const fetchProducts = async () => {
    const { products } = await fetchProductsPage(0, 10);
    return products;
};