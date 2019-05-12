class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :nick_name
      t.date :birthday
      t.string :gender
      t.references :role, foreign_key: true
      t.timestamps
    end
  end
end
