import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoadingBlock from "../components/PizzaBlock/PizzaLoadingBlock";

function Home({ searchValue }) {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortId, setSortId] = React.useState(0);
  const sortNames = ["rating", "-price", "price", "title"];

  React.useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      setIsLoading(true);

      const sort = sortNames[sortId].replace("-", "");
      const order = sortNames[sortId].includes("-") ? "asc" : "desc";

      const { data } = await axios.get(
        `https://6361406067d3b7a0a6c21c0d.mockapi.io/items?${
          categoryId ? `category=${categoryId}` : ""
        }&sortBy=${sort}&order=${order}`
      );

      setItems(data);
      setIsLoading(false);
    })();
  }, [categoryId, sortId]);

  const pizzas = items
    .filter((pizza) => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <>
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort selected={sortId} onClickListItem={(index) => setSortId(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((el, i) => <PizzaLoadingBlock key={i} />)
          : pizzas}
      </div>
    </>
  );
}

export default Home;
