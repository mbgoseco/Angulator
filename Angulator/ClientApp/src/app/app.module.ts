import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { NumKeysComponent } from './num-keys/num-keys.component';
import { KeypadService } from './keypad.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    NumKeysComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
    ],
    providers: [KeypadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
