import { Component, OnInit, NgZone, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CountUp, CountUpOptions } from 'countup.js';
import { GameUtil } from '../../models/utility';

@Component({
  selector: 'btl-diceblock',
  templateUrl: './diceblock.component.html',
  styleUrls: ['./diceblock.component.scss']
})
export class DiceblockComponent implements OnInit, AfterViewInit, OnChanges {

  private loopCount = 50;
  private loopIndex = 0;
  private countUp: CountUp;
  private myInternalDivElem: HTMLElement;
  private animationDurationSeconds = 0.3;
  private diceLoop: number[] = [];

  @Input() minValue = 1;
  @Input() maxValue = 6;
  @Input() endValue: number;
  @Input() duration = 10000;

  constructor(private zone: NgZone, private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loopCount = Math.ceil(this.duration / (this.animationDurationSeconds * 1000));
    this.myInternalDivElem = this.el.nativeElement.querySelector('.diceblock-text');
    for (let i = 0; i < this.loopCount + 1; i++) {
      this.diceLoop.push(GameUtil.getRandomInt(this.minValue, this.maxValue));
    }
    const initialValue = GameUtil.getRandomInt(this.minValue, this.maxValue);
    this.countUp = new CountUp(this.myInternalDivElem, initialValue, {
      useEasing: false,
      duration: this.animationDurationSeconds
    });
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.countUp && this.endValue > -1) {
      this.loopIndex = 0;
      this.animate();
    }
  }

  private animate() {
    this.zone.runOutsideAngular(() => {
      this.countUp.reset();
      this.animationLoop();
    });
  }

  private animationLoop() {
    this.loopIndex++;
    this.countUp.start(() => {
      if (this.loopIndex < this.loopCount) {
        this.countUp.update(this.diceLoop[this.loopIndex]);
        this.animationLoop();
      } else {
        this.countUp.update(this.endValue);
      }
    });
  }

}
