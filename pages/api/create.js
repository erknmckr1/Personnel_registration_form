import conn from "@/lib/dbConntect";

const handler = async (req,res) => {
    const {method} = req;
    const person = req.body;
    
    if(method === "POST"){
        try {
            const client = await conn.connect(); // Veritabanı bağlantısını alın
            const query = 'INSERT INTO persons (id,name,surname,phoneNumber,email,gender,address,city,day,mounth,year,isActive,isLeftWork,profession) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
            
            await client.query(query, [person.id,person.name,person.surname,person.phoneNumber,person.gender,person.address,person.city,person.day,person.mounth,person.year,person.isActive,person.isLeftWork,person.profession]);
            
            client.release(); // Veritabanı bağlantısını serbest bırakın
        
            console.log('Personel başarıyla eklendi');
            res.status(201).json({ message: 'Personel başarıyla eklendi' });
          } catch (error) {
            console.error('Personel eklenirken hata oluştu:', error);
            res.status(500).json({ error: 'Personel eklenirken hata oluştu' });
          }
    }
}

export default handler;