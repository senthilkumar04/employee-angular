import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AppService, Employee } from '../app.service';

@Component({
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  employeeId: string;
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  constructor(private appService: AppService, private route: ActivatedRoute) {
    this.employee = null;
    this.isError = false;
    this.errorMessage = '';
    this.isLoading = true;
  }

  ngOnInit() {
    console.log('Employee Details component initialized');
    this.route.params.subscribe((params) => {
      this.employeeId = params['id'];
      this.getEmployeeDetails();
    });
  }

  getEmployeeDetails() {
    this.isLoading = true;
    this.appService
      .getEmployeeById(this.getEmployeeIdRequest())
      .subscribe((response) => {
        const { employee, errors } = response;
        if (_.size(errors) > 0) {
          const { message } = _.first(errors);
          this.errorMessage = message;
          this.isError = true;
          console.log('Error data', this.isError, this.errorMessage);
        } else {
          this.employee = employee;
          console.log('Success data', this.employee);
        }
        this.isLoading = false;
      });
  }

  private getEmployeeIdRequest() {
    return {
      params: {
        id: this.employeeId,
      },
    };
  }
}
