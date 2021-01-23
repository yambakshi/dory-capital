import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApproveDialog } from '@components/approve-dialog/approve.dialog';
import { MemberDialog } from '@components/member-dialog/member.dialog';

export interface MemberRow {
  _id: string;
  index: number;
  name: string;
  skills: string;
  link: string;
  imgUrl: string;
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select', 'name', 'skills', 'link', 'actions'];
  selection = new SelectionModel<MemberRow>(true, []);
  dataSource: MatTableDataSource<MemberRow>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.route.data.subscribe(data => {
      if (!data['pageContent']) {
        return;
      }

      const members = data['pageContent'].leadership.people;
      members.forEach((member, i) => member.index = i);
      this.dataSource = new MatTableDataSource(members);
    });
  }

  get noRowsSelected() {
    return this.selection.selected.length === 0;
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

  removeMember($event, member): void {
    $event.stopPropagation();
    const message = `Are you sure you want to remove ${member.name}?`;
    this.showApproveDialog({ members: [member], message });
  }

  removeMembers(): void {
    const members = this.selection.selected;
    const message = 'Are you sure you want to remove the selected members?';
    this.showApproveDialog({ members, message });
  }

  addMember(): void {
    this.showMembersDialog({});
  }

  editMember($event, member): void {
    $event.stopPropagation();
    this.showMembersDialog(member);
  }

  showApproveDialog(data): void {
    const dialogRef = this.dialog.open(ApproveDialog, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      for (let i = result.length - 1; i >= 0; i--) {
        const { index } = result[i];
        this.dataSource.data.splice(index, 1);
      }

      this.dataSource.data.forEach((row, i) => row.index = i);
      this.selection.clear();
      this.dataSource._updateChangeSubscription();
    });
  }

  showMembersDialog(data): void {
    const dialogRef = this.dialog.open(MemberDialog, {
      width: '600px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getSkillsNames(skills: []): string {
    return skills.map(({ name }) => name).join(', ');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: MemberRow): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }
}