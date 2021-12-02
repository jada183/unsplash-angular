import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss']
})
export class ColorSelectorComponent implements OnInit {
  @Output() selectedColorchange: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedColor = '';
  public colorList = [
    'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue'
  ];
  constructor() { }
  public selectColor(color: string) {
    if (color === this.selectedColor) {
      this.selectedColor = ''
      this.selectedColorchange.emit(this.selectedColor);
    } else {
      this.selectedColor = color;
      this.selectedColorchange.emit(this.selectedColor);
    }
  }
  ngOnInit(): void {
  }

}
