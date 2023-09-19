import { useUser } from "@/context/context";
import { useState } from "react";

export default function FormStepTwo() {
  const { user, updateUser } = useUser();
  const {
    gender,
    isActive,
    isAdmin,
    isSupervizor,
    isValidator,
    isMaster,
    isleftwork,
    section,
    department,
    profession,
  } = user;
  const [checkboxState, setCheckboxState] = useState({
    Woman: false,
    Man: false,
  });

  // for gender
  const handleCheckboxChange = (checkboxName, event) => {
    setCheckboxState((prevState) => ({
      ...prevState,

      Woman: checkboxName === "female" ? event.target.checked : false,
      Man: checkboxName === "male" ? event.target.checked : false,
    }));
    updateUser({ ...user, gender: checkboxName });
  };

  // for all state
  const handleCheck = (checkboxName, event) => {
    if (
      checkboxName === "department" ||
      checkboxName === "section" ||
      checkboxName === "profession"
    ) {
      updateUser({ ...user, [checkboxName]: event.target.value });
    } else {
      updateUser({ ...user, [checkboxName]: event.target.checked });
    }
  };

  return (
    <div className="bg-white w-full h-auto p-5 flex flex-col">
      {/* gender */}
      <div className="w-1/2 flex flex-col">
        <span className=" font-semibold text-sm py-2">Gender</span>
        <div className="justify-evenly w-[300px]">
          <label className="p-4">
            <input
              checked={checkboxState.Man}
              onChange={() => handleCheckboxChange("male", event)}
              type="checkbox"
              name="gender"
              value="male"
            />{" "}
            Male
          </label>
          <label className="p-4">
            <input
              checked={checkboxState.Woman}
              onChange={() => handleCheckboxChange("female", event)}
              type="checkbox"
              name="saveAddress"
              value="female"
            />{" "}
            Female
          </label>
        </div>
      </div>

      {/* checkboxes 1  */}
      <div className="w-full flex justify-start">
        <label className="p-4">
          <input
            checked={isActive}
            onChange={() => {
              handleCheck("isActive", event);
            }}
            type="checkbox"
            name="isActive"
          />{" "}
          İs Active
        </label>
        <label className="p-4">
          <input
            checked={isAdmin}
            onChange={() => {
              handleCheck("isAdmin", event);
            }}
            type="checkbox"
            name="isAdmin"
          />{" "}
          İs Admin
        </label>
        <label className="p-4">
          <input
            checked={isSupervizor}
            onChange={() => {
              handleCheck("isSupervizor", event);
            }}
            type="checkbox"
            name="isSupervizor"
          />{" "}
          İs Supervizor
        </label>
      </div>
      {/* checkboxes 2  */}
      <div className="w-full flex justify-start">
        <label className="p-4">
          <input
            checked={isValidator}
            onChange={() => {
              handleCheck("isValidator", event);
            }}
            type="checkbox"
            name="isValidator"
          />{" "}
          İs Validator
        </label>
        <label className="p-4">
          <input
            checked={isMaster}
            onChange={() => {
              handleCheck("isMaster", event);
            }}
            type="checkbox"
            name="isMaster"
          />{" "}
          İs Master
        </label>
        <label className="p-4">
          <input
            checked={isleftwork}
            onChange={() => {
              handleCheck("isleftwork", event);
            }}
            type="checkbox"
            name="isleftwork"
          />{" "}
          İs Left Work
        </label>
      </div>
      {/* profession dropdown */}
      <div className="w-full h-auto flex justify-between py-4">
        {/* section */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Section</span>
          <select
            onChange={() => {
              handleCheck("section", event);
            }}
            className="p-4"
            name=""
            id=""
          >
            <option value="select" className="hover:bg-[#FCF3CF] h-6 ">
              Select
            </option>
            <option value="muhendıs" className="hover:bg-[#FCF3CF] h-6">
              Muhendis
            </option>
            <option value="yonetıcı" className="hover:bg-[#FCF3CF] h-10">
              Yonetıcı
            </option>
            <option
              value="temızlık gorevlısı"
              className="hover:bg-[#FCF3CF] h-10"
            >
              Temızlık Personeli
            </option>
            <option value="müdür" className="hover:bg-[#FCF3CF] h-10">
              Müdür
            </option>
          </select>
        </div>
        {/* department */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Department</span>
          <select
            onChange={() => {
              handleCheck("department", event);
            }}
            className="p-4"
            name="department"
            id="department"
          >
            <option value="select" className="hover:bg-[#FCF3CF] h-6 ">
              Select
            </option>
            <option value="bilgi islem" className="hover:bg-[#FCF3CF] h-6">
              Bilgi İslem
            </option>
            <option value="ıhracat" className="hover:bg-[#FCF3CF] h-10">
              Ihracat
            </option>
            <option value="satıl alma" className="hover:bg-[#FCF3CF] h-10">
              Satın Alma
            </option>
            <option value="montaj" className="hover:bg-[#FCF3CF] h-10">
              Montaj
            </option>
          </select>
        </div>
        {/* profession */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Profession</span>
          <select
            onChange={() => {
              handleCheck("profession", event);
            }}
            className="p-4"
            name="profession"
            id="profession"
          >
            <option
              value="select"
              className="hover:bg-[#FCF3CF] h-6 "
              name=""
              id=""
            >
              select
            </option>
            <option value="uretım muhendısı" className="hover:bg-[#FCF3CF] h-6">
              Üretim Muhendısı
            </option>
            <option
              value="endustrı muhendısı"
              className="hover:bg-[#FCF3CF] h-10"
            >
              Endustrı Muhendısı
            </option>
            <option
              value="bılgısayar muhendısı"
              className="hover:bg-[#FCF3CF] h-10"
            >
              Bılgısayar Muhendisi
            </option>
            <option className="hover:bg-[#FCF3CF] h-10">......</option>
          </select>
        </div>
      </div>
    </div>
  );
}
