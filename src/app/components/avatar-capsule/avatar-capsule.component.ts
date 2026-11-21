import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

type ScrollGesture = 'up' | 'down';
type HandGesture = 'wave' | 'thumbs-up';

@Component({
  selector: 'app-avatar-capsule',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './avatar-capsule.component.html',
  styleUrl: './avatar-capsule.component.css',
})
export class AvatarCapsuleComponent implements AfterViewInit {
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  readonly pointerOffset = signal({ x: 0, y: 0 });
  readonly scrollGesture = signal<ScrollGesture | null>(null);
  readonly handGesture = signal<HandGesture | null>(null);
  readonly isWinking = signal(false);
  readonly contactActive = input.required<boolean>();
  readonly tabChangeCount = input.required<number>();

  private readonly lastScrollPositions = new WeakMap<HTMLElement, number>();
  private scrollGestureTimeout: ReturnType<typeof setTimeout> | undefined;
  private handGestureTimeout: ReturnType<typeof setTimeout> | undefined;
  private winkStartTimeout: ReturnType<typeof setTimeout> | undefined;
  private winkTimeout: ReturnType<typeof setTimeout> | undefined;
  private lastTabChangeCount = 0;

  private readonly tabChangeEffect = effect(() => {
    const count = this.tabChangeCount();
    if (count !== this.lastTabChangeCount) {
      this.lastTabChangeCount = count;
      this.triggerHandGesture('thumbs-up', 700);
    }
  });

  ngAfterViewInit(): void {
    const workstation = this.hostElement.nativeElement.closest('app-retro-workstation');
    if (!workstation) {
      return;
    }

    const onScroll = (event: Event): void => this.handleSectionScroll(event);
    workstation.addEventListener('scroll', onScroll, true);
    this.destroyRef.onDestroy(() => {
      workstation.removeEventListener('scroll', onScroll, true);
      if (this.scrollGestureTimeout) {
        clearTimeout(this.scrollGestureTimeout);
      }
      if (this.handGestureTimeout) {
        clearTimeout(this.handGestureTimeout);
      }
      if (this.winkStartTimeout) {
        clearTimeout(this.winkStartTimeout);
      }
      if (this.winkTimeout) {
        clearTimeout(this.winkTimeout);
      }
    });
  }

  onCapsulePointerEnter(): void {
    this.triggerHandGesture('wave', 520);
  }

  onAvatarClick(): void {
    if (this.winkStartTimeout) {
      clearTimeout(this.winkStartTimeout);
    }
    if (this.winkTimeout) {
      clearTimeout(this.winkTimeout);
    }

    this.isWinking.set(false);
    this.winkStartTimeout = setTimeout(() => {
      this.isWinking.set(true);
      this.winkStartTimeout = undefined;
      this.winkTimeout = setTimeout(() => {
        this.isWinking.set(false);
        this.winkTimeout = undefined;
      }, 320);
    }, 0);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    const workstation = this.hostElement.nativeElement.closest('app-retro-workstation');
    const target = event.target;
    if (!workstation || !(target instanceof Node) || !workstation.contains(target)) {
      this.resetPointer();
      return;
    }

    const capsule = this.hostElement.nativeElement.querySelector('.capsule');
    if (!(capsule instanceof HTMLElement)) {
      return;
    }

    const bounds = capsule.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    const normalize = (coordinate: number, start: number, size: number): number =>
      Math.max(0, Math.min(1, (coordinate - start) / size));

    this.pointerOffset.set({
      x: (normalize(event.clientX, bounds.left, bounds.width) - 0.5) * 40,
      y: (normalize(event.clientY, bounds.top, bounds.height) - 0.5) * 12,
    });
  }

  private resetPointer(): void {
    this.pointerOffset.set({ x: 0, y: 0 });
  }

  private triggerHandGesture(gesture: HandGesture, duration: number): void {
    if (this.handGestureTimeout) {
      clearTimeout(this.handGestureTimeout);
    }
    this.handGesture.set(null);
    this.handGestureTimeout = setTimeout(() => {
      this.handGesture.set(gesture);
      this.handGestureTimeout = setTimeout(() => {
        this.handGesture.set(null);
        this.handGestureTimeout = undefined;
      }, duration);
    }, 0);
  }

  private handleSectionScroll(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const section = target.closest('.workstation-scroll');
    if (!(section instanceof HTMLElement)) {
      return;
    }

    const scrollTop = section.scrollTop;
    const previousPosition = this.lastScrollPositions.get(section) ?? 0;
    if (scrollTop === previousPosition) {
      return;
    }

    this.lastScrollPositions.set(section, scrollTop);
    this.scrollGesture.set(scrollTop > previousPosition ? 'down' : 'up');

    if (this.scrollGestureTimeout) {
      clearTimeout(this.scrollGestureTimeout);
    }
    this.scrollGestureTimeout = setTimeout(() => {
      this.scrollGesture.set(null);
      this.scrollGestureTimeout = undefined;
    }, 420);
  }
}
