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
  }
};

export default handler;
