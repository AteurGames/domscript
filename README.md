# domscript

With domscript, you can easily create HTML elements, and edit them at any time:

```js
var html = DS.Element('html',[],[
	// <head> tag
	DS.Element('head',[],[
		// <title> tag
		DS.Element('title',[],[
			"Hello, World!" // Plaintext supported!
		]),
		// <style> tag
		DS.Style([],[
			// Will make all h1/h2 appear red
			DS.Style.Ruleset(["h1","h2"], [
				DS.Style.Rule("color","red")
			])
		])
	]),
	// <body> tag
	DS.Element('body',[],[
		//<h1> tag
		DS.Element('h1',[],[
			// This text will be red:
			'Hello, <em>World</em>!'
		])
	])
]);

var compiledHTML = html.export(); // Compile into html

// Write into document
document.open();
document.write(compiledHTML);
document.close();
```
## Contribute
Contributing is easy! Simply go to `src/domscript.js`, create a branch from the `code` branch, and edit away. Then, push your changes into the `code` branch. After, make sure to minify it and send a pull request.

## Importing
To import:
```html
<script src="https://ateurgames.github.io/domscript/src/domscript.min.js"></script>
<!-- Other scripts below -->
```
