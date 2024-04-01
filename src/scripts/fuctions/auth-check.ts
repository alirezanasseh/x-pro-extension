import { GetCookie } from "./get-cookie";

export async function AuthCheck(): Promise<boolean> {
  return !!(await GetCookie());
}
