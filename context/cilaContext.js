import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const CılaContext = createContext();

export const CılaProvider = ({ children }) => {
  const [orderTable, setOrderTable] = useState([]);
  const [cancelReason, setCancelReason] = useState([]);
  const [processTable, setProcessTable] = useState([]);
  const [stopReason, setStopReason] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/cila");
        setOrderTable(res.data);
        setPersons(res.data.persons);
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
    <CılaContext.Provider value={{ orderTable, setOrderTable, persons }}>
      {children}
    </CılaContext.Provider>
  );
};
