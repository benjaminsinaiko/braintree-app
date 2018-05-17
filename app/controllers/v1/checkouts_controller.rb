class V1::CheckoutsController < ApplicationController
  def new
    client_token = gateway.client_token.generate
    # p client_token
    render json: client_token
  end

  def create
    nonce = params["payment_method_nonce"]

    result = gateway.payment_method.create(
        :customer_id => "210506249",
        :payment_method_nonce => nonce,
        :options => {
          :fail_on_duplicate_payment_method => true,
        }
      )

    if result.success?
      token = result.payment_method.token
      result = gateway.transaction.sale(
        amount: 2.00,
        :payment_method_token => token,
        :options => {
          :submit_for_settlement => true
        }
      )
      if result.success? || result.transaction
        p result
        render json: result
      else
        error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
        render json: error_messages
      end
    else
      customer = gateway.customer.find("210506249")
      token = customer.payment_methods[0].token

      result = gateway.transaction.sale(
        amount: 2.00,
        :payment_method_token => token,
        :options => {
          :submit_for_settlement => true
        }
      )
      if result.success? || result.transaction
        p result
        render json: result
      else
        error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
        render json: error_messages
      end
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
