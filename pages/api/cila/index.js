import pool from "@/lib/dbConntect";

// cila için ilgili bütün tablolar cila contextte cekıyoruz...
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const order_table = await pool.query("SELECT * FROM public.order_table;");
      const cancel_reason = await pool.query(
        "SELECT * FROM public.cancel_reason_table;"
      );
      const process_table = await pool.query(
        "SELECT * FROM public.process_table;"
      );
      const stop_reason = await pool.query(
        "SELECT * FROM public.stop_reason_table;"
      );
      const cila_work_table = await pool.query(
        "SELECT * FROM public.cila_work_table;"
      );
      const persons = await pool.query("SELECT * FROM user_table");
      res.status(200).json({
        order_table: order_table.rows,
        cancel_reason: cancel_reason.rows,
        process_table: process_table.rows,
        stop_reason: stop_reason.rows,
        persons: persons.rows,
        cila_work_table: cila_work_table.rows,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Sunucu hatası" });
    } // cila_work_table post ıstegı startWorkPopUp componentınden geliyor... user_id order_no work_type process_id bu componentten gelıyor..
  } else if (req.method === "POST") {
    try {
      const {
        user_id_dec,
        order_no,
        work_type,
        work_start_date,
        work_end_date,
        process_id,
        stop_user_id_dec,
        stop_reason_id,
        stop_start_date,
        stop_end_date,
        cancel_user_id_dec,
        cancel_reason_id,
        cancel_date,
        produced_amount,
      } = req.body;

      const cila_work_table = await pool.query(
        "INSERT INTO public.cila_work_table(user_id_dec, order_no, work_type, work_start_date, work_end_date, process_id, stop_user_id_dec, stop_reason_id, stop_start_date, stop_end_date, cancel_user_id_dec, cancel_reason_id, cancel_date, produced_amount)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);",
        [
          user_id_dec,
          order_no,
          work_type,
          work_start_date,
          work_end_date,
          process_id,
          stop_user_id_dec,
          stop_reason_id,
          stop_start_date,
          stop_end_date,
          cancel_user_id_dec,
          cancel_reason_id,
          cancel_date,
          produced_amount,
        ]
      );
      res.status(200).json({ message: "Veri gonderme işlemi başarılı." });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Veri gönderme işlemi başarısız tekrar deneyin." });
    }
  } else {
    res.status(405).json({ error: "Geçersiz yöntem" });
  }
};

export default handler;
