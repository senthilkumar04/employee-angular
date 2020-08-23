import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isLoggedIn: boolean;
  private httpOptions: any;

  constructor(private http: HttpClient) {
      console.log('App service constructor called');
      this.isLoggedIn = false;
      this.httpOptions = {
        withCredentials: true
      };
  }

  public setIsLoggedIn(isLoggedIn) {
    console.log('Setting isLoggedIn value', isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }

  public getEmployees(): Observable<EmployeesResponse> {
    const url = `/assets/employees.json`;
    console.log('employee url', url);
    return this.http.get(url, this.httpOptions)
    .pipe(
        map(employees => this.mapEmployeesResponse(employees))
    )
  }
  private mapEmployeesResponse(employees): EmployeesResponse {
    let response: EmployeesResponse = {
        employees: [],
        errors: []
    };
    if(this.isErrorResponse(employees)) {
        response.errors.push({
            code: 10001,
            message: "Unable to fetch the employees. Please try again later"
        })
    }
    else {
        response.employees = employees.data.map((employee) => {
            return {
                id: employee.id,
                employeeName: employee.employee_name,
                employeeSalary: employee.employee_salary,
                employeeAge: employee.employee_age,
                profileImage: employee.profile_image,
                employeeLink:`employees/${employee.id}`
            }
        })
    }
    return response;
  }

  public getEmployeeById(req): Observable<EmployeeResponse> {
    const { id: employeeId } = req.params;
    const url = `/assets/employees.json`;
    return this.http.get(url, this.httpOptions)
    .pipe(
        map(employees => this.mapEmployeeResponse(employees, employeeId))
    )
  }
  private mapEmployeeResponse(employees, employeeId): EmployeeResponse {
    let response: EmployeeResponse = {
        employee: null,
        errors: []
    };
    if(this.isErrorResponse(employees)) {
        response.errors.push({
            code: 10001,
            message: "Unable to fetch the employees. Please try again later."
        })
    }
    else {
        const { data = [] } = employees; 
        if(data && _.size(data) > 0) {
            const employeeData = _.find(data, (employee) => {
                return employee.id === employeeId;
            });
            if(employeeData) {
                response.employee = {
                    id: employeeData.id,
                    employeeName: employeeData.employee_name,
                    employeeSalary: employeeData.employee_salary,
                    employeeAge: employeeData.employee_age,
                    profileImage: employeeData.profile_image
                }
            }
            else {
                response.errors.push({
                    code: 10002,
                    message: "Unable to fetch the employee data. Please try again later."
                })
            }
        }
        else {
            response.errors.push({
                code: 10002,
                message: "Unable to fetch the employee data. Please try again later."
            })
        }
    }
    return response;
  }

  private isErrorResponse(data) {
    return !data || data.status !== 'success' || !_.isObject(data);
  }
}

export interface EmployeesResponse {
    employees: Employee[];
    errors: Error[];
}

export interface EmployeeResponse {
    employee: Employee;
    errors: Error[];
}

export interface Employee {
    id: string;
    employeeName: string;
    employeeSalary: string;
    employeeAge: string;
    profileImage: string;
    employeeLink?: string;
}

export interface Error {
    code: number;
    message: string;
}
