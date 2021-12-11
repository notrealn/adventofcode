def main():
  with open('input.txt') as f:
    lines = f.readlines()
    # array of vents, which are arrays of (x, y)
    vents = list(map(convertLine, lines))
    # print(vents)
    # 2d array, [x][y]
    grid = [[0] * 1000 for x in range(1000)]
    # print(grid)
    
    for vent in vents:
      width = vent[1][0] - vent[0][0]
      height = vent[1][1] - vent[0][1]

      size = max(abs(width), abs(height))

      xfactor = 0
      yfactor = 0
      # second vent is to the left
      if width < 0:
        xfactor = -1
      # second vent is to the right
      elif width > 0:
        xfactor = 1
      # second vent is below (smaller y value is above)
      if height > 0:
        yfactor = 1
      # second vent is above
      elif height < 0:
        yfactor = -1
    
      for i in range(size + 1):
        # print(vent[0][0] + i * xfactor, vent[0][1] + i * yfactor)
        grid[vent[0][0] + i * xfactor][vent[0][1] + i * yfactor] += 1
    
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
