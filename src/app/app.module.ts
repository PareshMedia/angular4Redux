import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { items } from './items';
import { HttpModule } from '@angular/http';
import { UserService } from './service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ items }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
