import { GetCookie } from "./get-cookie";
import { GetFromStorage } from "./get-from-storage";
import { env } from "../../env";

export async function AuthCheck(): Promise<boolean> {
  try {
    const storageToken = await GetFromStorage(env.TOKEN);
    const cookieToken = await GetCookie(env.TOKEN);
    const token = Object.values(storageToken).length || cookieToken;
    return !!token;
  } catch (error) {
    return false;
  }
}
