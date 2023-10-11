import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useContext } from "react";
import { CılaContext } from "@/context/cilaContext";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "./CustomButton";
function WorkEndPopUp(props) {
  const { selectedOrder, dateString,setCilaWorkTable, setSelectedOrder } = useContext(CılaContext);
  const { loggedInUser, setIsEndWork } = props;
  const [gram, setGram] = useState("");

  const handleClosePopUp = () => {
    setIsEndWork(false);
  };

  const finishOrder = async () => {
    if(window.confirm("İşi bitirmek istediğinize emin misiniz ?") && selectedOrder.work_end_date === ""){
      try {
        const resData = {
          // ternary operator
          user_id_dec: selectedOrder && selectedOrder.user_id_dec,
          order_no: selectedOrder && selectedOrder.order_no,
          work_type: selectedOrder&& selectedOrder.work_type,
          work_start_date: selectedOrder && selectedOrder.work_start_date,
          work_end_date: dateString,
          process_id: selectedOrder && selectedOrder.process_id,
          stop_user_id_dec: "",
          stop_reason_id: "",
          stop_start_date: "",
          stop_end_date: "",
          cancel_user_id_dec: "",
          cancel_reason_id: "",
          cancel_date: "",
          produced_amount: gram,
          order_status: "4",
          finisher_user_id: loggedInUser ? loggedInUser.id_dec : "",
        };
        const res = await axios.put("/api/cila/", resData);
        if (res.status === 200) {
          toast.success("Sipariş başarı ile sonlandırıldıü.");
          const updatedData = await axios.get("/api/cila");
          setCilaWorkTable(updatedData.data.cila_work_table);
          const newSelectedOrder = updatedData.data.cila_work_table[updatedData.data.cila_work_table.length -1];
          setSelectedOrder(newSelectedOrder)
          setIsEndWork(false)
        }
      } catch (err) {
        toast.error("Sipariş iptal edilemedi tekrar deneyin");
        console.log(err);
      }
    }
  
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
            {/* titles */}
            <div className="w-full h-full p-1">
              <div className=" relative w-full h-1/3 flex flex-col justify-evenly items-center border border-2">
                <span className="text-[30px] font-semibold">
                  Siparişi Bitir
                </span>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="gram"
                    name="gram"
                    label="Gram Giriniz"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={gram}
                    type="number"
                    onChange={(e) => setGram(e.target.value)}
                    
                  />
                </Grid>
              </div>
              {/* buttons */}
              <div className="relative w-full h-1/3 flex flex-col justify-evenly items-center">
                <CustomButton
                  showButton={true}
                  title="Siparişi Bitir"
                  disabled={gram === "" ? true : false}
                  onClick={finishOrder}
                />
                <CustomButton
                  showButton={true}
                  title="Vazgeç"
                  addProps="bg-red-500"
                  onClick={handleClosePopUp}
                />
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-1/2 h-full">
            <div className="w-full h-full p-1">
              {/* genel bılgıler */}
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
                      id="orderno"
                      name="orderno"
                      label="Sipariş No"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={selectedOrder && selectedOrder.order_no}
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
                      value={selectedOrder && selectedOrder.carat}
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
                      value={selectedOrder && selectedOrder.metarial_no}
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
                      value={selectedOrder && selectedOrder.amount}
                    />
                  </Grid>
                </div>
                <span className="absolute top-0 left-0 font-semibold">
                  Sipariş Bilgileri
                </span>
              </div>
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
                      value={selectedOrder && selectedOrder.process_id}
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
                      value={selectedOrder && selectedOrder.process_id}
                    />
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkEndPopUp;
