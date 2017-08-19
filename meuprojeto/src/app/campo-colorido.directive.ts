import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: '[appCampoColorido]',
  exportAs: 'campoColorido'
})
export class CampoColoridoDirective {

  @HostBinding('style.backgroundColor') corDeFundo: string;
  @Input('appCampoColorido') cor: string = 'gray';

  constructor(
    //private elementRef: ElementRef,
    //private renderer: Renderer2
  ) {}

  @HostListener('focus') colorir() {
    this.corDeFundo = this.cor;

    /*this.renderer.setStyle(this.elementRef.nativeElement,
      'background-color', 'yellow');*/
   }

   @HostListener('blur') descolorir() {
    this.corDeFundo = 'transparent';

    /*this.renderer.setStyle(this.elementRef.nativeElement,
      'background-color', 'transparent');*/
   }

}
