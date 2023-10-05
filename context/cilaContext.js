import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const CılaContext = createContext();

export const CılaProvider = ({ children }) => {
  // 
  const [orderTable, setOrderTable] = useState([]);
  const [cancelReason, setCancelReason] = useState([]);
  // mevcut proses listesini tutacagımız state
  const [processTable, setProcessTable] = useState([]);
  const [stopReason, setStopReason] = useState([]);
  // All persons
  const [persons, setPersons] = useState([]);
  // Bir order ıcın yaptıgımız ıslerı logladıgımız state sipariş durdur/baslat/bitir vs.
  const [cilaWorkTable, setCilaWorkTable] = useState([]);
  // startworkpopup da girilen orderNo'ya göre orderTable içinde bulup orderInfo ya atayacagız. Daha sonra bu verıyı cila/index safasında kullanacagız.
  const [orderInfo, setOrderInfo] = useState(null);
  // İşlem yapılan order'ın yada durdurulmus order'ın uzerınde tıkladıgımızda tıkladıgımız orderın bılgılerını tutacak stae
  const [selectedOrder,setSelectedOrder] = useState(null)
  // Giriş yapan kullanıcını bılgılerını tuttugumuz state
  const [loggedInUser, setLoggedInUser] = useState([]);

  
  // date
  const date= new Date();
  const dateString = date.toLocaleString()
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/cila");
        setOrderTable(res.data.order_table);
        setPersons(res.data.persons);
        setProcessTable(res.data.process_table);
        setCilaWorkTable(res.data.cila_work_table);
        setStopReason(res.data.stop_reason)
        if (res.status === 200) {
          console.log("Data was successfully extracted");
        } else {
          console.log("Data extraction failed");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <CılaContext.Provider
      value={{
        orderTable,
        setOrderTable,
        persons,
        processTable,
        cilaWorkTable,
        orderInfo,
        setOrderInfo,
        dateString,
        loggedInUser,
        setLoggedInUser,
        selectedOrder,
        setSelectedOrder,
        stopReason,
        dateString
      }}
    >
      {children}
    </CılaContext.Provider>
  );
};
