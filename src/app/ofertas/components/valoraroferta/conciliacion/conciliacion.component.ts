import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'

@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit {

  NombreProductor: string = '';
  DesProducto: string = '';
  Tamano: string = '';
  Presentacion: string = '';
  Descripcion: string = '';
  Caracterizacion: string = '';
  ValorUnidad: string = '';
  Unidades: string = '';
  FechaRecogida: string = '';
  Jornada: string = '';
  Direccion: string = '';
  ValorTotal: string = '';
  IdOferta: string = '1006';
  mcObservacion: string = '';
  IdUsuario: string = '495';
  ArrayOferta: any = [];
  ImagenOferta: string = '';
  ArrayJornada: any = [];
  ValidaSiguiente: string = '0'

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private modalService: NgbModal,
    public rutas: Router
  ) { }

  ngOnInit(): void {
    this.ConsultaOferta();
  }

  Enviar() {
    this.rutas.navigateByUrl('/home/sectorizar')
  }

  EditaOferta(modalEditar: any) {
    this.ServiciosValorar.ConsultaJornada('1').subscribe(Resultado => {
      this.ArrayJornada = Resultado;
    })
    this.modalService.open(modalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  DeclinarOferta(modalDeclinar: any) {
    this.modalService.open(modalDeclinar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  SelEJornada(seleccion: string) {

  }

  AceptarDeclinar() {
    this.modalService.dismissAll();
  }

  AceptaEditar() {
    this.modalService.dismissAll();
  }

  ConsultaOferta() {
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      console.log(Resultado)
      this.NombreProductor = Resultado[0].Nombre_productor;
      this.DesProducto = Resultado[0].Nombre_Producto;
      this.Tamano = Resultado[0].Tamaño;
      this.Presentacion = Resultado[0].Descripción_empaque;
      this.Descripcion = Resultado[0].caracteristicas;
      this.Caracterizacion = Resultado[0].caracterizacion;
      this.ValorUnidad = Resultado[0].VR_UNDAD_EMPQUE;
      this.Unidades = Resultado[0].Unidades_disponibles;
      this.FechaRecogida = Resultado[0].fecha_recogida;
      this.Jornada = Resultado[0].Nombre_jornada;
      this.Direccion = Resultado[0].coordenadas_parcela;
      this.ValorTotal = Resultado[0].VR_TOTAL_OFRTA;
      this.ImagenOferta = this.SeriviciosGenerales.RecuperaRutaImagenes() + Resultado[0].IMAGEN;
    })
  }

  AprobarOferta(modalAprobar: any){
    this.modalService.open(modalAprobar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  AceptarAprobar(){
    this.modalService.dismissAll();
    this.ValidaSiguiente = '1';
  }

}
