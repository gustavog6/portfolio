import { Injectable } from '@angular/core';
import { Projects } from './../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor() {}

  projects: Projects[] = [
    {
      title: 'Trello Clone',
      link: 'https://trello-clone-gustavog6.netlify.app/',
      technologies: [
        'Angular',
        'Javascript',
        'HTML',
        'TailwindCSS',
        'Angular CDK',
      ],
      img: './../../../assets/images/TrelloClone.png',
      description:
        'Clone of the Trello application (under construction) has 3 pages so far: Login, Boards, and Board. Built with Angular and TailwindCSS, it also makes use of the Angular CDK to use directives and agnostic components like Drag and Drop, Overlays, Accordion and more...',
    },
    {
      title: 'Crypto Chatbot',
      link: 'https://github.com/gustavog6/crypto-chatbot-witai',
      technologies: ['Javascript', 'Wit.ai', 'Meta for Developers'],
      img: './../../../assets/images/CryptoChatbot.png',
      description:
        'Chatbot integrated into META Messenger that provides cryptocurrency information with simple and detailed indicators, in addition to just prices. Modeled and trained using Wit.ai, built with javascript, hosted on ngrok, and connected to Messenger using META for Developers.',
    },
    {
      title: 'To Do App',
      link: 'https://gustavog6.github.io/TodoApp/',
      technologies: ['React', 'Javascript', 'HTML', 'CSS'],
      img: './../../../assets/images/ToDoApp.png',
      description:
        'To do application developed with React, following a design pattern inspired by FreeCodeCamp. A task can be created, edited and deleted. It also has an integrated router using React Router Dom. And the tasks persist using Localstorage. Hosted on Github Pages.',
    },
  ];
}
