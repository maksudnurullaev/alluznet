require "digest/sha1"
class User < ActiveRecord::Base
  validates_presence_of :email
  attr_accessor :password
  
  def validate_on_create
    @email_format = Regexp.new(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/)
    errors.add(:email, "Формат почты не соответственно") unless @email_format.match(email)
  end
  def before_create
      self.salted_password = User.hashed_password(self.password)
   end
  def after_create
      @password = nil
  end
	private 
  def self.hashed_password(password)
    Digest::SHA1.hexdigest(password)
  end
end
