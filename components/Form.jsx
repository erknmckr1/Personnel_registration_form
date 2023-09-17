import React, { useEffect, useState } from "react";
import Input from "./uı/Input";
import { useFormik } from "formik";
import { personFormSchema } from "@/schemas/personFormSchema";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormParent from "./multi-step-form/FormParent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
function Form() {
  const [showForm, setShowForm] = useState(false);
  // get person data
  // useEffect(() => {
  //   const getPersons = async () => {
  //     try {
  //       const res = await axios.get("/api/person");
  //       setPersons(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPersons();
  // }, []);

  const handleAdd = () => {
    if (showForm === false) {
      setShowForm(true);
    }
  };

  return (
    <div className="relative w-full h-screen py-2  gap-x-1  ">
      <div className="h-1/3 w-full">
        <div className="w-full h-14 font-bold flex justify-center items-center">
          <span className="text-2xl">Operator Registration Screen</span>
        </div>
        <div className="w-full h-full flex justify-center gap-x-3">
          {/* operator count screen */}
          <div className="w-1/3  flex justify-center items-center gap-x-8">
          <div className="flex flex-col gap-y-3 justify-center items-center ">
              <span className="text-xl font-semibold">Active Person</span>
              <div className="w-32 h-32 bg-black text-[35px] flex justify-center items-center text-white drop-shadow-2xl rounded-md">349</div>
            </div>
            <div className="flex flex-col gap-y-3 justify-center items-center ">
              <span className="text-xl font-semibold">Reserved Person</span>
              <div className="w-32 h-32 bg-black text-[35px] flex justify-center items-center text-white drop-shadow-2xl rounded-md">29</div>
            </div>

           
          </div>
          {/* operatıon buttons... */}
          <div className="w-1/3  gap-x-10  flex items-center justify-center">
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Add
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Update
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Delete
            </button>
          </div>
          {/* search operator */}
          <div className="w-1/3 h-full   flex justify-center items-center ">
            <div className="h-full w-1/2 flex justify-center items-center">
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="search"
                  name="search"
                  label="Search Id"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
            </div>
          </div>
        </div>
      </div>
      {/* person table */}
      <div className="h-2/3  w-full border border-1 overflow-y-scroll">
        <table className="table-auto w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">ID</th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Name
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Surname
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Email
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Phone Number
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Gender
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Address
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                City
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Date
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Active
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Left Work
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Profession
              </th>
            </tr>
          </thead>
          <tbody> </tbody>
        </table>
      </div>
      {/* form screen */}
      {showForm === true ? <FormParent setShowForm={setShowForm} /> : null}
    </div>
  );
}

export default Form;
