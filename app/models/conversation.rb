class Conversation < ActiveRecord::Base

  belongs_to :sender, :foreign_key => :sender_id, class_name: 'User'
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: 'User'
 
  has_many :messages, dependent: :destroy
 
  validates_uniqueness_of :sender_id, :scope => :recipient_id

  attr_accessible :sender_id, :recipient_id
 
  scope :involving, ->(user) do
    where("conversations.sender_id =? OR conversations.recipient_id =?",user.id,user.id)
  end
 
  scope :between, ->(sender_id,recipient_id) do
    where("(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
  end

  default_scope order('updated_at DESC')

  def other_user_avatar
    if self.sender_id == User.current.id
      other_user = User.find(recipient_id)
      other_user.avatar
    else
      other_user = User.find(User.current.id)
      other_user.avatar
    end
  end

  def other_user_username
    if self.sender_id == User.current.id
      other_user = User.find(recipient_id)
      other_user.username
    else
      other_user = User.find(User.current.id)
      other_user.username
    end
  end

  def last_message_body
    if self.messages.count > 0
      self.messages.first.body
    else
      "No messages yet"
    end
  end

end