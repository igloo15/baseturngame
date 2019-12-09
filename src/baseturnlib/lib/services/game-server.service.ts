import { Injectable } from '@angular/core';
import { TypedEvent, Listener, IDisposable } from '../models/events';
import { NGXLogger } from 'ngx-logger';
import { MqttService, IOnConnectEvent, IOnMessageEvent, IOnErrorEvent } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class GameServerService {

  public serverUrl: string;
  public gameId: string;
  public connected = false;

  onConnected: TypedEvent<IOnConnectEvent>;
  onDisconnected: TypedEvent<{}>;
  onMessage: TypedEvent<IOnMessageEvent>;
  decoder = new TextDecoder('utf-8');
  private eventsHookedUp = false;

  constructor(private logger: NGXLogger, private mqttService: MqttService) {
    this.onConnected = new TypedEvent<IOnConnectEvent>();
    this.onDisconnected = new TypedEvent<{}>();
    this.onMessage = new TypedEvent<IOnMessageEvent>();
  }

  private getJsonObject<T>(data: Uint8Array): T {
    try {
      const dataString = this.decoder.decode(data);
      return JSON.parse(dataString) as T;
    } catch (error) {
      this.logger.error(error);
    }
  }

  start(serverUrl: string, gameId: string) {
    if (this.mqttService && !this.connected) {
      this.mqttService.connect({url: serverUrl});
      this.serverUrl = serverUrl;
      this.gameId = gameId;
      if (!this.eventsHookedUp) {
        this.eventsHookedUp = true;
        this.mqttService.onConnect.subscribe((connack: IOnConnectEvent) => {
          this.logger.info(`connected to server ${this.serverUrl}`);
          this.connected = true;
          this.onConnected.emit(connack);
        });
        this.mqttService.onClose.subscribe(() => {
          this.logger.info(`disconnected from server ${this.serverUrl}`);
          this.connected = false;
          this.onDisconnected.emit({});
        });
        this.mqttService.onReconnect.subscribe(() => { this.logger.warn('reconnecting'); });
        this.mqttService.onMessage.subscribe((msg) => this.onMessage.emit(msg));
        this.mqttService.onError.subscribe(this.onErrorReceived);
      }
    }
  }

  stop() {
    if (this.mqttService && this.connected) {
      this.mqttService.disconnect();
    }
  }

  subscribe<T>(topic: string, listener: Listener<T>): IDisposable {
    if (this.connected) {
      const event = new TypedEvent<T>();
      const disposable = event.on(listener);
      this.mqttService.observe(this.getFullTopic(topic)).subscribe((msg) => {
        event.emit(this.getJsonObject<T>(msg.payload));
      });
      return disposable;
    }
  }

  publish<T>(topic: string, data: T) {
    if (this.connected) {
      this.mqttService.publish(this.getFullTopic(topic), JSON.stringify(data)).subscribe(() => { this.logger.debug(`data sent on topic ${topic}`); });
    }
  }

  getFullTopic(topic: string) {
    return `${this.gameId}/${topic}`;
  }

  onErrorReceived(error: IOnErrorEvent) {
    this.logger.error(error);
  }
}
