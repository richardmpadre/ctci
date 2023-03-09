
public static class Logger
{
    public static void Log(string message)
    {
        var timestamp = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
        System.Console.WriteLine($"({timestamp}): {message}");
    }

}