import { Container, decorate, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { Controller } from 'tsoa';

// 創建 PrismaClient 的單例
const prismaClient = new PrismaClient();

// 創建 InversifyJS 容器
const iocContainer = new Container();

// 註冊 PrismaClient 到容器中
iocContainer.bind<PrismaClient>('PrismaClient').toConstantValue(prismaClient);
decorate(injectable, Controller);

export { iocContainer };
