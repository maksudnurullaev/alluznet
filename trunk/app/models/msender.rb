class Msender < ActionMailer::Base
  def send(recipient, subject, message, sent_at = Time.now)
	  @subject = subject
      @recipients = recipient
      @from = 'djbaxo@gmail.com'
      @sent_on = sent_at
	  @body["link"] = message
   	  @headers = {}
  end  
   def forgot_send(recipient, subject, message, sent_at = Time.now)
	  @subject = subject
      @recipients = recipient
      @from = 'djbaxo@gmail.com'
      @sent_on = sent_at
	  @body["password"] = message
   	  @headers = {}
   end  
end
