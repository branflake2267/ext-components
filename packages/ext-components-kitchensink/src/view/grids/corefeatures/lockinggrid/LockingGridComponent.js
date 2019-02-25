import './LockingGridComponent.css';

export default class LockingGridComponent {

  constructor () {
    console.log('in LockingGridComponent constructor');
  }

  readyButton1(event) {
    var cmp = event.detail.cmp;
    this.button1Cmp = event.detail.cmp;
  }

  tapButton1(event) {
    this.button1Cmp.setText(new Date())
  }

}
