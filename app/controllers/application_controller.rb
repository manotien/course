class ApplicationController < ActionController::Base
  def authorize_request
    header = request.headers['Authorization']
    Rails.logger.debug("My object: #{JWT}")
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      # redirect_to :controller => 'login', :action => 'index' 
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      # redirect_to :controller => 'login', :action => 'index' 
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
