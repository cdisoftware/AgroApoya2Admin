import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comboofertas',
  templateUrl: './comboofertas.component.html',
  styleUrls: ['./comboofertas.component.css']
})
export class ComboofertasComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  //Nombre combo
  NombreCombo: string = "";


  //Lista Estados
  ArrEstados: any = [];
  KeywordEstado: string = "Estado";
  IdEstado: string = "0";

  //FechaOfertas
  FechaOfertas: string = "";

  //Grilla
  ArrGrilla: any = [];

  //Array Targuetas
  ArrayTagetas: any = [];

  //ArrayCombo
  ArrayNuevoCombo: any = [];

  //Buscar y o  crear
  VerBuscarCombo: boolean = false;
  VerCrearCombo: boolean = false;

  //Sector
  ArraySector: any = [];
  KeywordSector: string = "Sector";

  //ImagenComboOferta
  ImagenPreCarga: string = "../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png";
  ImagenCargada: string = '';
  file: FileList | undefined;
  NomImagen: string = '0';

  ngOnInit(): void {
    for (var i = 0; i < 10; i++) {
      this.ArrEstados.push({ IdEstado: (i + 1), Estado: "Estado " + (i + 1) });
      this.ArraySector.push({ IdSector: (i + 1), Sector: "Sector " + (i + 1) });
      this.ArrGrilla.push({ Id: (i + 1), Nombre: "Prueba " + (i + 1), Image: ".../../../../../../../assets/ImagenesAgroApoya2Adm/ic_Agro.png", Fecha: (i + 1) + "/01/2023", Estado: "Estado " + (i + 1) })
      this.ArrayTagetas.push({
        Image: ".../../../../../../../assets/ImagenesAgroApoya2Adm/ic_Agro.png", NombreProd: "Zanahoria " + (i + 1), DescripcionProd: "PRB-MANDARINA VERDE", Estado: "Estado " + (i + 1),
        Fecha: (i + 1) + "/01/2023", Unidades: (i + 1), Valor: (i + 1) + "0000"
      })
    }
  }

  Accion(bandera: string) {
    if (bandera == "1") {
      this.VerBuscarCombo = true;
      this.VerCrearCombo = false;
    } else if (bandera == "2") {
      this.VerCrearCombo = true;
      this.VerBuscarCombo = false;
    }
  }

  //Estado
  SelectEstado(item: any) {
    console.log(item)
    this.IdEstado = item.IdEstado;
  }
  LimpiarEstado() {
    this.IdEstado = "0";
  }



  //Grilla
  AbreModalConfirmacion(ModalConfirmacion: any) {
    this.modalService.dismissAll();
    this.modalService.open(ModalConfirmacion, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  //Select oferta
  SelectOfertaCheck() {
    this.ArrayNuevoCombo = [];
    for (var i = 0; i < this.ArrayTagetas.length; i++) {
      var check = <HTMLInputElement>document.getElementById("check" + i);
      if (check.checked == true) {
        console.log("check" + i)
        this.ArrayNuevoCombo.push({ DescripcionProd: this.ArrayTagetas[i].DescripcionProd, Estado: this.ArrayTagetas[i].Estado, Fecha: this.ArrayTagetas[i].Fecha, Image: this.ArrayTagetas[i].Image, NombreProd: this.ArrayTagetas[i].NombreProd, Unidades: this.ArrayTagetas[i].Unidades, Valor: this.ArrayTagetas[i].Valor })
      }
    }
    console.log(this.ArrayNuevoCombo)
  }


  public CargaImagen(event: any, imagen: string) {
    this.ImagenCargada = imagen;
    this.file = event.target.files[0];
    console.log(event.target.files[0])
    if (this.ImagenCargada == '1') {
      this.ImagenPreCarga = event.target.files[0].name;
      this.NomImagen = event.target.files[0].name;
    }
  }

}
