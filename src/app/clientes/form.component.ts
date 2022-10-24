import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();

  public titulo:string = "Crear Cliente";
  constructor(private clienteService: ClienteService, private router:Router, 
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
    this.update()
  }
  
    cargarCliente():void{
    this.activeRouter.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }
  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con exito`,'success')
      }
      
    );
    
  }

  update():void{
    console.log("Entrando a actualizar  metodo")
    this.clienteService.update(this.cliente)
    .subscribe(cliente => 
      {
          this.router.navigate(['/clientes'])
          swal('Cliente Actualizado',`Cliente ${cliente.nombre} actualizado con éxito! ` , 'success')
        }
      
    );
  }
}
