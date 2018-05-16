Rails.application.routes.draw do
  namespace :v1 do
    root 'checkouts#new'
    
    resources :checkouts, only: [:new, :create, :show]
    resources :customers

  end
end
