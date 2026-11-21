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
});
