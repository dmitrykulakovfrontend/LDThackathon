import type { GeoJsonObject } from "geojson";
import { useEffect, useState } from "react";
import {
  MapContainer,
  GeoJSON as GeoJsonLayer,
  TileLayer,
} from "react-leaflet";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  Tooltip,
  Legend,
  Label,
} from "recharts";
/**
 * Главная странина, ничего сложного, картинка и 2 кнопки, если пользователь уже зарегистрирован то показывается кнопка личного кабинета
 */ const data = [
  {
    year: "2021",
    income: 400000,
  },
  {
    year: "2022",
    income: 250000,
  },
];
function IndustriesPage() {
  const [geojson, setGeojson] = useState<GeoJsonObject>();
  useEffect(() => {
    import("@/moscowGeo.json").then((data) => {
      setGeojson(data as GeoJsonObject);
    });
  }, []);
  console.log(geojson);
  return (
    <div className="flex flex-col items-center justify-center">
      {geojson && (
        <MapContainer
          zoom={10}
          center={[55.751244, 37.618423]}
          attributionControl={false}
          className="h-[370px] w-[535px]  max-sm:w-[290px] max-sm:h-[300px] max-md:w-[380px] rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJsonLayer
            data={geojson}
            onEachFeature={(feat, layer) => {
              layer.on({
                mouseover: () => {
                  layer.bindTooltip(feat.properties.name).openTooltip();
                },
                mouseout: () => {
                  layer.unbindTooltip();
                },
              });
            }}
            style={(feature) => {
              return {
                fillColor:
                  "#" + Math.floor(Math.random() * 16777215).toString(16), // Change this to the desired color
                weight: 2,
                opacity: 1,
                color: "white",
                dashArray: "3",
                fillOpacity: 0.5,
              };
            }}
          />
        </MapContainer>
      )}
      <h1 className="my-8 text-3xl font-bold text-center max-md:my-0">
        Прибыль
      </h1>
      <AreaChart
        width={750}
        height={250}
        data={data}
        className="mt-4"
        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(215, 22, 22)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgb(215, 22, 22)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis dataKey="income" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          formatter={(value, name, props) => [`${value} руб`, "Прибыль"]}
        />
        <Legend height={36} formatter={(value, entry, index) => "Прибыль"} />
        <Area
          type="monotone"
          dataKey="income"
          stroke="rgb(215, 22, 22)"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
}

export default IndustriesPage;
