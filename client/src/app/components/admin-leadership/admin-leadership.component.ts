import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApproveDialog } from '@components/approve-dialog/approve.dialog';
import { MemberDialog } from '@components/member-dialog/member.dialog';
import { Skill } from '@models/skill';
import { WindowRefService } from '@services/window-ref.service';
import { isPlatformBrowser } from '@angular/common';
import { PageData } from '@models/page-data';
import { ApiService } from '@services/api.service';
import { Section } from '@models/section';
import { Member } from '@models/member';

export interface MemberRow extends Member {
  index: number;
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
  displayedColumns: string[] = ['select', 'name', 'skills', 'link', 'actions'];
  dialogsSizes = { approve: {}, members: {} };
  selection = new SelectionModel<MemberRow>(true, []);
  dataSource: MatTableDataSource<MemberRow>;
  section: Section;
  members: MemberRow[];
  skills: Skill[];

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRefService: WindowRefService) {
    this.dataSource = new MatTableDataSource([]);
    this.apiService.getPageDataObservable().subscribe((pageData: PageData) => {
      this.section = pageData.sections[3];
      this.skills = pageData.skills;
      this.members = pageData.members.map((member: MemberRow, i) => {
        member.index = i;
        return member;
      });

      this.dataSource.data = this.members;
    });
  }

  get noRowsSelected() {
    return this.selection.selected.length === 0;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (isPlatformBrowser(this.platformId)) {
      this.calcDialogsSizes();
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
      member: { sectionId: this.section._id },
      skills: this.skills
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

    dialogRef.afterClosed().subscribe(removedMembersIds => {
      if (!removedMembersIds) return;
      removedMembersIds.forEach(removedId => {
        const index = this.members.findIndex(({ _id }) => removedId === _id);
        const removedMembers = this.members.splice(index, 1);
        this.selection.deselect(removedMembers[0]);
      });

      this.dataSource.data = this.members;
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