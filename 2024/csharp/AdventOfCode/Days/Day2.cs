using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode.Days;

public class Day2
{
    private string _input;
    private string[] _lines;

    public Day2()
    {
        _input = Utilities.FetchInput(@"../../../../../inputs/day2");
        _lines = _input.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    public void Part1()
    {
        var validLines = new List<string>();
        foreach (var line in _lines)
        {
            var steps = line.Split(" ").Select(int.Parse).ToList();
            steps.Sort();
            var stepsReversed = steps;
            stepsReversed.Reverse();

            if (line != string.Join(' ', steps) && line != string.Join(' ', stepsReversed))
            {
                continue;
            }

            var diffs = steps.Select((x, i) => Math.Abs(x - (i == steps.Count - 1 ? 0 : steps[i + 1]))).ToArray();
            Console.WriteLine(diffs.Select(x =>
            {
                Console.WriteLine(x.ToString());
                return x;
            }));
            if (diffs.Min() >= 1 && diffs.Max() <= 3)
            {
                validLines.Add(line);
            }
        }
        
        Console.WriteLine(validLines.Count);
    }

    public void Part2()
    {
        // TODO
    }
}