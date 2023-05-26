const prod = "http://80.249.144.216:8081/ldt-1/api";
const dev = "http://localhost:8081/ldt-1/api";

export const API_URL = import.meta.env.DEV ? dev : "/ldt-1/api";
