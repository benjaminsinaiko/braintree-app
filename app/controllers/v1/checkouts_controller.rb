class V1::CheckoutsController < ApplicationController
  def new
    client_token = gateway.client_token.generate
    render json: client_token
  end

  def create
    nonce = params["payment_method_nonce"]

    result = gateway.payment_method.create(
        :customer_id => "210506249",
        :payment_method_nonce => nonce,
      )

    token = result.payment_method.token
    result = gateway.transaction.sale(
      amount: 3.00,
      :payment_method_token => token,
      :options => {
        :submit_for_settlement => true
      }
    )
    if result.success?
      puts result
      puts result.success?
      puts result.transaction.status
      render json: {result: "Transaction successful!"}
    else
      error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
      render json: error_messages
    end    
  end

  def gateway
    @gateway = Braintree::Gateway.new(
      :environment => :sandbox,
      :merchant_id => ENV['MERCHANT_ID'],
      :public_key => ENV['PUBLIC_KEY'],
      :private_key => ENV['PRIVATE_KEY'],
    )
  end
end
