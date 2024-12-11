string input;
using (StreamReader r = new StreamReader(@"../../../../../../../inputs/day1"))
{
    input = r.ReadToEnd();
}

var lines = input.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
var list1 = new List<int>();
var list2 = new List<int>();
foreach (string line in lines)
{
    var numbers = line.Split(" ", StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();
    list1.Add(numbers[0]);
    list2.Add(numbers[1]);
}

list1.Sort();
list2.Sort();

var sum = 0;
for (int i = 0; i < list1.Count; i++)
{
    sum += Math.Abs(list1[i] - list2[i]);
}

Console.WriteLine(sum);
