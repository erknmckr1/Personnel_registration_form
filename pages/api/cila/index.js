import pool from "@/lib/dbConntect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const order_table = await pool.query("SELECT * FROM public.order_table;");
      const cancel_reason = await pool.query("SELECT * FROM public.cancel_reason_table;");
      const process_table = await pool.query("SELECT * FROM public.process_table;");
      const stop_reason = await pool.query("SELECT * FROM public.stop_reason_table;");
      const persons = await pool.query("SELECT * FROM user_table")
      res.status(200).json({
        order_table: order_table.rows,
        cancel_reason: cancel_reason.rows,
        process_table: process_table.rows,
        stop_reason: stop_reason.rows,
        persons:persons.rows
      });
    } catch (err) {
      console.error(err); 
      res.status(500).json({ error: "Sunucu hatası" }); // İstemciye uygun bir hata yanıtı gönder
    }
  } else {
    res.status(405).json({ error: "Geçersiz yöntem" }); // İstemciye uygun bir hata yanıtı gönder
  }
};

export default handler;
