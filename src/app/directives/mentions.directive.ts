import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LangsPage } from '../langs/langs.page';
import { User, UserService } from '../service/user.service';

@Directive({
  selector: '[Mentions]',
  host: {
    '(keyup)': 'mentions($event)',
    '(click)':'mentions($event)'
  }
})
export class MentionsDirective {

  constructor(
    private el: ElementRef,
    private userService:UserService
    ) {
    
   }

   @Output() usersRender = new EventEmitter<any>()  // emite un evento con un array de los usuarios que coinciden en el match
   @Output() mention = new EventEmitter<any>() // emite un evento con el nuevo valor del innerHTML con el usuario mencionado


   /**
    * Esta funcion la llama la funcion `getCaretPosition()`
    * @param node 
    * @param func 
    */
  node_walk(node, func) {
    var result = func(node);
    for(node = node.firstChild; result !== false && node; node = node.nextSibling)
      result = this.node_walk(node, func);
    return result;
  };

  /**
   * Esta funcion se utiliza para obtener el caret en el input 
   * @param elem 
   */
  getCaretPosition(elem) {
    var sel = window.getSelection();
    var cum_length = [0, 0];
  
    if(sel.anchorNode == elem)
      cum_length = [sel.anchorOffset, sel.focusOffset];
    else {
      var nodes_to_find = [sel.anchorNode, sel.focusNode];
      if(!elem.contains(sel.anchorNode) || !elem.contains(sel.focusNode))
        return undefined;
      else {
        var found:any = [0,0];
        var i;
        this.node_walk(elem, function(node) {
          for(i = 0; i < 2; i++) {
            if(node == nodes_to_find[i]) {
              found[i] = true;
              if(found[i == 0 ? 1 : 0])
                return false; // all done
            }
          }
  
          if(node.textContent && !node.firstChild) {
            for(i = 0; i < 2; i++) {
              if(!found[i])
                cum_length[i] += node.textContent.length;
            }
          }
        });
        cum_length[0] += sel.anchorOffset;
        cum_length[1] += sel.focusOffset;
      }
    }
    if(cum_length[0] <= cum_length[1])
      return cum_length;
    return [cum_length[1], cum_length[0]];
  }

/**
 * Esta funcion la llama la funcion `setCurrentCursorPosition()`
 * @param node 
 * @param chars 
 * @param range 
 */
  createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }
    
    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                 range.setEnd(node, chars.count);
                 chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = this.createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                   break;
                }
            }
        }
   } 

   return range;
};




/**
 * Esta funcion coloca el caret del input donde le indiquemos
 * @param chars 
 */
setCurrentCursorPosition(chars) {
    if (chars >= 0) {
        var selection = window.getSelection();

        let range = this.createRange(this.el.nativeElement.parentNode, { count: chars },null);

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};


// posicion del caret al momento de seleccionar un usuario
public pos = 0
public usersMetions = [];
// la cadena que vamos a reemplazar
match:string = null

/**
 * Esta funcion es para mencionar un usuario que el cliente de click
 * @param {User} user 
 */
public setUser(user:User){
  
  // Obtenemos su Full name
  let fullname = `${user.name} ${user.last_name}`
  // El innerHTML que vamos a reemplazar
  let innerHTML = this.el.nativeElement.innerHTML
  
  // Remplazamos el `match` con la la etiqueta `<a>` que hace que puedas desplazarte a su perfil 
  this.el.nativeElement.innerHTML = innerHTML.replace(this.match,`<a class="user" href="/user/${user.username}">${fullname}</a>`)
  
  // Añadimos al array de usuarios mecionados, para el fix del caret
  this.usersMetions.push({
    fullname,
    url: `<a class="user" href="/user/${user.username}">${fullname}</a>`
  });

  // Limpiamos el array de menciones dobles
  this.usersMetions = this.usersMetions.filter((v,i,a)=>a.findIndex(t=>(t.fullname === v.fullname ))===i)
  
  // una vez que esta reemplazado el texto, este emite el nuevo html para que se pueda asignar ese valor su respectiva variable de control
  this.mention.emit(this.el.nativeElement.innerHTML)

  // Una vez que la variable de control tenga el nuevo valor, se acomoda el caret del input al final del nombre del usuario
  this.setCurrentCursorPosition((this.pos - this.match.length) + fullname.length )
  
  // Se actualiza tambien el valor de pos
  this.pos = (this.pos - this.match.length) + fullname.length
  // Se limpea los usuarios a renderizar  
  this.usersRender.emit([])
  
}

/**
 * Esta funcion hace toda la magia, para poder encontrar los usuarios que estas intentando mencionar, siempre va a buscar tu lista de siguiendo
 * 
 */
async mentions(){
  // obtenemos el value del input o el div editable
  let value:string = this.el.nativeElement.innerText
  
  // obtenemos la posicion del caret en este momento
  let pos = this.getCaretPosition(this.el.nativeElement)      

  // La posicion final la guardamos en la variable global `pos`
  this.pos = pos[1]
   
  // buscamos todas las coincidencias de usuarios en el texto
  let matchs = value.match(/@[a-zA-z0-9 ]*/g) || []

  // si no hay, entonces limpeamos los usuarios renderizar (esto ayuda cuando ya hay usuarios y se borra el texto del usuario)
  if(matchs.length == 0){
    this.usersRender.emit([])
  }

  // Recorremos todos los matchs
    matchs.forEach((match)=>{
      // creamos una variable con el contenido del match
      let m = value.match(match)

      // obtenemos el rango desde donde empieza hasta donde termina ese match
      let range = [m.index,m.index + m[0].length]
      
      // Si el caret se encuentra entre el match, se buscaran usuarios que coincidan
      if(range[0] <= pos[1] && pos[1] <= range[1]){
        // agarramos y pegamos todo el nombre por si existen espacios, quitamos el @ y ponemos todo en minusculas para que no importe si busca en minuscula o mayusculas
        let string = m[0].replace(" ",'').replace('@','').toLowerCase()
        // Buscamos en nuestros amigos alguno que coincida con el patron
        let userMatchs = this.userService.followings.filter((user)=>{
          // Pegamos nombre, apellido y username y los ponemos minisculas para que coincida con el patron
            let find = user.user.name + user.user.last_name + user.user.username
            find = find.replace(' ','').toLowerCase()
            return find.includes(string)
        })
        // Retorna los que encontramos 
        this.usersRender.emit(userMatchs)
        // Guardamos el match en el global por si el cliente da clic a un usuario
        this.match = match
      }else{
        this.usersRender.emit([])
      }
    })
}

}
