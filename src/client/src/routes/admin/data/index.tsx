import { useAuth } from "@/contexts/useAuth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BusinessTypeDataIcon from "@/assets/business-type-data.svg";
import EquipmentPriceIcon from "@/assets/equipment-price.svg";
import { useBackground } from "@/contexts/useBackground";
// import TaxesDataIcon from "@/assets/taxes-data.svg";
// import LandPriceDataIcon from "@/assets/land-price-data.svg";
// import PatentDataIcon from "@/assets/patent-data.svg";
// import ObjectsDataIcon from "@/assets/objects-data.svg";

function DataIndex() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setBackground } = useBackground();
  useEffect(() => {
    setBackground({ color: "#E6E6E6" });
    return () => {
      setBackground({ color: undefined, icon: undefined });
    };
  });

  if (!user?.role.includes("ROLE_ADMIN")) {
    navigate("/auth/signin");
  }
  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold">База данных</h1>
      <div className="flex flex-wrap gap-4 my-8">
        <Card
          Icon={BusinessTypeDataIcon}
          title="Обезличенные данные по отраслям"
          href="business-type"
        />
        <Card
          Icon={EquipmentPriceIcon}
          title="Станки средняя цена"
          href="equipment"
        />
        {/* <Card Icon={TaxesDataIcon} title="Налоговые ставки" href="taxes" />
        <Card
          Icon={LandPriceDataIcon}
          title="Средняя кадастровая стоимость по округам"
          href="land-price"
        />
        <Card Icon={PatentDataIcon} title="Патентование" href="patent" />
        <Card Icon={ObjectsDataIcon} title="Объекты" href="objects" /> */}
      </div>
    </div>
  );
}

function Card({
  title,
  Icon,
  href,
}: {
  title: string;
  Icon: React.FC<React.SVGProps<SVGElement>>;
  href: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col justify-between w-full max-w-sm gap-3 p-8 transition-all bg-white border cursor-pointer group text-ldt-red hover:bg-ldt-red rounded-xl"
    >
      <p
        className={`${
          hover ? "text-white" : "text-black"
        } transition-all text-xl font-semibold group-hover:text-white `}
      >
        {title}
      </p>
      <div
        className={`${
          hover ? "text-white" : "text-ldt-red"
        } transition-all self-end group-hover:text-white`}
      >
        <Icon />
      </div>
    </Link>
  );
}

export default DataIndex;
