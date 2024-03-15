# 無限學院互動式動態網頁(進階版) - 人力資源管理系統

## 簡介

提供企業人資部門以數位化系統管理繁瑣行政事務，包含員工入職/離職流程手續、員工資料維護、工作歷程、差勤排班、薪酬管理等事務。並規劃系統未來可以更多客製化的功能需求、如數據分析做為績效考核標準、串接企業其他 ERP 系統等

## 初始化專案

```bash
bun install-all
```

## Usage

### 啟動前端

```bash
bun dev-front
```

> 存取 `http://localhost:9000` 查看前端

### 啟動後端

```bash
bun dev-back
```

> 存取 `http://localhost:3000/api/docs` 查看 Swagger UI

### 啟用 Prisma Studio

```bash
bun dev-prisma
```

> 存取 `http://localhost:5555` 查看 Prisma Studio

### 進入資料庫

> 密碼為 123456

```bash
docker compose exec -it db psql -U user -W staff
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2024-present, Charles Yang
