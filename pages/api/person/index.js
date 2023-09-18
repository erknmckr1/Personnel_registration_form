// pages/api/person.js
import pool from "@/lib/dbConntect";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const {
        person_id,
        second_id,
        first_name,
        last_name,
        address_short,
        address_long,
        person_city,
        person_state,
        person_country,
        person_phonenumber,
        person_email,
        person_gender,
        person_date,
        is_active,
        is_admin,
        is_supervisor,
        is_validator,
        is_master,
        is_left_work,
        person_section,
        person_department,
        person_profession,
      } = req.body;

      const newPerson = await pool.query(
        `INSERT INTO public.users(
          first_id, second_id, first_name, last_name, address_short, address_long, person_city, person_state, person_country, person_phonenumber, person_email, person_gender, person_date, is_active, is_admin, is_supervisor, is_validator, is_master, is_left_work, person_section, person_department, person_profession)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`,
        [
          person_id,
          second_id,
          first_name,
          last_name,
          address_short,
          address_long,
          person_city,
          person_state,
          person_country,
          person_phonenumber,
          person_email,
          person_gender,
          person_date,
          is_active,
          is_admin,
          is_supervisor,
          is_validator,
          is_master,
          is_left_work,
          person_section,
          person_department,
          person_profession,
        ]
      );

      res.status(200).json({ message: "Kişi başarıyla eklendi" });
    } catch (error) {
      console.error("Hata:", error);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else if (method === "GET") {
    try {
      const allPerson = await pool.query("select * from users");
      res.status(200).json(allPerson.rows);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else {
    res.status(405).end(); // Diğer HTTP yöntemlerini desteklemiyorsa 405 Method Not Allowed döndürün.
  }
}
