import { Component, OnInit } from '@angular/core';
import { Service1ApiService } from "../core/services/service1Api.service";

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit {

  Results: any = [];
  path: string;

  constructor(
    public service1Api: Service1ApiService
  ) { }

  ngOnInit() {
    this.loadService1()
  }

  // Get Service1 (results)
  loadService1() {
    return this.service1Api.getService1().subscribe((data: {}) => {
      this.Results = data;
    })
  }

}
