using System.IO;

namespace AdventOfCode;

public class Utilities
{
    public static string FetchInput(string inputPath)
    {
        string input;
        using (StreamReader r = new StreamReader(inputPath))
        {
            input = r.ReadToEnd();
        }

        return input;
    }
}