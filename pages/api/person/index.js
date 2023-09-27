// pages/api/person.js
import pool from "@/lib/dbConntect";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const {
          id_dec,
          id_hex,
          op_name,
          op_username,
          op_password,
          op_section,
          part,
          title,
          e_mail,
          gender,
          short_name,
          address,
          route,
          stop_name,
          is_active,
          is_admin,
          shift_validator,
          auth2,
          auth1,
          izin_bakiye
      } = req.body;

      const newPerson = await pool.query(
        `INSERT INTO public.user_table(
          id_dec,
          id_hex,
          op_name,
          op_username,
          op_password,
          op_section,
          part,
          title,
          e_mail,
          gender,
          short_name,
          address,
          route,
          stop_name,
          is_active,
          is_admin,
          shift_validator,
          auth2,
          auth1,
          izin_bakiye)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);`,
        [
          id_dec,
          id_hex,
          op_name,
          op_username,
          op_password,
          op_section,
          part,
          title,
          e_mail,
          gender,
          short_name,
          address,
          route,
          stop_name,
          is_active,
          is_admin,
          shift_validator,
          auth2,
          auth1,
          izin_bakiye
        ]
      );

      res.status(200).json({ message: "Kişi başarıyla eklendi" });
    } catch (error) {
      console.error("Hata:", error);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else if (method === "GET") {
    try {
      const allPerson = await pool.query(
        "select * from public.user_table"
      );
      res.status(200).json(allPerson.rows);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else {
    res.status(405).end(); // Diğer HTTP yöntemlerini desteklemiyorsa 405 Method Not Allowed döndürün.
  }
}
