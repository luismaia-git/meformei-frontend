import { AxiosResponse } from 'axios';

export async function callService<T>(fn: () => Promise<AxiosResponse<T>>) {
  try {
    return await fn();
  } catch (err: any) {
    return Promise.reject(err);
  }
}
