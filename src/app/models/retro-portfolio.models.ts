export type WorkTab = 'contacto' | 'proyectos' | 'experiencia';
export type MobileSection = 'perfil' | 'skills' | WorkTab;
export type SkillFilter = 'todas' | 'tecnicas' | 'soft';
export type SkillIconPack = 'brands' | 'basic';

export interface SkillIcon {
  name: string;
  pack: SkillIconPack;
}

export interface Skill {
  id: string;
  icon: SkillIcon;
  category: Exclude<SkillFilter, 'todas'>;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  period: string;
  highlights: ExperienceHighlight[];
  type: 'professional' | 'volunteering';
}

export interface ExperienceHighlight {
  id: string;
}

export interface WorkstationProject {
  id: string;
  link: string;
  technologies: string[];
}

export interface ContactChannel {
  id: string;
  title: string;
  link: string;
  icon: string;
}
