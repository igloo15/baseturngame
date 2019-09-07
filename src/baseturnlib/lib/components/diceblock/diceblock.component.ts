import { Component, OnInit, NgZone, ElementRef, AfterViewInit, Input } from '@angular/core';
import { CountUp, CountUpOptions } from 'countup.js';
import { GameUtil } from '../../models/utility';

@Component({
  selector: 'btl-diceblock',
  templateUrl: './diceblock.component.html',
  styleUrls: ['./diceblock.component.scss']
})
export class DiceblockComponent implements OnInit, AfterViewInit {

  private loopCount = 50;
  private loopIndex = 0;
  private countUp: CountUp;
  private myInternalDivElem: HTMLElement;
  private animationDurationSeconds = 0.3;

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
    const initialValue = GameUtil.getRandomInt(this.minValue, this.maxValue + 1);
    this.countUp = new CountUp(this.myInternalDivElem, initialValue, {
      useEasing: false,
      duration:this.animationDurationSeconds
    });
    this.animate();
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
      if(this.loopIndex < this.loopCount) {
        this.countUp.update(GameUtil.getRandomInt(this.minValue, this.maxValue+1));
        this.animationLoop();  
      } else {
        this.countUp.update(this.endValue);
      }
    });
  }

}
