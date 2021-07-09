import React from "react";
import styles from "./HomeView.module.css";

const HomeView = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.mainPageHeader}>
      Главная страница приложеньки (тут может быть Ваша реклама)
    </h1>
    <img
      src="http://img2.joyreactor.cc/pics/post/full/брендинг-на-грани-юмор-logotipper-игра-слов-6701968.jpeg"
      alt="рекламное место"
      width="750"
      className={styles.advImg}
    />
  </div>
);

export default HomeView;
