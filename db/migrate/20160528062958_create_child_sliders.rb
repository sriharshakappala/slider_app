class CreateChildSliders < ActiveRecord::Migration
  def change
    create_table :child_sliders do |t|
      t.integer :count
      t.integer :value

      t.timestamps
    end
  end
end
