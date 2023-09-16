// pages/api/person.js
import pool from "@/lib/dbConntect";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const {
        person_id,
        person_name,
        person_surname,
        person_email,
        person_phone,
        person_profession,
        person_city,
        person_address,
        person_gender,
        person_startdate,
      } = req.body;
      const newPerson = await pool.query(
        `INSERT INTO public.persons(
          person_id, person_name, person_surname, person_email, person_phone, person_profession, person_city, person_address, person_gender, person_startdate)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
        [
          person_id,
          person_name,
          person_surname,
          person_email,
          person_phone,
          person_profession,
          person_city,
          person_address,
          person_gender,
          person_startdate,
        ]
      );

      // İşlem tamamlandığında yapılması gerekenler buraya eklenebilir

      res.status(200).json({ message: "Kişi başarıyla eklendi" });
    } catch (error) {
      console.error("Hata:", error);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else if (method === "GET") {
    try {
      const allPerson = await pool.query("select * from persons");
      res.status(200).json(allPerson.rows);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else {
    res.status(405).end(); // Diğer HTTP yöntemlerini desteklemiyorsa 405 Method Not Allowed döndürün.
  }
}
