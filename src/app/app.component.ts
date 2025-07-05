import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NavbarComponent,
        HeroComponent,
        AboutMeComponent,
        SkillsComponent,
        PortfolioComponent,
        EducationComponent,
        ContactComponent,
    ],
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  ngOnInit(): void {
    initFlowbite();
  }
}
