import './PurchasesByDayComponent.css';

export default class PurchasesByDayComponent {

  constructor () {
    console.log('in PurchasesByDayComponent constructor');
  }

  readyButton1(event) {
    var cmp = event.detail.cmp;
    this.button1Cmp = event.detail.cmp;
  }

  tapButton1(event) {
    this.button1Cmp.setText(new Date())
  }

}
