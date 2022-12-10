import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

const Categories: React.FC = React.memo(() => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const categories: string[] = [
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
});

export default Categories;
