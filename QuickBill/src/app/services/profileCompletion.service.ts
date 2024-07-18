import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileCompletion {
  private completedProfileCount = new BehaviorSubject<number>(0);
  private incompleteProfileItems = new BehaviorSubject<string[]>([]);

  currentCompletion = this.completedProfileCount.asObservable();
  currentIncomplete = this.incompleteProfileItems.asObservable();

  constructor() {}

  updateProfileCompletion(item: string, isComplete: boolean) {
    let incomplete = this.incompleteProfileItems.value;
    if (isComplete) {
      this.completedProfileCount.next(this.completedProfileCount.value + 1);
      incomplete = incomplete.filter((i) => i !== item);
    } else {
      this.completedProfileCount.next(this.completedProfileCount.value - 1);
      incomplete.push(item);
    }
    this.incompleteProfileItems.next(incomplete);
  }

  getCompletionPercentage() {
    return (this.completedProfileCount.value / 5) * 100;
  }
}
