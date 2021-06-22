import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directive.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsSharedModule } from 'src/app/shared-components/components-shared.module';
import { CountryFilterComponent } from './country-filter/country-filter.component';
import { SportsFilterComponent } from './sports-filter/sports-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    PipesModule,
    DirectivesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsSharedModule,
    ComponentsModule
  ],
  declarations: [SearchPage,CountryFilterComponent,SportsFilterComponent]
})
export class SearchPageModule {}
