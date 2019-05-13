class AuthController < ApplicationController
    def login
      user = User.find_by_username(params[:username])
      if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        user_data = {
          user: user,
          token: token,
          role: user.role
        }
        render json: user_data, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
    
    private
  
    def login_params
      params.permit(:username, :password)
    end
  end
  