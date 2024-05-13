// src/loader.ts

import { StorageEngine, memoryStorage } from 'multer';
import { createDataSource } from '@/data-source';
import { setupLineBotConfig } from '@/utils/line';
import { setupMailConfig } from './utils/mail';

export default class Loader {
  private _swaggerStatus: boolean = false;
  private _swaggerJson: any;
  private _sessSecret!: string;
  private _dbHost: string = 'localhost';
  private _dbPort: number = 5432;
  private _dbName: string = '';
  private _dbUser: string = '';
  private _dbPass: string = '';
  private _lineCat: string = '';
  private _lineSec: string = '';
  private _mailUser: string = '';
  private _mailPass: string = '';
  private _docMemStorage: StorageEngine = memoryStorage();
  private _listenPort: number = 3000;

  async init(): Promise<any> {
    const { env, stdout } = process;
    const {
      SWAGGER,
      SESS_SECRET,
      DB_HOST,
      DB_PORT,
      DB_NAME,
      DB_USER,
      DB_PASS,
      LINE_CAT,
      LINE_SECRET,
      MAIL_USER,
      MAIL_PASS,
    } = env;

    this._swaggerStatus = ![undefined, 'false'].includes(SWAGGER?.toLowerCase());
    if (this._swaggerStatus === true) {
      stdout.write('│ ➤ Loading swagger config\n');
      const path = '@/swagger.json';
      this._swaggerJson = await import(path);
      this._swaggerJson.multerOpts = { storage: this._docMemStorage };
      stdout.write('│     ⤳ Complete.\n');
    }

    if (SESS_SECRET != '' && SESS_SECRET != undefined) {
      stdout.write('│ ➤ Loading session salt\n');
      this._sessSecret = SESS_SECRET;
      stdout.write('│     ⤳ Complete.\n');
    } else {
      throw new Error('Session salt not found!');
    }

    if (DB_HOST != '' && DB_HOST != undefined) {
      stdout.write('│ ➤ Loading database config\n');
      this._dbHost = DB_HOST;
    } else {
      stdout.write('│     ⤳ Host not found, use localhost instead.\n');
      this._dbHost = 'localhost';
    }

    if (DB_PORT != '' && DB_PORT != undefined) {
      this._dbPort = parseInt(DB_PORT, 10);
    } else {
      stdout.write('│     ⤳ Port not found, use 5432 instead.\n');
      this._dbPort = 5432;
    }

    if (DB_NAME != '' && DB_NAME != undefined) {
      this._dbName = DB_NAME;
    } else {
      stdout.write('│     ⤳ dbName not found, use bigbyte_hr instead.\n');
      this._dbName = 'bigbyte_hr';
    }

    if (DB_USER != '' && DB_USER != undefined) {
      this._dbUser = DB_USER;
    } else {
      throw new Error('Database username not found!');
    }

    if (DB_PASS != '' && DB_PASS != undefined) {
      this._dbPass = DB_PASS;
      stdout.write('│     ⤳ Complete.\n');
    } else {
      throw new Error('Database password not found!');
    }

    createDataSource(this._dbHost, this._dbPort, this._dbName, this._dbUser, this._dbPass);

    if (LINE_CAT != '' && LINE_CAT != undefined) {
      stdout.write('│ ➤ Loading lineBot config\n');
      this._lineCat = LINE_CAT;
    } else {
      stdout.write('│ ➤ Loading lineBot config\n');
      throw new Error('LineBot ChannelAccessToken not found!');
    }

    if (LINE_SECRET != '' && LINE_SECRET != undefined) {
      this._lineSec = LINE_SECRET;
      stdout.write('│     ⤳ Complete.\n');
    } else {
      throw new Error('LineBot Secret not found!');
    }

    setupLineBotConfig(this._lineCat, this._lineSec);

    if (MAIL_USER != '' && MAIL_USER != undefined) {
      stdout.write('│ ➤ Loading email config\n');
      this._mailUser = MAIL_USER;
    } else {
      stdout.write('│ ➤ Loading email config\n');
      throw new Error('Email account not found!');
    }

    if (MAIL_PASS != '' && MAIL_PASS != undefined) {
      this._mailPass = MAIL_PASS;
      stdout.write('│     ⤳ Complete.\n');
    } else {
      throw new Error('Email password not found!');
    }

    setupMailConfig(this._mailUser, this._mailPass);
  }

  get swaggerEnable(): boolean {
    return this._swaggerStatus;
  }

  get swaggerJson(): any {
    return this._swaggerJson;
  }

  get sessSecret(): string {
    return this._sessSecret;
  }

  get listenPort(): number {
    return this._listenPort;
  }

  get dbInfo(): string {
    return `postgresql://${this._dbUser}@${this._dbHost}:${this._dbPort}/${this._dbName}`;
  }
}
