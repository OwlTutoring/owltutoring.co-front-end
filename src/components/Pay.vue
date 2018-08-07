<template>
  <div class="grid-margin-container">
    <div id="pay">
      <div class="nav-grid">
        <router-link class="nav-link nav-item" to="pay">Pay</router-link>
        <router-link class="nav-link nav-item" to="chargeHistory">History</router-link>
        <h2>Balance: {{"$" + AccountStore.account.balance/100}}</h2>
      </div>

      <div id="pay-row-one">
        <div id="lesson-input-container">
          <input placehoder="#" type=number v-model="numLessons" id="num-lessons">
          <div id="lesson-word" v-if="numLessons > 1">Lessons</div>
          <div id="lesson-word" v-else>Lesson</div>
        </div>
        <div id="center-message" v-if="value != cost">
          <div class="value">{{"$" + value/100}}</div> 10% off
        </div>
        <div id="center-message" v-else>buy 5 or more lessons and get 10% off</div>
        <div id="cost">{{"$" + cost/100}}</div>
      </div>
      <div v-if="sources.data.length > 0">Pay with</div>
      <div class="saved-source" v-for="(source, i) in sources.data" :key="source.ID">
        <input :id="'source-' + i" type="radio" v-model="selectedSource" :value="source" >
        <label class= "source-label" :for="'source-' + i">{{source.card.brand}} **** **** **** {{source.card.last4}} Exp. {{source.card.exp_month}}/{{source.card.exp_year}}</label>
        <button class="plain-button delete-button" v-on:click="deleteCard(source.id)" >Delete Card</button>
      </div>
      
      <div v-if="sources.data.length > 0">or add new card</div>
      <div id="new-card">
        <input id="new" v-model="selectedSource" type="radio" value="new">
        
        <div @click="changeToNewSource" id="card-element">
          <!-- A Stripe Element will be inserted here. -->
        </div>
      
        
        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert"></div>
        <div id="save-card-container">
          Save Card <input class="form-field" v-model="saveCard" type="checkbox">
        </div>
      </div>
      <button @click="showConfirmation()" class="color-button continue-button">Continue to Confirmation</button>
      <div v-if="viewConfirmation" id="confirm-back">
        <div id="confirm-window">
          <h2>
          {{lessonString}}<br>
          ${{cost/100}}<br>
          {{sourceToConfirm.card.brand}} {{sourceToConfirm.card.last4}} {{sourceToConfirm.card.exp_month}}/{{sourceToConfirm.card.exp_year.toString().substring(2,4)}}<br>
          </h2>
          <button class="color-button" @click="submitPayment()">Confirm</button><button class="light-button" @click="hideConfirmation()">Go Back</button>
        </div>
      </div>
    </div>
    <div class="after-margin"></div>
  </div>
</template>


<script>
import axios from "axios";
import MessageStore from "../stores/MessageStore";
import AccountStore from "../stores/AccountStore";
import LoadingStateStore from "../stores/LoadingStateStore";

// Create a Stripe client.
var stripe = Stripe("pk_test_gheuGNTfHiHL1ULiFHNPxlzm"); //pk_live_ewXOSu5rmNjJR9lMA13bLDsy");

// Create an instance of Elements.
var elements = stripe.elements();

export default {
  data: function() {
    return {
      rate: 2499,
      numLessons: 5,
      AccountStore: AccountStore.data,
      sources: { data: [] },
      saveCard: true,
      selectedSource: "new",
      sourceToConfirm: null,
      viewConfirmation: false,
      card: elements.create("card", {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      })
    };
  },
  created: function() {
    if(!AccountStore.data.account.emailVertified) {
      this.$router.push({ path: "/VertifyEmail/Pay"});
    }
    document.title = "Pay - Owl Tutoring";
    this.getSources();
  },
  mounted: function() {
    var _this = this;
    this.card.mount("#card-element");

    // Handle real-time validation errors from the card Element.
    this.card.addEventListener("change", function(event) {
      if (event.error) {
        MessageStore.methods.showMessage(event.error.message, true);
      }
      _this.changeToNewSource();
    });

    this.card.on("focus", function(event) {
      _this.changeToNewSource();
    });
  },
  beforeDestroy: function() {
    this.card.unmount();
    this.card.destroy();
  },
  computed: {
    lessonString: function() {
      return this.numLessons + (this.numLessons > 1 ? " Lessons" : " Lesson");
    },
    cost: function() {
      if(this.numLessons*this.rate >= 2499*5) {
        return Math.round(this.numLessons*this.rate*.9);
      }
      return this.numLessons*this.rate;
    },
    value: function() {
      return this.numLessons*this.rate;
    }
  },
  methods: {
    changeToNewSource: function() {
      this.selectedSource = "new";
    },
    hideConfirmation: function() {
      this.viewConfirmation = false;
    },
    showConfirmation: function() {
      var _this = this;

      // if new create source with stripe to get info to confirm
      if (_this.selectedSource == "new") {
        var ownerInfo = {
          owner: {
            name: _this.AccountStore.account.firstName  + _this.AccountStore.account.lastName,
            email: _this.AccountStore.account.email
          }
        };
        LoadingStateStore.methods.addLoading();
        stripe.createSource(_this.card, ownerInfo).then(function(result) {
          LoadingStateStore.methods.removeLoading();
          if (result.error) {
            // Inform the user if there was an error.
            MessageStore.methods.showMessage(result.error.message, true);
          } else {
            // Send the token to your server.
            console.log(result.source);

            // save source locally so that user can then confirm
            _this.sourceToConfirm = result.source; 
            _this.viewConfirmation = true;  
          }
        });
      } else {
        this.sourceToConfirm = this.selectedSource;
        this.viewConfirmation = true;
      }
    },
    submitPayment: function() {
      LoadingStateStore.methods.addLoading();
      var _this = this;
      if (_this.selectedSource == "new") {
        axios
          .post(
            "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/pay",
            {
              source: _this.sourceToConfirm,
              token: localStorage.getItem("token"),
              amount: _this.value,
              rate: _this.rate,
              saveCard: _this.saveCard,
              isNew: true,
            }
          )
          .then(function(response) {
            // JSON responses are automatically parsed.
            console.log(response);
            MessageStore.methods.showMessage(response.data.message, false);
            LoadingStateStore.methods.removeLoading();
            _this.$router.push({ name: "payReceipt", params: {charge: response.data.charge}});
          })
          .catch(function(e) {
            console.log(e);
            MessageStore.methods.showMessage(e.response.data.message, true);
            LoadingStateStore.methods.removeLoading();
            //this.errors.push(e)
          });
      } else {
        console.log("using saved source");
        axios
          .post(
            "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/pay",
            {
              source: _this.sourceToConfirm,
              token: localStorage.getItem("token"),
              amount: this.value,
              rate: this.rate,
              saveCard: true,
              isNew: false
            }
          )
          .then(function(response) {
            // JSON responses are automatically parsed.
            console.log(response);
            MessageStore.methods.showMessage(response.data.message);
            LoadingStateStore.methods.removeLoading();
            _this.$router.push({ name: "payReceipt", params: {charge: response.data.charge}});
          })
          .catch(function(e) {
            console.log(e);
            MessageStore.methods.showMessage(e.response.data.message, true);
            LoadingStateStore.methods.removeLoading();
            //this.errors.push(e)
          });
      }
    },
    getSources: function() {
      var _this = this;
      LoadingStateStore.methods.addLoading();
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/savedPayOptions",
          {
            token: localStorage.getItem("token")
          }
        )
        .then(function(response) {
          LoadingStateStore.methods.removeLoading();
          // JSON responses are automatically parsed.
          console.log(response);
          //MessageStore.methods.showMessage(response.data.message);
          _this.sources = response.data.sources;
          if(_this.sources.data.length > 0) {
          _this.selectedSource = _this.sources.data[0].id;
          }
          console.log(_this.selectedSource);
        })
        .catch(function(e) {
          LoadingStateStore.methods.removeLoading();
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message, true);
          //this.errors.push(e)
        });
    },
    handleSubmit: function() {
      console.log("bla");
    },
    deleteCard: function(sourceID) {
      var _this = this;
      LoadingStateStore.methods.addLoading();
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/deleteCard",
          {
            token: localStorage.getItem("token"),
            sourceID: sourceID
          }
        )
        .then(function(response) {
          LoadingStateStore.methods.removeLoading();
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message, false);
          _this.sources = response.data.sources;
        })
        .catch(function(e) {
          LoadingStateStore.methods.removeLoading();
          console.log(e);
          MessageStore.methods.showMessage(e.response.data.message, true);
          //this.errors.push(e)
        });
    }
  }
};
</script>

<style>
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  background-color: white;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

#pay {
  grid-column-start: 2;
  grid-column-end: 3;
}

.value {
  text-decoration: line-through;
  display: inline;
}
#num-lessons {
  width: 3em;
  font-size: 1em;
}
#lesson-input-container {
  grid-column: 1 / 1;
}
#pay-row-one {
  display: grid;
  grid-auto-columns: repeat(auto, 3);
  font-size: 2em;
}
#lesson-word {
  display: inline;
}
#center-message {
  grid-column: 2 /2;
  text-align: center;
}
#cost {
  grid-column: 3/3;
  text-align: right;
}
.saved-source {
  display: grid;
  padding: 10px;
  grid-auto-columns: min-content auto min-content;
}
.delete-button {
  display: block;
  grid-column: 3 / 3;
}
.source-label {
  grid-column: 2 /2;
}
#new-card {
  display:grid;
  grid-auto-columns: auto min-content;
}
#save-card-container {
  grid-column: 2 / 2;
  grid-row: 2 / 2;
  display: block;
  text-align: right;
  white-space: nowrap;
  margin: auto;
  padding-left: 10px;
  display: none;
}
#card-element {
  grid-column: 1 / 1;
  grid-row: 2 / 2;
}
#new {
  display: none;
}
#confirm-back {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #EEEEEE;
  top: 0;
  left: 0;
  padding-top: 50vh;
}
#confirm-window {
  font-size: 1em;
  text-align: center;
  border-style: solid;
  display: block;
  margin: auto;
  width:fit-content;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  border-color: #cccccc;
  top: 50%;
  transform: translateY(-50%);
}
@media only screen and (max-device-width: 480px),  only screen and (max-width: 480px){
  #pay-row-one {
    grid-auto-columns: auto;
    grid-auto-rows: repeat(auto, 3);
    text-align: center;
    grid-gap: 1em;
  }
  #center-message {
    grid-column: 1 /1;
    text-align: center;
  }
  #cost {
    grid-column: 1 /1;
    text-align: center;
  }
  #pay {
    font-size: 1em;
  }
  .StripeElement {
    font-size: 3em;
  }
  .continue-button {
    margin-top: 1em;
    width: 100%;
    font-size: 1.2em;
  }
}
</style>
