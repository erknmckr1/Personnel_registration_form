import pool from "../../lib/dbConntect";

const handler = async (req, res) => {
  const { method } = req;
  const person = req.body;

  if (method === "GET") {
    try {
      const query = "SELECT * FROM persons";
      const result = await pool.query(query);
      res.status(200).json(result.rows) // genellıkle GET taleplerınde 200 OK durum kodu kullanılır.  
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Sunucu hatası"});
    }
  }

  // if (method === "POST") {
  //   try {
  //     const query =
  //       "INSERT INTO persons (name,surname,phoneNumber,email,gender,address,city,day,mounth,year,isActive,isLeftWork,profession) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

  //     await pool.query(query, [
  //       person.name,
  //       person.surname,
  //       person.phoneNumber,
  //       person.email,
  //       person.gender,
  //       person.address,
  //       person.city,
  //       person.day,
  //       person.mounth,
  //       person.year,
  //       person.isActive,
  //       person.isLeftWork,
  //       person.profession,
  //     ]);

  //     res.status(201).json({ message: "Personel başarıyla eklendi" });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Personel eklenirken hata oluştu" });
  //   }
  // }
};

export default handler;