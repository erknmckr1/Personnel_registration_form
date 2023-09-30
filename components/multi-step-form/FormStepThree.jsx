import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useUser } from "@/context/userContext";

export default function FormStepThree() {
  const { user, updateUser } = useUser();
  const { address, izin_bakiye, shift_validator,route,stop_name  } = user;

  const handleChange = (name, event) => {
    updateUser({ ...user, [name]: event.target.value });
  };

  return (
    <div className="bg-white p-5">
      <Typography variant="h6" gutterBottom>
        Operator Information Step 3
      </Typography>
      <Grid container spacing={3}>
        {/* address */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="address "
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={address}
            type="text"
            onChange={() => handleChange("address", event)}
          />
        </Grid>
        {/* address full */}
        {/* route */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="route"
            name="route"
            label="route"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={route}
            onChange={() => handleChange("route", event)}
            
          />
        </Grid>
        {/* stop name */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="stop_name"
            name="stop_name"
            label="stop_name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={stop_name}
            onChange={() => handleChange("stop_name", event)}
            
          />
        </Grid>
        {/* shift valıdator */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="shift_validator"
            name="shift_validator"
            label="shift_validator"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={shift_validator}
            onChange={() => handleChange("shift_validator", event)}
          />
        </Grid>
        {/* operatar who chooses */}
        {/* izin bakıye */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="izin_bakiye"
            name="izin_bakiye"
            label="izin_bakiye"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={() => handleChange("izin_bakiye", event)}
            value={izin_bakiye}
          />
        </Grid>
        <div className="w-full h-auto flex justify-between py-4">
        {/* section */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Section</span>
          <select
            onChange={() => {
              handleCheck("op_section", event);
            }}
            className="p-4"
            name=""
            id=""
          >
            {sectionData &&
              sectionData.sections.map((section, index) => (
                <option
                  value={section.op_section}
                  key={index}
                  className="hover:bg-[#FCF3CF] h-6 "
                >
                  {section.op_section}
                </option>
              ))}
          </select>
        </div>
        {/* part */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Part</span>
          <select
            onChange={() => {
              handleCheck("part", event);
            }}
            className="p-4"
            name="part"
            id="part"
          >
            {sectionData.parts.map((part, index) => (
              <option
                className="hover:bg-[#FCF3CF] h-6 "
                value={part.part}
                key={index}
              >
                {part.part}
              </option>
            ))}
          </select>
        </div>
        {/* profession */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Title</span>
          <select
            onChange={() => {
              handleCheck("title", event);
            }}
            className="p-4"
            name="title"
            id="title"
          >
            {sectionData.titles.map((title, index) => (
              <option
                className="hover:bg-[#FCF3CF] h-6 "
                value={title.title}
                key={index}
              >
                {title.title}
              </option>
            ))}
          </select>
        </div>
      </div>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </div>
  );
}
