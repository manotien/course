# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

student = Role.create!(name: "Student", code: "student")
instructor = Role.create!(name: "Instructor", code: "instructor")
User.create!(
    username: 'teacher',
    first_name: "Jerry",
    last_name: "Teacher",
    role_id: instructor.id,
    password: "testtest"
)
User.create!(
    username: 'student',
    first_name: "Tom",
    last_name: "Student",
    role_id: student.id,
    password: "testtest"
)