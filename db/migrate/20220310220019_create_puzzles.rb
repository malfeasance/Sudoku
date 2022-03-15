class CreatePuzzles < ActiveRecord::Migration[6.1]
  def change
    create_table :puzzles do |t|
      t.string :problem
      t.string :solution

      t.timestamps
    end
  end
end
