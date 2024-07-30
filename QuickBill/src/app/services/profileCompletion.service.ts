import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileCompletion {
  private completedProfileCount = new BehaviorSubject<number>(0);
  private incompleteProfileItems = new BehaviorSubject<string[]>([]);
  private totalItems = new BehaviorSubject<number>(0); // Total number of items

  currentCompletion = this.completedProfileCount.asObservable();
  currentIncomplete = this.incompleteProfileItems.asObservable();

  constructor() {}

  updateProfileCompletion(item: string, isComplete: boolean) {
    const currentIncomplete = this.incompleteProfileItems.value;
    const currentCompletedCount = this.completedProfileCount.value;

    if (isComplete) {
      // If completing an item
      if (currentIncomplete.includes(item)) {
        // Remove from incomplete list if it exists
        this.incompleteProfileItems.next(currentIncomplete.filter((i) => i !== item));
        // Increment completed count
        this.completedProfileCount.next(currentCompletedCount + 1);
      }
    } else {
      // If marking an item as incomplete
      if (!currentIncomplete.includes(item)) {
        // Add to incomplete list if it does not already exist
        this.incompleteProfileItems.next([...currentIncomplete, item]);
        // Decrement completed count
        this.completedProfileCount.next(currentCompletedCount - 1);
      }
    }
  }

  getCompletionPercentage(): number {
    const total = this.totalItems.value;
    const completed = this.completedProfileCount.value;
    if (total === 0) return 0; // Avoid division by zero
    return Math.round((completed / total) * 100);
  }

  setIncompleteItems(items: string[]) {
    this.incompleteProfileItems.next(items);
    this.totalItems.next(items.length); // Total items is the length of the provided list
    this.completedProfileCount.next(0); // Reset completed count; will be recalculated
  }
}
