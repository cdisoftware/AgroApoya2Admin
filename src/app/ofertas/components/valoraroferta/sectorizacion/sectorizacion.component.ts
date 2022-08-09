import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sectorizacion',
  templateUrl: './sectorizacion.component.html',
  styleUrls: ['./sectorizacion.component.css']
})
export class SectorizacionComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Georgia'
    },
    {
      id: 2,
      name: 'Usa'
    },
    {
      id: 3,
      name: 'England'
    }
  ];

  selectSector(item: any) {

  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
