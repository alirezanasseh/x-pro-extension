import { GetToken } from "./get-token";

export async function AuthCheck(): Promise<boolean> {
  try {
    return !!(await GetToken());
  } catch (error) {
    return false;
  }
}
