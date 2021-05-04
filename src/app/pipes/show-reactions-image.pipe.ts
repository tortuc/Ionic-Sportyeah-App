import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "showReactionsImage",
})
export class ShowReactionsImagePipe implements PipeTransform {
  transform(type: number): unknown {
    
    switch (type) {
      case 1:
        return "/assets/images/like.png";

      case 2:
        return "assets/images/lovely.png";

      case 3:
        return "assets/images/haha.png";

      case 4:
        return "assets/images/wow.png";

      case 5:
        return "assets/images/sad.png";

      case 6:
        return "assets/images/angry.png";

      case 7:
        // return "assets/images/level1.png";
        return "assets/images/crush.png";
        
      case 8:
        return "assets/images/level2.png";
      
      case 9:
        return "assets/images/level3.png";

      case 10:
        // return "assets/images/level4.png";
        return "assets/images/legion.png";

      case 11:
        // return "assets/images/level5.png";
        return "assets/images/lol.png";

      case 12:
        return "assets/images/me_sirve.png";

      case 13:
        return "assets/images/bro.png";

      case 14:
        return "assets/images/fachero.png";

      case 15:
        return "assets/images/ban.png";

      case 16:
        return "assets/images/troll.png";
    
      case 17:
        return "assets/images/chill.png";

      case 18:
        return "assets/images/cringe.png";
      
      case 19:
        return "assets/images/admin.png";
          
      case 20:
        return "assets/images/hype.png";
        
      case 21:
        return "assets/images/random.png";
        
      case 22:
        return "assets/images/meh.png";
            
      case 23:
        return "assets/images/wtf.png";
           
      case 24:
        return "assets/images/idk.png";
         
      case 25:
        return "assets/images/omg.png";
         
        default:
        return "/assets/images/like.png";
    }
  }
}
