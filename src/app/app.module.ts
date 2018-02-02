import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter';
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
    StoreModule.forRoot({ cityDetails: counterReducer })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
