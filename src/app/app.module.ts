import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { items } from './items';
import { HttpModule } from '@angular/http';
import { UserService } from './service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ items })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
