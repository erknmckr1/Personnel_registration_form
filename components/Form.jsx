import React, { useEffect, useState } from "react";
import axios from "axios";
import FormParent from "./multi-step-form/FormParent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useUser } from "@/context/context";
function Form() {
  const [showForm, setShowForm] = useState(false);
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState();
  const [selectedPerson, setSelectedPerson] = useState();
  const { user, updateUser } = useUser();

  //get person data
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

  // filtered persons with search ınput
  const fılteredPersons = persons.filter((person) =>
    person.first_id.toString().includes(filterText)
  );

  // filtered persons isActive or isLeftWork
  const activePerson = persons.filter((person) => person.is_active === true);
  const isLeftPerson = persons.filter(
    (person) => person.is_left_work === true && person.is_active === false
  );

  // Open modal to add person
  const handleAdd = () => {
    if (showForm === false) {
      setShowForm(true);
    }
  };

  //Assign the selected person's information to a state, if you click on the same person it will deselect it
  // Tıkladımız personelı state'e atadık 2. tıklamada null a cevırıyoruz buna gore update modalı acılacak.
  const handlePersonClick = (person) => {
    if (selectedPersonId && selectedPersonId === person.first_id) {
      setSelectedPersonId(null);
      setSelectedPerson(null)
    } else {
      setSelectedPersonId(person.first_id);
      setSelectedPerson(person);
    }
  };


  // delete request
  const deletePerson = async () => {
    if (selectedPersonId) {
      if (confirm(`Delete user with ${selectedPersonId} ? `)) {
        try {
          const res = await axios.delete(`/api/person/${selectedPersonId}`);
          if ((res.status = 200)) {
            toast.success("Person successfully deleted");
          }
        } catch (err) {
          console.log(err);
          toast.error("An error occurred while adding Person");
        }
      }
    }
  };

  //Update to show user form modal
  const handleUpdate = () => {
    if (selectedPerson) {
      setShowForm(true);
      const updatedUser = {
        ...user,
        firstId: selectedPerson.first_id || user.firstId,
        secondId: selectedPerson.second_id || user.secondId,
        firstName: selectedPerson.first_name || user.firstName,
        lastName: selectedPerson.last_name || user.lastName,
        addresShort: selectedPerson.address_short || user.addresShort,
        addressLong: selectedPerson.address_long || user.addressLong,
        city: selectedPerson.person_city || user.city,
        state: selectedPerson.person_state || user.state,
        country: selectedPerson.person_country || user.country,
        phonenumber: selectedPerson.person_phonenumber || user.phonenumber,
        email: selectedPerson.person_email || user.email,
        gender: selectedPerson.person_gender || user.gender,
        date: selectedPerson.person_date || user.date,
        isActive: selectedPerson.is_active || user.isActive,
        isAdmin: selectedPerson.is_admin || user.isAdmin,
        isSupervizor: selectedPerson.is_supervisor || user.isSupervizor,
        isValidator: selectedPerson.is_validator || user.isValidator,
        isMaster: selectedPerson.is_master || user.isMaster,
        isleftwork: selectedPerson.is_left_work || user.isleftwork,
        section: selectedPerson.person_section || user.section,
        department: selectedPerson.person_department || user.department,
        profession: selectedPerson.person_profession || user.profession,
      };
      updateUser(updatedUser);
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
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Add
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Update {selectedPersonId && `${selectedPersonId}`}
            </button>
            <button
              onClick={deletePerson}
              className="ease-in duration-300 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Delete {selectedPersonId && `${selectedPersonId}`}
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
        <table className="table-auto w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Person ID
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Second ID
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                First Name
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Last Name
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Address (Short)
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Address (Long)
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                City
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                State
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Country
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Phone Number
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Email
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Gender
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Date
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Active
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Admin
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Supervisor
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Validator
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Master
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Is Left Work
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Section
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Department
              </th>
              <th className="px-4 py-2 sticky top-0 bg-black text-white">
                Profession
              </th>
            </tr>
          </thead>
          <tbody>
            {fılteredPersons.map((person, index) => (
              <tr
                className={`${
                  person.first_id === selectedPersonId
                    ? "bg-blue-500 cursor-pointer hover:bg-blue-600 text-xs text-white"
                    : person.is_left_work
                    ? "bg-red-600 cursor-pointer hover:bg-[#FDEBD0] text-xs"
                    : "bg-[#EAF2F8] cursor-pointer hover:bg-[#FDEBD0] text-xs"
                }`}
                key={index}
                onClick={() => handlePersonClick(person)}
              >
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.first_id}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.second_id}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.first_name}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.last_name}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.address_short}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.address_long}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_city}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_state}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_country}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_phonenumber}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_email}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_gender}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_date.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.is_active.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.is_admin.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.is_supervisor.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.is_validator.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.is_master.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.is_left_work.toString()}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_section}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_department}
                </td>
                <td className=" px-4 py-2 sticky top-0  text-black">
                  {person.person_profession}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* form screen */}
      {showForm === true ? (
        <FormParent
          selectedPerson={selectedPerson && selectedPerson}
          setShowForm={setShowForm}
        />
      ) : null}
    </div>
  );
}

export default Form;
