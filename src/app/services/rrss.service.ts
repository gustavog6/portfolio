import { Injectable } from '@angular/core';
import { RRSS } from './../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class RrssService {
  constructor() {}

  rrss: RRSS[] = [
    {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/gustavo-gonzález-granadillo/',
      icon: 'bx bxl-linkedin',
    },
    {
      title: 'Github',
      link: 'https://github.com/gustavog6/',
      icon: 'bx bxl-github',
    },
    {
      title: 'Telegram',
      link: 'telegram.com',
      icon: 'bx bxl-telegram',
    },
    {
      title: 'Instagram',
      link: 'https://instagram.com/gustavog46',
      icon: 'bx bxl-instagram-alt',
    },
    {
      title: 'Resume',
      link: 'https://flowcv.com/resume/5qslvhgimr',
      icon: '',
    },
    {
      title: 'Whatsapp',
      link: 'https://api.whatsapp.com/send?phone=584148527145&text=Hola%2C%20Gustavo!%0ARecientemente%20estuve%20revisando%20tu%20curr%C3%ADculo.%0AQuer%C3%ADa%20conversar%20acerca%20de%20ello%2C%20te%20escribo%20de%20la%20empresa%3A%20',
      icon: 'bx bxl-whatsapp',
    },
  ];
}
