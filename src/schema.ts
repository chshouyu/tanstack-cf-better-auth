import { sql } from 'drizzle-orm'
import { customType, index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

// 1. 自定义 ISO 时间戳列（DB 存 TEXT，TS 类型是 Date）
const isoTimestamp = customType<{ data: Date; driverData: string }>({
  dataType: () => 'text',
  // 插入/更新时：Date → ISO 字符串
  toDriver: (date: Date) => date.toISOString(),
  // 查询时：ISO 字符串 → Date
  fromDriver: (value: string) => new Date(value),
})

// 2. 数据库端生成当前时间的 SQL（推荐用于 default，避免 JS 时钟漂移）
const currentIsoTimestamp = sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`

export const usersSchema = sqliteTable(
  'User',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull(),
    image: text('image'),
    createdAt: isoTimestamp('createdAt').notNull().default(currentIsoTimestamp),
    updatedAt: isoTimestamp('updatedAt')
      .notNull()
      .default(currentIsoTimestamp)
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex('User_email_key').on(table.email)],
)

export const sessionsSchema = sqliteTable(
  'Session',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => usersSchema.id, { onDelete: 'cascade' }),
    token: text('token').notNull().unique(),
    expiresAt: isoTimestamp('expiresAt').notNull(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: isoTimestamp('createdAt').notNull().default(currentIsoTimestamp),
    updatedAt: isoTimestamp('updatedAt')
      .notNull()
      .default(currentIsoTimestamp)
      .$onUpdate(() => new Date()),
  },
  (table) => [index('Session_userId_idx').on(table.userId)],
)

export const accountSchema = sqliteTable(
  'Account',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => usersSchema.id, { onDelete: 'cascade' }),
    accountId: text('accountId').notNull(),
    providerId: text('providerId').notNull(),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    accessTokenExpiresAt: isoTimestamp('accessTokenExpiresAt'),
    refreshTokenExpiresAt: isoTimestamp('refreshTokenExpiresAt'),
    scope: text('scope'),
    idToken: text('idToken'),
    password: text('password'),
    createdAt: isoTimestamp('createdAt').notNull().default(currentIsoTimestamp),
    updatedAt: isoTimestamp('updatedAt')
      .notNull()
      .default(currentIsoTimestamp)
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('Account_userId_idx').on(table.userId),
    uniqueIndex('Account_providerId_accountId_key').on(table.providerId, table.accountId),
  ],
)

export const verificationSchema = sqliteTable('Verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: isoTimestamp('expiresAt').notNull(),
  createdAt: isoTimestamp('createdAt').notNull().default(currentIsoTimestamp),
  updatedAt: isoTimestamp('updatedAt')
    .notNull()
    .default(currentIsoTimestamp)
    .$onUpdate(() => new Date()),
})
