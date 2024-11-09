import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchEmployees,
  deleteEmployee,
} from "../features/employee/employeeSlice";
import { RootState, AppDispatch } from "../store";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Employee {
  id: string;
  name: string;
  age: number;
  department: string;
}

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { employees } = useSelector((state: RootState) => state.employees);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: string) => {
      setDeletingEmployeeId(id);
      dispatch(deleteEmployee(id)).finally(() => setDeletingEmployeeId(null));
    },
    [dispatch]
  );

  const handleViewProfile = useCallback(
    (id: string) => {
      navigate(`/profile/${id}`);
    },
    [navigate]
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>

      {employees.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="20vh"
        >
          <Typography variant="h6" gutterBottom>
            No employees found.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="table-header-bg">
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee: Employee, index: number) => (
                <TableRow key={employee.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employee.name || "-"}</TableCell>
                  <TableCell>{employee.department || "-"}</TableCell>
                  <TableCell>
                    {deletingEmployeeId === employee.id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ marginRight: 10 }}
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewProfile(employee.id)}
                        >
                          View Profile
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default EmployeeList;
