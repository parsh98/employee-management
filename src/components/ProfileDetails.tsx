import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import {
  fetchEmployees,
  updateEmployee,
  deleteEmployee,
} from "../features/employee/employeeSlice";

interface EditableEmployee {
  name: string;
  age: number;
  department: string;
  experience: string;
}

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state: RootState) =>
    state.employees.employees.find((emp) => emp.id === id)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editableEmployee, setEditableEmployee] = useState<EditableEmployee>({
    name: "",
    age: 0,
    department: "",
    experience: "",
  });

  useEffect(() => {
    if (!employee) {
      dispatch(fetchEmployees()).catch((error) => {
        console.error("Failed to fetch employees:", error);
      });
    } else {
      setEditableEmployee({
        name: employee.name,
        age: employee.age,
        department: employee.department,
        experience: employee.experience || "",
      });
    }
  }, [dispatch, employee]);

  const handleSave = useCallback(() => {
    if (employee) {
      dispatch(updateEmployee({ ...editableEmployee, id: employee.id }));
      setIsEditing(false);
    }
  }, [dispatch, employee, editableEmployee]);

  const handleGoBackToList = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteEmployee(id!));
    navigate("/");
  }, [dispatch, id, navigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableEmployee((prev) => ({ ...prev, [name]: value }));
  }, []);

  if (!employee) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Employee not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="light-blue-bg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 2 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoBackToList}
        >
          Back To List
        </Button>
        <Box display="flex" gap={2}>
          {!isEditing && (
            <>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Typography variant="h4" gutterBottom>
        Profile Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Name:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              value={editableEmployee.name}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1">{employee.name}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Age:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              name="age"
              value={editableEmployee.age}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1">{employee.age}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Department:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              name="department"
              value={editableEmployee.department}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1">{employee.department}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Experience:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="experience"
              value={editableEmployee.experience}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1">{employee.experience}</Typography>
          )}
        </Grid>
      </Grid>
      {isEditing && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      )}
    </Container>
  );
};

export default ProfileDetails;
