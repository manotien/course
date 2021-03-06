class CourseSerializer < ActiveModel::Serializer
  attributes :id,:name, :description, :category, :subject, 
             :student_number
  attribute :start_time do
    object.start_time.strftime "%H:%M" if object.start_time
  end 
  attribute :end_time do
    object.end_time.strftime "%H:%M" if object.end_time
  end 
  attribute :create_by do
    object.user.first_name + ' ' + object.user.last_name
  end 
end
