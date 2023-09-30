import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function AuthPopUp(props) {
  const [text,setText] = useState("")
  const {persons} = props;
  console.log(persons)
  console.log(text)

  const handleChange = (e) =>{
    setText(e.target.value)
  }
  return (
    <div className="w-full h-full absolute grid place-content-center bg-[#EAFAF1] bg-opacity-60 top-0 left-0 z-50 rounded-r-[10px]">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[750px] h-[750px] border border-1 bg-[#FEF9E7] flex ">
          <div className="relative w-1/3 h-full">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: "url('/1-removebg.png')",
                opacity: "0.1", // Opacity değerini ayarlayabilirsiniz
              }}
            ></div>
          </div>
          <div className="w-2/3 h-full">
            <div className="flex justify-center flex-col w-full h-full items-center gap-y-5">
              <span className="text-[35px] font-semibold">Operator ID</span>
              <Grid item xs={15} sm={8}>
                <TextField
                  required
                  id="text"
                  name="text"
                  label="Barkod"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={text}
                  onChange={handleChange}
                />
              </Grid>
            </div>
          </div>
          {/* İçerik */}
        </div>
      </div>
    </div>
  );
}

export default AuthPopUp;
