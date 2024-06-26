import { env } from "../../env";
import { GetUsername } from "./get-username";
import { GetFromStorage } from "./get-from-storage";

export async function GetTags() {
  const token = await GetFromStorage(env.TOKEN);
  if (!token) return null;
  const username = GetUsername();
  const url = `${env.BACKEND_URL}/tags?onUsername=${username}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) return null;
  return await response.json();
}
