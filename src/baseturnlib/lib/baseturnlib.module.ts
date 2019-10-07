import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/angular-material.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { GameJsonDialogComponent } from './components/game-json-dialog/game-json-dialog.component';
import { HotkeysDialogComponent } from './components/hotkeys-dialog/hotkeys-dialog.component';
import { DiceblockComponent } from './components/diceblock/diceblock.component';
import { DicerollerComponent } from './components/diceroller/diceroller.component';
import { DiceDialogComponent } from './components/dice-dialog/dice-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    GameJsonDialogComponent,
    HotkeysDialogComponent,
    DiceblockComponent,
    DicerollerComponent,
    DiceDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [GameJsonDialogComponent, HotkeysDialogComponent, DiceblockComponent, DicerollerComponent, 
    DiceDialogComponent, ConfirmationDialogComponent],
  exports: [GameJsonDialogComponent, HotkeysDialogComponent, DiceblockComponent, DicerollerComponent, 
    DiceDialogComponent, ConfirmationDialogComponent]
})
export class BaseTurnLibModule { }
