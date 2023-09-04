import { createPool } from "slonik";

const pool = await createPool(process.env.NEXT_PUBLIC_DATABASE_URL);

const testConnectinon = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Bağlantı başarılı!', result.rows[0].now);
  } catch (error) {
      console.error('Bağlantı hatası:', error.message || error);
  } finally {
    await pool.end();
  }
}

testConnectinon();

console.log('DATABASE_URL:', process.env.NEXT_PUBLIC_DATABASE_URL);

export default pool;
