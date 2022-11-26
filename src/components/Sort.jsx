import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

export const list = [
  { sortName: "популярности", sortType: "rating" },
  { sortName: "цене(сначала дешевые)", sortType: "-price" },
  { sortName: "цене(сначала дорогие)", sortType: "price" },
  { sortName: "алфавиту", sortType: "title" },
];

function Sort() {
  const sort = useSelector((state) => state.filter.sortObj);
  const dispatch = useDispatch();
  const sortRef = React.useRef();

  const [isOpenedPopUp, setIsOpenedPopUp] = React.useState(false);

  const handleClickListItem = (el) => {
    dispatch(setSort(el));
    setIsOpenedPopUp(!isOpenedPopUp);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setIsOpenedPopUp(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className={isOpenedPopUp ? "sort active" : "sort"}>
      <div
        className="sort__label"
        onClick={() => setIsOpenedPopUp(!isOpenedPopUp)}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sort.sortName}</span>
      </div>

      {isOpenedPopUp && (
        <div className="sort__popup">
          <ul>
            {list.map((el, i) => (
              <li
                key={i}
                onClick={() => handleClickListItem(el)}
                className={sort.sortName === el.sortName ? "active" : ""}
              >
                {el.sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
