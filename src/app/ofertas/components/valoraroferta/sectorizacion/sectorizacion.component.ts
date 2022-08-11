import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sectorizacion',
  templateUrl: './sectorizacion.component.html',
  styleUrls: ['./sectorizacion.component.css']
})
export class SectorizacionComponent implements OnInit {
  DesSect: string = '';
  CoordeSect: string = '';
  Cant: string ='';
  VlrFle: string ='';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.DesSect = '';
    this.CoordeSect='';
    this.Cant='';
    this.VlrFle='';

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


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  selectSector(item: any) {
    console.log(item)
  }

  LimpiaForm() {
    window.location.reload();
  }

}
