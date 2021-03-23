import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[Currency]',
  host: {
    '(keyup)'         : 'currency($event)',
    '(keydown.enter)' : 'prevent($event)',
    '(keydown.space)' : 'prevent($event)',
    '(focus)'         : 'currency($event)'
  }
})
export class CurrencyDirective {


  
  constructor(
    private el: ElementRef

  ) {
    
   }

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


/**
 * Emite el valor nuevo formateado
 */

@Output() value = new EventEmitter()


/**
 * Cambia el valor del input cada vez que es llamada por el evento keyup
 * @param ev 
 */
  currency(ev){

    try {
      let caret = this.getCaretPosition(this.el.nativeElement)
      

      let value = this.el.nativeElement.innerText
      
      let number = value.replace(/\D/g,'');    
      
      number = parseInt(number, 10) / 100
      
      if(isNaN(number)){
        number = 0
      }
      
      
      
      let price = new Intl.NumberFormat('de-DE',{minimumFractionDigits:2}).format(number.toFixed(2))
      
      this.el.nativeElement.innerText = price    
      this.value.emit(price)

  
      let pos = (caret)?caret[1]:price.length
  

      if(caret != undefined && caret[1] > price.length){
        pos = price.length
      }

      this.setCurrentCursorPosition(pos)

    } catch (error) {
      
      
      // handle
    }
   


    
  }

  /**
   * Evita que hagan salto de linea
   * @param ev 
   */
  prevent(ev){
    ev.preventDefault()
  }
}
