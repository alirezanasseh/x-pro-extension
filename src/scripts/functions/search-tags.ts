import { env } from "../../env";
import { GetFromStorage } from "./get-from-storage";

export async function SearchTags(name: string) {
  if (!name || name.length < 3) return null;
  const token = await GetFromStorage(env.TOKEN);
  if (!token) return null;
  const url = `${env.BACKEND_URL}/tags/search?name=${name}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) return null;
  return (await response.json()) as { name: string }[];
}
