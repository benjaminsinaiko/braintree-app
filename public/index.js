braintree.client.create(
  {
    authorization: "sandbox_g42y39zw_348pk9cgf3bgyw2b"
  },
  function(err, clientInstance) {
    if (err) {
      console.error(err);
      return;
    } else if (clientInstance) {
      console.log("client: ", clientInstance);
    }

    braintree.hostedFields.create(
      {
        client: clientInstance,
        styles: {
          input: {
            "font-size": "14px",
            "font-family": "helvetica, tahoma, calibri, sans-serif",
            color: "#3a3a3a"
          },
          ":focus": {
            color: "black"
          }
        },
        fields: {
          number: {
            selector: "#card-number",
            placeholder: "4111 1111 1111 1111"
          },
          cvv: {
            selector: "#cvv",
            placeholder: "123"
          },
          expirationMonth: {
            selector: "#expiration-month",
            placeholder: "MM"
          },
          expirationYear: {
            selector: "#expiration-year",
            placeholder: "YY"
          },
          postalCode: {
            selector: "#postal-code",
            placeholder: "90210"
          }
        }
      },
      function(err, hostedFieldsInstance) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
);
