import React, { createContext, useContext, useState } from "react";

//random id generator
// function generateRandomNumber() {
//   const min = 100000;
//   const max = 999999;
//   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//   return randomNumber;
// }

// const decToHex = generateRandomNumber();

// const decimalTo = (decimalNumber) => {
//   if (typeof decimalNumber !== "number") {
//     return null; // Sayı değilse null dönebilirsiniz veya uygun bir hata işleme yapabilirsiniz.
//   }

//   // Decimal sayıyı hex formata dönüştürmek için JavaScript'in toString metodu kullanılabilir.
//   const hexString = decimalNumber.toString(16).toUpperCase();

//   return `0x${hexString}`; // 0x ön ekini ekleyerek hex değeri oluşturuyoruz.
// };


const initialUser = {
  id_dec: "",
  id_hex: "",
  op_name: "",
  op_username: "",
  op_password: "",
  op_section: "",
  part: "",
  title: "",
  e_mail: "",
  gender: "",
  short_name: "",
  address: "",
  route: "",
  stop_name: "",
  is_active: false,
  is_admin: false,
  shift_validator: "",
  auth2: "",
  auth1: "",
  izin_bakiye: 0.0,
};

const authArray = [
  ,
  "Kubilay Akkiz",
  "Burak Onder Ocak",
  "Harun Yigit",
  "Sedat Karamanli",
  "Haluk Yakin",
  "Berkan Beyaz",
  "Kudret Yalcin Tekin",
  "Ugur Atmaca",
  "Ufuk Tuysuz",
  "Tomru Hacer Kayaogulları",
  "Ozcan Celikbas",
  "Sezin Merter Kuyumcu",
  "Murat Magzalcioglu",
  "Kerem Kaya",
  "Can Robert Geyimli",
  "Burcu Kirici Cigdem"
];

// context'ı olusturduk
const UserContext = createContext();

// Context Provider'ı olusturduk.
export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [persons,setPersons] = useState([]);
  // Kullanıcı verılerını guncellemek ıcın bır fonksıyon olusturduk.
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const resetUser = () => {
    setUser(initialUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser, initialUser,authArray,persons,setPersons }}>
      {children}
    </UserContext.Provider>
  );
}

// Ilgılı komponentlerde yapacagımız ıslemı burada bır modul halıne getırdık.
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser hook must be used within a UserProvider");
  }
  return context;
}
