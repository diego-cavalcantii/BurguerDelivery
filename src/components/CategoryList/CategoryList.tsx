import { Link } from "react-router-dom";
import { CategoryListElement } from "./CategoryList.style";

interface CategoryListProps {
  data: {
    text: string;
    link: string;
  };
}

export const CategoryList = ({ data }: CategoryListProps) => {
  return <Link to={data.link}><CategoryListElement>
    {data.text}
    </CategoryListElement></Link>
};
