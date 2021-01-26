import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApproveDialog } from '@components/approve-dialog/approve.dialog';
import { MemberDialog } from '@components/member-dialog/member.dialog';

export interface MemberRow {
  _id: string;
  index: number;
  name: string;
  link: string;
  skills: string;
  imageId: string;
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
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() data: any;
  @Input() dataRetrieved: boolean = false;
  displayedColumns: string[] = ['select', 'name', 'skills', 'link', 'actions'];
  selection = new SelectionModel<MemberRow>(true, []);
  dataSource: MatTableDataSource<MemberRow>;
  members: MemberRow[]
  sectionId: string;

  constructor(public dialog: MatDialog) { }

  get noRowsSelected() {
    return this.selection.selected.length === 0;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    if (this.dataRetrieved) {
      this.sectionId = this.data._id;
      this.members = this.data.content;
      this.members.forEach((member, i) => member.index = i);
      this.dataSource = new MatTableDataSource(this.members);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMember(): void {
    const dialogCallback = member => {
      if (!member) return;
      this.members.push(member);
      this.dataSource.data = this.members;
    }

    const dialogData = {
      editMode: false,
      member: { sectionId: this.sectionId }
    }

    this.showMembersDialog(dialogData, dialogCallback);
  }

  editMember($event, member): void {
    $event.stopPropagation();
    const dialogCallback = updatedMember => {
      if (!updatedMember) return;
      for (let i = 0, length = this.members.length; i < length; i++) {
        if (this.members[i]._id == updatedMember._id) {
          this.members[i].name = updatedMember.name;
          this.members[i].link = updatedMember.link;
          this.members[i].skills = updatedMember.skills;
          this.members[i].imageId = updatedMember.imageId;
          break;
        }
      }

      this.dataSource.data = this.members;
    }

    const dialogData = { editMode: true, member };
    this.showMembersDialog(dialogData, dialogCallback);
  }

  removeMember($event, member): void {
    $event.stopPropagation();
    const message = `Are you sure you want to remove ${member.name}?`;
    this.showApproveDialog({ members: [member], message });
  }

  removeMembers(): void {
    const members = this.selection.selected;
    const message = `Are you sure you want to remove ${members.length} members?`;
    this.showApproveDialog({ members, message });
  }

  showApproveDialog(data): void {
    const dialogRef = this.dialog.open(ApproveDialog, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(removedMembersIds => {
      if (!removedMembersIds) return;
      removedMembersIds.forEach(removedId => {
        const index = this.members.findIndex(({ _id }) => removedId === _id);
        this.members.splice(index, 1);
      });

      this.dataSource.data = this.members;
    });
  }

  showMembersDialog(data, dialogCallback): void {
    const dialogRef = this.dialog.open(MemberDialog, {
      width: '600px',
      data
    });

    dialogRef.afterClosed().subscribe(dialogCallback);
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