LockFactory.Initialize(3);
var instance = LockFactory.GetInstance();

instance.Declare(1, new int[] { 0, 1 });
instance.Declare(2, new int[] { 0 });