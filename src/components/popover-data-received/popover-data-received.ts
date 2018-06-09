import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverDataReceivedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-data-received',
  templateUrl: 'popover-data-received.html'
})
export class PopoverDataReceivedComponent {

  items: any;

  constructor(public navParams: NavParams, private _viewController: ViewController) {
    this.items = this.navParams.get('datas');
  }

}
