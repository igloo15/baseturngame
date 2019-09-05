import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/angular-material.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppComponent } from './app.component';
import { GameJsonDialogComponent } from './components/game-json-dialog/game-json-dialog.component';
import { HotkeysDialogComponent } from './components/hotkeys-dialog/hotkeys-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GameJsonDialogComponent,
    HotkeysDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GameJsonDialogComponent, HotkeysDialogComponent]
})
export class AppModule { }
