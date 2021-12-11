def main():
  # arrays for filtering
  oxygen = []
  scrubber = []

  # same as just doing f = open('input.txt'), but its better apparently
  with open('input.txt') as f:
    lines = f.readlines()

    oxygen = filterOxygen(lines)[0].strip()
    scrubber = filterScrubber(lines)[0].strip()
  
  print(oxygen, scrubber)
  print(int(oxygen, 2), int(scrubber, 2))
  print(int(oxygen, 2) * int(scrubber, 2))

# returns a list of values that have the most common value in the given digit
def filterOxygen(arr):
  filtered = arr[:]
  for col in range(len(arr[0].strip())):
    if len(filtered) == 1:
      break;
    common = findMostCommonDigit(filtered, col)
    print('common', common)
    if common != 0:
      filtered = list(filter(lambda e: e[col] == '1', filtered))
    else:
      filtered = list(filter(lambda e: e[col] == '0', filtered))
  
  return filtered

# its like filterOxygen but different
def filterScrubber(arr):
  filtered = arr[:]
  for col in range(len(arr[0].strip())):
    if len(filtered) == 1:
      break;
    common = findMostCommonDigit(filtered, col)

    if common == 0:
      filtered = list(filter(lambda e: e[col] == '1', filtered))
    else:
      filtered = list(filter(lambda e: e[col] == '0', filtered))
  
  return filtered

# finds most common value for a digit, returns -1 if equally as common
def findMostCommonDigit(arr, digit):
  ones = 0
  zeros = 0
  for line in arr:
    if line[digit] == '1':
      ones += 1
    else:
      zeros += 1
  print(ones, zeros, digit)
  if ones > zeros:
    return 1
  elif ones == zeros:
    return -1
  else:
    return 0

main()
