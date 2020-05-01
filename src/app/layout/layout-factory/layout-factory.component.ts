import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout-factory',
  templateUrl: './layout-factory.component.html',
  styleUrls: ['./layout-factory.component.css']
})
export class LayoutFactoryComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    
  }

}
