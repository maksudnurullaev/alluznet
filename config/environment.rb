require 'smtp_tls'
# Be sure to restart your server when you modify this file


#ActionMailer::Base.delivery_method = :sendmail
#ActionMailer::Base.server_settings = {
#  :address  => "mail.website-url-here.com",
#  :port  => 25,
#  :domain  => "website-url-here.com",
#  :user_name  => "mXXXXXXX",
#  :password  => "password",
#  :authentication  => :login
#    }
#ActionMailer::Base.perform_deliveries = true
#ActionMailer::Base.raise_delivery_errors = true
#ActionMailer::Base.default_charset = "utf-8"




# Uncomment below to force Rails into production mode when
# you don't control web/app server and can't set it the proper way
# ENV['RAILS_ENV'] ||= 'production'

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '2.1.1' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|


config.action_mailer.raise_delivery_errors = true
config.action_mailer.delivery_method = :smtp
#config.action_mailer.default_url_options = { :host => "194.67.23.111" }
config.action_mailer.default_url_options = { :host => "smtp.gmail.com" }
config.action_mailer.smtp_settings = {
  :address => 'smtp.gmail.com',
  :port => 587,
  :authentication => :login,
  :domain => 'gmail.com',
  :user_name => 'djbaxo@gmail.com',
  :password => '050386'

  #:address        => 'Mailserver2',
  #:authentication => :login,
  #:user_name      => 'mbaxtiyor',
  #:password       => 'Geniuz050386#$'
}

  # Settings in config/environments/* take precedence over those specified here.
  # Application configuration should go into files in config/initializers
  # -- all .rb files in that directory are automatically loaded.
  # See Rails::Configuration for more options.

  # Skip frameworks you're not going to use. To use Rails without a database
  # you must remove the Active Record framework.
  # config.frameworks -= [ :active_record, :active_resource, :action_mailer ]

  # Specify gems that this application depends on. 
  # They can then be installed with "rake gems:install" on new installations.
  # config.gem "bj"
  # config.gem "hpricot", :version => '0.6', :source => "http://code.whytheluckystiff.net"
  # config.gem "aws-s3", :lib => "aws/s3"

  # Only load the plugins named here, in the order given. By default, all plugins 
  # in vendor/plugins are loaded in alphabetical order.
  # :all can be used as a placeholder for all plugins not explicitly named
  # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

  # Add additional load paths for your own custom dirs
  # config.load_paths += %W( #{RAILS_ROOT}/extras )

  # Force all environments to use the same logger level
  # (by default production uses :info, the others :debug)
  # config.log_level = :debug

  # Make Time.zone default to the specified zone, and make Active Record store time values
  # in the database in UTC, and return them converted to the specified local zone.
  # Run "rake -D time" for a list of tasks for finding time zone names. Comment line to use default local time.
  config.time_zone = 'UTC'

  # Your secret key for verifying cookie session data integrity.
  # If you change this key, all old sessions will become invalid!
  # Make sure the secret is at least 30 characters and all random, 
  # no regular words or you'll be exposed to dictionary attacks.
  config.action_controller.session = {
    :session_key => '_alluznet_session',
    :secret      => '5ff2d75a0019d87985876c0d3e6ac177167dc486284665af53f138099c6effa474983b77f97d24f326c89328f4b9a57ee569cbb69f5508b3881ccb2a54a3efeb'
  }

  # Use the database for sessions instead of the cookie-based default,
  # which shouldn't be used to store highly confidential information
  # (create the session table with "rake db:sessions:create")
  # config.action_controller.session_store = :active_record_store

  # Use SQL instead of Active Record's schema dumper when creating the test database.
  # This is necessary if your schema can't be completely dumped by the schema dumper,
  # like if you have constraints or database-specific column types
  # config.active_record.schema_format = :sql

  # Activate observers that should always be running
  # config.active_record.observers = :cacher, :garbage_collector
end
