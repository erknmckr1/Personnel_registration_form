import { useUser } from "@/context/context";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FormStepTwo() {
  const { user, updateUser } = useUser();
  const [sectionData, setSectionData] = useState({
    sections: [],
    parts: [],
    titles: [],
  });
  const { gender, is_active, is_admin } = user;
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
      checkboxName === "op_section" ||
      checkboxName === "op_part" ||
      checkboxName === "op_title"
    ) {
      updateUser({ ...user, [checkboxName]: event.target.value });
    } else {
      updateUser({ ...user, [checkboxName]: event.target.checked });
    }
  };

  // veri tabanından sectıonları cek dropdownda listele
  useEffect(() => {
    const getSectıon = async () => {
      try {
        const response = await axios.get("/api/person/getSection");
        setSectionData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSectıon();
  }, []);

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
            checked={is_active}
            onChange={() => {
              handleCheck("is_active", event);
            }}
            type="checkbox"
            name="is_active"
          />{" "}
          is_active
        </label>
      </div>
      {/* checkboxes 2  */}
      <div className="w-full flex justify-start">
        <label className="p-4">
          <input
            checked={is_admin}
            onChange={() => {
              handleCheck("is_admin", event);
            }}
            type="checkbox"
            name="is_admin"
          />{" "}
          is_admin
        </label>
      </div>
      {/* sections dropdown */}
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
    </div>
  );
}
