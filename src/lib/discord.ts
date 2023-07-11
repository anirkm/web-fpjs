import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core/http-only";

const discordRest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN!
);
const discordApi = new API(discordRest);

export default discordApi;
