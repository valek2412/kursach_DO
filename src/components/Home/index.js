import React from "react";

const Home = () => (
  <div className="container">
    <span className="text-justify">
      Нехай маємо <code>N</code> категорій тестових питань. В кожну з цих
      категорій входить <code>k = m * n </code>питань. Питання відрізняються
      складністю, відповідно до неї для кожного питання визначена кількість
      балів, яку можна отримати при правильній відповіді на нього: -{" "}
      <code>Cn</code> кількість балів <code>i</code>-го тестового питання{" "}
      <code>j</code>-ї категорії, <code>i = 1,...,k</code>,{" "}
      <code>j = 1,...,N</code>. З цих тестових питань формуються <code>n</code>{" "}
      наборів тестів, У кожен набір має входити по <code>m</code> питань з
      кожної категорії. Складність набору тестів дорівнює сумі балів тестів, що
      входять в нього. Необхідно таким чином сформувати набори тестів, щоб їх
      складності були максимально близькими.
    </span>
  </div>
);

export default Home;