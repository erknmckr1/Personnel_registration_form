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
        order_status,
        finisher_user_id,
      } = req.body;

      const cila_work_table = await pool.query(
        "INSERT INTO public.cila_work_table(user_id_dec, order_no, work_type, work_start_date, work_end_date, process_id, stop_user_id_dec, stop_reason_id, stop_start_date, stop_end_date, cancel_user_id_dec, cancel_reason_id, cancel_date, produced_amount,order_status,finisher_user_id)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15,$16);",
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
          order_status,
          finisher_user_id,
        ]
      );
      res.status(200).json({ message: "Veri gonderme işlemi başarılı." });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Veri gönderme işlemi başarısız tekrar deneyin." });
    }
  } else if (req.method === "PUT") {
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
        order_status,
        finisher_user_id,
      } = req.body;

      const cila_work_table = await pool.query(
        `UPDATE public.cila_work_table
        SET 
        user_id_dec=$1, 
        order_no=$2, 
        work_type=$3, 
        work_start_date=$4, 
        work_end_date=$5, 
        process_id=$6, 
        stop_user_id_dec=$7, 
        stop_reason_id=$8, 
        stop_start_date=$9, 
        stop_end_date=$10, 
        cancel_user_id_dec=$11, 
        cancel_reason_id=$12, 
        cancel_date=$13, 
        produced_amount=$14, 
        order_status=$15, 
        finisher_user_id=$16
        WHERE order_no=$17 AND work_end_date = '' AND cancel_date = ''`,
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
          order_status,
          finisher_user_id,
          order_no,
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
