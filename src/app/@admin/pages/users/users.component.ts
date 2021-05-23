import { Component, OnInit } from '@angular/core';
import {DocumentNode} from "graphql";
import {IResultData} from "@core/interfaces/result-data.interface";
import {USERS_LIST_QUERY} from "@graphql/operations/query/user";
import {ITableColumns} from "@core/interfaces/table-columns.interface";
import {$e} from "codelyzer/angular/styles/chars";
import {formsBasicDialog, optionsWithDetails, userFormsBasicDialog} from "@shared/alerts/alerts";
import {UsersAdminService} from "@admin/pages/users/users-admin.service";
import {IRegisterForm} from "@core/interfaces/register.interface";
import {basicAlert} from "@shared/alerts/toasts";
import {TYPE_ALERT} from "@shared/alerts/values.config";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  query: DocumentNode;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;

  constructor(private service: UsersAdminService) { }

  ngOnInit(): void {
    this.query = USERS_LIST_QUERY;
    this.context={};
    this.itemsPage = 4;
    this.resultData = {
      definitionKey: 'users',
      listKey: 'users',
    }
    this.include = true;
    this.columns = [{
      property: 'id',
      label: '#'
    }, {
      property: 'name',
      label: 'Nombre'
    }, {
      property: 'lastname',
      label: 'Apellidos'
    }, {
      property: 'email',
      label: 'Email'
    }, {
      property: 'role',
      label: 'Permiso'
    }];
  }

  private initializeForm(user:any){
    const defaultName = user.name !== undefined && user.name !== '' ? user.name : '';
    const defaultLastName = user.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
    const defaultEmail = user.email !== undefined && user.email !== '' ? user.email : '';
    const roles = new Array(2);
    roles[0] = user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';;
    roles[1] = user.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';;;
    return `
        <input id="name" class="swal2-input" value="${defaultName}" placeholder="Nombre">
        <input id="lastname" class="swal2-input" value="${defaultLastName}" placeholder="Apellidos">
        <input id="email" class="swal2-input" value="${defaultEmail}" placeholder="Email">
        <select id="role" class="swal2-input">
            <option value="ADMIN" ${roles[0]}>Administrador</option>
            <option value="CLIENT" ${roles[1]}>Cliente</option>
        </select>
    `;
  }

  async takeAction($event){
    const action = $event[0];
    const user = $event[1];
    /*const defaultValue = (genre.name !== undefined && genre.name !== '') ? genre.name : '';*/
    const html = this.initializeForm(user);

    switch (action){
      case 'add':
        await this.addForm(html);
        break;
      case 'edit':
        await this.updateForm(html, user);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${user.name} ${user.lastname} <br>
                <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,
          350);

        if(result){
          this.updateForm(html, user);
        } else if(result === false) {
          this.blockUser(user.id);
        }

        break;
      case 'block':
        await this.blockForm(user);
        break;
      default:
        break;
    }
  }

  private async addForm(html){
    const result = await userFormsBasicDialog('Añadir usuario', html);
    console.log(result);
    this.addUser(result);
  }

  private async updateForm(html, user){
    const result = await userFormsBasicDialog('Modificar usuario', html);
    this.updateUser(result, user.id);
  }

  private async blockForm(user){
    console.log("TEST");
    console.log(user);
    const result = await optionsWithDetails('Estas seguro que quieres bloquear el usuario?', `Si bloqueas el item no aparecera en la lista`,
      400,
      'No, bloquear',
      'Si, bloquear'
    );

    if(result === false){
      this.blockUser(user.id);
    }
  }

  private blockUser(id){
    this.service.block(id).subscribe(
      (res: any) => {
        if(res.status){
          basicAlert(TYPE_ALERT.SUCCESS, res.message)
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message)
      }
    );
  }

  private addUser(result){
    if(result.value){
      const user: IRegisterForm = result.value;
      user.password = '1234';
      user.active = false;
      this.service.register(user).subscribe(
        (res: any) => {
          console.log(res);
          if(res.status){
            basicAlert(TYPE_ALERT.SUCCESS, res.message);
            return;
          }
          basicAlert(TYPE_ALERT.WARNING, res.message);
        }
      );
    }

  }

  private updateUser(result, id){
    if(result.value){
      const user = result.value;
      user.id = id;
      this.service.update(user).subscribe(
        (res: any) => {
          console.log(res);
          if(res.status){
            basicAlert(TYPE_ALERT.SUCCESS, res.message);
            return;
          }
          basicAlert(TYPE_ALERT.WARNING, res.message);
        }
      );
    }

  }
}
