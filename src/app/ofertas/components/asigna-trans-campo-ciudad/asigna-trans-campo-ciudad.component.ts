import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearofertaService } from 'src/app/core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-asigna-trans-campo-ciudad',
  templateUrl: './asigna-trans-campo-ciudad.component.html',
  styleUrls: ['./asigna-trans-campo-ciudad.component.css']
})
export class AsignaTransCampoCiudadComponent implements OnInit {

  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;

  RespuestaModal: string = '';
  VerOcultarCampos: string = '1';

  ArrayTransportistas: any = [];
  keywordTrans: string = 'NMBRE_CNDCTOR';
  IdTransportista: string = '0';
  NombreConductor: string = '';

  IdOfertaSeleccion: string = '0';
  arrayOfertas: any = []
  keywordSecOferta: string = 'Producto'


  FechaDesde: string = '0';
  FechaHasta: string = '0';


  //buscar
  arregloTransportes: any = [];

  //#region Departamento
  ArrayDepa: any = [];
  keywordDepartamento: string = "";
  IdDepartamento: string = "0";
  Departamento: string = '';
  IndexDepartamentoInsert: number = 0;
  //#endregion Departamento
  //#region Ciudad
  ArrayCiud: any;
  keywordCiudad: string = '';
  IdCiudadBodega: string = "0";
  Ciudad: string = '';
  IndexCiudadInsert: number = 0;
  //#endregion Ciudad

  FechaRecoge: string = '';
  VlrFlete: string = '';
  ArrayBodegas: any = [];
  keywordBodega: string = 'NombreBodega';
  IdBodega: string = '';

  ArrayProductos: any = [];
  keywordProduct: string = 'Descripcion';
  IdProduct: string = '';

  Cantidad: string = '';

  DataQuery: any[];

  blockProducts: boolean = false;
  constructor(private ServiciosOferta: CrearofertaService,
    private modalService: NgbModal,
    private serviciosvaloracion: ValorarofertaService,) { }


  ngOnInit(): void {
    this.ConsultaTransportistas();
    this.ListaOfertas();
    this.ConsultaDepartamentos();
    this.ConsultaCiudad();
    this.ConsultaBodegas();
    this.ConsultaPorductosTransporte();
    this.ContadorProduct = -1;
  }

  //Region Buscar
  ConsultaTransportistas() {
    this.serviciosvaloracion.ConsultaConductores('2', '0', '0').subscribe(Resultado => {
      this.ArrayTransportistas = Resultado
    })
  }
  selecTrans(item: any) {
    this.IdTransportista = item.ID_CNDCTOR;
    this.NombreConductor = item.NMBRE_CNDCTOR
  }
  LimpiaTrans() {
    this.IdTransportista = '';
  }


  ListaOfertas() {
    const datosbusqueda = {
      UsuCodig: 1,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: '0',
      VigenciaHasta: '0',
      IdEstado_Oferta: '0',
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.serviciosvaloracion.BusquedaOferta('7', '0', '0', '0', datosbusqueda).subscribe(Resultado => {
      this.arrayOfertas = Resultado;
    })
  }
  SeleccionarOferta(item: any,) {
    this.IdOfertaSeleccion = item.cd_cnsctvo;
  }
  LimpiarOferta() {
    this.IdOfertaSeleccion = '0';
  }

  Buscar(modalBuscar: any) {
    this.IdTransporte = '';
    const body = {
      fechaDesde: this.FechaDesde,
      fechaHasta: this.FechaHasta,
      NombreTrans: this.NombreConductor
    }

    this.ServiciosOferta.ConsultaAsignaTransport('1', this.IdOfertaSeleccion, '0', body).subscribe(resultado => {
      if (resultado.length == 0) {
        this.RespuestaModal = 'No hay resultados.';
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      } else {
        this.arregloTransportes = resultado;
        //this.IdTransporte = resultado[0].IdTrans;
        this.modalService.open(modalBuscar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }
    })
  }
  LimpTransportista: string;
  Limpcnctivo: string = '';
  LimpDep: string = '';
  LimpCiudad: string = '';
  LimpBodega: string = '';

  LimpiarBusqueda() {
    this.IdTransporte = '';
    this.VerOcultarCampos = '1';
    this.LimpTransportista = '';
    this.Limpcnctivo = '';
    this.FechaDesde = '0';
    this.FechaHasta = '0';
    this.ContadorProduct = -1;
    this.Cantidad = '';
    this.blockProducts = false;
  }
  Crear() {
    this.blockProducts = false;
    this.contadorBodga = -1;
    this.contadorTranspor = -1;
    this.contadorDep = -1;
    this.contadorCiudad = -1;
    this.FechaRecoge = '0';
    this.VlrFlete = '';
    this.VerOcultarCampos = '2';
    this.banderaAgregar = '1';
  }



  contadorBodga: number = 0;
  contadorDep: number = 0;
  contadorCiudad: number = 0;
  contadorTranspor: number = 0;


  AuxUbicacion: string = '';
  EditarTRansporte(transporte: any) {
    this.VerOcultarCampos = '2';
    this.banderaAgregar = '2';
    this.VerOcultarCampos = '3';

    this.AuxUbicacion = transporte.UbicacionRecoge.split('-');;
    this.Departamento = this.AuxUbicacion[0].trim();
    this.Ciudad = this.AuxUbicacion[1].trim();

    this.FechaRecoge = transporte.FechaRecoge;
    this.VlrFlete = transporte.ValorFlete;
    this.IdTransportista = transporte.IdCondutor;
    this.IdTransporte = transporte.IdTrans;
    this.IdBodega = transporte.idBodegaEntrega;

    this.contadorBodga = 0;
    for (var i = 0; this.ArrayBodegas.length > i; i++) {
      if (this.ArrayBodegas[i].IdBodega == this.IdBodega) {
        this.contadorBodga = i;
      }
    }

    this.contadorTranspor = 0;
    if (this.IdTransportista != null) {
      for (var i = 0; this.ArrayTransportistas.length > i; i++) {
        if (this.ArrayTransportistas[i].ID_CNDCTOR == this.IdTransportista) {
          this.contadorTranspor = i;
        }
      }
    } else {
      this.contadorTranspor = -1;
    }


    this.contadorDep = 0;
    for (var i = 0; this.ArrayDepa.length > i; i++) {
      if (this.ArrayDepa[i].DSCRPCION == this.Departamento) {
        this.contadorDep = i;
      }
    }
    this.contadorCiudad = 0;
    for (var i = 0; this.ArrayCiud.length > i; i++) {
      if (this.ArrayCiud[i].DSCRPCION == this.Ciudad) {
        this.contadorCiudad = i;
      }
    }

    this.modalService.dismissAll();
    this.ConsultaRelaOferTransp()
  }
  arregloElimina: any;
  EstasSeguro(arreglo: any, templateEstasSeguro: any) {
    this.arregloElimina = arreglo;
    this.RespuestaModal = "Estas a punto de eliminar el transporte #" + arreglo.IdTrans + ", estas seguro?";
    this.modalService.open(templateEstasSeguro, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  EliminaTRansporte() {
    this.modalService.dismissAll();

    const body = {
      UbicacionRecoge: this.arregloElimina.UbicacionEntrega,
      ValorFlete: this.arregloElimina.ValorFlete,
      FechaRecoge: this.arregloElimina.FechaRecoge,
      IdConductor: this.arregloElimina.IdCondutor,
      IdBodegaEntrega: this.arregloElimina.idBodegaEntrega,
      IdTransporte: this.arregloElimina.IdTrans
    }
    this.serviciosvaloracion.GuardarAsignTransptes('4', body).subscribe(resultado => {
      this.ConsultaRelaOferTransp();
    })
  }


  //Fin Region Buscar



  //REGION CREAR ASIGNACION DE TRANSPORTE
  //#region  Departamento
  ConsultaDepartamentos() {
    this.ArrayDepa = [];
    this.ServiciosOferta.ConsultaDepartamento('4').subscribe(Resultado => {
      this.ArrayDepa = Resultado;
      this.keywordDepartamento = "DSCRPCION";
    })
  }
  selectDepartamento(item: any) {
    this.IdDepartamento = item.CD_RGION;
    this.Departamento = item.DSCRPCION.toString();
    this.ConsultaCiudad();
  }
  LimpiaDepartamento(value: string) {
    this.IdDepartamento = "0";
    this.Departamento = value;

    this.LimpiaCiudad('');
  }
  //#endregion Departamento
  //#region Ciudad
  ConsultaCiudad() {
    this.ArrayCiud = [];
    this.ServiciosOferta.ConsultaCiudad(this.IdDepartamento).subscribe(Resultado => {
      this.ArrayCiud = Resultado;
      this.keywordCiudad = "DSCRPCION";
    })
  }
  SelectCiudad(item: any) {
    this.IdCiudadBodega = item.CD_MNCPIO;
    this.Ciudad = item.DSCRPCION.toString();
  }
  LimpiaCiudad(value: string) {
    this.IdCiudadBodega = "0";
    this.Ciudad = value;
  }
  //#endregion Ciudad


  ConsultaBodegas() {
    this.serviciosvaloracion.ConsultaTipoBodegas('1').subscribe(Resultado => {
      this.ArrayBodegas = Resultado;
    })
  }
  selecBodg(item: any) {
    this.IdBodega = item.IdBodega;
  }
  LimpiaBodg(campo: string) {
    this.IdBodega = campo;
  }


  IdTransporte: string = '';
  banderaAgregar: string = '1';
  Guardar(Bandera: string) {
    this.banderaActualiza = '1';
    if (this.Departamento == null || this.Departamento == '') {
      this.RespuestaModal = 'El campo Departamento de salida es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.Ciudad == null || this.Ciudad == '') {
      this.RespuestaModal = 'El campo Ciudad de salida es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.FechaRecoge == null || this.FechaRecoge == '') {
      this.RespuestaModal = 'El campo Fecha recogida es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.IdBodega == null || this.IdBodega == '') {
      this.RespuestaModal = 'El campo Bodega es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.VlrFlete == null || this.VlrFlete == '') {
      this.RespuestaModal = 'El campo Valor flete es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {
      var AuxUbicacion: string;
      var AuxRespuesta: string[];

      AuxUbicacion = this.Departamento + ' - ' + this.Ciudad;

      if (Bandera == '2') {
        const body = {
          UbicacionRecoge: AuxUbicacion,
          ValorFlete: this.VlrFlete,
          FechaRecoge: this.FechaRecoge,
          IdConductor: this.IdTransportista,
          IdBodegaEntrega: this.IdBodega,
          IdTransporte: 0
        }

        this.serviciosvaloracion.GuardarAsignTransptes(Bandera, body).subscribe(resultado => {
          AuxRespuesta = resultado.split("|");
          this.IdTransporte = AuxRespuesta[0].trim();
          this.RespuestaModal = AuxRespuesta[1].trim();
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.ConsultaRelaOferTransp();
          this.VerOcultarCampos = '3';
          this.banderaAgregar = '2';
        })
      } else if (Bandera == '3') {
        const body = {
          UbicacionRecoge: AuxUbicacion,
          ValorFlete: this.VlrFlete,
          FechaRecoge: this.FechaRecoge,
          IdConductor: this.IdTransportista,
          IdBodegaEntrega: this.IdBodega,
          IdTransporte: this.IdTransporte
        }

        this.serviciosvaloracion.GuardarAsignTransptes(Bandera, body).subscribe(resultado => {
          AuxRespuesta = resultado.split("|");
          this.RespuestaModal = AuxRespuesta[1].trim();
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.ConsultaRelaOferTransp();
        })
      }
    }
  }

  ConsultaRelaOferTransp() {
    this.serviciosvaloracion.ConsultaRelaOferTransp('1', this.IdTransporte).subscribe(Resultado => {
      this.DataQuery = Resultado;
      // Calcular la suma total de cantidades
      this.totalCantidad = this.DataQuery.reduce((total, data) => total + data.cantidad, 0);
      this.totalPeso = this.DataQuery.reduce((total, data) => total + parseFloat(data.PesoKilos), 0);

    })
  }
  totalCantidad: number = 0;
  totalPeso: number = 0;

  // ConsultaRelaOferTranspAux() {
  //   this.serviciosvaloracion.ConsultaRelaOferTransp('1', this.IdTransporte).subscribe(Resultado => {
  //     this.DataQuery = Resultado;
  //     // Calcular la suma total de cantidades
  //     this.totalCantidad = this.DataQuery.reduce((total, data) => total + data.cantidad, 0);
  //     this.totalPeso = this.DataQuery.reduce((total, data) => total + parseFloat(data.PesoKilos), 0);
  //   })
  // }


  TipoProducto: string = '';
  cnsctvoProducto: string = '';
  ConsultaPorductosTransporte() {
    this.serviciosvaloracion.ConsultaPorductosTransporte('1').subscribe(Resultado => {
      this.ArrayProductos = Resultado;
    })
  }
  selecProduct(item: any) {
    this.IdProduct = item.IdProducto;
    this.TipoProducto = item.TipoProducto;
    this.cnsctvoProducto = item.cd_cnctivo;
  }
  LimpiaProduct(campo: string) {
    this.IdProduct = campo;
  }

  banderaActualiza: string = '1';
  AgregarProducto(bandera: string) {
    this.LimpTransportista = '';
    if (this.IdProduct == null || this.IdProduct == '' || this.IdProduct == undefined) {
      this.RespuestaModal = 'El campo Productos es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else if (this.Cantidad == null || this.Cantidad == '') {
      this.RespuestaModal = 'El campo Cantidad es obligatorio.';
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {

      if (bandera == '2') {
        const body = {
          Id: 0,
          IdTrans: this.IdTransporte,
          IdTipoProducto: this.TipoProducto,
          IdProducto: this.IdProduct,
          Cantidad: this.Cantidad,
          cd_cnsctvo: this.cnsctvoProducto
        }

        this.serviciosvaloracion.AgregaProductoTransport(bandera, body).subscribe(resultado => {
          const SMSBD = resultado.split('|');
          this.RespuestaModal = SMSBD[1].trim();
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.Cantidad = '';
          this.ContadorProduct = -1;
          this.ConsultaRelaOferTransp()
        })
      } else if (bandera == '3') {
        const body = {
          Id: this.AuxId,
          IdTrans: this.IdTransporte,
          IdTipoProducto: this.TipoProducto,
          IdProducto: this.IdProduct,
          Cantidad: this.Cantidad,
          cd_cnsctvo: this.cnsctvoProducto
        }
        this.serviciosvaloracion.AgregaProductoTransport(bandera, body).subscribe(resultado => {

          const SMSBD = resultado.split('|');
          this.RespuestaModal = SMSBD[1].trim();
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.Cantidad = '';
          this.ContadorProduct = -1;
          this.blockProducts = false;
          this.banderaActualiza = '1';
          this.ConsultaRelaOferTransp();
        })
      }
    }
  }


  AuxId: string = '';
  ContadorProduct: number = 0;
  EditarProduct(producto: any) {
    this.blockProducts = true;
    this.banderaActualiza = '2';
    this.AuxId = producto.id;
    this.IdTransporte = producto.IdTran;
    this.TipoProducto = producto.TipoProducto;
    this.IdProduct = producto.IdProducto;
    this.Cantidad = producto.cantidad;
    this.cnsctvoProducto = producto.cd_cnsctvo

    this.ContadorProduct = 0;
    for (var i = 0; this.ArrayProductos.length > i; i++) {
      if (this.ArrayProductos[i].IdProducto == this.IdProduct) {
        this.ContadorProduct = i;
      }
    }
  }


  arrEliminaProduct: any;
  EliminaProdModal(arreglo: any, templateEstasSeguro: any) {
    this.arrEliminaProduct = arreglo;
    this.RespuestaModal = "Estas a punto de eliminar el producto " + arreglo.Descripcion + ", estas seguro?";
    this.modalService.open(templateEstasSeguro, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  EliminaProducto() {
    this.modalService.dismissAll();

    const body = {
      Id: this.arrEliminaProduct.id,
      IdTrans: this.arrEliminaProduct.IdTran,
      IdTipoProducto: this.arrEliminaProduct.TipoProducto,
      IdProducto: this.arrEliminaProduct.IdProducto,
      Cantidad: this.arrEliminaProduct.cantidad,
      cd_cnsctvo: this.arrEliminaProduct.cd_cnsctvo
    }
    this.serviciosvaloracion.AgregaProductoTransport('4', body).subscribe(resultado => {
      this.ConsultaRelaOferTransp()
      this.Cantidad = '';
      this.banderaActualiza = '1';
    })
  }

  //FIN REGION CREAR ASIGNACION DE TRANSPORTE
}
