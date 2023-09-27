import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useUser } from '@/context/context';

export default function AddressForm(props) {
  const {user, updateUser} = useUser();
  const {id_dec, id_hex, op_name,op_username,short_name,e_mail,op_password} = user;

  const handleChange = (event) => {
    const {name,value} = event.target;
    updateUser({...user,[name]:value})
  }

  return (
    <div className='bg-white p-5 rounded-xl'>
      <Typography variant="h6" gutterBottom>
      Operator Information Step 1 
      </Typography>
      <Grid container spacing={3}>
        {/* operator first id */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id_dec"
            name="id_dec"
            label="id_dec"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={id_dec}
            onChange={()=>handleChange(event)}
          />
        </Grid>
        {/* opetator second id */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id_hex"
            name="id_hex"
            label="id_hex"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={id_hex}
            onChange={()=>handleChange(event)}
          />
        </Grid>
        {/* operator status id */}
        {/* operator name */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="op_name"
            name="op_name"
            label="op_name"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={op_name}
            onChange={handleChange}
          />
        </Grid>
        {/* operator fullname */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="op_username"
            name="op_username"
            label="op_username"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={op_username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="short_name"
            name="short_name"
            label="short_name"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={short_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="e_mail"
            name="e_mail"
            label="e_mail"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={e_mail}
            onChange={handleChange}
          />
        </Grid>
        {/* password */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="op_password"
            name="op_password"
            label="op_password"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={op_password}
            onChange={handleChange}
          />
        </Grid>
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