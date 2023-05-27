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

export const initialValues = {
  business_type: "",
  n_employee: "",
  square_area: "",
  square_buildings: "",
  equipments: [
    {
      time: "",
      amount: "",
      type: "",
    },
  ],
  entity: EntityEnum.ip,
  accounting_type: PapersEnum["6%"],
  accounting_papers: 1,
  ispatent: false,
  district: "",
};

export type FormValues = typeof initialValues;
