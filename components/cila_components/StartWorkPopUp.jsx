import React from "react";
import CustomButton from "./CustomButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
function StartWorkPopUp() {
    const [btnStatus,setBtnStatus] = useState("")
  const buttonsWorkType = [
    { id: 1, title: "Standart" },
    { id: 2, title: "Tamir" },
    { id: 3, title: "Numune" },
  ];

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
                opacity: "0.1", // Opacity değerini ayarlayabilirsiniz
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
                    value=""
                  />
                </Grid>
                <CustomButton title="Siparişe Geri Dön" />
              </div>
              {/* yenı ıs emrı btn */}
              <div className=" relative h-1/3 w-full border border-2 flex flex-col gap-y-5 justify-center items-center ">
                <CustomButton title="Yeni İş Emri" />
                {btnStatus === "Numune" ? <CustomButton title="Proses Basla"/> : null}
              </div>
              <div className=" relative h-1/3 w-full border border-2 flex flex-col gap-y-3 justify-center items-center ">
                <span className="absolute top-0  left-0 font-semibold">
                  İş Tipleri
                </span>
                {buttonsWorkType.map((btn, index) => (
                  <CustomButton addProps={`${btn.title === btnStatus ? "bg-green-500 " : null}`} onClick={()=>{setBtnStatus(btn.title)}} title={btn.title} key={index} />
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
                    id="barkod"
                    name="barkod"
                    label="Masa No"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value=""
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="barkod"
                    name="barkod"
                    label="Kullanıcı Adı"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value=""
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
                      value=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="barkod"
                      name="barkod"
                      label="Karat/Renk"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value=""
                    />
                  </Grid>
                </div>
                <div className="flex gap-x-1">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="barkod"
                      name="barkod"
                      label="Malzeme No"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="barkod"
                      name="barkod"
                      label="Sipariş Gramı"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value=""
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
                      id="barkod"
                      name="barkod"
                      label="Proses ID"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="barkod"
                      name="barkod"
                      label="Proses Adı"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value=""
                    />
                  </Grid>
                </div>
                
                <CustomButton title="Kapat" addProps="bg-red-600 hover:bg-red-300"/>
                
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
