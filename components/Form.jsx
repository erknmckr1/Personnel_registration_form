import React, { useEffect, useState } from "react";
import Input from "./uı/Input";
import { useFormik } from "formik";
import { personFormSchema } from "@/schemas/personFormSchema";
import axios from "axios";
function Form() {
  const [persons,setPersons] = useState([])
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

  // person state
  const [personState, setPersonState] = useState({
    isActive: false,
    isLeftWork: false,
  });

  const handleİsActiveChange = (personStateName, e) => {
    setPersonState((prev) => ({
      ...prev,
      isActive: personStateName === "isActive" ? e.target.checked : false,
      isLeftWork: personStateName === "isLeftWork" ? e.target.checked : false,
    }));
  };

  //!
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        surname: "",
        phonenumber: "",
        email: "",
        gender: "",
        address: "",
        city: "",
        day: "",
        mounth: "",
        year: "",
        isactive: null,
        isleftwork: null,
        profession: "",
      },
      validationSchema: personFormSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  // State guncellenmesı tamamlandıgında values.personState degerıne personState degerını atayacagız.
  useEffect(() => {
    values.isactive = personState.isActive;
    values.isleftwork = personState.isLeftWork;
  }, [personState]);

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
      type: "text",
      values: values.phonenumber,
      placeholder: "Person Phone Number",
      touched: touched.phonenumber,
      errors: errors.phonenumber,
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
    {
      id: 6,
      name: "profession",
      type: "text",
      values: values.profession,
      placeholder: "Person Profession",
      touched: touched.profession,
      errors: errors.profession,
    },
  ];

  
  // get person data 
  
  useEffect(()=>{
    const getPersons  = async () =>  {
      try {
        const res = await axios.get("/api/create")
        setPersons(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPersons();
  },[])
  
  console.log(persons);

  // post person data
  const createNewPerson = async (e) => {
    e.preventDefault();
    const person = { ...values };
    console.log(person)
    try {
      const response = await axios.post("/api/create", person);
      if (response.status === 201) {
        console.log("Person basarıyla eklendi");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-auto flex gap-x-1 ">
      {/* Form div */}
      <div className="h-auto w-full ">
        <span className="font-bold">Personel Registration Screen</span>
        <div className="w-full h-full  border-black border-2 text-black p-5">
          {/* inputs */}
          <div className="flex w-full flex-col gap-y-4 mt-2">
            <div className="w-full  grid grid-cols-2 gap-4">
              {inputs.map((item) => (
                <Input
                  key={item.id}
                  {...item}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              ))}
              {/* adress ınput */}
              <div className="relative block cursor-text w-full">
                <textarea
                  className="h-14 max-h-24 w-full peer outline-none px-4 pt-2 bg-[#E5E8E8] border border-1 "
                  name="address"
                  id=""
                  rows="5"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  type="text"
                ></textarea>
                <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
                  Person Address
                </span>
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
              <div className="flex flex-col">
                <span className="font-bold text-xs">Birth Day</span>
                <div className="flex w-full gap-x-5 py-3">
                  <select
                    onChange={handleChange}
                    value={values.day}
                    name="day"
                    className="w-20 h-10 border-b-2 border-black"
                  >
                    {Array.from({ length: 32 }, (_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={handleChange}
                    value={values.mounth}
                    name="mounth"
                    className="w-20 h-10 border-b-2 border-black"
                  >
                    {Array.from({ length: 12 }, (_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={handleChange}
                    value={values.year}
                    name="year"
                    className="w-20 h-10 border-b-2 border-black"
                  >
                    {Array.from({ length: 140 }, (_, index) => (
                      <option key={index} value={index + 1888}>
                        {index + 1888}
                      </option>
                    )).reverse()}
                  </select>
                </div>
              </div>
              {/* personState */}
              <div className="flex flex-col gap-y-3">
                <p className="text-xs font-bold">Person State</p>
                <div className="flex gap-x-3">
                  <label htmlFor="isActive" className="flex gap-x-3">
                    <input
                      onChange={() => handleİsActiveChange("isActive", event)}
                      checked={personState.isActive}
                      id="isActive"
                      type="checkbox" 
                    />
                    <p className="">Active</p>
                  </label>
                  <label htmlFor="isLeftWork" className="flex gap-x-3">
                    <input
                      onChange={() => handleİsActiveChange("isLeftWork", event)}
                      checked={personState.isLeftWork}
                      id="isLeftWork"
                      type="checkbox"
                    />
                    <p className="">Left Work</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Operations */}
          <div className="w-full h-auto mt-3">
            <div className="w-full h-1/2  flex gap-x-4 items-center justify-center  ">
              <button
                onClick={createNewPerson}
                type="button"
                className="h-14 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]"
              >
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
          </div>
          {/* Operations */}
        </div>
      </div>
    </div>
  );
}

export default Form;
