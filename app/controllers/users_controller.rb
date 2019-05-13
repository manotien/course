class UsersController < ApplicationController
    before_action :authorize_request, except: :create
    # before_action :find_user, except: %i[create index]
  
    # GET /users/get
    def index
      @users = User.all
      render json: @users, status: :ok
    end
  
    def get
      render json: @current_user, status: :ok
    end
  
    # POST /users
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: { errors: @user.errors.full_messages },
               status: :unprocessable_entity
      end
    end
  
    # GET /users/update
    def update
      puts user_params
      unless @current_user.update_attributes(user_params)
        render json: { errors: @current_user.errors.full_messages },
               status: :unprocessable_entity
      end
      render json: @current_user
    end

    private

    def user_params
      params.permit(
        :first_name, :birthday, :last_name, :nick_name, :gender
      )
    end
end