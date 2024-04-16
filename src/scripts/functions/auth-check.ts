import { GetCookie } from "./get-cookie";
import { GetFromStorage } from "./get-from-storage";
import { env } from "../../env";

export async function AuthCheck(): Promise<boolean> {
  try {
    const storageToken = await GetFromStorage(env.COOKIE_TOKEN);
    const cookieToken = await GetCookie(env.COOKIE_TOKEN);
    const token = Object.values(storageToken).length || cookieToken;
    return !!token;
  } catch (error) {
    return false;
  }
}
