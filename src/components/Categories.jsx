import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

function Categories() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
