import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'components', loadChildren: () => import('./routes/components/components.module').then(m => m.ComponentsModule) }, 
{ path: 'checkpoints', loadChildren: () => import('./routes/checkpoints/checkpoints.module').then(m => m.CheckpointsModule) }, 
{ path: 'bom', loadChildren: () => import('./routes/bom/bom.module').then(m => m.BomModule) }, 
{ path: 'bom/:id', loadChildren: () => import('./routes/bom/bom.module').then(m => m.BomModule) }, 
{ path: 'income', loadChildren: () => import('./routes/income/income.module').then(m => m.IncomeModule) }, 
{ path: 'outcome', loadChildren: () => import('./routes/outcome/outcome.module').then(m => m.OutcomeModule) },
{ path: 'bom/edit/:id', loadChildren: () => import('./routes/bom/edit/edit.module').then(m => m.EditModule) },
{ path: 'auth', loadChildren: () => import('./routes/auth/auth.module').then(m => m.AuthModule) },
{ path: 'logout', loadChildren: () => import('./routes/logout/logout.module').then(m => m.LogoutModule) },
{ path: 'income/gp', loadChildren: () => import('./routes/income/gp/gp.module').then(m => m.GpModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
