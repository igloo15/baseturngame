import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'btg-hotkeys-dialog',
  templateUrl: './hotkeys-dialog.component.html',
  styleUrls: ['./hotkeys-dialog.component.scss']
})
export class HotkeysDialogComponent implements OnInit {

  hotkeys = Array.from(this.data);

  constructor(public dialogRef: MatDialogRef<HotkeysDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  onDone() {
    this.dialogRef.close();
  }

}
