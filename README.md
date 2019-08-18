# Angular-D3 ![Travis Badge](https://travis-ci.org/kimfucious/angular-d3.svg?branch=master)

## About this project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

It is a demonstration of using:

- [Angular](https://angularjs.org)
- [D3](https://d3js.org)
- [AngularFire](https://github.com/angular/angularfire2)
  - [Firestore](https://firebase.google.com/products/firestore/)
  - [Firebase authentication](https://firebase.google.com/products/auth/)
- [ng-bootstrap](https://ng-bootstrap.github.io)
- [Travis CI](https://travis-ci.org/)

## Things I haven't figured out yet

- How can you dynamically add/update paths, using a D3 `attr` method that allows a `ng-bootstrap` tool tip or popover to display?
  - I kind of gave up on this and went with [d3-tip](https://www.npmjs.com/package/d3-tip) instead.
- How to position D3 elements using Flexbox.
- How to make D3 graphs responsive

## Other Things Observed

- [Angular Material](https://www.npmjs.com/package/@angular/cdk) breakpoints don't align with Bootstrap's.
