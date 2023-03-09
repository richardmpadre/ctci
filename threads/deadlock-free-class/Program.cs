var instance = LockFactory.GetInstance();

var t1 = new Thread(() => { LockFactory.Initialize(1);});
var t2 = new Thread(() => { LockFactory.Initialize(2);});

t1.Start();
t2.Start();
