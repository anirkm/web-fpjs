import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const connection = connect({
  url: `mysql://v1yv8rwbg2k0161tv0ab:pscale_pw_BKqNfIS1RR94LcGKKpmH9UJgq5Z2XzRD8PJ7zaLNcYr@aws.connect.psdb.cloud/auth-11pmdash-dev?ssl={"rejectUnauthorized":true}`,
});

export const dbAuth = drizzle(connection);
