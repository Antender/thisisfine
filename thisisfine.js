import htm from 'htm/dist/htm.module.js'
import {text, h as html, patch} from 'superfine'
import cc from 'classcat'

export function thisisfine(ref) {
	let needRedraw = true;
	let repaint = function(){};

	const redraw = function() {
		needRedraw = true;
		requestAnimationFrame(function() {
			if (needRedraw) {
				needRedraw = false;
				patch(ref, repaint());
			}
		});
	}

	const mount = function(r) {
		repaint = r;
		redraw();
	}

	const autoredrawHandler = {
		set(obj, prop, value) {
			obj[prop] = value;
			redraw();
			return true;
		}
	}

	const autoredraw = function(obj) {
		return new Proxy(obj, autoredrawHandler)
	}

	return {
		redraw,
		mount,
		autoredraw
	}
}

const proxy = (tag, props, ...children) => {
	props = !!props ? props : {}
	if (props.class && typeof(props.class) == 'object') {
		props.class = cc(props.class)
	}
	children = typeof(children[0]) === 'string' ? [text(children[0])] : children;
	children = children.flat()
	children = children.length > 1 ? children : children[0]
	return html(tag, props, children);
}
export const h = htm.bind(proxy);
export const t = text;