import React from "react";
import styles from "./search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/slices/filterSlice";

function Search() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");

  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const onChangeSearchValue = (event) => {
    setValue(event.target.value);
    onRefreshSearchValue(event.target.value);
  };

  const onRefreshSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  return (
    <div className={styles.root}>
      <img className={styles.icon} src="/img/search.svg" alt="search" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeSearchValue(event)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          className={styles.clearIcon}
          onClick={onClickClear}
          fill="none"
          height="24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      )}
    </div>
  );
}

export default Search;
