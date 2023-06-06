export const entityMap = {
  ip: "ИП",
  zao: "ЗАО",
  ooo: "ООО",
  pao: "ПАО",
  oao: "ОАО",
} as const;
export const papersTypeMap = {
  "6%": "УСН 6%",
  "15%": "УСН 15%",
  OCH: "OCH",
} as const;
export type Entity = keyof typeof entityMap;
export type PapersType = keyof typeof papersTypeMap;
export enum EntityEnum {
  ip = "ip",
  ooo = "ooo",
  zao = "zao",
  pao = "pao",
  oao = "oao",
}
export enum PapersEnum {
  "6%" = "6%",
  "15%" = "15%",
  OCH = "OCH",
}

export type Results = {
  total: number;
  building: number;
  land: number;
  entityRegistration: number;
  equipment: number;
  salaries: number;
  ndfl: number;
  retire: number;
  medic: number;
  landTax: number;
  propertyTax: number;
  amortisation: number;
  patentRegistration: number;
  accounting: number;
  engineerOnce: number;
  engineerYear: number;
};
