import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useUser, user } from "@/context/context";
export default function FormStepThree() {
  const { user, updateUser } = useUser();
  const { firstId, secondId, date, addresShort, addressLong } = user;

  const handleChange = (name, event) => {
    updateUser({ ...user, [name]: event.target.value });
  };

  console.log(user);
  return (
    <div className="bg-white p-5">
      <Typography variant="h6" gutterBottom>
        Operator Information Step 3
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstId"
            name="firstId"
            label="Fırst Id"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstId}
            onChange={() => handleChange("firstId", event)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="secondId"
            name="secondId"
            label="Second Id"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={secondId}
            onChange={() => handleChange("secondId", event)}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="addresShort"
            name="addresShort"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={addresShort}
            onChange={() => handleChange("addresShort", event)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={() => handleChange("addressLong", event)}
            value={addressLong}
          />
        </Grid>
        {/* date */}
        <div className="h-auto w-full p-5">
          <div className="flex flex-col w-1/2 border-b border-2-black">
            <span className="font-semibold text-xs">Start Date</span>
            <input
              className="h-10  "
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={() => handleChange("date", event)}
            />
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
