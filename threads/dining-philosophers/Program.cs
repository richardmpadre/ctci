
var c1 = new ChopStick { Id = 0 };
var c2 = new ChopStick { Id = 1 };
var c3 = new ChopStick { Id = 2 };

var p1 = new Philosopher(1, c1, c3);
var p2 = new Philosopher(2, c2, c1);
var p3 = new Philosopher(3, c3, c2);

var philosophers = new List<Philosopher> { p1, p2, p3 };

var t1 = new Thread(new ThreadStart(() =>
{
    p1.Run();
}));

var t2 = new Thread(new ThreadStart(() =>
{
    p2.Run();
}));

var t3 = new Thread(new ThreadStart(() =>
{
    p3.Run();
}));

t1.Start();
t2.Start();
t3.Start();

class Philosopher
{
    private int bites = 2;
    public string Name { get; set; }
    public int Id { get; set; }
    public ChopStick Lower { get; set; }
    public ChopStick Higher { get; set; }

    public Philosopher(int id, ChopStick left, ChopStick right)
    {
        Id = id;
        if (left.Id < right.Id)
        {
            Lower = left;
            Higher = right;
        }
        else
        {
            Lower = right;
            Higher = left;
        }
    }

    public void Run()
    {
        while (bites > 0)
        {
            Eat();
        }
    }

    public void Eat()
    {
        Pickup();
        Chew();
        Putdown();

    }

    public void Pickup()
    {
        Lower.Pickup(this);
        Higher.Pickup(this);
    }

    public void Chew()
    {
        var timestamp = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss.fffffff ");
        System.Console.WriteLine($"({timestamp}) {Id} chewing");
        Thread.Sleep(2000);
        bites--;
    }

    public void Putdown()
    {
        Higher.PutDown(this);
        Lower.PutDown(this);
    }
}

class ChopStick
{
    public object lockObj = new Object();
    public int Id { get; set; }

    public void Pickup(Philosopher p)
    {
        Monitor.Enter(lockObj);
        var timestamp = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss.fffffff ");
        System.Console.WriteLine($"({timestamp}) {p.Id} pickup {Id}");
    }

    public void PutDown(Philosopher p)
    {
        var timestamp = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss.fffffff ");
        System.Console.WriteLine($"({timestamp}) {p.Id} putdown {Id}");
        Monitor.Exit(lockObj);
    }
}