import { GetToken } from "./get-token";

export async function AuthCheck(): Promise<boolean> {
  return !!(await GetToken());
}
