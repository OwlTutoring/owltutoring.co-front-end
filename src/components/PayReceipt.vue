<template>
  <div class="grid-margin-container">
    <div id="receipt">
      <h2>
      Payment Compleated <br>
      {{dateString}} <br>
      {{charge.metadata.numLessons + (charge.metadata.numLessons > 1 ? " Lessons" : " Lesson")}}<br>
      For ${{charge.amount/100}}<br>
      at ${{charge.metadata.rate/100}}/hr<br>
      <div v-if="charge.metadata.discountPercent!=0">
        with {{charge.metadata.discountPercent*100}}% off
      </div>
      Charged to {{charge.source.card.brand}} {{charge.source.card.last4}} {{charge.source.card.exp_month}}/{{charge.source.card.exp_year.toString().substring(2,4)}}<br>
      <br>Save this Receipt for your records
      </h2>
      <router-link class="color-button" to="/sessions?addNew=true">Schedule a Lessson</router-link>
    </div>
    <div class="after-margin"></div>
  </div>
</template>

<script>
import AccountStore from "../stores/AccountStore";
import MessageStore from "../stores/MessageStore";
import axios from "axios";
export default {
  props: {
    charge: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {};
  },
  created: function() {
    document.title = "Receipt - Owl Tutoring";
    var _this = this;
    console.log(this.charge);
  },
  computed: {
    dateString: function() {
      var date = new Date(this.charge.created*1000);
      return date.getMonth().toString() +"/" + date.getDate() + "/" + date.getFullYear().toString().substring(2,4);
    },
  },
  methods: {
    
  }
};
</script>

<style>
ul {
  padding: 0;
}
li {
  list-style: none;
}
#receipt {
  grid-column: 2 / 2;
}

</style>
