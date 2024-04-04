import { env } from "../../env";
import { GetToken } from "./get-token";
import { GetUsername } from "./get-username";

export async function GetTags() {
  const token = await GetToken();
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
