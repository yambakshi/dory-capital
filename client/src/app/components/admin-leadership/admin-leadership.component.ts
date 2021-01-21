import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApproveDialog } from '@components/approve-dialog/approve-dialog.component';
import { AddMemberDialog } from '@components/add-member-dialog/add-member-dialog.component';

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
export class AdminLeadershipComponent implements OnInit {
  @Input() _id: string;
  @Input() data;
  @Input() dataRetrieved: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select', 'name', 'skills', 'link', 'actions'];
  selection = new SelectionModel<PersonElement>(true, []);
  dataSource: MatTableDataSource<PersonElement>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.route.data.subscribe(data => {
      if (!data['pageContent']) {
        this.data = { people: [] };
        return;
      }

      this.data = data['pageContent'].leadership;
      this.data.people.forEach((person, i) => person.position = i);
      this.dataSource = new MatTableDataSource(this.data.people);
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnChanges(): void {
    if (this.dataRetrieved) {
    }
  }

  addMember(): void {
    const dialogRef = this.dialog.open(AddMemberDialog, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeMember({ name }): void {
    const dialogRef = this.dialog.open(ApproveDialog, {
      width: '400px',
      data: { name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editMember($event): void {
    $event.stopPropagation();
  }

  getSkillsNames(skills: []): string {
    return skills.map(({ name }) => name).join(', ');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.people.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.people.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PersonElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}