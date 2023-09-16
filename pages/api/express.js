const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("../../lib/dbConntect");

//app.use(express.urlencoded({ extended: false }));

//middleware
app.use(cors());
app.use(express.json()); // JSON istek gövdelerini çözmek için middleware

// post query
app.post("/", async (req, res) => {
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
});

// get query
app.get("/", async (req, res) => {
  try {
    const allPerson = await pool.query("select * from persons");
    res.status(200).json(allPerson.rows);
  } catch (err) {
    console.error("Hata:", err);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
});

// get a person
app.get("/:id", async (req, res) => {
  const { person_id } = req.body;
  const aPerson = await pool.query(
    "select * from persons where person_id = $1",
    [person_id]
  );
  res.status(200).json(aPerson.rows);
});

// update a person
app.put("/:id", async (req, res) => {
  const { id } = req.params;
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

  try {
    const updatePerson = await pool.query(
      `UPDATE public.persons
        SET person_id = $1 , person_name = $2 , person_surname = $3 , person_email = $4 , person_phone = $5 , person_profession = $6 , person_city= $7, person_address = $8,
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
});

// delete a person
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePerson = await pool.query(
      `DELETE FROM public.persons
	WHERE person_id = $1;`,
      [id]
    );
    res.status(200).json(deletePerson);
  } catch (err) {
    console.log("hata", err);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
