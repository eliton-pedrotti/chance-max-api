import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'dbmaster',
        database: 'chanceMaxdb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],

        //FICAR ESPERTO AQUI
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
