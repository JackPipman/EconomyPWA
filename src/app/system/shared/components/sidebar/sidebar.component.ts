import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input() isMenuOpened = false;
  @Output() onCloseMenu = new EventEmitter<any>();

  ngOnInit() {

  }

  closeMenu() {
    this.onCloseMenu.emit(false);
  }

}
