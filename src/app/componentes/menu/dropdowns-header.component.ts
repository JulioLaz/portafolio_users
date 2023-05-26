import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dropdowns-header',
  templateUrl: './dropdowns-header.component.html',
  styleUrls: ['./dropdowns-header.component.css']
})
export class DropdownsHeaderComponent implements OnInit {

  constructor(
    private router:Router,
    public location:Location
  ) { }

  ngOnInit(): void {
  }
  
  modal_up(): void {
    this.router.navigateByUrl('/modal');
  }
}
