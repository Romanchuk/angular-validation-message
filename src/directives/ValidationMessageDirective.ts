import {
    AfterViewInit,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Inject,
    OnDestroy,
    Type,
    ViewContainerRef,
} from '@angular/core';

import { ValidationMessageComponent } from './../components/ValidationMessageComponent';

@Directive({
    selector: '[validationMessage]'
})
export class ValidationMessageDirective implements AfterViewInit, OnDestroy {

    private validationMessageComponent: ComponentRef<ValidationMessageComponent> = null;

    constructor(
      private viewContainer: ViewContainerRef,
      private componentFactoryResolver: ComponentFactoryResolver,
      @Inject(ValidationMessageComponent) private vmComp: Type<ValidationMessageComponent>
    ) {}

    ngAfterViewInit(): void {
      let factory = this.componentFactoryResolver.resolveComponentFactory(this.vmComp);
      this.ngOnDestroy();
      this.validationMessageComponent = this.viewContainer.createComponent(factory, null, this.viewContainer.injector);
      this.validationMessageComponent.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
       if (this.validationMessageComponent) {
         this.validationMessageComponent.changeDetectorRef.detach();
       }
    }

    
}
