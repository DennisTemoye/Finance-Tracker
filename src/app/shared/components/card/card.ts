import { NgForOf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input({ required: true }) title?: string = '';
  @Input({ required: true }) content?: string | number = '';

}
