import {Component, OnInit} from '@angular/core';
import {DocumentNode} from "graphql";
import {IResultData} from "@core/interfaces/result-data.interface";
import {GENRE_LIST_QUERY} from "@graphql/operations/query/genre";
import {ITableColumns} from "@core/interfaces/table-columns.interface";
import {formsBasicDialog, optionsWithDetails} from "@shared/alerts/alerts";
import {GenresService} from "./genres.service";
import {basicAlert} from "../../../@shared/alerts/toasts";
import {TYPE_ALERT} from "../../../@shared/alerts/values.config";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;

  constructor(private genreService: GenresService) { }

  ngOnInit(): void {
    this.context={};
    this.itemsPage = 10;
    this.resultData = {
      definitionKey: 'genres',
      listKey: 'genres',
    }
    this.include = false;
    this.columns = [{
      property: 'id',
      label: '#'
    }, {
      property: 'name',
      label: 'Nombre de género'
    }, {
      property: 'slug',
      label: 'Slug'
    }];
  }

  async takeAction($event){
    const action = $event[0];
    const genre = $event[1];
    const defaultValue = (genre.name !== undefined && genre.name !== '') ? genre.name : '';
    const html = `<input id="name" class="swal2-input" value="${defaultValue}">`;

    switch (action){
      case 'add':
        await this.addForm(html);
        break;
      case 'edit':
        await this.updateForm(genre, html);
        break;
      case 'info':
        const result = await optionsWithDetails('Detalles', `${genre.name} (${genre.slug})`, 350);

        if (result) {
          const result = await formsBasicDialog('Modificar Género', html, 'name');
          this.updateGenre(genre.id, result);
        } else if(result === false){
          await this.blockForm(genre);
        }
        break;
      case 'block':
        await this.blockForm(genre);
        break;
      default:
        break;
    }
  }

  private async addForm(html){
    const result = await formsBasicDialog('Añadir Género', html, 'name');
    this.addGenre(result);
  }

  private async updateForm(genre, html){
    const result = await formsBasicDialog('Modificar Género', html, 'name');
    this.updateGenre(genre.id, result);
  }

  private async blockForm(genre){
    const result = await optionsWithDetails('Estas seguro que quieres bloquear?', `Si bloqueas el item no aparecera en la lista`,
      400,
      'No, bloquear',
      'Si, bloquear'
    );

    if(result === false){
      this.blockGenre(genre.id);
    }
  }

  addGenre(result){
    if(result.value){
      this.genreService.add(result.value).subscribe(
        (res: any) => {
          if(res.status){
            basicAlert(TYPE_ALERT.SUCCESS, res.message)
          }
        }
      );
    }
  }

  updateGenre(id, result){
    if(result.value){
      this.genreService.update(id, result.value).subscribe(
        (res: any) => {
          if(res.status){
            basicAlert(TYPE_ALERT.SUCCESS, res.message)
          }
        }
      );
    }
  }

  blockGenre(id){
      this.genreService.block(id).subscribe(
        (res: any) => {
          if(res.status){
            basicAlert(TYPE_ALERT.SUCCESS, res.message)
            return;
          }
          basicAlert(TYPE_ALERT.WARNING, res.message)
        }
      );

  }
}
