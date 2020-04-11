import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

// import { Employee } from '../../shared/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  // user: Employee = new Employee('','','',false,'0','', false);
  //message: any;

  constructor(public service: EmployeeService,
              public departmentService: DepartmentService,
              public notificationService: NotificationService,
              public dialogRef: MatDialogRef<EmployeeComponent>) { }

  // departments = [
  //   { id: 1, value: 'Sales'},
  //   { id: 2, value: 'Engineering'},
  //   { id: 3, value: 'Marketing'},
  //   { id: 4, value: 'Services'}
  // ];

  ngOnInit(): void {
    this.service.getEmployees();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
        this.service.insertEmployee(this.service.form.value);
      } else {
      this.service.updateEmployee(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  // public registerNow(){
  // let resp=this.service.doRegistration(this.service);
  // resp.subscribe((data)=>this.message=data);
  // }

}

