import * as Yup from 'yup';

export const personFormSchema = Yup.object({
    name:Yup.string().required("Name is required"),
    surname:Yup.string().required("Surname is required"),
    phoneNumber:Yup.string().required("PhoneNumber is required"),
    email:Yup.string().required("Required"),
    address:Yup.string().max(200,"Must be 200 characters or less"),
    city:Yup.string(),
    gender:Yup.string(),
    

})