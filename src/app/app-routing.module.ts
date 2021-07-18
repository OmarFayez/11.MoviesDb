import { Auth2Guard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PeopleComponent } from './people/people.component';
import { RegisterComponent } from './register/register.component';
import { TvComponent } from './tv/tv.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"home",canActivate:[AuthGuard],component:HomeComponent},
  {path:"movies",canActivate:[AuthGuard],component:MoviesComponent},
  {path:"moviedetails/:type/:id",canActivate:[AuthGuard],component:MoviedetailsComponent},
  {path:"tv",canActivate:[AuthGuard],component:TvComponent},
  {path:"search/:x",canActivate:[AuthGuard],component:SearchComponent},
  {path:"people",canActivate:[AuthGuard],component:PeopleComponent},
  {path:"login",canActivate:[Auth2Guard],component:LoginComponent},
  {path:"register",canActivate:[Auth2Guard],component:RegisterComponent},
  {path:"**",component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
