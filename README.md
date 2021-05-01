# Description
This is a basic calcuator written in JavaScript. It performs one operation at a time; no order of operations. However, you can do multiple operations in a row.

This project was created as part of [The Odin Project curriculum](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator). This is the final Javascript project in the fundations path.

[A live demo of the calculator can be seen on Github pages](https://plaustralcl.github.io/calculator/).

## Reflections
* The basic calculator functions and creating a basic disply were pretty straigt forward. When I started stringing together multiple operations in a row it bacame a lot more complicated. 
* It turns out that JavaScript has a limit to the size of numbers it will work with. If the calculation got too large (9999 ^ 99999) it would return Infinity, which caused problems with downstream calculations.
* This project took me a couple of weeks of part time work to complete. After the first week, I discovered the importance of good comments since I was trying to figure out the reasoning behind code I had written the previous weekend. After that, I tried to put in more comments.
* First use of regular expressions. I eventually deleted some of them because I found a simpler approach, but I look forwarad to using them in the future.
* Refactoring. I refactored the Javascript several times as I found better ways to solve the problems. For example, I orginally stored each digit as part of an array, but eventually decided that it was simpler to keep it as a string.
* I used several string methods that I had not used before.
* Integration. It felt like every time I added a new feature, there was an unintended side effect somewhere else that took an excessive amount of time to solve.
* In addition to a modal, I put in a toast message to notifiy the user of limitations of the calculator.
