# Angulator

A calculator app using Angular components designed for the purpose of practicing and building my knowledge of Angular.  
View the live demo [here](http://angulator.azurewebsites.net).

## Description
Implementing Angular components, this app will function just like your standard handheld calculator. A user can enter numbers from the keyboard or using the on-screen keypad, and perform basic mathematic operations. Basic add, subtract, multiply, divide operations (and chaining operations) will be possible, with more operations planned for the future.

## Change Log
* 10/15/19: Changed input display from number to text type. Added regex to allow only inputs that yield a complete, valid number to display as string in the input field.
* 10/16/19: Math and clear screen operations working as intended. Will continue to test for edge cases.
* 10/17/19: Added styling. Fixed some bugs regarding chain operations and operations with blank inputs.
* 10/18/19: Now able to chain operations with the "equals" button using the last entered value and operator (e.g. 5 + 3 [=]+ 3 [=]+ 3 [=]+ 3). Fixed bug to prevent action from spamming operator buttons. Added a variable to hold state of current number and separate dependency from the display input, but also syncronized their state when entering numbers from either keyboard or keypad.
* 10/19/19: Fixed bug that prevented number keys from displaying a new numnber after using an operator.
* 11/5/19: Implemented an angular service for number and operator keypad inputs that reads from a keypad.json file instead of the event target's html attributes.
