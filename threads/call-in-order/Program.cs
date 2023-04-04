using Console = System.Console;

var foo = new Foo();

var t1 = new Thread((foo) => {
    if (foo == null) return;
    var temp = (Foo) foo;
    temp.First();
});

var t2 = new Thread((foo) => {
    if (foo == null) return;
    var temp = (Foo) foo;
    temp.Second();
});

var t3 = new Thread((foo) => {
    if (foo == null) return;
    var temp = (Foo) foo;
    temp.Third();
});

t3.Start(foo);
t2.Start(foo);
t1.Start(foo);




public class Foo
{
    private readonly SemaphoreSlim lock1 = new SemaphoreSlim(1);
    private readonly SemaphoreSlim lock2 = new SemaphoreSlim(1);
    public Foo()
    {
        lock1.Wait();
        lock2.Wait();
    }

    public void First() 
    {
        Console.WriteLine("First");
        lock1.Release();
    }

    public void Second() 
    {
        lock1.Wait();
        lock1.Release();
        Console.WriteLine("Second");
        lock2.Release();
    }

    public void Third() 
    {
        lock2.Wait();
        lock2.Release();
        Console.WriteLine("Third");
    }
}