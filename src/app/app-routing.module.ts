import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteUsuarioComponent } from './componentes/about/delete-usuario.component';
import { EditAboutComponent } from './componentes/about/edit-about.component';
import { NewUsuarioComponent } from './componentes/about/new-usuario.component';
import { ChangePasswordComponent } from './componentes/changepassword/change-password.component';
import { SendEmailComponent } from './componentes/changepassword/send-email.component';
import { EditEducacionComponent } from './componentes/educacion/edit-educacion.component';
import { NewEducacionComponent } from './componentes/educacion/new-educacion.component';
import { EditExperienciaComponent } from './componentes/experiencia/edit-experiencia.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { NewExperienciaComponent } from './componentes/experiencia/new-experiencia.component';
import { EditFrasesComponent } from './componentes/frases/edit-frases.component';
import { EditHardSoftSkillComponent } from './componentes/hard-soft-skills/edit-hard-soft-skill.component';
import { NewHardSoftSkillComponent } from './componentes/hard-soft-skills/new-hard-soft-skill.component';
import { HomeComponent } from './componentes/home/home.component';
import { EditIdiomasComponent } from './componentes/idiomas/edit-idiomas.component';
import { NewIdiomasComponent } from './componentes/idiomas/new-idiomas.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditProyectoComponent } from './componentes/proyectos/edit-proyecto.component';
import { NewProyectoComponent } from './componentes/proyectos/new-proyecto.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { EditCursoComponent } from './componentes/cursos/edit-curso.component';
import { NewCursoComponent } from './componentes/cursos/new-curso.component';
import { ModalInicioComponent } from './componentes/ayuda/modal-inicio.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nuevaexp', component: NewExperienciaComponent },
  { path: 'editexp/:id', component: EditExperienciaComponent },
  { path: 'experiencia', component: ExperienciaComponent },
  { path: 'exp/:id', component: ExperienciaComponent },
  { path: 'nuevaedu', component: NewEducacionComponent},
  { path: 'editedu/:id', component: EditEducacionComponent},
  { path: 'newskill', component: NewHardSoftSkillComponent},
  { path: 'editskill/:id', component: EditHardSoftSkillComponent},
  { path: 'newidioma', component: NewIdiomasComponent},
  { path: 'editidioma/:id', component: EditIdiomasComponent},
  { path: 'newproyecto', component: NewProyectoComponent},
  { path: 'editproyecto/:id', component: EditProyectoComponent},
  { path: 'proyecto', component: ProyectosComponent},
  { path: 'editfrases/:id', component: EditFrasesComponent},
  { path: 'editabout/:id', component: EditAboutComponent},
  { path: 'nuevousuario', component: NewUsuarioComponent},
  { path: 'delusuario', component: DeleteUsuarioComponent},
  { path: 'sendemail', component: SendEmailComponent},
  { path: 'email/changepassword/:tokenPassword', component: ChangePasswordComponent},
  { path: 'editCurso/:id', component: EditCursoComponent},
  { path: 'newCurso', component: NewCursoComponent},
  { path: 'modal', component: ModalInicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
