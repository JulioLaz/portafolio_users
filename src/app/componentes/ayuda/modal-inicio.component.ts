// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-inicio',
  templateUrl: './modal-inicio.component.html',
  styleUrls: ['./modal-inicio.component.css']
})
export class ModalInicioComponent implements OnInit {

  @Input() showModal: boolean=true;
  constructor(
    private router:Router
  ) { }

  // showModal = true;

  closeModal() {
    this.showModal = false;
    // document.body.classList.remove("modal-open");
    this.router.navigate(['/']);

  }

  ngOnInit(): void {
  }

}


