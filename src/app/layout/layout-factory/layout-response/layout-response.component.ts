import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromLayout from '../../store/layout.reducer';
import * as queueActions from '../../store/layout.action';

@Component({
    selector: 'app-layout-response',
    templateUrl: './layout-response.component.html'
  })
  export class LayoutResponseComponent implements OnInit {
    success$: Observable<string>
    error$: Observable<string>

    constructor(private store : Store<fromLayout.LayoutState>){}

    ngOnInit(): void {
      this.store.dispatch(new queueActions.FetchQuery());
      this.success$ = this.store.pipe(select(fromLayout.getSuccessMessage))
      this.error$ = this.store.pipe(select(fromLayout.getFailedMessage))
    }
  }