<template>
  <div>
    Pay
    <div v-for="(source, i) in sources.data" :key="source.ID"> <input :id="'source-' + i" type="radio" v-model="selectedSource" :value="source.id" ><label :for="'source-' + i">{{source.card.brand}} {{source.card.last4}} {{source.card.exp_month}} {{source.card.exp_year}}</label><button v-on:click="deleteCard(source.id)" >Delete Card</button></div>
    <input id="new" v-model="selectedSource" type="radio" value="new">
    
    
    
    <div @click="changeToNewSource">
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>
    </div>
    
    <!-- Used to display form errors. -->
    <div id="card-errors" role="alert"></div>
    
    Save Card <input class="form-field" v-model="saveCard" type="checkbox">
    <button @click="submit" class="color-button">Submit Payment</button>
    
    
  </div>
</template>


<script>
import axios from "axios";
import MessageStore from "../stores/MessageStore";

// Create a Stripe client.
var stripe = Stripe("pk_test_gheuGNTfHiHL1ULiFHNPxlzm");

// Create an instance of Elements.
var elements = stripe.elements();

export default {
  data: function() {
    return {
      sources: { data: [] },
      saveCard: true,
      selectedSource: "new",
      card: elements.create("card", {
        style: {
          base: {
            color: "#32325d",
            lineHeight: "18px",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
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
  methods: {
    changeToNewSource: function() {
      this.selectedSource = "new";
    },
    submit: function() {
      var _this = this;
      if (_this.selectedSource == "new") {
        var ownerInfo = {
          owner: {
            name: "Jenny Rosen",
            email: "jenny.rosen@example.com"
          }
        };

        stripe.createSource(_this.card, ownerInfo).then(function(result) {
          if (result.error) {
            // Inform the user if there was an error.
            MessageStore.methods.showMessage(result.error.message, true);
          } else {
            // Send the token to your server.

            console.log(result.source);

            axios
              .post(
                "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/pay",
                {
                  source: result.source,
                  token: localStorage.getItem("token"),
                  amount: 2500,
                  saveCard: _this.saveCard,
                  isNew: true,
                }
              )
              .then(function(response) {
                // JSON responses are automatically parsed.
                console.log(response);
                MessageStore.methods.showMessage(response.data.message, false);
              })
              .catch(function(e) {
                console.log(e);
                MessageStore.methods.showMessage(e.response.data.message, true);
                //this.errors.push(e)
              });
          }
        });
      } else {
        console.log("using saved source");
        axios
          .post(
            "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/pay",
            {
              source: {id: _this.selectedSource},
              token: localStorage.getItem("token"),
              amount: 2500,
              saveCard: true,
              isNew: false
            }
          )
          .then(function(response) {
            // JSON responses are automatically parsed.
            console.log(response);
            //MessageStore.methods.showMessage(response.data.message);
          })
          .catch(function(e) {
            console.log(e);
            MessageStore.methods.showMessage(e.response.data.message, true);
            //this.errors.push(e)
          });
      }
    },
    getSources: function() {
      var _this = this;
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/savedPayOptions",
          {
            token: localStorage.getItem("token")
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          //MessageStore.methods.showMessage(response.data.message);
          _this.sources = response.data.sources;
          _this.selectedSource = _this.sources.data[0].id;
          console.log(_this.selectedSource);
        })
        .catch(function(e) {
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
      axios
        .post(
          "https://z9yqr69kvh.execute-api.us-west-2.amazonaws.com/dev/deleteCard",
          {
            token: localStorage.getItem("token"),
            sourceID: sourceID
          }
        )
        .then(function(response) {
          // JSON responses are automatically parsed.
          console.log(response);
          MessageStore.methods.showMessage(response.data.message, false);
          _this.sources = response.data.sources;
        })
        .catch(function(e) {
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
</style>
