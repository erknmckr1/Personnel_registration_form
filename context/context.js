import React, { createContext, useContext, useState } from "react";

//random id generator
function generateRandomNumber() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

const decToHex = generateRandomNumber();

function decimalTo(decimalNumber) {
  if (typeof decimalNumber !== "number") {
    return null; // Sayı değilse null dönebilirsiniz veya uygun bir hata işleme yapabilirsiniz.
  }

  // Decimal sayıyı hex formata dönüştürmek için JavaScript'in toString metodu kullanılabilir.
  const hexString = decimalNumber.toString(16).toUpperCase();

  return `0x${hexString}`; // 0x ön ekini ekleyerek hex değeri oluşturuyoruz.
}


const initialUser = {
  firstId: generateRandomNumber(),
  secondId: decimalTo(decToHex),
  firstName: "",
  lastName: "",
  addresShort: "",
  addressLong: "",
  city: "",
  state: "",
  country: "",
  phonenumber: "",
  email: "",
  gender: "",
  date: "",
  isActive: false,
  isAdmin: false,
  isSupervizor: false,
  isValidator: false,
  isMaster: false,
  isleftwork: false,
  section: "",
  department: "",
  profession: "",
};


// context'ı olusturduk
const UserContext = createContext();

// Context Provider'ı olusturduk.
export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  // Kullanıcı verılerını guncellemek ıcın bır fonksıyon olusturduk.
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const resetUser = () => {
    setUser(initialUser)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
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
