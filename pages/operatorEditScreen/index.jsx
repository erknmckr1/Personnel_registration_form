import React, { useEffect, useState } from "react";
import axios from "axios";
import FormParent from "@/components/multi-step-form/FormParent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormTable from "@/components/FormTable";

function Form() {
  const [showForm, setShowForm] = useState(false);
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedUser, setCheckedUser] = useState(false);

  // get person data
  useEffect(() => {
    const getPersons = async () => {
      try {
        const res = await axios.get("/api/person");
        const unıqId = res.data.map((person) => ({
          ...person,
          id: person.first_id,
        }));
        setPersons(unıqId);
      } catch (err) {
        console.log(err);
      }
    };
    getPersons();
  }, []);

  // filtered persons with search ınput
  const fılteredPersons = persons.filter((person) => {
    const searchableFields = [
      "first_id",
      "second_id",
      "first_name",
      "last_name",
      "person_email",
      "person_section",
      "person_department",
      "person_profession",
      "person_phonenumber",
      "person_city",
      "person_state",
      "person_country",
    ];

    return searchableFields.some((key) =>
    person.is_left_work === false &&  person[key].toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  // filtered persons isActive or isLeftWork
  const activePerson = persons.filter((person) => person.is_active === true);
  const isLeftPerson = persons.filter(
    (person) => person.is_left_work === true && person.is_active === false
  );

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
              <div className="w-32 h-32 bg-black text-[35px] flex justify-center items-center text-white drop-shadow-2xl rounded-md">
                {activePerson && activePerson.length}
              </div>
            </div>
            <div className="flex flex-col gap-y-3 justify-center items-center ">
              <span className="text-xl font-semibold">Reserved Person</span>
              <div className="w-32 h-32 bg-black text-[35px] flex justify-center items-center text-white drop-shadow-2xl rounded-md">
                {isLeftPerson && isLeftPerson.length}
              </div>
            </div>
          </div>
          {/* operatıon buttons... */}
          <div className="w-1/3  gap-x-10  flex items-center justify-center">
            {checkedUser && (
              <div className="flex flex-col gap-x-10 gap-y-3 justify-center items-center w-full">
                <div className="">
                  <span className="text-xl font-semibold">
                    Selected Staff ID :{" "}
                  </span>
                  <span className="text-xl font-semibold underline">
                    {selectedUser && selectedUser.id}
                  </span>
                </div>
                <div>
                  <span className="text-xl font-semibold">Staff Name : </span>
                  <span className="text-xl font-semibold underline">
                    {selectedUser && selectedUser.first_name}
                  </span>
                </div>
                <div>
                  <span className="text-xl font-semibold">Department : </span>
                  <span className="text-xl font-semibold underline">
                    {selectedUser && selectedUser.person_department}
                  </span>
                </div>
              </div>
            )}
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
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Grid>
            </div>
          </div>
        </div>
      </div>
      {/* person table */}
      <div className="h-2/3  w-full border border-1 overflow-y-scroll">
        {/*  */}
        <FormTable
          persons={persons}
          setPersons={setPersons}
          fılteredPersons={fılteredPersons}
          setShowForm={setShowForm}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setCheckedUser={setCheckedUser}
          checkedUser={checkedUser}
        />
      </div>
      {/* form screen */}
      {showForm === true ? <FormParent setShowForm={setShowForm} /> : null}
    </div>
  );
}

export default Form;
