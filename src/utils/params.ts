import { AxiosRequestConfig } from "axios";

export function ensureAxiosParamOptions(options: AxiosRequestConfig) {
  const params = options.params || {};
  const keys = Object.keys(params);
  const newParams = keys.reduce((acc, key) => {
    const param = params[key];
    if (typeof param === "number" || !!param) {
      acc[key] = params[key];
    }
    return acc;
  }, {} as Record<string, string>);
  return { ...options, params: newParams };
}
