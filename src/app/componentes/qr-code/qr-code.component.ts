import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  currentUrl: string;


  constructor(private location: Location) {
    this.currentUrl = window.location.href;
  }

  ngOnInit(): void {
  }
}

