import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'btl-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  confirmationTitle: string;
  confirmationText: string;
  completeText: string;
  cancelText: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.confirmationTitle = data.confirmationTitle;
      this.confirmationText = data.confirmationText;
      this.completeText = data.completeText;
      this.cancelText = data.cancelText;
  }

  ngOnInit() {
  }

  onComplete() {
    this.dialogRef.close(this.completeText);
  }

  onCancel() {
    this.dialogRef.close(this.cancelText);
  }

}
