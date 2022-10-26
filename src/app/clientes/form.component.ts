import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();

  public titulo: string = "Crear Cliente";

  public errores!: string[];
  constructor(private clienteService: ClienteService, private router: Router,
    private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
    this.update()
  }

  cargarCliente(): void {
    this.activeRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }
  public create(): void {
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.log('Codigo del error desde el backend:' + err.status);
        console.log(err.error.errors);

      }
    );

  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.apellido}`, 'success')
      }

      );
  }
}
