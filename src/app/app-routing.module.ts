import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
    ], { useHash: true })
  ],
  providers: [
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
