import axios from "axios";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PizzaLoadingBlock from "../components/PizzaBlock/PizzaLoadingBlock";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number | string;
  }>();
  const navigate = useNavigate();

  React.useState(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6361406067d3b7a0a6c21c0d.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Не удалось найти пиццу. Вернуться на главную страницу?");
        navigate("/");
      }
    })();
  });

  if (!pizza) {
    return <PizzaLoadingBlock />;
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
        <div className="pizza-block__selector"></div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{pizza.price} ₽</div>
          <Link to="/">
            <button className="button button--outline button--add">
              <span>Назад</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
