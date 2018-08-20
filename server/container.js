import getModels from './db/models';
import formObjectBuilder from './lib/formObjectBuilder';
import logger from './lib/logger';
import encrypt from './lib/secure';
import { sign, decode } from './lib/jwt';

export default async () => {
  const models = await getModels();
  return {
    ...models,
    ...formObjectBuilder,
    logger,
    encrypt,
    jwt: { sign, decode },
  };
};
