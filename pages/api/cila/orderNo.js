import pool from "@/lib/dbConntect";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    try {
      const { order_no } = req.body;
      console.log(order_no);
      const order = await pool.query(
        "SELECT * FROM order_table WHERE order_no = $1",
        [order_no]
      );
      if (order && order.rows.length > 0) {
        return res.status(200).json({ ...order.rows[0] });
      } else {
        return res.status(404).json({ message: "Order Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Bir hata oluştu" });
    }
  }
};

export default handler;
