import React from "react";
import CustomButton from "./CustomButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useContext } from "react";
import { CılaContext } from "@/context/cilaContext";
import axios from "axios";
import { toast } from "react-toastify";
function StopOrderPopUp(props) {
  const { setIsStopMachine } = props;
  const { stopReason, cilaWorkTable, dateString, loggedInUser } =
    useContext(CılaContext);
  const [selectedStopReason, setSelectedStopReason] = useState(null);
  console.log(stopReason);
  // const {
  //   cancel_date,
  //   cancel_reason_id,
  //   cancel_user_id_dec,
  //   order_no,
  //   process_id,
  //   produced_amount,
  //   stop_end_date,
  //   stop_reason_id,
  //   stop_start_date,
  //   stop_user_id_dec,
  //   user_id_dec,
  //   work_end_date,
  //   work_start_date,
  //   work_type,
  // } = cilaWorkTable;

  const handleStop = async () => {
    try {
      const resData = {
        cancel_date: cilaWorkTable[cilaWorkTable.length - 1].cancel_date,
        cancel_reason_id:
          cilaWorkTable[cilaWorkTable.length - 1].cancel_reason_id,
        cancel_user_id_dec:
          cilaWorkTable[cilaWorkTable.length - 1].cancel_user_id_dec,
        order_no: cilaWorkTable[cilaWorkTable.length - 1].order_no,
        process_id: cilaWorkTable[cilaWorkTable.length - 1].process_id,
        produced_amount:
          cilaWorkTable[cilaWorkTable.length - 1].produced_amount,
        stop_end_date: cilaWorkTable[cilaWorkTable.length - 1].stop_end_date,
        stop_reason_id: selectedStopReason.stop_reason_id,
        stop_start_date: dateString,
        stop_user_id_dec: loggedInUser.id_dec,
        user_id_dec: cilaWorkTable[cilaWorkTable.length - 1].user_id_dec,
        work_end_date: cilaWorkTable[cilaWorkTable.length - 1].work_end_date,
        work_start_date:
          cilaWorkTable[cilaWorkTable.length - 1].work_start_date,
        work_type: cilaWorkTable[cilaWorkTable.length - 1].work_type,
      };
      const res = await axios.post("/api/cila/", resData);
      if (res.status === 200) {
        toast.success("Makine başarı ile durduruldu.");
      }
    } catch (err) {
      console.log(err);
      toast.success("Makine durdurulamadı tekrar deneyin.");
    }
  };

  // StopMachine Pop Up'ını kapat.. ve ılgılı stateleri sıfırla
  const handleClickOutPopUp = () =>{
    setSelectedStopReason(null);
    setIsStopMachine(false)
  }
  return (
    <div className="w-full h-full absolute  grid place-content-center bg-[#F8F9F9] bg-opacity-60 top-0 left-0 z-50 rounded-l-lg popup">
      <div className="w-full h-full flex justify-center items-center rounded-r-[5px]">
        <div className="w-[850px] h-[750px] border border-1 bg-[#FEF9E7] flex ">
          {/* left side */}
          <div className="relative w-1/3 h-full">
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
                  Makineyi Durdur
                </span>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="barkod"
                    name="barkod"
                    label=""
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value="Cila"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="barkod"
                    name="barkod"
                    label="Masa No"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value="Cila 21"
                  />
                </Grid>
              </div>
              {/* buttons */}
              <div className="relative w-full h-1/3 flex flex-col justify-evenly items-center">
                <CustomButton
                  onClick={handleStop}
                  showButton={true}
                  title="Makineyı Durdur"
                  disabled={selectedStopReason === null ? true : false}
                />
                <CustomButton onClick={handleClickOutPopUp} showButton={true} title="Vazgeç" />
              </div>
              <div className="w-full h-1/3"></div>
            </div>
          </div>
          {/* right side */}
          <div className="w-2/3 h-full flex items-center justify-center">
            <div className="w-[450px] h-[650px] border border-2 bg-red-100 flex items-center justify-center p-5">
              <ul className="overflow-y-scroll w-full h-full flex flex-col gap-y-3">
                {stopReason &&
                  stopReason.map((item, index) => (
                    <li
                      className="h-20 text-[25px] p-2 cursor-pointer text-center hover:bg-green-300 hover:text-black hover:font-semibold bg-black text-white"
                      key={index}
                      onClick={() => setSelectedStopReason(item)}
                    >
                      {item.stop_reason_name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StopOrderPopUp;
