import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  private activeScreenSubject = new BehaviorSubject<string>('user-dashboard');
  activeScreen$: Observable<string> = this.activeScreenSubject.asObservable();

  setActiveScreen(screen: string) {
    this.activeScreenSubject.next(screen);
  }
}
