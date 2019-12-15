# useCallback
## The problem

At every re-render we’re creating 2 new functions. If we increment c, why do we need to recreate the incrementDelta function? This is not just about memory - it causes child components to re-render unnecessarily. This can quickly become a performance issue.

One solution would be to move the two functions outside of the the App functional component. Unfortunately, this wouldn’t work because they use the state variables from App’s scope.

## The solution
This is where the useCallback hook comes in. It takes as an arguement a function and returns a cached/memoized version of it. It also takes a second parameter,an array of dependencies.This prevents the instantiation of new functions and unnecessary re-renders.No new functions are created regardless of delta's state changes. During the initial rendering, `useCallback` created a single cached version of the "increment" function, which encapsulate the detla state value and reused it on every re-render.

This is because at the point of instantiation of the increment function, the value of delta was 1, and this was captured in the function’s scope. Since we’re caching the increment instance, it’s never recreated and it uses its original scope with detla = 1.

The useCallback hook has created a single cached version of increment, which encapsulates the initial value of delta. When App re-renders with different values for delta, useCallback returns the previous version of the increment function which keeps the old value of delta from the first rendering.

We need to tell useCallback to create new cached version of increment for every change of delta.

## The rule
Each function declared within a functional component’s scope must be memoized/cached with useCallback. If it references functions or other variables from the component scope it should list them in its depency list.

# useMemo
## The problem
You have a function that does computation that requires significant resources and you don’t want to repeat it on every re-render.

## The solution
React introduces another similar hook called useMemo.It invokes the provided function and caches its result.It also has a deps array for variables that should cause the computation to be redone.

## The rule
Any resource-hungry function should be wrapped in a useMemo hook so that it's value will be remembered in subsequent renders.
