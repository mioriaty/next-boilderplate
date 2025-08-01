export default {
  schema: './src/shared/database/schemas',
  out: './src/shared/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
};
