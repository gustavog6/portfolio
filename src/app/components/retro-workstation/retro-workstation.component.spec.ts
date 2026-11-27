import { RetroWorkstationComponent } from './retro-workstation.component';

describe('RetroWorkstationComponent', () => {
  it('starts on the experience tab', () => {
    const component = new RetroWorkstationComponent();

    expect(component.activeTab()).toBe('experiencia');
  });

  it('lets mobile navigation open the experience section', () => {
    const component = new RetroWorkstationComponent();

    component.selectMobileSection('experiencia');

    expect(component.mobileSection()).toBe('experiencia');
    expect(component.activeTab()).toBe('experiencia');
  });

  it('lets desktop and mobile navigation open the services section', () => {
    const component = new RetroWorkstationComponent();

    component.selectMobileSection('servicios');

    expect(component.mobileSection()).toBe('servicios');
    expect(component.activeTab()).toBe('servicios');
  });

  it('stores the service intent when redirecting from services to contact', () => {
    const component = new RetroWorkstationComponent();

    component.requestServiceContact('wedding');

    expect(component.activeTab()).toBe('contacto');
    expect(component.mobileSection()).toBe('contacto');
    expect(component.contactIntent()).toBe('wedding');
  });
});
