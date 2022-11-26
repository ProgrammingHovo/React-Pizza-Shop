import React from "react";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoadingBlock from "../components/PizzaBlock/PizzaLoadingBlock";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryId, sortObj, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);

  const isSearching = React.useRef(false);
  const isMounted = React.useRef(false);

  //Check if it was the first visit to site, and add a url to site if it was'nt the first visit
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortObj.sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortObj, currentPage]);

  //Take URL and save the params to Redux from it if there is changed params
  React.useEffect(() => {
    if (window.location.search) {
      isSearching.current = true;

      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortType === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  //Function of fetching pizzas
  const getPizzas = async () => {
    const sort = sortObj.sortType.replace("-", "");
    const order = sortObj.sortType.includes("-") ? "asc" : "desc";

    dispatch(
      fetchPizzas({
        sort,
        order,
        categoryId,
        currentPage,
      })
    );
  };

  //Fetching data if it was the first visit, otherwise wait to change Redux params from URL
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearching.current) {
      getPizzas();
    }
    isSearching.current = false;
  }, [categoryId, sortObj, currentPage, searchValue]);

  const pizzas = items
    .filter((pizza) => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((pizza) => (
      <Link to={"/pizza/" + pizza.id} key={pizza.id}>
        <PizzaBlock {...pizza} />
      </Link>
    ));

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error__info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению не удалось получить пиццы.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(4)].map((el, i) => <PizzaLoadingBlock key={i} />)
            : pizzas}
        </div>
      )}
      <Pagination
        value={currentPage}
        onChange={(num) => dispatch(setCurrentPage(num))}
      />
    </>
  );
}

export default Home;
