using System;
using System.Collections.Generic;
using System.Linq;

using AdventOfCode;

namespace AdventOfCode.Days
{
    public class Day1
    {
        private string _input;
        private string[] _lines;
        private List<int> _list1 = new List<int>();
        private List<int> _list2 = new List<int>();

        private void BreakIntoLists()
        {
            foreach (string line in _lines)
            {
                var numbers = line.Split(" ", StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();
                _list1.Add(numbers[0]);
                _list2.Add(numbers[1]);
            }
        }

        public Day1()
        {
            _input = Utilities.FetchInput(@"../../../../../inputs/day1");
            _lines = _input.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
            BreakIntoLists();
            SortLists();
        }

        public void Part1()
        {
            var sum = 0;
            for (int i = 0; i < _list1.Count; i++)
            {
                sum += Math.Abs(_list1[i] - _list2[i]);
            }

            Console.WriteLine(sum);
        }

        public void Part2()
        {
            var sum = 0;
            foreach (int num in _list1)
            {
                sum += num * _list2.FindAll(x => x == num).Count;
            }

            Console.WriteLine(sum);
        }

        private void SortLists()
        {
            _list1.Sort();
            _list2.Sort();
        }
    }
}
