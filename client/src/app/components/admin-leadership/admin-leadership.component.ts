import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@models/page-content';

export interface PersonElement {
  position: number;
  name: string;
  skills: string;
  link: string;
}

@Component({
  selector: 'admin-leadership',
  templateUrl: './admin-leadership.component.html',
  styleUrls: [
    './admin-leadership.component.common.scss',
    './admin-leadership.component.desktop.scss',
    './admin-leadership.component.mobile.scss'
  ]
})
export class AdminLeadershipComponent {
  @Input() _id: string;
  @Input() data;
  @Input() dataRetrieved: boolean = false;
  displayedColumns: string[] = ['select', 'name', 'skills', 'link'];
  selection = new SelectionModel<PersonElement>(true, []);

  constructor(
    private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      if (!data['pageContent']) {
        this.data = { people: [] };
        return;
      }

      this.data = data['pageContent'].leadership;
      this.data.people.forEach((person, i) => person.position = i);
    });
  }

  ngOnChanges(): void {
    if (this.dataRetrieved) {
    }
  }

  getSkillsNames(skills: []): string {
    return skills.map(({ name }) => name).join(', ');
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.people.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.people.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PersonElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}