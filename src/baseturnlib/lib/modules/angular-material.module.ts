import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatTabsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    exports: [
        MatTabsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}
