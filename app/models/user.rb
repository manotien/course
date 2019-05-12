class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :password, 
              length: { minimum: 6 }, 
              :if => :password_digest_changed?
    belongs_to :role

    attr_accessor :full_name
    # getter
    def full_name
      first_name + ' ' + last_name
    end
end