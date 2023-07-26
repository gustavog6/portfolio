import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BtnBoxiconComponent } from './components/btn-boxicon/btn-boxicon.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TagComponent } from './components/tag/tag.component';

import { DialogModule } from '@angular/cdk/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EducationComponent } from './components/education/education.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    BtnBoxiconComponent,
    ContactComponent,
    HeroComponent,
    PortfolioComponent,
    ProjectDialogComponent,
    SkillsComponent,
    TagComponent,
    NavbarComponent,
    EducationComponent
  ],
  imports: [
    BrowserModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
