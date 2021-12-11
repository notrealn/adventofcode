def main():
  # parse the input into draws and boards
  with open('input.txt') as f:
    lines = f.readlines()
    draws = lines.pop(0).split(',')
    # boards is a list full of boards which are lists of rows (2d array)
    boards = []
    for line in lines:
      if (line == '\n'):
        boards.append([])
        continue
      
      boards[-1].append(list(filter(lambda a: a != '', line.split(' '))))
      boards[-1] = list(map(lambda a: list(map(lambda b: int(b), a)), boards[-1]))

  # this is a list full of booleans which correspond to each board
  drawn = []
  # fill it with false
  for board in boards:
    drawn.append([])
    for i in range(5):
      drawn[-1].append([False, False, False, False, False])

  # array of indexes of the boards that won
  won = []

  for draw in range(len(draws)):
    for board in range(len(boards)):
      # if the board is winning, then skip it
      if checkWin(drawn[board]):
        if board not in won:
          won.append(board)
        continue
    
      for row in range(5):
        for col in range(5):
          if int(boards[board][row][col]) == int(draws[draw]):
            drawn[board][row][col] = True

      if len(won) == len(boards) - 1:
        # this is the last board that hasnt won
        sum = 0
        for row in range(5):
          for col in range(5):
            if not drawn[board][row][col]:
              sum += boards[board][row][col]
        print(sum, draws[draw], sum * int(draws[draw]))
        print(drawn[board])
        return print(boards[board])
      

# check if a board is winning
def checkWin(board):
  for row in range(5):
    if board[row][0] and board[row][1] and board[row][2] and board[row][3] and board[row][4]:
      # print(board)
      return True
  
  for col in range(5):
    if board[0][col] and board[1][col] and board[2][col] and board[3][col] and board[4][col]:
      # print(board)
      return True
  return False

main()