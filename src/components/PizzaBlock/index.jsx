import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const typeNames = ["тонкое", "традиционное"];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const addedItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === id)
  );

  const addedItemCount = addedItem ? addedItem.count : 0;

  const handleClickType = (type) => {
    setActiveType(type);
  };

  const handleClickSize = (size) => {
    setActiveSize(size);
  };

  const handleClickAddItem = () => {
    dispatch(
      addItem({
        id,
        title,
        price,
        imageUrl,
        size: sizes[activeSize],
        type: typeNames[activeType],
      })
    );
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => handleClickType(type)}
                className={activeType === type ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => handleClickSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={handleClickAddItem}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedItem && <i>{addedItemCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
