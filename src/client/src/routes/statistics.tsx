import { Field } from "formik";
import type { GeoJsonObject } from "geojson";
import { useEffect, useRef, useState } from "react";
import industries from "@/industries.json";
import {
  MapContainer,
  GeoJSON as GeoJsonLayer,
  TileLayer,
} from "react-leaflet";
const SEZ = [
  "район Матушкино",
  "район Силино",
  "район Старое Крюково",
  "район Крюково",
  "район Савёлки",
  "район Текстильщики",
];
const red = [215, 22, 22];
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
import EmployeesSrc from "@/assets/employees-statistics.png";
import EmployeeSalarySrc from "@/assets/employee-salary.png";
import IncomeSrc from "@/assets/income.png";
import StatisticsIcon from "@/assets/statistics.svg";
import { useBackground } from "@/contexts/useBackground";
import { formatNumber } from "@/utils/formatting";
import { API_URL } from "@/constants";
const data = [
  {
    year: "2021",
    income: 400000,
  },
  {
    year: "2022",
    income: 250000,
  },
];
export type IndustryStatistic = {
  staff_mean: number;
  mean_salary_staff_industry: number;
  income22: number;
  amountInMsc: number;
  amountInSez: number;
  incomes: Income[];
};

export type Income = {
  year: string;
  income: number;
};
/**
 * Страница со статистикой отраслей
 */
function StatisticsPage() {
  const [geojson, setGeojson] = useState<GeoJsonObject>();
  useEffect(() => {
    import("@/moscowGeo.json").then((data) => {
      setGeojson(data as GeoJsonObject);
    });
  }, []);
  const [isDropdownActive, setDropdownActive] = useState(false);
  const { setBackground } = useBackground();
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [industryData, setIndustryData] = useState<IndustryStatistic>();
  useEffect(() => {
    setBackground({ color: "#E6E6E6", icon: StatisticsIcon });
    return () => {
      setBackground({ color: undefined, icon: undefined });
    };
  }, []);

  useEffect(() => {
    if (selectedIndustry) {
      fetch(`${API_URL}/invest/statistics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industry: selectedIndustry,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIndustryData(data);
        })
        .catch((e) => console.log(e));
    }
  }, [selectedIndustry]);
  const arrowRotation = isDropdownActive ? "rotate-[135deg]" : "rotate-45";
  const handleDropdownToggle = () => {
    setDropdownActive(!isDropdownActive);
  };
  return (
    <div className="relative z-10 flex flex-col items-start gap-6">
      <h1 className="text-3xl font-bold max-md:my-0">Статистика</h1>
      <div className="flex flex-col w-full gap-2">
        <label className="flex flex-col justify-between max-w-md gap-2">
          <span className="font-medium w-fit">
            Отрасль ведения хозяйственной деятельности
          </span>
          <div className="relative w-full">
            <select
              onClick={handleDropdownToggle}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-6 py-3 transition-all border appearance-none outline-blue-500 hover:border-blue-500 rounded-xl"
            >
              <option disabled value="">
                Не выбрано
              </option>
              {industries.map((industry) => (
                <option value={industry} key={industry} title={industry}>
                  {industry.length > 40
                    ? industry.slice(0, 40) + "..."
                    : industry}
                </option>
              ))}
            </select>
            <span
              className={`absolute pointer-events-none w-3 h-3 transition-all duration-300 transform ${arrowRotation} -translate-y-1/2 border-t-2 border-r-2 right-4 border-ldt-gray top-1/2`}
            ></span>
          </div>
        </label>
        {industryData && (
          <>
            <h2 className="text-lg font-semibold w-fit">
              Среднее кол-во персонала
            </h2>
            <div className="flex w-full gap-5 mb-12">
              <Card
                label="Среднее кол-во персонала"
                value={`${industryData.staff_mean.toFixed()} чел.`}
                src={EmployeesSrc}
              />
              <Card
                label="Средняя зарплата персонала"
                value={formatNumber(
                  industryData.mean_salary_staff_industry * 1000
                )}
                src={EmployeeSalarySrc}
              />
              <Card
                label="Среднее значение прибыли"
                value={formatNumber(industryData.income22 * 1000)}
                src={IncomeSrc}
              />
            </div>
            {geojson && industryData && (
              <>
                <div>
                  <div className="p-4 rounded-t-3xl bg-white max-w-[535px]">
                    Количество производства по районам
                  </div>
                  <HeatMap
                    geojson={geojson}
                    mscAmount={industryData.amountInMsc}
                    sezAmount={industryData.amountInSez}
                  />
                </div>
              </>
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
                  <stop
                    offset="5%"
                    stopColor="rgb(215, 22, 22)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(215, 22, 22)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" />
              <YAxis dataKey="income" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                formatter={(value, name, props) => [`${value} руб`, "Прибыль"]}
              />
              <Legend
                height={36}
                formatter={(value, entry, index) => "Прибыль"}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="rgb(215, 22, 22)"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </>
        )}
      </div>
    </div>
  );
}

type HeatMapProps = {
  geojson: GeoJsonObject;
  mscAmount: number;
  sezAmount: number;
};

function HeatMap({ geojson, mscAmount, sezAmount }: HeatMapProps) {
  const ref = useRef<L.GeoJSON>(null);

  useEffect(() => {
    if (ref.current) {
      const value = ref.current;
      value.eachLayer((layer) => {
        layer.on({
          mouseover: () => {
            layer
              .bindTooltip(
                // @ts-ignore
                `${layer.feature.properties.name} (${
                  // @ts-ignore
                  SEZ.includes(layer.feature.properties.name)
                    ? `СЭЗ: ${sezAmount}`
                    : `МСК: ${mscAmount}`
                } производств)`
              )
              .openTooltip();
          },
          mouseout: () => {
            layer.unbindTooltip();
          },
        });
      });
    }
  }, [sezAmount, mscAmount]);
  return (
    <MapContainer
      zoom={10}
      center={[55.751244, 37.618423]}
      attributionControl={false}
      className="h-[370px] w-[535px]  max-sm:w-[290px] max-sm:h-[300px] max-md:w-[380px] rounded-b-3xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJsonLayer
        data={geojson}
        ref={ref}
        onEachFeature={(feat, layer) => {
          layer.on({
            mouseover: () => {
              layer
                .bindTooltip(
                  `${feat.properties.name} (${
                    SEZ.includes(feat.properties.name)
                      ? `СЭЗ: ${sezAmount}`
                      : `МСК: ${mscAmount}`
                  } производств)`
                )
                .openTooltip();
            },
            mouseout: () => {
              layer.unbindTooltip();
            },
          });
        }}
        style={(feature) => {
          return {
            fillColor: "rgb(215 22 22)",
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: SEZ.includes(feature?.properties.name)
              ? Math.max(sezAmount / 100, 0.07)
              : Math.max(mscAmount / 100, 0.07),
          };
        }}
      />
    </MapContainer>
  );
}

type CardProps = {
  value: string;
  label: string;
  src: string;
};

function Card({ value, label, src }: CardProps) {
  return (
    <div className="w-full max-w-[340px] p-8 pb-6 bg-white divide-y-2 divide-ldt-red rounded-xl">
      <div className="flex items-center gap-6 pb-8">
        <img src={src} alt="" />
        <p className="text-3xl font-bold text-ldt-red">{value}</p>
      </div>
      <p className="pt-6 text-lg font-semibold">{label}</p>
    </div>
  );
}

export default StatisticsPage;
