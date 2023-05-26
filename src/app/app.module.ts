import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AboutComponent } from './componentes/about/about.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { RedesSocialesComponent } from './componentes/redes-sociales/redes-sociales.component';
import { IdiomasComponent } from './componentes/idiomas/idiomas.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { DropdownsHeaderComponent } from './componentes/dropdowns-header/dropdowns-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { interceptorProvider } from './service/interceptor-service';
import { NewExperienciaComponent } from './componentes/experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './componentes/experiencia/edit-experiencia.component';
import { EditEducacionComponent } from './componentes/educacion/edit-educacion.component';
import { NewEducacionComponent } from './componentes/educacion/new-educacion.component';
import { HardSoftSkillsComponent } from './componentes/hard-soft-skills/hard-soft-skills.component';
import { EditHardSoftSkillComponent } from './componentes/hard-soft-skills/edit-hard-soft-skill.component';
import { NewHardSoftSkillComponent } from './componentes/hard-soft-skills/new-hard-soft-skill.component';
import { NewIdiomasComponent } from './componentes/idiomas/new-idiomas.component';
import { EditIdiomasComponent } from './componentes/idiomas/edit-idiomas.component';
import { NewProyectoComponent } from './componentes/proyectos/new-proyecto.component';
import { EditProyectoComponent } from './componentes/proyectos/edit-proyecto.component';
import { EditFrasesComponent } from './componentes/frases/edit-frases.component';
import { EditAboutComponent } from './componentes/about/edit-about.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NewUsuarioComponent } from './componentes/about/new-usuario.component';
import { DeleteUsuarioComponent } from './componentes/about/delete-usuario.component';
import { ChangePasswordComponent } from './componentes/changepassword/change-password.component';
import { SendEmailComponent } from './componentes/changepassword/send-email.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { NewCursoComponent } from './componentes/cursos/new-curso.component';
import { EditCursoComponent } from './componentes/cursos/edit-curso.component';
import { PdfComponent } from './componentes/pdf/pdf.component';
import { ModalInicioComponent } from './componentes/ayuda/modal-inicio.component';
// import { ColorPickerModule  } from 'ngx-color-picker';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AboutComponent,
    BannerComponent,
    EducacionComponent,
    ExperienciaComponent,
    ProyectosComponent,
    RedesSocialesComponent,
    IdiomasComponent,
    FooterComponent,
    DropdownsHeaderComponent,
    LoginComponent,
    HomeComponent,
    NewExperienciaComponent,
    NewEducacionComponent,
    EditExperienciaComponent,
    EditEducacionComponent,
    HardSoftSkillsComponent,
    EditHardSoftSkillComponent,
    NewHardSoftSkillComponent,
    NewIdiomasComponent,
    EditIdiomasComponent,
    NewProyectoComponent,
    EditProyectoComponent,
    EditFrasesComponent,
    EditAboutComponent,
    NewUsuarioComponent,
    DeleteUsuarioComponent,
    ChangePasswordComponent,
    SendEmailComponent,
    CursosComponent,
    NewCursoComponent,
    EditCursoComponent,
    PdfComponent,
    ModalInicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,

    // ColorPickerModule,
    // NgxColorPickerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),

  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
