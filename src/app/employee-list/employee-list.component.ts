import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { AppService, Employee } from '../app.service';

@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[];
  employeesDataSource: MatTableDataSource<Employee>;
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
  constructor(private appService: AppService) {
    this.displayedColumns = [
      'id',
      'employeeName',
      'employeeSalary',
      'employeeAge'
    ];
    this.isError = false;
    this.errorMessage = '';
    this.isLoading = true;
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    console.log(
      'Employee list component initialized',
      this.appService.isLoggedIn
    );
    this.getEmployees();
  }

  getEmployees() {
    this.isLoading = true;
    this.appService.getEmployees().subscribe((response) => {
      const { employees, errors } = response;
      if (_.size(errors) > 0) {
        const { message } = _.first(errors);
        this.errorMessage = message;
        this.isError = true;
        console.log('Error data', this.isError, this.errorMessage);
      } else {
        console.log('Success data', employees);
        this.employeesDataSource = new MatTableDataSource<Employee>(employees);
        this.employeesDataSource.paginator = this.paginator;
        this.employeesDataSource.sort = this.sort;
      }
      this.isLoading = false;
    });
  }
}
