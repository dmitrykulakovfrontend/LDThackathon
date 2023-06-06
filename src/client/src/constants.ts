const prod = "http://80.249.144.216:8081/ldt-1/api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dev = "http://localhost:8081/ldt-1/api";
// взависимости от режима разные API маршруты
export const API_URL = import.meta.env.DEV ? prod : "/ldt-1/api";
