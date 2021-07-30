import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { AppConf } from '../../../../config/app.config';

let client: MongoClient;

const getMongoClient = async (): Promise<MongoClient> => {
  const { mongo } = AppConf;
  const clientOptions: MongoClientOptions = {};
  const cxnString = `mongodb+srv://${mongo.username}:${mongo.password}@${mongo.host}`;

  if (mongo.maxPoolSize) {
    clientOptions.maxPoolSize = mongo.maxPoolSize;
  }

  if (mongo.minPoolSize) {
    clientOptions.minPoolSize = mongo.minPoolSize;
  }

  if (mongo.maxIdleTimeMS) {
    clientOptions.maxIdleTimeMS = mongo.maxIdleTimeMS;
  }

  client = new MongoClient(cxnString, clientOptions);
  return await client.connect();
};

export const getClientDb = async (dbName: string): Promise<Db> => {
  if (!client) {
    client = await getMongoClient();
  }

  return client.db(dbName);
};
