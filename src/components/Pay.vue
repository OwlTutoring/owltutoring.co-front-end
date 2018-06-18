<template>
  <div>
    Pay
    <form id="payment-form">
    <div class="form-row">
    <label for="card-element">
    Credit or debit card
    </label>
    <div id="card-element">
    <!-- A Stripe Element will be inserted here. -->
    </div>

    <!-- Used to display form errors. -->
    <div id="card-errors" role="alert"></div>
    </div>

    <button>Submit Payment</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import MessageStore from "../stores/MessageStore";

// Create a Stripe client.
var stripe = Stripe("pk_test_g6do5S237ekq10r65BnxO6S0");

// Create an instance of Elements.
var elements = stripe.elements();

export default {
  data: function() {
    return {};
  },
  mounted: function() {
    var _this = this;
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
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
    };

    // Create an instance of the card Element.
    var card = elements.create("card", { style: style });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount("#card-element");

    // Handle real-time validation errors from the card Element.
    card.addEventListener("change", function(event) {
      var displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });

    // Handle form submission.
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      var ownerInfo = {
        owner: {
          name: "Jenny Rosen",
          email: "jenny.rosen@example.com"
        }
      };

      stripe.createSource(card, ownerInfo).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById("card-errors");
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          stripeSourceHandler(result.source);
        }
      });
    });
  },
  methods: {
    handleSubmit: function() {
      console.log("bla");
    }
  }
};

function stripeSourceHandler(source) {
  console.log(source);
      // Insert the source ID into the form so it gets submitted to the server
      /*
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeSource');
      hiddenInput.setAttribute('value', source.id);
      form.appendChild(hiddenInput);

      // Submit the form
      form.submit();
      */
    }

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
#payment-form button {
  font-weight: 800;
  background-color: #ffb219;
  color: white;
  border-radius: 0.2em;
  font-size: 1em;
  padding: 0.3em 2em;
  border: none;
}
</style>
