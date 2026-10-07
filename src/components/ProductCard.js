// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            margin: "8px",
            width: "200px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
            {/* La imagen solo se muestra si el producto trae un campo "image" */}
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
                />
            )}
            <h3 style={{ fontSize: "16px", margin: "8px 0" }}>{product.name}</h3>
            {product.description && (
                <p style={{ fontSize: "14px", color: "#555", margin: "4px 0" }}>
                    {product.description}
                </p>
            )}
            <p style={{ fontWeight: "bold", margin: "8px 0 4px" }}>${product.price}</p>
            <p style={{ fontSize: "13px", color: "#777", margin: 0 }}>
                Stock: {product.stock}
            </p>
        </div>
    );
};

export default ProductCard;