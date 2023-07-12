import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = false; // Opt-in to experimental connection caching
const sql = neon(process.env.DATABASE_URL!);

// const db = drizzle(sql);

// export default db;

