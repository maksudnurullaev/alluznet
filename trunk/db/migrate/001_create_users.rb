class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.integer :id
      t.string :login
      t.string :FName
      t.string :LName
      t.integer :CompanyId
      t.string :email
      t.integer :roleId

      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
