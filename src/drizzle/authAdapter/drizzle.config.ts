import type { Config } from "drizzle-kit";

export default {
  schema: "./schema.ts",
  out: "./migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: `mysql://v1yv8rwbg2k0161tv0ab:pscale_pw_BKqNfIS1RR94LcGKKpmH9UJgq5Z2XzRD8PJ7zaLNcYr@aws.connect.psdb.cloud/auth-11pmdash-dev?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config;
