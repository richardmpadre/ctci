
public class LockNode
{
    private int _id;
    private int _maxLocks;
    private List<LockNode> _children;

    public LockNode(int id, int max)
    {
        _id = id;
        _maxLocks = max;
        _children = new List<LockNode>();
    }

    // check for a cycle by doing depth-first-search
    public bool HasCycle(Dictionary<int, bool> touchedNodes)
    {
        var visited = new VisitState[_maxLocks];
        for (int i = 0; i < _maxLocks; i++)
        {
            visited[i] = VisitState.FRESH;
        }
        return HasCycle(visited, touchedNodes);
    }

    private bool HasCycle(VisitState[] visited, Dictionary<int, bool> touchedNodes)
    {
        if (touchedNodes.ContainsKey(_id))
        {
            touchedNodes[_id] = true;
        }

        if (visited[_id] == VisitState.VISITING)
        {
            // looped back to this node while visiting it, there's a cycle
            return true;
        }
        else if (visited[_id] == VisitState.FRESH)
        {
            visited[_id] = VisitState.VISITING;
            foreach (var child in _children)
            {
                if (child.HasCycle(visited, touchedNodes))
                {
                    return true;
                }
            }
            visited[_id] = VisitState.VISITED;
        }

        return false;
    }

    public void JoinTo(LockNode lockNode)
    {
        _children.Add(lockNode);
    }
}