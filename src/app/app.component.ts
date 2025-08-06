import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
 selector: 'app-root',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
 categories: string[] = ['Food', 'Fuel', 'Entertainment', 'Hygiene', 'Bank Fees', 'Subscriptions'];
 selectedCategory: string = '';
 amount: number = 0;
 expenses: { [key: string]: number } = {};
 addExpense() {
   if (this.selectedCategory && this.amount > 0) {
     if (!this.expenses[this.selectedCategory]) {
       this.expenses[this.selectedCategory] = 0;
     }
     this.expenses[this.selectedCategory] += this.amount;
     this.amount = 0;
     this.selectedCategory = '';
   }
 }
 getMaxCategory(): string {
   let maxCategory = '';
   let maxValue = 0;
   for (const category in this.expenses) {
     if (this.expenses[category] > maxValue) {
       maxValue = this.expenses[category];
       maxCategory = category;
     }
   }
   return maxCategory;
 }
 getTotal(): number {
   return Object.values(this.expenses).reduce((sum, val) => sum + val, 0);
 }
}