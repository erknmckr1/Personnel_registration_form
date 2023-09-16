import React, { useEffect, useState } from "react";
import Input from "./uı/Input";
import { useFormik } from "formik";
import { personFormSchema } from "@/schemas/personFormSchema";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Form() {
  const [persons, setPersons] = useState([]);
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

  //random id generator
  function generateRandomNumber() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  //!
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        id: generateRandomNumber(),
        name: "",
        surname: "",
        phonenumber: "",
        email: "",
        gender: "",
        address: "",
        city: "",
        date: "",
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
      name: "phonenumber",
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
    {
      id: 7,
      name: "id",
      type: "text",
      values: values.id,
      placeholder: "ID",
      touched: touched.id,
      errors: errors.id,
    },
  ];

  // get person data
  useEffect(() => {
    const getPersons = async () => {
      try {
        const res = await axios.get("/api/person");
        setPersons(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPersons();
  }, []);

  // post person data
  const createNewPerson = async (e) => {
    e.preventDefault();
    const {
      id,
      name,
      surname,
      email,
      phonenumber,
      gender,
      address,
      city,
      date,
      isactive,
      isleftwork,
      profession,
    } = values;

    const person = {
      person_id: id,
      person_name: name,
      person_surname: surname,
      person_email: email,
      person_phone: phonenumber,
      person_profession: profession,
      person_city: city,
      person_address: address,
      person_gender: gender,
      person_startdate: date,
    };

    try {
      const response = await axios.post("/api/person", person);
      if (response.status === 200) {
        toast.success("Person başarıyla eklendi");
        console.log("Person basarıyla eklendi");
      }
      console.log(person);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between gap-x-1  ">
      {/* Form div */}
      <form onSubmit={handleSubmit} className="h-1/2 w-full  ">
        <span className="font-bold">Personel Registration Screen</span>
        <div className="w-full h-full  border-black border-2 text-black">
          {/* inputs */}
          <div className="flex w-full flex-col gap-y-4 mt-2 px-5">
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
              <div className="flex flex-col gap-y-3">
                <p className="text-xs font-bold">Start Date</p>
                <input
                  name="date"
                  onChange={handleChange}
                  value={values.date}
                  className="h-10"
                  type="date"
                />
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
                className="h-10 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]"
                onClick={createNewPerson}
              >
                SAVE
              </button>
              <button className="h-10 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]">
                UPDATE
              </button>
              <button className="h-10 w-[120px] text-white bg-black cursor-pointer rounded-[10px] hover:bg-[#EDBB99]">
                DELETE
              </button>
              <div>
                <label className="relative block cursor-text w-full">
                  <input
                    type="text"
                    className=" placeholder-[6px] text-xs text-red-600  h-10 w-full peer border outline-none px-4 pt-2 bg-slate-100 "
                    placeholder="Filter Person"
                  ></input>
                </label>
              </div>
            </div>
          </div>
          {/* Operations */}
        </div>
      </form>
      {/* person table */}
      <div className="mt-10 w-full border border-1 overflow-y-scroll">
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
          <tbody>
            {persons &&
              persons.map((person) => (
                <tr
                  key={person.id}
                  className="hover:bg-[#F9E79F] text-xs cursor-pointer"
                >
                  <td className="border px-4 py-2">{person.person_id}</td>
                  <td className="border px-4 py-2">{person.person_name}</td>
                  <td className="border px-4 py-2">{person.person_surname}</td>
                  <td className="border px-4 py-2">{person.person_email}</td>
                  <td className="border px-4 py-2">
                    {person.person_phone}
                  </td>
                  <td className="border px-4 py-2">{person.person_gender}</td>
                  <td className="border px-4 py-2">{person.person_address}</td>
                  <td className="border px-4 py-2">{person.person_city}</td>
                  <td className="border px-4 py-2">{person.person_date}</td>
                  <td className="border px-4 py-2">
                    {person.person_isactive ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2">
                    {person.person_isleftwork ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2">
                    {person.person_profession}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Form;
