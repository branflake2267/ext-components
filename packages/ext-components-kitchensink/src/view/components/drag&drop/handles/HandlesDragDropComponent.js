import './HandlesDragDropComponent.css';

export default class HandlesDragDropComponent {

  constructor () {
    console.log('in HandlesDragDropComponent constructor');
  }

  readyButton1(event) {
    var cmp = event.detail.cmp;
    this.button1Cmp = event.detail.cmp;
  }

  tapButton1(event) {
    this.button1Cmp.setText(new Date())
  }

}
