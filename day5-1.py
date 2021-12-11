def main():
  with open('input.txt') as f:
    lines = f.readlines()
    # array of vents, which are arrays of (x, y)
    vents = list(map(convertLine, lines))
    print(vents)
    # 2d array, [x][y]
    grid = []
    for i in range(1000):
      grid.append([])
      for j in range(1000):
        grid[-1].append(0)
    # print(grid)
    
    for vent in vents:
      width = vent[1][0] - vent[0][0]
      height = vent[1][1] - vent[0][1]

      if width != 0 and height != 0:
        continue

      size = max(abs(width), abs(height))
      print('vent', vent)

      for i in range(size + 1):
        # second vent is to the left
        if width < 0:
          # print(vent[0][0] - i, vent[0][1])
          grid[vent[0][0] - i][vent[0][1]] += 1
        # second vent is to the right
        elif width > 0:
          # print(vent[0][0] + i, vent[0][1])
          grid[vent[0][0] + i][vent[0][1]] += 1
        # second vent is below (smaller y value is above)
        elif height > 0:
          # print(vent[0][0], vent[0][1] + i)
          grid[vent[0][0]][vent[0][1] + i] += 1
        # second vent is above
        elif height < 0:
          # print(vent[0][0], vent[0][1] - i)
          grid[vent[0][0]][vent[0][1] - i] += 1
    
    with open('output.txt', "w") as f:
      f.write(str(grid))

def convertLine(line):
  foo = line.split(' ')
  vent1 = foo[0].split(',')
  vent2 = foo[2].split(',')
  return [
    (int(vent1[0]), int(vent1[1])),
    (int(vent2[0]), int(vent2[1]))
  ]

main()
