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
  Bar,
  BarChart,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";
import EmployeesSrc from "@/assets/employees-statistics.png";
import EmployeeSalarySrc from "@/assets/employee-salary.png";
import IncomeSrc from "@/assets/income.png";
import StatisticsIcon from "@/assets/statistics.svg";
import { useBackground } from "@/contexts/useBackground";
import { formatNumber } from "@/utils/formatting";
import { API_URL } from "@/constants";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
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
  console.log(industryData);
  useEffect(() => {
    if (selectedIndustry) {
      // const testData = {
      //   amountInMsc: 55,
      //   amountInSez: 76,
      //   income22: 23234,
      //   incomes: [
      //     { year: "2021", income: 2343 },
      //     { year: "2022", income: 23746 },
      //   ],
      //   mean_salary_staff_industry: 75,
      //   staff_mean: 200,
      // };
      // for (let year of testData.incomes) {
      //   year.income = year.income / 1000;
      // }
      // const lastYear = +testData.incomes[testData.incomes.length - 1].year;
      // for (let i = 1; i <= 5; i++) {
      //   testData.incomes.push({
      //     year: `${lastYear + i}`,
      //     income: 0,
      //   });
      // }
      // setIndustryData(testData);
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
          for (let year of data.incomes) {
            year.income = year.income / 1000;
          }
          const lastYear = +data.incomes.at(-1)?.year;
          for (let i = 1; i <= 5; i++) {
            data.incomes.push({
              year: `${i === 1 ? lastYear + 1 : ""}`,
              income: 0,
            });
          }
          setIndustryData(data);
        })
        .catch((e) => {
          console.log(e);
        });
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
        {industryData && geojson && (
          <>
            <h2 className="text-lg font-semibold w-fit">
              Среднее кол-во персонала
            </h2>
            <div className="flex w-full gap-5 mb-12 max-lg:flex-col ">
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
            <div className="flex mb-8 gap-5 max-md:flex-col">
              <div className="flex-1">
                <div className="p-4 rounded-t-3xl w-full  font-semibold text-lg bg-white ">
                  Количество производства по районам
                </div>
                <HeatMap
                  geojson={geojson}
                  mscAmount={industryData.amountInMsc}
                  sezAmount={industryData.amountInSez}
                />
              </div>
              <div className="flex-1 ">
                <div className="p-4 w-full max-xl:w-[500px] max-md:w-full max-lg:w-[350px] pb-0 rounded-t-3xl font-semibold text-lg bg-white">
                  <p className="w-full pb-4 border-b-2 border-ldt-red">
                    График прибыли, млн руб.
                  </p>
                </div>
                <div className="w-full max-xl:w-[500px] max-md:w-full max-lg:w-[350px] h-[370px]">
                  <ResponsiveContainer>
                    <BarChart
                      margin={{ top: 50, right: 50, left: 25, bottom: 100 }}
                      className="rounded-b-xl bg-white"
                      data={industryData.incomes}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(215, 22, 22)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="rgb(215, 22, 22)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="year"
                        axisLine={{
                          stroke: "rgba(151, 151, 151, 1)",
                        }}
                        tick={{
                          fill: "rgba(151, 151, 151, 1)",
                        }}
                        tickLine={false}
                      />
                      <YAxis
                        axisLine={{
                          stroke: "rgba(151, 151, 151, 1)",
                        }}
                        tick={{
                          fill: "rgba(151, 151, 151, 1)",
                        }}
                        tickSize={10}
                        tickMargin={5}
                        tickCount={10}
                      />
                      <Tooltip
                        formatter={(value, name, props) => [
                          `${(+value).toFixed()} млн. руб.`,
                          "Прибыль",
                        ]}
                        content={<CustomTooltip />}
                      />
                      <Bar
                        dataKey="income"
                        barSize={10}
                        shape={<RoundedSquareBar />}
                        fill="url(#colorUv)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const value = +(payload[0].value || 0);
    return (
      <div className="bg-white p-4 text-ldt-dark-gray font-bold rounded-xl border flex flex-col gap-2 border-ldt-red">
        <p className="label">{label}</p>
        <p>Прибыль</p>
        <p>
          <span className="text-ldt-red font-bold">{`${value.toFixed()}`}</span>{" "}
          млн. руб.
        </p>
      </div>
    );
  }

  return null;
};

const RoundedSquareBar = (props: any) => {
  const { x, y, width, height } = props;
  // Calculate the coordinates for the dashed line
  const lineX1 = 0 + 85; // Adjust the distance from the bar
  const lineX2 = x - 10;
  const lineY1 = y;
  const lineY2 = y;
  // Define the radius for the rounded corners
  const borderRadius = 4;

  return (
    <g>
      {/* Render the rounded square shape */}
      <line
        x1={lineX1}
        y1={lineY1}
        x2={lineX2}
        y2={lineY2}
        stroke="black"
        strokeDasharray="3 3" // Customize the dash pattern
      />
      <path
        d={`M${x},${y + borderRadius}
          A${borderRadius},${borderRadius} 0 0 1 ${x + borderRadius},${y}
          L${x + width - borderRadius},${y}
          A${borderRadius},${borderRadius} 0 0 1 ${x + width},${
          y + borderRadius
        }
          L${x + width},${y + height - borderRadius}
          A${borderRadius},${borderRadius} 0 0 1 ${x + width - borderRadius},${
          y + height
        }
          L${x + borderRadius},${y + height}
          A${borderRadius},${borderRadius} 0 0 1 ${x},${
          y + height - borderRadius
        }
          Z`}
        fill={props.fill}
      />
    </g>
  );
};
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
      className="w-full min-h-[370px]   max-sm:h-[300px]  rounded-b-3xl"
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
