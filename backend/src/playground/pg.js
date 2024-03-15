import fs from 'fs';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { format } from 'node-pg-format';

const { Pool } = pg;

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'staff',
  user: 'user',
  password: '123456',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const client = await pool.connect();

// - 取得資料
async function getRecord() {
  const res = await client.query('SELECT * FROM demo;');
  res.rows.forEach((rowData) => {
    console.log(rowData);
  });
}

// > 進行資料庫操作
// - 將 demo 資料表內的所有資料刪除
await client.query('DROP TABLE IF EXISTS demo;');

// - 執行 SQL 檔案
const execSQL = async (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const path = join(__dirname, fileName);

  try {
    const data = await fs.promises.readFile(path, 'utf8');
    await client.query(data);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};
await execSQL('create_table.sql');

// - 插入資料
await client.query('INSERT INTO demo(name, age) VALUES($1, $2)', ['測試員1', 20]);

// - 插入多筆資料
let data = [
  ['測試員2', 25],
  ['測試員3', 30],
];
await client.query(format('INSERT INTO demo(name, age) VALUES %L', data));
await getRecord();

// - 單獨關閉連線
// > 當要關閉單一連線時使用
client.release();

// - 完全關閉連線池
// > 當要完全關閉連線池時使用
await pool.end();
