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
  private expandedState = new BehaviorSubject<{ [key: string]: boolean }>({});

  constructor() {}

  getExpandedState() {
    return this.expandedState.asObservable();
  }

  setExpandedState(item: string, expanded: boolean) {
    const currentState = this.expandedState.value;
    currentState[item] = expanded;
    this.expandedState.next(currentState);
  }
}
