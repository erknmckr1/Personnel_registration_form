import pool from "@/lib/dbConntect";

//Girilen id ye gore kullanıcı var mı ona baktık var ise kullanıcı bılgılerını gönderdik...
const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    
    try {
      const { id_dec } = req.body;
      const findUser = await pool.query(
        "SELECT * FROM user_table WHERE id_dec=$1 OR id_hex=$2",
        [id_dec,id_dec]
      );
      if(findUser && findUser.rows.length>0){
        return res.status(200).json({ ...findUser.rows[0] });
      }else{
        return res.status(404).json({message:"User Not Found"})
      }
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  }
};

export default handler;
