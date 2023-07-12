import { REST } from "@discordjs/rest";
//@ts-ignore
import { API } from "@discordjs/core/http-only";
import { DiscordApi } from "@/types/global";

const discordRest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN!
);
const discordApi: DiscordApi = new API(discordRest);

export default discordApi;
