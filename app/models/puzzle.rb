class Puzzle < ApplicationRecord
  validates :problem, presence: true, uniqueness: true, length: { is: 81 }
end
