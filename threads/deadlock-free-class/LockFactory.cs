using System.Runtime.CompilerServices;

public class LockFactory
{
    private static LockFactory _instance;
    private int numberOfLocks = 5; // default
    private LockNode[] locks;

    // maps from a proces or owner to the order that the owner claimed it would call the locks in 
    private Dictionary<int, LinkedList<LockNode>> lockOrder;
    private LockFactory(int count) { }
    public static LockFactory GetInstance() => _instance;

    [MethodImpl(MethodImplOptions.Synchronized)]
    public static LockFactory Initialize(int count)
    {
        if (_instance == null) _instance = new LockFactory(count);
        return _instance;
    }

}