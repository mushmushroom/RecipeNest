declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET_TOKEN: string;
    JWT_REFRESH_TOKEN: string;
    EMAIL_PASS: string;
    EMAIL_USER: string;
    EMAIL_PORT: number;
    EMAIL_HOST: string;
  }
}
