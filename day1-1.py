# answer starts at one, because the first value is said to be increasing (the one before it doesnt exist)
answer = 1

# same as just doing f = open('input.txt'), but its better apparently
with open('input.txt') as f:
  lines = f.readlines()

  # iterate over every line except for the last one
  for i in range(len(lines) - 1):
    # increment answer if the current line's value is lower than the following one
    if lines[i] < lines[i + 1]:
      answer += 1

print(answer)
