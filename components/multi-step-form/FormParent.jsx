import AddressForm from "@/components/multi-step-form/AddressForm";
import FormStepTwo from "@/components/multi-step-form/FormStepTwo";
import FormStepThree from "@/components/multi-step-form/FormStepThree";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "@/context/context";
import OutsideClickHandler from "react-outside-click-handler";

function FormParent(props) {
  const { user } = useUser();
  const { setShowForm } = props;

  const cancelShowForm = () => {
    setShowForm(false);
  };
  const steps = ["Step 1", "Step 2", "Step 3"];
  const [activeStep, setActiveStep] = useState(0);

  const isStepSkipped = (step) => {
    return false;
  };

  // next form &&  post person data && updated data
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const person = {
        person_id: user.firstId,
        second_id: user.secondId,
        first_name: user.firstName,
        last_name: user.lastName,
        address_short: user.addresShort,
        address_long: user.addressLong,
        person_city: user.city,
        person_state: user.state,
        person_country: user.country,
        person_phonenumber: user.phonenumber,
        person_email: user.email,
        person_gender: user.gender,
        person_date: user.date,
        is_active: user.isActive,
        is_admin: user.isAdmin,
        is_supervisor: user.isSupervizor,
        is_validator: user.isValidator,
        is_master: user.isMaster,
        is_left_work: user.isleftwork,
        person_section: user.section,
        person_department: user.department,
        person_profession: user.profession,
      };
      try {
        const response = await axios.post("/api/person", person);
        if (response.status === 200) {
          toast.success("Person başarıyla eklendiasdasdsads");
          console.log("Person başarıyla eklendi");
          cancelShowForm();
          //resetUser();
        } else {
          toast.error("Person eklenirken bir hata oluştu.");
          console.log("Person eklenirken bir hata oluştu.");
        }
      } catch (err) {
        toast.error("Person eklenirken bir hata oluştu.");
        console.log(err);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // previos form
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="absolute bg-black bg-opacity-80 top-0 left-0 h-screen w-screen  grid place-content-center">
      <div className="w-full h-full flex justify-center items-center">
        <OutsideClickHandler
          onOutsideClick={() => {
            setShowForm(false);
          }}
        >
          <div className="w-[750px] h-auto bg-white rounded-[15px] border border-1-black ">
            <div className="w-full h-auto p-5">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </div>
            {activeStep === 0 ? (
              <AddressForm />
            ) : null}
            {activeStep === 1 ? (
              <FormStepTwo  />
            ) : null}
            {activeStep === 2 ? (
              <FormStepThree
                
              />
            ) : null}
          </div>
        </OutsideClickHandler>
      </div>

      {/* <button
        onClick={cancelShowForm}
        className="absolute top-10 right-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Cancel
      </button>  */}
    </div>
  );
}

export default FormParent;
