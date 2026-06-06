'use strict';

export default {
  data() {
    return {
      menu: '',
      message: '',
      fontColor: ''
    };
  },
  methods: {
    menuCheck() {
      if (!this.menu || !this.menu.trim()) {
        this.fontColor = '#FF0000';
        this.message = 'Please enter data first';
      } else {
        const items = this.menu.split(',').filter(item => item.trim().length > 0);
        this.fontColor = '#00FF00';
        this.message = items.length > 3 ? 'Too much!' : 'Enjoy!';
      }
    }
  }
};
