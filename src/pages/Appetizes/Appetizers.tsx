import React, { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "../Hamburgers/Hamburgers.style";
import {
  ProductCardContent,
  ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";
import { ButtonAppettizers } from "./Appetizers.style";

export default function Appetizers() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({}); // Estado para armazenar os preços selecionados

  const priceFormat = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getCategories = async () => {
    const url = "http://localhost:8000/categories";
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAppetizers = async () => {
    const url = "http://localhost:8000/appetizers";
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Inicializar os preços selecionados para cada produto como "small"
      setProducts(data);

      // Inicializar os preços selecionados para cada produto como "small"
      const initialSelectedPrices = {};
      data.forEach((product, index) => {
        initialSelectedPrices[index] = "small";
      });
      setSelectedPrices(initialSelectedPrices);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false)
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getAppetizers();
  }, []);

  const handlePriceChange = (index: number, price: string) => {
    setSelectedPrices({ ...selectedPrices, [index]: price }); // Atualizar o preço selecionado para o produto com o índice correspondente
  };

  return (
    <Layout>
      <h1>Entradas</h1>
      <ProductCategories>
        {isLoading ? (
          <p>Carregando</p>
        ) : (
          categories.map((item, index) => (
            <CategoryList key={index} data={item} />
          ))
        )}
      </ProductCategories>
      <ProductWrapper>
        {isLoading ? (
          <p>Carregando</p>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index}>
              <ProductCardContent>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <ButtonAppettizers>
                  {/* Botões de rádio para seleção de preço */}
                  <div>

                    <input
                      type="radio"
                      id={`price_small_${index}`}
                      value="small"
                      checked={selectedPrices[index] === "small"}
                      onChange={() => handlePriceChange(index, "small")}
                    />
                    <label htmlFor={`price_small_${index}`}>Pequeno</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id={`price_large_${index}`}
                      value="large"
                      checked={selectedPrices[index] === "large"}
                      onChange={() => handlePriceChange(index, "large")}
                    />
                    <label htmlFor={`price_large_${index}`}>Grande</label>
                  </div>
                </ButtonAppettizers>
                <Button onClick={() => { }}>Adicionar</Button>
              </ProductCardContent>
              {/* Utilize o preço selecionado para exibir o valor correto */}
              <ProductCardPrice>
                {priceFormat(
                  product.values[selectedPrices[index]]
                )}
              </ProductCardPrice>
              <img src={product.image} alt={product.title} />
            </ProductCard>
          ))
        )}
      </ProductWrapper>
    </Layout>
  );
}
