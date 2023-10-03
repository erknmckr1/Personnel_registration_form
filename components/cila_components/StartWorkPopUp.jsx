import React from "react";
import CustomButton from "./CustomButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AutocompleteIntroduction from "./Dropdown";
import { useContext } from "react";
import { CılaContext } from "@/context/cilaContext";

function StartWorkPopUp(props) {
  const { processTable } = useContext(CılaContext);
  // Giriş yapan kullanıcı
  const { loggedInUser,setIsStartWork } = props;
  console.log(loggedInUser);
  // İş tipini tutacak state
  const [btnStatus, setBtnStatus] = useState("");
  const [selectedProcess,setSelectedProcess] = useState(null);
  const buttonsWorkType = [
    { id: 1, title: "Standart" },
    { id: 2, title: "Tamir" },
    { id: 3, title: "Numune" },
  ]; 
console.log(selectedProcess)
  // Order no yu tutacak state
  const [orderNo, setOrderNo] = useState("");
  // Order bılgılerını tutacak state
  const [orderInfo, setOrderInfo] = useState(null);

  //Order ıd yı okuttuktan sonra atılacak istek sıparıs bılgılerı alınacak
  const handleKeyPress = async () => {
    const order_no = orderNo;
    try {
      const res = await axios.post("/api/cila/orderNo", { order_no: order_no });
      if (res.status === 200) {
        toast.success("Sipariş bilgileri alındı");
        setOrderInfo(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Sipariş bilgileri alınamadı...");
    }
  };
  console.log(orderInfo);
  // prosesi sctıgımızde calısacak fonksıyon her degısıklıklte selectedProcess state'i guncellenecek.
  const handleSelectChange = (e) => {
    const secilenItemId = e.target.value;
    const secilenIslem = processTable.find(item => item.process_id === secilenItemId);
    setSelectedProcess(secilenIslem);
  };

  
  return (
    <div className="w-full h-full absolute  grid place-content-center bg-[#F8F9F9] bg-opacity-60 top-0 left-0 z-50 rounded-l-lg popup">
      <div className="w-full h-full flex justify-center items-center rounded-r-[5px]">
        <div className="w-[850px] h-[750px] border border-1 bg-[#FEF9E7] flex ">
          {/* left side */}
          <div className="relative w-1/2 h-full">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: "url('/1-removebg.png')",
                opacity: "0.1", 
              }}
            ></div>
            <div className="w-full h-full p-1">
              <div className=" relative w-full h-1/3 flex flex-col justify-evenly items-center border border-2">
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="barkod"
                    name="barkod"
                    label="Barkod Okutunuz"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={orderNo}
                    onChange={(e) => {
                      setOrderNo(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleKeyPress();
                      }
                    }}
                  />
                </Grid>
                {orderInfo && (
                  <div className="h-20 w-full flex justify-between items-center px-3">
                  <select
                    onChange={handleSelectChange}
                    className="w-[150px] h-12 outline-none bg-transparent border-b-2 border-black"
                    name=""
                    id=""
                    value={selectedProcess ? selectedProcess.process_id : ''}
                  >
                    <option value="">Bir öğe seçin</option>
                    {processTable.map((item, index) => (
                      <option
                        value={item.process_id}
                        className="w-full h-12"
                        key={item.process_id}
                      >
                        {item.process_name}
                      </option>
                    ))}
                  </select>
                  {selectedProcess && (
                    <div >
                      <p className="text-red-500 font-semibold">Seçilen İşlem: {selectedProcess.process_name}</p>
                    </div>
                  )}
                </div>
                )}
                <CustomButton title="Siparişe Geri Dön" />
              </div>
              {/* yenı ıs emrı btn */}
              <div className=" relative h-1/3 w-full border border-2 flex flex-col gap-y-5 justify-center items-center ">
                <CustomButton title="Yeni İş Emri" />
                {btnStatus === "Numune" || selectedProcess !== undefined ? (
                  <CustomButton title="Proses Basla" />
                ) : null}
              </div>
              {/* iş tipleri btn */}
              <div className=" relative h-1/3 w-full border border-2 flex flex-col gap-y-3 justify-center items-center ">
                <span className="absolute top-0  left-0 font-semibold">
                  İş Tipleri
                </span>
                {buttonsWorkType.map((btn, index) => (
                  <CustomButton
                    addProps={`${
                      btn.title === btnStatus ? "bg-green-500 " : null
                    }`}
                    onClick={() => {
                      setBtnStatus(btn.title);
                    }}
                    onChange={()=>{setWorkType(btn.title)}}
                    title={btn.title}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-1/2 h-full">
            <div className="w-full h-full p-1">
              {/* Genel Bilgiler */}
              <div className="relative w-full h-1/3 flex flex-col justify-evenly items-center border border-2">
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="masano"
                    name="masano"
                    label="Masa No"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value="33"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="username"
                    name="username"
                    label="Kullanıcı Adı"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={loggedInUser && loggedInUser.op_username}
                  />
                </Grid>
                <span className="absolute top-0 left-0 font-semibold">
                  Genel Bilgiler
                </span>
              </div>
              {/* sipariş bilgileri */}
              <div className="relative h-1/3 w-full border border-2  gap-y-10 flex flex-col justify-center items-center ">
                <div className="flex gap-x-1">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="barkod"
                      name="barkod"
                      label="Sipariş No"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={orderInfo && orderInfo.order_no}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="carat"
                      name="carat"
                      label="Karat/Renk"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={orderInfo && orderInfo.carat}
                    />
                  </Grid>
                </div>
                <div className="flex gap-x-1">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="metarial"
                      name="metarial"
                      label="Malzeme No"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={orderInfo && orderInfo.metarial_no}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="gram"
                      name="gram"
                      label="Sipariş Gramı"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={orderInfo && orderInfo.amount}
                    />
                  </Grid>
                </div>
                <span className="absolute top-0 left-0 font-semibold">
                  Sipariş Bilgileri
                </span>
              </div>
              {/* Proses bılgılerı */}
              <div className=" relative h-1/3 w-full border border-2 flex flex-col gap-y-3 justify-center items-center ">
                <span className="absolute top-0  left-0 font-semibold">
                  Proses Bilgileri
                </span>
                <div className="w-full h-full gap-x-1 flex justify-center items-center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="processId"
                      name="processId"
                      label="Proses ID"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={selectedProcess && selectedProcess.process_id}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="processName"
                      name="processName"
                      label="Proses Adı"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={selectedProcess && selectedProcess.process_name}
                    />
                  </Grid>
                </div>

                <CustomButton
                  title="Kapat"
                  addProps="bg-red-600 hover:bg-red-300"
                  onClick={()=>setIsStartWork(false)}
                />
              </div>
            </div>
          </div>
          {/* İçerik */}
        </div>
      </div>
    </div>
  );
}

export default StartWorkPopUp;
