// src/utils/ioc.ts

import { interfaces, inject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';

const ProvideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done();
};

export { ProvideSingleton, inject };
