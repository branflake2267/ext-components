import './MultiSelectComboBoxFieldComponent.css';

export default class MultiSelectComboBoxFieldComponent {

  constructor () {
    console.log('in MultiSelectComboBoxFieldComponent constructor');
  }

  readyButton1(event) {
    var cmp = event.detail.cmp;
    this.button1Cmp = event.detail.cmp;
  }

  tapButton1(event) {
    this.button1Cmp.setText(new Date())
  }

}
