import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApproveDialog } from '@components/management-platform/approve-dialog/approve.dialog';
import { MemberDialog } from '@components/management-platform/member-dialog/member.dialog';
import { Skill } from '@models/skill';
import { WindowRefService } from '@services/window-ref.service';
import { isPlatformBrowser } from '@angular/common';
import { LeadershipSection } from '@models/section';
import { Member } from '@models/member';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '@services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from '@models/responses';

interface MemberRow extends Member {
  index: number;
}

@Component({
  selector: 'admin-leadership',
  templateUrl: './admin-leadership.component.html',
  styleUrls: [
    './admin-leadership.component.common.scss',
    './admin-leadership.component.mobile.scss'
  ]
})
export class AdminLeadershipComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() section: LeadershipSection;
  @Input() skills: Skill[];
  displayedColumns: string[] = ['select', 'name', 'skills', 'link', 'actions'];
  dialogsSizes = { approve: {}, members: {} };
  selection = new SelectionModel<MemberRow>(true, []);
  dataSource: MatTableDataSource<MemberRow>;
  membersRows: MemberRow[];

  constructor(
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService,
    private apiService: ApiService,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource([]);
  }

  get noRowsSelected() {
    return this.selection.selected.length === 0;
  }

  ngOnChanges(): void {
    this.membersRows = this.section.members.map((member: Member, i): MemberRow => ({ index: i, ...member }));
    this.dataSource.data = this.membersRows;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (isPlatformBrowser(this.platformId)) {
      this.calcDialogsSizes();
    }
  }

  onListDrop(event: CdkDragDrop<MemberRow[]>) {
    if (event.previousIndex == event.currentIndex) {
      return;
    }

    moveItemInArray(this.membersRows, event.previousIndex, event.currentIndex);
    this.dataSource.data = this.membersRows;
    const membersIds = this.membersRows.map(({ _id }) => _id);
    this.apiService.reorderMembers(this.section._id, membersIds).subscribe(
      ({ success, message }: ApiResponse) => { this.showSnackBar(success, message) },
      err => { this.showSnackBar(false, err.message) });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMember(): void {
    const dialogCallback = (res: ApiResponse) => {
      if (!res) return;

      const { success, message, data: member } = res;
      if (!member) {
        this.showSnackBar(success, message);
        return;
      }

      this.membersRows.push(member as MemberRow);
      this.dataSource.data = this.membersRows;
      this.showSnackBar(success, message);
    }

    const dialogData = {
      editMode: false,
      member: { sectionId: this.section._id },
      skills: this.skills
    }

    this.showMembersDialog(dialogData, dialogCallback);
  }

  editMember($event, member): void {
    $event.stopPropagation();
    const dialogCallback = (res: ApiResponse) => {
      if (!res) return;

      const { success, message, data: updatedMember } = res;
      if (!updatedMember) {
        this.showSnackBar(success, message);
        return;
      }

      for (let i = 0, length = this.membersRows.length; i < length; i++) {
        if (this.membersRows[i]._id == updatedMember._id) {
          this.membersRows[i].name = updatedMember.name;
          this.membersRows[i].link = updatedMember.link;
          this.membersRows[i].skills = updatedMember.skills;
          this.membersRows[i].imageId = updatedMember.imageId;
          this.membersRows[i].hidden = updatedMember.hidden;
          break;
        }
      }

      this.dataSource.data = this.membersRows;
      this.showSnackBar(success, message);
    }

    const dialogData = { editMode: true, member, skills: this.skills };
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

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.calcDialogsSizes();
  }

  calcDialogsSizes(): void {
    // If in mobile
    if (this.windowRefService.nativeWindow.innerWidth < 901) {
      const fullScreen = { maxWidth: '100vw', height: '100%', width: '100%' };
      this.dialogsSizes.approve = fullScreen;
      this.dialogsSizes.members = fullScreen;
    } else {
      this.dialogsSizes.approve = { width: '400px' };
      this.dialogsSizes.members = { width: '600px' };
    }
  }

  showApproveDialog(data): void {
    const dialogRef = this.dialog.open(ApproveDialog, {
      ...this.dialogsSizes.approve,
      data
    });

    dialogRef.afterClosed().subscribe((res: ApiResponse) => {
      if (!res) return;

      const { success, message, data: removedMembersIds } = res;
      if (!removedMembersIds) {
        this.showSnackBar(success, message);
        return;
      }

      removedMembersIds.forEach(removedId => {
        const index = this.membersRows.findIndex(({ _id }) => removedId === _id);
        const removedMembers = this.membersRows.splice(index, 1);
        this.selection.deselect(removedMembers[0]);
      });

      this.dataSource.data = this.membersRows;
      this.showSnackBar(success, message);
    });
  }

  showMembersDialog(data, dialogCallback): void {
    const dialogRef = this.dialog.open(MemberDialog, {
      ...this.dialogsSizes.members,
      data
    });

    dialogRef.afterClosed().subscribe(dialogCallback);
  }

  getSkillsNames(skills: []): string {
    return skills.map(({ name }) => name).join(', ');
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
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

  showSnackBar(success: boolean, message: string): void {
    const config = {
      duration: 5000,
      panelClass: ['custom-snackbar']
    }

    config.panelClass.push(`${success ? 'success' : 'fail'}-snackbar`);
    this.snackBar.open(message, 'Dismiss', config);
  }
}