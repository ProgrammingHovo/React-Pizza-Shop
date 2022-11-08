import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoadingBlock = (props) => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f2f2f2"
      foregroundColor="#e6e6e6"
      {...props}
    >
      <rect x="0" y="270" rx="5" ry="12" width="280" height="20" />
      <rect x="0" y="313" rx="5" ry="20" width="280" height="88" />
      <rect x="0" y="429" rx="5" ry="20" width="90" height="29" />
      <rect x="128" y="420" rx="15" ry="100" width="153" height="45" />
      <circle cx="133" cy="123" r="122" />
    </ContentLoader>
  </div>
);

export default PizzaLoadingBlock;
