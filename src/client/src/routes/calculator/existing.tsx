import React from "react";
import { Link } from "react-router-dom";

// type Props = {};

function ExistingCalculator() {
  return (
    <>
      <h1 className="text-2xl font-bold mt-14">Расчет инвестиций</h1>
      <div className="text-xl">
        <Link
          to="/calculator/new"
          className="border-b-2 border-dotted text-ldt-dark-gray"
        >
          создание нового предприятия
        </Link>{" "}
        <span className="relative text-3xl font-bold top-1">/</span> развитие
        промышленного предприятия
      </div>
    </>
  );
}

export default ExistingCalculator;
