import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'skills-component',
    templateUrl: 'skills-section.component.html',
    styleUrl: "skills-section.component.scss",
    imports: [TranslateModule]
})

export class SkillsSectionComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}