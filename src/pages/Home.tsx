import React from "react";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import {
  FilterSliceType,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaLoadingBlock from "../components/PizzaBlock/PizzaLoadingBlock";
import Pagination from "../components/Pagination";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categoryId, sortObj, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );
  const { items, status } = useSelector((state: RootState) => state.pizzas);

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

      let sort;

      if (params.sortType) {
        sort = list.find((obj) => obj.sortType === params.sortType);
      }

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          sortObj: sort ? sort : list[0],
          currentPage: Number(params.currentPage),
          searchValue: "",
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
    .filter((pizza: any) => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

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
            Произошла ошибка <span>😕</span>
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
        onChange={(page: number) => dispatch(setCurrentPage(page))}
      />
    </>
  );
};

export default Home;
