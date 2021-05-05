import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module'
import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { ProductsComponent } from 'src/app/components/patrocinadores/products/products.component';
import { OptionalBoxComponent } from 'src/app/components/patrocinadores/optional-box/optional-box.component';
import { HeaderLandingComponent } from 'src/app/components/patrocinadores/header-landing/header-landing.component';
import { FooterComponent } from 'src/app/components/patrocinadores/footer/footer.component';
import { CarrouselDescriptionComponent } from 'src/app/components/patrocinadores/carrousel-description/carrousel-description.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { AnaliticsViewsComponent } from 'src/app/components/analitics-views/analitics-views.component'
import { ChangeComponent } from '../change/change.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { PostComponetsModule } from 'src/app/post-components/post-componets.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LandingPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [
    LandingPage,
    CarrouselDescriptionComponent,
    FooterComponent,
    HeaderLandingComponent,
    OptionalBoxComponent,
    CreateProductComponent,
    ProductsComponent,
    AnaliticsViewsComponent,
    ChangeComponent,
    PostComponetsModule
  ]
})
export class LandingPageModule {}
