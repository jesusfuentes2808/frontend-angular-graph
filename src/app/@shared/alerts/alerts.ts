import Swal from "sweetalert2";
import {EMAIL_PATTERN} from "@core/constants/regex";
import {TYPE_ALERT} from "@shared/alerts/values.config";

const swalWithBasicOptions = (title, html) => Swal.mixin({
  title,
  html,
  focusConfirm: false,
  cancelButtonText: 'Cancelar',
  showCancelButton: true,
});


export async  function formsBasicDialog(title: string, html: string, property: string){
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {

      const value = (document.getElementById('name') as HTMLInputElement).value;
      if(value) {
        return value;
      }

      Swal.showValidationMessage('Tienes que añadir un valor');
      return ;
    }
  })

}

export async  function userFormsBasicDialog(title: string, html: string){
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      let error = '';
      const name = (document.getElementById('name') as HTMLInputElement).value;
      if(!name) {
        error += 'Usuario es obligatorio <br>';
      }

      const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
      if(!lastname) {
        error += 'Apellido es obligatorio <br>';
      }

      const email = (document.getElementById('email') as HTMLInputElement).value;
      if(!email) {
        error += 'Email es obligatorio <br>';
      }

      console.log(email);
      console.log(EMAIL_PATTERN);
      if(!EMAIL_PATTERN.test(email)){
        error += 'Email no es correcto <br>';
      }

      const role = (document.getElementById('role') as HTMLInputElement).value;

      if(error !== ''){
        Swal.showValidationMessage(error);
        return ;
      }
      return {
        name,
        lastname,
        email,
        role,
        birthday: new Date().toISOString()
      };
    }
  })

}

/*export function infoDetailBasic(title, html, width){
  Swal.fire({
    title: title,
    text: html,
    width: width+'px',
  });
}*/

export async function  optionsWithDetails(
  title,
  html,
  width,
  confirmButtonText = '<i class="fas fa-edit"></i> Editar',
  cancelButtonText = '<i class="fas fa-lock"></i> Bloquear'
){
  return await Swal.fire({
    title,
    html,
    width: width+'px',
    icon: 'warning',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#dc3545',
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      console.log('editar');
      return true;
    } else {
      if(result.isDismissed && result.dismiss.toString() !== 'close'){
            console.log('Cancelar');
            return false;
          }
    }
  })
}


export const loadData = (title, html) => {
  Swal.fire({
    title,
    html,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    }
  })
}

export const infoEventAlert = async (title, html, typeAlert= TYPE_ALERT.WARNING) => {
  return await Swal.fire({
    title,
    html,
    icon: typeAlert,
    timer: 2000,
    timerProgressBar: true,
    preConfirm: () => {
      return true;
    }
  })
}

export const closeAlert = () => {
  Swal.close();
}
