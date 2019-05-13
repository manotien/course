class Course < ApplicationRecord
  belongs_to :user

  scope :searchName, -> (name) { where("lower(name) like ?", "#{name}%".downcase) }
  scope :searchTime, -> (time) { where("start_time <= ? AND end_time >= ?", time, time) }
end
