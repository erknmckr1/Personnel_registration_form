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
          "SELECT * FROM public.user_table WHERE id_dec = $1",
          [id]
        );

        if (checkPerson.rows === 0) {
          return res.status(404).json({ message: "Person not found" });
        }

        // deleted person
        const deletePerson = await pool.query(
          "UPDATE  public.user_table SET is_active = false WHERE id_dec = $1",
          [id]
        );
        res.status(200).json({ message: "Personel successfully deleted" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (method === "PUT") {
      console.log(req.body)
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

        const updatedPerson = await pool.query(
          `UPDATE public.user_table
          SET 
          id_dec = $1,
          id_hex = $2,
          op_name = $3,
          op_username = $4,
          op_password = $5,
          op_section = $6,
          part = $7,
          title = $8,
          e_mail = $9,
          gender = $10,
          short_name = $11,
          address = $12,
          route = $13,
          stop_name = $14,
          is_active = $15,
          is_admin = $16,
          shift_validator = $17,
          auth2 = $18,
          auth1 = $19,
          izin_bakiye= $20
          WHERE id_dec = $21`,
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
            izin_bakiye,
            id_dec
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
