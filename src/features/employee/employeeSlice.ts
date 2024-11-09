import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee, EmployeeState } from "./employeeTypes";

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

// Fetch employees
export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const response = await axios.get("/api/employees");
  return response.data.employees;
});

// Add employee
export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employee: Employee) => {
    const response = await axios.post("/api/employees", employee);
    return response.data.employee;
  }
);

// Update employee
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (employee: Employee) => {
    const response = await axios.patch(
      `/api/employees/${employee.id}`,
      employee
    );
    return response.data.employee;
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string) => {
    await axios.delete(`/api/employees/${id}`);
    return id;
  }
);

// Reusable handlers
const handlePending = (state: EmployeeState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: EmployeeState, action: any) => {
  state.loading = false;
  state.error = action.error.message || "An error occurred";
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, handlePending)
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, handleRejected)
      .addCase(addEmployee.pending, handlePending)
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        state.loading = false;
      })
      .addCase(addEmployee.rejected, handleRejected)
      .addCase(updateEmployee.pending, handlePending)
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) state.employees[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateEmployee.rejected, handleRejected)
      .addCase(deleteEmployee.pending, handlePending)
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteEmployee.rejected, handleRejected);
  },
});

export default employeeSlice.reducer;
