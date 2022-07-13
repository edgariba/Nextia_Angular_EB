import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonAlerts } from 'src/app/common-alerts';
import { UsersService } from 'src/app/providers/users-service/users.service';

@Component({
  selector: 'app-actions-users',
  templateUrl: './actions-users.component.html',
  styleUrls: ['./actions-users.component.css']
})
export class ActionsUsersComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: true })
  formDirective: FormGroupDirective;
  formUsuario: FormGroup;
  isLoading: boolean = false;
  isUpdate: boolean = false;
  hashUser: any
  usuario: any
  //textos
  titulo: string;
  subtitulo: string;
  botonAccion: string;

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private activeRoute: ActivatedRoute, private router: Router,
    private comonAlerts: CommonAlerts, private usersService: UsersService) {
  }

  ngOnInit() {
    this.validateFormulario()
    this.checkTypeRoute()
  }

  validateFormulario() {
    this.formUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      name: ['', [Validators.maxLength(250)]],
      password: ['', [Validators.maxLength(250), Validators.required]],
      lastName: ['', [Validators.maxLength(250)]],
    })
  }

  checkTypeRoute() {
    this.activeRoute.data.subscribe((ruteo: any) => {
      if (ruteo.ruta == "editar") {
        this.isUpdate = true;
        this.titulo = 'Editar Usuario'
        this.subtitulo = "Aquí puedes editar los datos del usuario."
        this.botonAccion = 'Guardar'
        this.hashUser = this.activeRoute.snapshot.params['hashUser']
        this.disableValidators("password")
        this.getUsuarioByHash()
      } else {
        if (ruteo.ruta == "nuevo") {
          this.isUpdate == false;
          this.addValidators("password")
          this.titulo = 'Añadir Usuario'
          this.subtitulo = 'Aquí puedes crear tantos usuarios desees.'
          this.botonAccion = 'Añadir'
        } else {
          this.goToListUsuarios()
        }

      }
    }
    );
  }


  addOrUpdateCliente() {
    if (!this.formUsuario.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      hashUser: this.hashUser,
      email: this.formUsuario.value.email,
      name: this.formUsuario.value.name,
      lastName: this.formUsuario.value.lastName,
      password: this.formUsuario.value.password
    }
    if (this.isUpdate) {
      let bodyUpdate = JSON.stringify(params);
      this.usersService.updateUser(bodyUpdate).subscribe({
        next: (response) => {
          if (response.code == 200) {
            this.comonAlerts.showSuccess(response.message)
            this.goToListUsuarios()
          } else {
            this.comonAlerts.showWarnning(response.message)
          }
        },
        error: (e) => {
          console.log("eeror>>", e);
          this.comonAlerts.showToastError(e);
        },
        complete: () => this.terminateSpinner()
      }
      )
    } else {
      let body = JSON.stringify(params);
      this.usersService.addUser(body).subscribe({
        next: (response) => {
          if (response.code == 200) {
            this.resetData()
            this.comonAlerts.showSuccess(response.message)
          } else {
            this.comonAlerts.showWarnning(response.message)
          }
        },
        error: (e) => {
          console.log("eeror>>", e);
          this.comonAlerts.showToastError(e);
        },
        complete: () => this.terminateSpinner()
      }
      )
    }
  }

  getUsuarioByHash() {
    this.loadSpinner()
    this.usersService.getByHash(this.hashUser).subscribe({
      next: (response) => {
        if (response.header.code == 200) {
          this.usuario = response.data;          
          this.formUsuario.controls['name'].setValue(this.usuario.name);
          this.formUsuario.controls['lastName'].setValue(this.usuario.lastName);
          this.formUsuario.controls['email'].setValue(this.usuario.email);   
        } else {
          this.comonAlerts.showWarnning(response.header.message)
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.comonAlerts.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    }
    )
  }

  goToListUsuarios() {
    this.router.navigate(['/usuarios'])
  }

  resetData() {
    this.formUsuario.reset()
    this.formDirective.resetForm()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  get f() {
    return this.formUsuario.controls;
  }


  disableValidators(validators: any) {
    this.formUsuario.get(validators)?.clearValidators();
    this.formUsuario.get(validators)?.updateValueAndValidity();
  }

  addValidators(validators: any) {
    this.formUsuario.get(validators)?.setValidators([Validators.required]);
    this.formUsuario.get(validators)?.updateValueAndValidity();
  }
}

export interface Ruteo {
  ruta: string
}