import './BasicAccordionSwiperComponent.css';

export default class BasicAccordionSwiperComponent {

  constructor () {
    console.log('in BasicAccordionSwiperComponent constructor');
  }

  readyButton1(event) {
    var cmp = event.detail.cmp;
    this.button1Cmp = event.detail.cmp;
  }

  tapButton1(event) {
    this.button1Cmp.setText(new Date())
  }

}
