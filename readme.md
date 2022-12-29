# Thisisfine

Thisisfine is an attempt to make simple to use microfrontend JS framework that can be used without the need to build anything.
Just serve ```thisisfine.dist.js``` from ```node_modules/@antender/thisisfine``` as a ```type=module``` ES module thing and you are good to go!
This bundle is [superfine](https://github.com/jorgebucaran/superfine/) + [classcat](https://github.com/jorgebucaran/classcat) + [htm](https://github.com/developit/htm) glued together by a small 50 LOC module with super simple API inspired by [MithrilJS](https://github.com/MithrilJS/mithril.js) and without the whole [hyperapp](https://github.com/jorgebucaran/hyperapp) effect/subscription complexity. 

## Basic usage:

Sample app is available here: https://github.com/Antender/thisisfine-sample

1. ```ln node_modules/@antender/thisisfine/thisisfine.dist.js thisisfine.js```
2. Then import thisisfine like this ```import {thisisfine, h} from './thisisfine.js';``` in your ```index.js```

3. Create an "app" that will redraw selected DOM node:
```const app = thisisfine(document.getElementById('app'))```

4. Create aliases to redraw and autoredraw functions (optional):
```
const redraw = app.redraw
const ar = app.autoredraw
```

5. Use redraw when you update your data layer or use autoredraw to decorate your state objects and redraw on field change:

```
let counters = [ar({value: 0}), ar({value: 0})] // Counters will autoredraw on value change
```

6. Build some views using included JSX (htm) syntax, they must be pure functions a-la React (Elm, Mithril) stateless components. Pass state from root component to child ones using "prop drilling":
```
const Counter = (state) => h`
	<div class="horizontal-box spacing">
		<input type="text" value="${state.value}" class=spacing></input>
		<div class=pure-button-group>
			<button onclick=${() => state.value+=1} class=${['pure-button', 'spacing']}>Up</button>
			<button onclick=${() => state.value-=1} class=${['pure-button', 'spacing']}>Down</button>
		</div>
	</div>
`

const App = () => h`
	<main id="app">
		${counters.map((counter) => Counter(counter))}
		<button onclick=${() => {counters.push(ar({value: 0})); redraw()}} class=spacing style="margin-left: 10px;">Add counter</button>
	</main>
`
```

7. Mount your app:
```
app.mount(App)
```

8. ????!!!!!

8. PROFIT!!!!

### Things worth mentioning

1. Multiple "apps" can exist independently on a single page. So if you should split your site into multiple independendent views that communicate using data layer if your experience speed or maintenance problems instead of doing React-like microoptimizations in a monolitic SPA app.

2. Routing should be handled server-side

3. You should structure your project using classic HTML/CSS/JS separation. Don't be shy to just use static HTML instead of ```thisisfine``` where it is appropriate.

4. JSX is parsed at runtime in browser and cached, more info about syntax here: [htm](https://github.com/developit/htm)

5. This framework assumes that some modern browser goodies like ES modules, Proxy and fetch are available

6. Class attribute in JSX supports [classcat](https://github.com/jorgebucaran/classcat) optional class objects

## API

#### h(jsx)

h function is supposed to be used using ES string template syntax ```h`<main class=${ ['main'] }>Hello, world!</main>` ``` and produces superfine VDOM nodes.

#### app(ref) -> appinstance

app binds thisisfine to provided DOM node (acquired using getElementById, getElementsByTagName, document.body etc...)

#### appinstance.redraw()
signals to redraw this appinstance, redraws are throttled to RequestAnimationFrame

#### appinstance.autoredraw(object)
makes object properties redraw this app when updated

