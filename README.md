# useCallback
## The problem

At every re-render we’re creating 2 new functions. If we increment c, why do we need to recreate the incrementDelta function? This is not just about memory - it causes child components to re-render unnecessarily. This can quickly become a performance issue.

One solution would be to move the two functions outside of the the App functional component. Unfortunately, this wouldn’t work because they use the state variables from App’s scope.

## The solution
This is where the useCallback hook comes in. It takes as an arguement a function and returns a cached/memoized version of it. It also takes a second parameter,an array of dependencies.
