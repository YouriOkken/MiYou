import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Demo1Component } from "./demo1/demo1.component";
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'demos-component',
    templateUrl: 'demos.component.html',
    styleUrl: 'demos.component.scss',
    imports: [Demo1Component, LottieComponent]
})

export class DemosComponent implements OnInit {
  @ViewChild('previewRow', { static: false }) previewRow!: ElementRef;

    constructor() { }

    ngOnInit() { }

    scrollAnimation: AnimationOptions = {
        path: 'assets/animations/Animation-1752090248146.json',
        loop: true,
        autoplay: true,
    };

    scrollRight() {
        const container = this.previewRow.nativeElement;
        const scrollAmount = container.offsetWidth * 1;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    scrollLeft() {
        const container = this.previewRow.nativeElement;
        const scrollAmount = container.offsetWidth * 1;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}