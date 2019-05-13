class CoursesController < ApplicationController
  before_action :authorize_request

  def index
    @courses = Course.where(nil)
    @courses = @courses.searchName(params[:name]) if params[:name].present?
    @courses = @courses.searchTime(params[:time]) if params[:time].present?
    render json: @courses, status: :ok
  end

  def create
    course_data = course_param
    course_data[:user_id] = @current_user.id
    @course = Course.new(course_data)
    if @course.save
      render json: @course, status: :created
    else
      render json: { errors: @course.errors.full_messages },
              status: :unprocessable_entity
    end
  end

  private

  def course_param
    params.permit(
      :name, :description, :category, :subject, :start_time, :end_time, :student_number
    )
  end
end