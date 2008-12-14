class CreateUinfos < ActiveRecord::Migration
  def self.up
    create_table :uinfos do |t|
		t.column :user_id, :integer, :null => false
		t.column :fname, :string, :limit => 20
		t.column :lname, :string, :limit => 20
		t.column :phone, :string, :limit => 12
    end
  end

  def self.down
    drop_table :uinfos
  end
end
