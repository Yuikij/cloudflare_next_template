import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  const connectionString = env.HYPERDRIVE.connectionString;
  
  // 创建 postgres 客户端
  const client = postgres(connectionString, { 
    max: 1,
    prepare: false,
  });
  
  return drizzle(client);
}

// 直接使用原生 postgres 客户端查询表名
export async function getTablesWithRawSQL() {
  const { env } = await getCloudflareContext({ async: true });
  const connectionString = env.HYPERDRIVE.connectionString;
  
  const client = postgres(connectionString, { 
    max: 1,
    prepare: false,
  });
  
  try {
    // 查询所有表名
    const result = await client`
      SELECT table_name 
      FROM information_schema.tables 
      ORDER BY table_name;
    `;
    
    await client.end();
    return result.map(row => row.table_name);
  } catch (error) {
    await client.end();
    throw error;
  }
} 