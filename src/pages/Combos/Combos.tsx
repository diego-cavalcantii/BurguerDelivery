import { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "../Hamburgers/Hamburgers.style";
import {
  ProductCardContent,
  ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";

export default function Combos() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const priceFormat = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getCategories = async () => {
    const url = "http://localhost:8000/categories"
    setIsLoading(true);
    try {
      const response = await fetch(url)
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getCombos = async () => {
    const url = "http://localhost:8000/hamburgers"
    setIsLoading(true);
    try {
      const response = await fetch(url)
      const data = await response.json()

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false)
    }
  }

  useEffect(() => { // busca os dados antes da tela 
    // setCategories(categoriesList);
    getCategories()
  }, []);

  useEffect(() => {
    getCombos()
  }, []);

  console.log(products);



  return (
    <Layout>
      <h1>Sobremesas</h1>
      <ProductCategories>
        {isLoading ? (<p>Carregando</p>)
          : (
            categories.map((item, index) => (
              <CategoryList key={index} data={item} />
            ))
          )}
      </ProductCategories>
      <ProductWrapper>
        {isLoading
          ? (<p>Carregando</p>)
          : (
            products.map((product, index) => (
              <ProductCard key={index}>
                <ProductCardContent>
                  <h1>COMBO</h1>
                  <h2>{product.title}</h2>
                  <p>{`${product.description} +  BATATA TRADICIONAL E BEBIDA`}</p>
                  <Button onClick={() => { }}>Adicionar</Button>
                </ProductCardContent>
                <ProductCardPrice>
                  {priceFormat(product.values.combo)}
                </ProductCardPrice>
                <img src={product.image[1]} alt={product.title} />
              </ProductCard>
            ))
          )
        }
      </ProductWrapper>
    </Layout>
  );
}