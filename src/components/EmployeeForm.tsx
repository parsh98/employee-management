import React from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employee/employeeSlice";
import { AppDispatch } from "../store";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface EmployeeFormValues {
  name: string;
  age: string;
  department: string;
  experience: string;
}

const EmployeeForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: EmployeeFormValues = {
    name: "",
    age: "",
    department: "",
    experience: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required")
      .min(1, "Age must be greater than 0")
      .max(99, "Age must be less than or equal to 99"),
    department: Yup.string().required("Department is required"),
    experience: Yup.string().required("Experience is required"),
  });

  const handleSubmit = async (
    values: EmployeeFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true);
    const id = uuidv4();
    await dispatch(addEmployee({ id, ...values, age: Number(values.age) }));
    resetForm();
    setSubmitting(false);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" pt={4}>
        <Typography variant="h4" gutterBottom>
          Add New Employee
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "300px",
                margin: "auto",
                marginBottom: 10,
              }}
            >
              <Field
                as={TextField}
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                required
              />
              <Field
                as={TextField}
                label="Age"
                name="age"
                type="number"
                variant="outlined"
                fullWidth
                error={touched.age && Boolean(errors.age)}
                helperText={touched.age && errors.age}
                required
              />
              <Field
                as={TextField}
                label="Department"
                name="department"
                variant="outlined"
                fullWidth
                error={touched.department && Boolean(errors.department)}
                helperText={touched.department && errors.department}
                required
              />
              <Field
                as={TextField}
                label="Experience"
                name="experience"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={touched.experience && Boolean(errors.experience)}
                helperText={touched.experience && errors.experience}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Add Employee"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeForm;
