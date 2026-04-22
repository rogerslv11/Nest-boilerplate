export interface EnvironmentConfig {
  node: string;
  env: string;
  port: number;
  apiPrefix: string;
  cors: {
    origin: string | string[];
    methods: string;
    credentials: boolean;
  };
  database: {
    type: 'sqlite' | 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  redis: {
    host: string;
    port: number;
    password: string;
  };
  queue: {
    name: string;
  };
}

export const validate = (
  config: Record<string, unknown>,
): EnvironmentConfig => ({
  node: (config['NODE_ENV'] as string) || 'development',
  env: ((config['NODE_ENV'] as string) || 'development').toUpperCase(),
  port: Number(config['PORT']) || 3000,
  apiPrefix: (config['API_PREFIX'] as string) || 'api',
  cors: {
    origin: (config['CORS_ORIGIN'] as string) || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  },
  database: {
    type: (config['DB_TYPE'] as 'sqlite' | 'postgres') || 'sqlite',
    host: (config['DB_HOST'] as string) || 'localhost',
    port: Number(config['DB_PORT']) || 5432,
    username: (config['DB_USERNAME'] as string) || 'postgres',
    password: (config['DB_PASSWORD'] as string) || 'postgres',
    database: (config['DB_DATABASE'] as string) || 'nestjs_boilerplate',
    synchronize: config['NODE_ENV'] !== 'production',
    logging: config['NODE_ENV'] !== 'production',
  },
  jwt: {
    secret: (config['JWT_SECRET'] as string) || 'default-secret-change-me',
    expiresIn: (config['JWT_EXPIRES_IN'] as string) || '15m',
    refreshSecret:
      (config['JWT_REFRESH_SECRET'] as string) ||
      'default-refresh-secret-change-me',
    refreshExpiresIn: (config['JWT_REFRESH_EXPIRES_IN'] as string) || '7d',
  },
  redis: {
    host: (config['REDIS_HOST'] as string) || 'localhost',
    port: Number(config['REDIS_PORT']) || 6379,
    password: (config['REDIS_PASSWORD'] as string) || '',
  },
  queue: {
    name: (config['QUEUE_NAME'] as string) || 'email-queue',
  },
});
