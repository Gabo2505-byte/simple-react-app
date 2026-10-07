import React, { useEffect, useState } from "react";
import { fetchProductsPage } from "./services/api";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ userDetails: "TestUser" });

  // Estado de paginación (el backend numera las páginas desde 0)
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageInfo, setPageInfo] = useState({ totalElements: 0, totalPages: 0 });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        setUser(clientPrincipal);
      } catch (error) {
        console.error('No user info found');
      }
    };
    getUserInfo();
  }, []);

  // Carga la página cada vez que cambia el usuario, la página o el tamaño
  useEffect(() => {
    if (user) {
      const loadProducts = async () => {
        setLoading(true);
        const result = await fetchProductsPage(page, size);
        setProducts(result.products);
        setPageInfo({
          totalElements: result.page.totalElements,
          totalPages: result.page.totalPages
        });
        setLoading(false);
      };
      loadProducts();
    } else {
      setLoading(false);
      setProducts([]);
    }
  }, [user, page, size]);

  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
    setPage(0); // al cambiar el tamaño volvemos a la primera página
  };

  const hasPrevious = page > 0;
  const hasNext = page + 1 < pageInfo.totalPages;

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6'
  };

  const titleStyles = {
    margin: 0,
    fontSize: '24px'
  };

  const authContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const buttonStyles = {
    padding: '8px 16px',
    border: '1px solid #007bff',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const logoutButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
  };

  const userInfoStyles = {
    fontWeight: 'bold',
  };

  const paginationStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
    flexWrap: 'wrap'
  };

  const pageButtonStyles = (enabled) => ({
    ...buttonStyles,
    opacity: enabled ? 1 : 0.5,
    cursor: enabled ? 'pointer' : 'not-allowed'
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header style={headerStyles}>
        <h1 style={titleStyles}>Productos</h1>
        <div style={authContainerStyles}>
          {user ? (
            <>
              <span style={userInfoStyles}>Hola, {user.userDetails}</span>
              <a href="/.auth/logout" style={logoutButtonStyles}>Cerrar sesión</a>
            </>
          ) : (
            <a href="/.auth/login/github" style={buttonStyles}>
              Iniciar sesión con GitHub
            </a>
          )}
        </div>
      </header>
      <main style={{ padding: "32px" }}>
        {user ? (
          loading ? (
            <p style={{ textAlign: "center" }}>Cargando productos...</p>
          ) : (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductCard key={product.id || index} product={product} />
                  ))
                ) : (
                  <p style={{ textAlign: "center", color: "gray", width: "100%" }}>
                    No se encontraron productos o hubo un error al cargarlos. Revisa la consola (F12).
                  </p>
                )}
              </div>

              {/* Controles de paginación */}
              <div style={paginationStyles}>
                <button
                  style={pageButtonStyles(hasPrevious)}
                  onClick={() => setPage(page - 1)}
                  disabled={!hasPrevious}
                >
                  Anterior
                </button>

                <span style={{ fontWeight: 'bold' }}>
                  Página {pageInfo.totalPages === 0 ? 0 : page + 1} de {pageInfo.totalPages}
                  {" "}({pageInfo.totalElements} productos)
                </span>

                <button
                  style={pageButtonStyles(hasNext)}
                  onClick={() => setPage(page + 1)}
                  disabled={!hasNext}
                >
                  Siguiente
                </button>

                <label>
                  Por página:{" "}
                  <select value={size} onChange={handleSizeChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </label>
              </div>
            </div>
          )
        ) : (
          <p style={{ textAlign: "center" }}>Por favor, inicie sesión para ver los productos.</p>
        )}
      </main>
    </div>
  );
}

export default App;