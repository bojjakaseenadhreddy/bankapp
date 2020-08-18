import { AuthorizationInterceptor } from './interceptor/authorization.interceptor';
import { BranchModule } from './branch/branch.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngMaterialModule } from './ang-material/ang-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngMaterialModule,
    ReactiveFormsModule,
    CoreModule,
    AdminModule,
    BranchModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
