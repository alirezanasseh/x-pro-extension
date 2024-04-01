import { env } from "../../env";
import { GetToken } from "./get-token";

export async function GetTags() {
  const cookie = await GetToken();
  const url = `${env.BACKEND_URL}/tags`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error getting tags");
  }
  return await response.json();
}
