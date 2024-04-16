import { env } from "../../env";
import { GetUsername } from "./get-username";
import { GetFromStorage } from "./get-from-storage";

export async function GetTags() {
  const token = await GetFromStorage(env.COOKIE_TOKEN);
  console.log("token", token);
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
  if (!response.ok) {
    throw new Error("Error getting tags");
  }
  return await response.json();
}
