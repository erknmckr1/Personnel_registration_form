import React, { useState } from "react";
import Input from "./uı/Input";
import { useFormik } from "formik";
import { personFormSchema } from "@/schemas/personFormSchema";
function Form() {
  //!
  const [checkboxState, setCheckboxState] = useState({
    Woman: false,
    Man: false,
  });

  const handleCheckboxChange = (checkboxName, event) => {
    setCheckboxState((prevState) => ({
      ...prevState,

      Woman: checkboxName === "Woman" ? event.target.checked : prevState.Woman,
      Man: checkboxName === "Man" ? event.target.checked : prevState.Man,
    }));
    values.gender = checkboxName;
  };

  //!

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        surname: "",
        phoneNumber: "",
        email: "",
        gender: "",
        address: "",
        city: "",
        age: 0,
        day:"",
        mounth:"",
        year:""
      },
      validationSchema: personFormSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      values: values.name,
      placeholder: "Person Name",
      touched: touched.name,
      errors: errors.name,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      values: values.surname,
      placeholder: "Person Surname",
      touched: touched.surname,
      errors: errors.surname,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      values: values.phoneNumber,
      placeholder: "Person Phone Number",
      touched: touched.phoneNumber,
      errors: errors.phoneNumber,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      values: values.email,
      placeholder: "Person Email",
      touched: touched.email,
      errors: errors.email,
    },
    {
      id: 5,
      name: "city",
      type: "text",
      values: values.city,
      placeholder: "Person City",
      touched: touched.city,
      errors: errors.city,
    },
  ];

  console.log(values.day)
  return (
    <form className="w-full h-auto flex gap-x-1 ">
      {/* Form div */}
      <div className="h-auto w-1/2  ">
        <span className="font-bold">Personel</span>
        <div className="w-full h-full border-black border-2 text-black p-5">
          <div className="flex flex-col gap-y-4 mt-2">
            {inputs.map((item) => (
              <Input
                key={item.id}
                {...item}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
            <div className="relative block cursor-text w-full">
            <textarea
                className="h-14 max-h-24 w-full peer border outline-none px-4 pt-2 bg-[#E5E8E8] border border-1 "
                name="address"
                id=""
                rows="5"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                type="text"
              ></textarea>
              <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">Person Address</span>
            </div>
            {/* gender */}
            <div className="w-full flex flex-col">
              <span className="font-bold text-xs">Person Gender</span>
              <div className="flex gap-x-10 w-full py-3">
                <label className="flex gap-x-1">
                  <input
                    name="gender"
                    type="checkbox"
                    checked={checkboxState.Man}
                    onChange={() => handleCheckboxChange("Man", event)}
                  />
                  <p>Man</p>
                </label>
                <label className="flex gap-x-1">
                  <input
                    name="gender"
                    type="checkbox"
                    checked={checkboxState.Woman}
                    onChange={() => handleCheckboxChange("Woman", event)}
                  />
                  <p>Woman</p>
                </label>
              </div>
            </div>
            {/* gender */}

            {/* dateofbirth */}
            <div className="py-3">
               <div className="flex w-full gap-x-5">
               <select onChange={handleChange} value={values.day} name="day" className="w-20 h-10 border-b-2 border-black" >
                {Array.from({ length: 32 }, (_, index) => (
                      <option  key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                </select>
                <select onChange={handleChange} value={values.mounth} name="mounth" className="w-20 h-10 border-b-2 border-black" >
                {Array.from({ length: 12 }, (_, index) => (
                      <option  key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                </select>
                <select onChange={handleChange} value={values.year} name="year" className="w-20 h-10 border-b-2 border-black" >
                {Array.from({ length: 140 }, (_, index) => (
                      <option  key={index} value={index + 1888}>
                        {index + 1888} 
                      </option>
                    )).reverse()}
                </select>
               </div>
            </div>
          </div>
        </div>
      </div>
      {/* Operations */}
      <div className="w-1/2 ">
        <span className="font-bold">Operations</span>
        <div className="w-full h-full border-2 border-black p-5">
          <div className="h-full">
            <div className="w-full h-1/2  flex gap-x-2 items-center justify-center  ">
              <button className="h-14 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]">
                SAVE
              </button>
              <button className="h-14 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]">
                UPDATE
              </button>
              <button className="h-14 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]">
                DELETE
              </button>
              <button className="h-14 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]">
                SAVE
              </button>
            </div>
            <Input />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
