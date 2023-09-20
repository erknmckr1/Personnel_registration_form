import pool from "@/lib/dbConntect";

const handler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;


  if (method === "DELETE") {
    try {
      // Is there a selected person in the database ?
      const checkPerson = await pool.query(
        "SELECT * FROM public.users WHERE first_id = $1",
        [id]
      );

      if (checkPerson.rows === 0) {
        return res.status(404).json({ message: "Person not found" });
      }

      // deleted person
      const deletePerson = await pool.query(
        "DELETE FROM public.users WHERE first_id = $1",
        [id]
      );
      res.status(200).json({ message: "Personel successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (method === "PUT") {
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

      const updatedPerson = await pool.query(
        `UPDATE public.users 
         SET 
           first_id = $1, 
           second_id = $2, 
           first_name = $3, 
           last_name = $4, 
           address_short = $5, 
           address_long = $6, 
           person_city = $7, 
           person_state = $8, 
           person_country = $9, 
           person_phonenumber = $10, 
           person_email = $11, 
           person_gender = $12, 
           person_date = $13, 
           is_active = $14, 
           is_admin = $15, 
           is_supervisor = $16, 
           is_validator = $17, 
           is_master = $18, 
           is_left_work = $19, 
           person_section = $20, 
           person_department = $21, 
           person_profession = $22
         WHERE first_id = $23`, // Kişiyi tanımlayan benzersiz bir kimlik alanı burada bulunmalıdır.
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
          person_id,
        ]
      );

      res.status(200).json({ message: "Person updated successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

export default handler;
