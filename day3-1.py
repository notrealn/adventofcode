# these will be the binary forms of the gamma/epsilon
gamma = ""
epsilon = ""

# same as just doing f = open('input.txt'), but its better apparently
with open('input.txt') as f:
  lines = f.readlines()

  # go through each column of each line and sum the number of 1s and 0s
  for col in range(len(lines[0].strip())):
    ones = 0
    zeros = 0
    for row in lines:
      if row[col] == '1':
        ones += 1
      else: 
        zeros += 1

    if (ones > zeros):
      gamma += '1'
      epsilon += '0'
    else:
      gamma += '0'
      epsilon += '1'

print(gamma, epsilon)
print(int(gamma, 2) * int(epsilon, 2))
