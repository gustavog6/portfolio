import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Skill, SkillFilter } from '../../models/retro-portfolio.models';
import { SkillIconComponent } from './skill-icon.component';

@Component({
  selector: 'app-skills-matrix',
  standalone: true,
  imports: [SkillIconComponent, TranslatePipe],
  templateUrl: './skills-matrix.component.html',
  styleUrl: './skills-matrix.component.css',
})
export class SkillsMatrixComponent {
  readonly activeFilter = signal<SkillFilter>('todas');

  readonly skills: Skill[] = [
    { id: 'javascript', icon: { name: 'javascript', pack: 'brands' }, category: 'tecnicas' },
    { id: 'typescript', icon: { name: 'typescript', pack: 'brands' }, category: 'tecnicas' },
    { id: 'angular', icon: { name: 'angular', pack: 'brands' }, category: 'tecnicas' },
    { id: 'angularjs', icon: { name: 'angular', pack: 'brands' }, category: 'tecnicas' },
    { id: 'react', icon: { name: 'react', pack: 'brands' }, category: 'tecnicas' },
    { id: 'php', icon: { name: 'php', pack: 'brands' }, category: 'tecnicas' },
    { id: 'laravel', icon: { name: 'laravel', pack: 'brands' }, category: 'tecnicas' },
    { id: 'sql', icon: { name: 'my-sql', pack: 'brands' }, category: 'tecnicas' },
    { id: 'css', icon: { name: 'css3', pack: 'brands' }, category: 'tecnicas' },
    { id: 'html', icon: { name: 'html5', pack: 'brands' }, category: 'tecnicas' },
    { id: 'tailwind', icon: { name: 'tailwind-css', pack: 'brands' }, category: 'tecnicas' },
    { id: 'git', icon: { name: 'git', pack: 'brands' }, category: 'tecnicas' },
    { id: 'figma', icon: { name: 'figma', pack: 'brands' }, category: 'tecnicas' },
    { id: 'bootstrap', icon: { name: 'bootstrap', pack: 'brands' }, category: 'tecnicas' },
    { id: 'bulma', icon: { name: 'layout', pack: 'basic' }, category: 'tecnicas' },
    { id: 'python', icon: { name: 'python', pack: 'brands' }, category: 'tecnicas' },
    { id: 'flask', icon: { name: 'flask', pack: 'brands' }, category: 'tecnicas' },
    { id: 'scrum', icon: { name: 'refresh-cw', pack: 'basic' }, category: 'tecnicas' },
    { id: 'documentation', icon: { name: 'book-open', pack: 'basic' }, category: 'tecnicas' },
    {
      id: 'communication',
      icon: { name: 'message-detail', pack: 'basic' },
      category: 'tecnicas',
    },
    {
      id: 'ai-assisted-development',
      icon: { name: 'light-bulb', pack: 'basic' },
      category: 'tecnicas',
    },
    { id: 'adaptability', icon: { name: 'gestures', pack: 'basic' }, category: 'soft' },
    { id: 'flexibility', icon: { name: 'shuffle', pack: 'basic' }, category: 'soft' },
    { id: 'teamwork', icon: { name: 'group', pack: 'basic' }, category: 'soft' },
    {
      id: 'results-oriented',
      icon: { name: 'trending-up', pack: 'basic' },
      category: 'soft',
    },
    { id: 'management-planning', icon: { name: 'calendar-check', pack: 'basic' }, category: 'soft' },
    { id: 'leadership', icon: { name: 'crown', pack: 'basic' }, category: 'soft' },
  ];

  readonly filteredSkills = computed(() => {
    const filter = this.activeFilter();
    return filter === 'todas'
      ? this.skills
      : this.skills.filter((skill) => skill.category === filter);
  });

  setFilter(filter: SkillFilter): void {
    this.activeFilter.set(filter);
  }
}
