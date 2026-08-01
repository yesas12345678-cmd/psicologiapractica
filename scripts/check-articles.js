const { Pool } = require('pg');

const connectionString = "postgresql://postgres:a1sznyajzq3swl3t@187.127.233.89:5432/postgres";
const pool = new Pool({ connectionString, ssl: false });

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT slug, title, date, "dateLabel", published FROM "Article" ORDER BY date DESC, slug DESC');
    const total = res.rows.length;
    const published = res.rows.filter(r => r.published).length;
    const drafts = total - published;
    console.log(`Total articles in DB: ${total}`);
    console.log(`Published articles: ${published}`);
    console.log(`Draft articles: ${drafts}`);
    console.log("\nLatest 10 articles:");
    res.rows.slice(0, 10).forEach((r, idx) => {
      console.log(`${idx + 1}. [${r.published ? 'PUBLISHED' : 'DRAFT'}] Date: ${r.date} (${r.dateLabel}) | Title: "${r.title}" | Slug: ${r.slug}`);
    });
  } catch (err) {
    console.error("Error querying Articles:", err);
  } finally {
    client.release();
  }
  await pool.end();
}

main();
