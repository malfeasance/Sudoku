class PuzzlesController < ApplicationController
  def index
    @puzzles = Puzzle.all
    @puzzles = Puzzle.order(:id).page params[:page]
  end

  def show
    @puzzle = Puzzle.find(params[:id])
  end

  def new
    @puzzle = Puzzle.new
  end

  def create
    @puzzle = Puzzle.new(puzzle_params)

    if @puzzle.save
      redirect_to @puzzle
    else
      render :new
    end
  end

  private
  def puzzle_params
    params.require(:puzzle).permit(:problem, :solution)
  end
end
