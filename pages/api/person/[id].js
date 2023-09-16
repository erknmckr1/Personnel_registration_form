import pool from "@/lib/dbConntect";
export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (method === "GET") {
    try {
      const aPerson = await pool.query("SELECT * FROM persons WHERE person_id = $1", [id]);
      res.status(200).json(aPerson.rows);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else if (method === "PUT") {
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
    } = body;

    try {
      const updatePerson = await pool.query(
        `UPDATE public.persons
        SET person_id = $1, person_name = $2, person_surname = $3, person_email = $4, person_phone = $5, person_profession = $6, person_city = $7, person_address = $8,
        person_gender = $9, person_startdate = $10
        WHERE person_id = $11 `,
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
          id,
        ]
      );

      res.status(200).json(updatePerson);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else if (method === "DELETE") {
    try {
      const deletePerson = await pool.query("DELETE FROM public.persons WHERE person_id = $1", [id]);
      res.status(200).json(deletePerson);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  } else {
    res.status(405).end(); // Diğer HTTP yöntemlerini desteklemiyorsa 405 Method Not Allowed döndürün.
  }
}
