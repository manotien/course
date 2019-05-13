Rails.application.routes.draw do
  root 'home#index'
  post 'auth/login'
  get 'users/get'
  put 'users/update'
  resources :courses
  match '*path', to: 'home#index', via: :all
end
