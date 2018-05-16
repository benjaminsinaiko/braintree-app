class V1::CheckoutsController < ApplicationController
  def new
    client_token = gateway.client_token.generate
    # p client_token
    render json: client_token
  end

  def create
    nonce = params["payment_method_nonce"]
    result = gateway.transaction.sale(
      amount: 1.00,
      payment_method_nonce: nonce,
      :options => {
        :submit_for_settlement => true
      }
    )
    if result.success? || result.transaction
      # redirect_to checkout_path(result.transaction.id)
      render json: {transaction: result.transaction.id}
    else
      error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
      flash[:error] = error_messages
      redirect_to new_checkout_path
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
