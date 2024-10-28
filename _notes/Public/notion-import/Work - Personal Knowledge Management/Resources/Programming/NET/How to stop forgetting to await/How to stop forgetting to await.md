---
title: How to stop forgetting to await
feed: show
---

[https://ddoomen.medium.com/how-to-stop-forgetting-to-await-an-awaitable-call-b235befb3a5b]( https://ddoomen.medium.com/how-to-stop-forgetting-to-await-an-awaitable-call-b235befb3a5b)

Now that all those .NET code bases start to get littered with `async` and `await` statements, I’m observing another phenomenon: forgetting to `await` an awaitable member. Not just in the code I deal with in my day job, but a lot of users of Fluent Assertions have been running into this, especially since we introduced “async” versions such as `ThrowAsync` and `NotThrowAsync`. You would expect that modern IDEs have become smart enough to help us with that. And indeed, both Visual Studio and [**Rider**](https://www.continuousimprover.com/2020/07/a-month-without-rider-part2) do, but only to an extend.

Consider for example the following (contrived) async method:

```Plain
public class Class
{
    public async Task AsyncMethod()
    {
        await Task.Run(() =>
        {
            throw new InvalidOperationException();
        });
    }
}
```

Ifyou would call this `AsyncMethod` without using the `await` keyword, like this…

```Plain
Class subjectUnderTest = new();
subjectUnderTest.AsyncMethod();
```

…no exception will be thrown. But fortunately, the compiler will issue warning `CS1998`:

_This async method lacks ‘await’ operators and will run synchronously. Consider using the ‘await’ operator to await non-blocking API calls, or ‘await Task.Run(…)’ to do CPU-bound work on a background thread._

So if you’re like me and [**always treat warnings as errors**](https://csharpcodingguidelines.com//framework-guidelines/#AV2210), you’ll be fine.

Now consider a unit test that uses [**Fluent Assertions**](https://fluentassertions.com/) to assert that the right type exception is thrown:

```Plain
// Option 1
Func<Task> act2 = async () => await subjectUnderTest.AsyncMethod();
act2.Should().ThrowAsync<ArgumentNullException>();// Option 2
subjectUnderTest
    .Invoking(x => x.AsyncMethod())
    .Should().ThrowAsync<ArgumentNullException>();
```

Both options are ways to accomplish that, but both forgot to `await` the `ThrowAsync` method. The compiler does not help here either, not even Rider. So even though you may _think_ your tests were successful, the assertion never executed.

But I’m happy to report that the .NET community comes to the rescue. Just install the `Lindhart.Analyser.MissingAwaitWarning` Roslyn analyzer by [**Morten Hartlev Lindhart**](https://github.com/ykoksen/unused-task-warning) through NuGet and get nice and clear warnings on whatever IDE you’re using:

![[assets/0fwad8j6Nw6BOvc0o.png]]

And while you’re at it, also consider [**AsyncFixer**](https://github.com/semihokur/AsyncFixer), a set of excellent Roslyn analyzers created by [**Semih Okur**](https://github.com/semihokur). After installing, it immediately told me that this weird `AsyncMethod` shouldn’t use `async`/`await` in the first place. And it’s right about that, obviously…

So what do you think? Did you run into this little mistake yourself? And did you try any other useful Roslyn analyzers? Let me know by commenting below. Oh, and follow me at [**@ddoomen**](https://twitter.com/ddoomen) to get regular updates on my everlasting quest for better solutions.
