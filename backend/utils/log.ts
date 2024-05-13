// src/utils/log.ts

import { format } from 'winston';

const consoleFormat = format.combine(
  format.colorize(),
  format.printf((info) => {
    const { req, res, responseTime } = info.meta;
    const { httpVersion, method, url, headers } = req;
    const { statusCode } = res;
    const { 'x-forwarded-for': realIp } = headers;
    return (
      `${info.level}: ${info.timestamp} [${realIp}] HTTP/${httpVersion} ${statusCode} ` +
      `${method} (${responseTime}ms) - ${url}`
    );
  }),
);

export { consoleFormat };
