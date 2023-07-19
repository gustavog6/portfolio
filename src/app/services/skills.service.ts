import { Injectable } from '@angular/core';

import { Skills } from './../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor() {}

  techSkills: Skills[] = [
    {
      title: 'Javascript',
      icon: 'bx bxl-javascript',
    },
    {
      title: 'Angular',
      icon: 'bx bxl-angular',
    },
    {
      title: 'React',
      icon: 'bx bxl-react',
    },
    {
      title: 'HTML',
      icon: 'bx bxl-html5',
    },
    {
      title: 'CSS',
      icon: 'bx bxl-css3',
    },
    {
      title: 'TailwindCSS',
      icon: 'bx bxl-tailwind-css',
    },
    {
      title: 'Github',
      icon: 'bx bxl-github',
    },
    {
      title: 'Wordpress',
      icon: 'bx bxl-wordpress',
    },
    {
      title: 'Meta for Developers',
      icon: 'bx bxl-meta',
    },
    {
      title: 'Wit.ai',
      icon: 'bx bx-conversation',
    },
    {
      title: 'Angular CDK',
      icon: 'bx bxl-angular',
    },
  ];

  softSkills: Skills[] = [
    {
      title: 'Flexibility',
      svg: './../../assets/svg/stretching-exercises-svgrepo-com.svg',
    },
    {
      title: 'Team worker',
      svg: './../../assets/svg/team-3-svgrepo-com.svg',
    },
    {
      title: 'Adaptability',
      svg: './../../assets/svg/engine-gear-setting-svgrepo-com.svg',
    },
    {
      title: 'Thinker',
      svg: './../../assets/svg/bulb-on-svgrepo-com.svg',
    },
    {
      title: 'Communicative',
      svg: './../../assets/svg/chat-alt-svgrepo-com.svg',
    },
  ];
}
