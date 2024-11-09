import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

const Main = () => {
  return (
    <div className="light-grey-bg">
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
};

export default Main;
