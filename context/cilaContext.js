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
  //cila_work_table'daki son işlem
  const [lastProcess,setLastProcess] = useState(null)
  // date
  const date= new Date();
  const dateString = date.toLocaleString()
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/cila");
        setCancelReason(res.data.cancel_reason);
        setOrderTable(res.data.order_table);
        setPersons(res.data.persons);
        setProcessTable(res.data.process_table);
        setCilaWorkTable(res.data.cila_work_table);
        setStopReason(res.data.stop_reason)
        // Burası problem order no secmemiz gerekseydi direkt cila_work_table dizisindeki son elemanı alamazdık
        // Cila ekranına özgü sadece son eleman ıle işimiz oldugu ıcın son elemanı dırekt secılı hale getırıyoruz.
        
        setLastProcess(res.data.cila_work_table[res.data.cila_work_table.length -1])
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

  // griddeki son işlemi selectedOrder state'ınde tutacagız. Eğer işlem bıtmedısye...
  
  useEffect(() => {
    const selectLastProcess = async () => {
      const filteredOrder = orderTable && orderTable.filter((item, index) => item.order_no === lastProcess.order_no);
      const selectOrder = orderTable && lastProcess ? { ...filteredOrder[0], ...lastProcess } : null;
  
      if (selectOrder && selectOrder.work_end_date === "") {
        setSelectedOrder(selectOrder);
      }
    };
  
    selectLastProcess();
  }, [orderTable, lastProcess]);
  
  
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
        dateString,
        cancelReason
      }}
    >
      {children}
    </CılaContext.Provider>
  );
};
