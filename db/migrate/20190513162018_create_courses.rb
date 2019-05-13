class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :description
      t.string :category
      t.string :subject
      t.time :start_time
      t.time :end_time
      t.integer :student_number
      t.timestamps
    end
  end
end
