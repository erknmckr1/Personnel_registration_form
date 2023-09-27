import pool from "@/lib/dbConntect";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const sections = await pool.query(
        "SELECT DISTINCT op_section FROM public.user_table"
      );

      const parts = await pool.query(
        "SELECT DISTINCT part FROM public.user_table"
      );

      const titles = await pool.query(
        "SELECT DISTINCT title FROM public.user_table"
      );

     res.status(200).json({ sections: sections.rows, parts: parts.rows, titles: titles.rows });
    } catch (error) {
      console.error("Hata:", error);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  }
};

export default handler ; 