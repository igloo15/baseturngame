import 'fast-text-encoding';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/angular-material.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { IMqttMessage, MqttModule, IMqttServiceOptions } from 'ngx-mqtt';

import { GameJsonDialogComponent } from './components/game-json-dialog/game-json-dialog.component';
import { HotkeysDialogComponent } from './components/hotkeys-dialog/hotkeys-dialog.component';
import { DiceblockComponent } from './components/diceblock/diceblock.component';
import { DicerollerComponent } from './components/diceroller/diceroller.component';
import { DiceDialogComponent } from './components/dice-dialog/dice-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GameJoinerDialogComponent } from './components/game-joiner-dialog/game-joiner-dialog.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  url: 'mqtt://test.mosquitto.org',
  connectOnCreate: false
};

@NgModule({
  declarations: [
    GameJsonDialogComponent,
    HotkeysDialogComponent,
    DiceblockComponent,
    DicerollerComponent,
    DiceDialogComponent,
    ConfirmationDialogComponent,
    GameJoinerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LoggerModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [GameJsonDialogComponent, HotkeysDialogComponent, DiceblockComponent, DicerollerComponent, 
    DiceDialogComponent, ConfirmationDialogComponent, GameJoinerDialogComponent],
  exports: [GameJsonDialogComponent, HotkeysDialogComponent, DiceblockComponent, DicerollerComponent, 
    DiceDialogComponent, ConfirmationDialogComponent, GameJoinerDialogComponent]
})
export class BaseTurnLibModule { }
