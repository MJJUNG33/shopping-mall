import React, { useEffect, useState, useMemo } from "react";
import ProductsCard from "../component/ProductsCard";
import { Container, Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [query] = useSearchParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const searchQuery = query.get("q") || "";
        console.log("Search query:", searchQuery);
        // const url = `http://localhost:5000/products?q=${searchQuery}`;
        const url = `https://my-json-server.typicode.com/MJJUNG33/shopping-mall/products?q=${searchQuery}`;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getProducts();
  }, [query]);

  const filteredProducts = useMemo(() => {
    const queryValue = query.get("q");
    if (!queryValue || queryValue === "") {
      return products;
    } else {
      return products.filter((product) =>
        product.title.toLowerCase().includes(queryValue.toLowerCase())
      );
    }
  }, [products, query]);

  return (
    <Container className="mt-5 mb-5">
      {filteredProducts.length === 0 ? (
        <div className="not-find-product">
          Sorry, there is no matching items with{" "}
          <p className="search-input-value">"{query.get("q")}"</p>
        </div>
      ) : (
        <Row
          xs={1}
          md={2}
          lg={4}
          className="align-items-start m-1 product-list"
        >
          {filteredProducts.map((product, i) => (
            <Col key={i}>
              <ProductsCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
export default ProductsPage;
