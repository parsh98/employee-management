import { createServer, Model, Factory, Response } from "miragejs";
import { Employee } from "../features/employee/employeeTypes";
import { ModelDefinition } from "miragejs/-types";

const EmployeeModel: ModelDefinition<Employee> = Model.extend({});

export function makeServer() {
  createServer({
    models: {
      employee: EmployeeModel,
    },

    factories: {
      employee: Factory.extend({
        name: "John Doe",
        age: 30,
        department: "Engineering",
        experience:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Quisquam, quos.",
      }),
    },

    seeds(server) {
      // Create 10 sample employees
      server.createList("employee", 10);
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => schema.all("employee"));

      this.post("/employees", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("employee", attrs);
      });

      this.patch("/employees/:id", (schema, request): any => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);
        if (employee) {
          return employee.update(attrs);
        } else {
          return new Response(404, {}, { error: "Employee not found" });
        }
      });

      this.del("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const employee = schema.find("employee", id);
        if (employee) {
          employee.destroy();
          return new Response(204, {}, {});
        } else {
          return new Response(404, {}, { error: "Employee not found" });
        }
      });
    },
  });
}
