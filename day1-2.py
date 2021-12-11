answer = 0

# same as just doing f = open('input.txt'), but its better apparently
with open('input.txt') as f:
  lines = f.readlines()

  for i in range(len(lines) - 3):
    # you dont actually need to sum all 3 numbers, cause 2 of them will always be the same when comparing
    if int(lines[i]) < int(lines[i + 3]):
      answer += 1

print(answer)
