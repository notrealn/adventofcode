horizontal = 0
depth = 0
aim = 0
# same as just doing f = open('input.txt'), but its better apparently
with open('input.txt') as f:
  lines = f.readlines()

  for line in lines:
    if line.startswith('forward'):
      horizontal += int(line.split()[1])
      depth += aim * int(line.split()[1])
    elif line.startswith('up'):
      aim -= int(line.split()[1])
    elif line.startswith('down'):
      aim += int(line.split()[1])

print(horizontal * depth)
