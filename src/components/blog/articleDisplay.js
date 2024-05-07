import React from "react";
import "./homepage.scss";

const ArticleDisplay = () => (
  <div id="article_display">
    <MenuBanner
      backgroundImage={blogBanner}
      heading="Light and Shadow: Exploring the Art of Photography"
      paragraph="Chukwuma Mosanya | December 1, 2024 | 0 Comment"
    />

    <div id="article_display1">
      <img src="https://via.placeholder.com/200" alt="article" />
      <img src="https://via.placeholder.com/200" alt="article" />
    </div>
    <div id="article_display2">
      <img src="https://via.placeholder.com/200" alt="article" />
    </div>
    <div id="article_display3">
      <img src="https://via.placeholder.com/200" alt="article" />
      <img src="https://via.placeholder.com/200" alt="article" />
    </div>
  </div>
);

export default ArticleDisplay;
