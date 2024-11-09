export interface Employee {
  id: string;
  name: string;
  age: number;
  department: string;
  experience?: string;
}

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}
