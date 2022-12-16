import {
    f as extend,
    B as BaseTransition,
    i as isFunction,
    g as isString,
    h as createRenderer,
    j as isOn,
    k as isModelListener,
    l as isArray,
    m as hyphenate,
    n as camelize,
    q as capitalize,
    r as isSpecialBooleanAttr,
    s as includeBooleanAttr,
    t as callWithAsyncErrorHandling,
} from './HelloWorld-dd61562b.js'
/* empty css                */ import { A as App } from './App-4ab790fa.js'
import './vue-f7c70afb.js'
const svgNS = 'http://www.w3.org/2000/svg'
const doc = typeof document !== 'undefined' ? document : null
const templateContainer = doc && /* @__PURE__ */ doc.createElement('template')
const nodeOps = {
    insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null)
    },
    remove: (child) => {
        const parent = child.parentNode
        if (parent) {
            parent.removeChild(child)
        }
    },
    createElement: (tag, isSVG, is, props) => {
        const el = isSVG
            ? doc.createElementNS(svgNS, tag)
            : doc.createElement(tag, is ? { is } : void 0)
        if (tag === 'select' && props && props.multiple != null) {
            el.setAttribute('multiple', props.multiple)
        }
        return el
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
        node.nodeValue = text
    },
    setElementText: (el, text) => {
        el.textContent = text
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
        el.setAttribute(id, '')
    },
    insertStaticContent(content, parent, anchor, isSVG, start, end) {
        const before = anchor ? anchor.previousSibling : parent.lastChild
        if (start && (start === end || start.nextSibling)) {
            while (true) {
                parent.insertBefore(start.cloneNode(true), anchor)
                if (start === end || !(start = start.nextSibling)) break
            }
        } else {
            templateContainer.innerHTML = isSVG
                ? `<svg>${content}</svg>`
                : content
            const template = templateContainer.content
            if (isSVG) {
                const wrapper = template.firstChild
                while (wrapper.firstChild) {
                    template.appendChild(wrapper.firstChild)
                }
                template.removeChild(wrapper)
            }
            parent.insertBefore(template, anchor)
        }
        return [
            before ? before.nextSibling : parent.firstChild,
            anchor ? anchor.previousSibling : parent.lastChild,
        ]
    },
}
function patchClass(el, value, isSVG) {
    const transitionClasses = el._vtc
    if (transitionClasses) {
        value = (
            value ? [value, ...transitionClasses] : [...transitionClasses]
        ).join(' ')
    }
    if (value == null) {
        el.removeAttribute('class')
    } else if (isSVG) {
        el.setAttribute('class', value)
    } else {
        el.className = value
    }
}
function patchStyle(el, prev, next) {
    const style = el.style
    const isCssString = isString(next)
    if (next && !isCssString) {
        for (const key in next) {
            setStyle(style, key, next[key])
        }
        if (prev && !isString(prev)) {
            for (const key in prev) {
                if (next[key] == null) {
                    setStyle(style, key, '')
                }
            }
        }
    } else {
        const currentDisplay = style.display
        if (isCssString) {
            if (prev !== next) {
                style.cssText = next
            }
        } else if (prev) {
            el.removeAttribute('style')
        }
        if ('_vod' in el) {
            style.display = currentDisplay
        }
    }
}
const importantRE = /\s*!important$/
function setStyle(style, name, val) {
    if (isArray(val)) {
        val.forEach((v) => setStyle(style, name, v))
    } else {
        if (val == null) val = ''
        if (name.startsWith('--')) {
            style.setProperty(name, val)
        } else {
            const prefixed = autoPrefix(style, name)
            if (importantRE.test(val)) {
                style.setProperty(
                    hyphenate(prefixed),
                    val.replace(importantRE, ''),
                    'important'
                )
            } else {
                style[prefixed] = val
            }
        }
    }
}
const prefixes = ['Webkit', 'Moz', 'ms']
const prefixCache = {}
function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName]
    if (cached) {
        return cached
    }
    let name = camelize(rawName)
    if (name !== 'filter' && name in style) {
        return (prefixCache[rawName] = name)
    }
    name = capitalize(name)
    for (let i = 0; i < prefixes.length; i++) {
        const prefixed = prefixes[i] + name
        if (prefixed in style) {
            return (prefixCache[rawName] = prefixed)
        }
    }
    return rawName
}
const xlinkNS = 'http://www.w3.org/1999/xlink'
function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith('xlink:')) {
        if (value == null) {
            el.removeAttributeNS(xlinkNS, key.slice(6, key.length))
        } else {
            el.setAttributeNS(xlinkNS, key, value)
        }
    } else {
        const isBoolean = isSpecialBooleanAttr(key)
        if (value == null || (isBoolean && !includeBooleanAttr(value))) {
            el.removeAttribute(key)
        } else {
            el.setAttribute(key, isBoolean ? '' : value)
        }
    }
}
function patchDOMProp(
    el,
    key,
    value,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren
) {
    if (key === 'innerHTML' || key === 'textContent') {
        if (prevChildren) {
            unmountChildren(prevChildren, parentComponent, parentSuspense)
        }
        el[key] = value == null ? '' : value
        return
    }
    if (
        key === 'value' &&
        el.tagName !== 'PROGRESS' &&
        !el.tagName.includes('-')
    ) {
        el._value = value
        const newValue = value == null ? '' : value
        if (el.value !== newValue || el.tagName === 'OPTION') {
            el.value = newValue
        }
        if (value == null) {
            el.removeAttribute(key)
        }
        return
    }
    let needRemove = false
    if (value === '' || value == null) {
        const type = typeof el[key]
        if (type === 'boolean') {
            value = includeBooleanAttr(value)
        } else if (value == null && type === 'string') {
            value = ''
            needRemove = true
        } else if (type === 'number') {
            value = 0
            needRemove = true
        }
    }
    try {
        el[key] = value
    } catch (e) {}
    needRemove && el.removeAttribute(key)
}
function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options)
}
function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options)
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {})
    const existingInvoker = invokers[rawName]
    if (nextValue && existingInvoker) {
        existingInvoker.value = nextValue
    } else {
        const [name, options] = parseName(rawName)
        if (nextValue) {
            const invoker = (invokers[rawName] = createInvoker(
                nextValue,
                instance
            ))
            addEventListener(el, name, invoker, options)
        } else if (existingInvoker) {
            removeEventListener(el, name, existingInvoker, options)
            invokers[rawName] = void 0
        }
    }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/
function parseName(name) {
    let options
    if (optionsModifierRE.test(name)) {
        options = {}
        let m
        while ((m = name.match(optionsModifierRE))) {
            name = name.slice(0, name.length - m[0].length)
            options[m[0].toLowerCase()] = true
        }
    }
    const event = name[2] === ':' ? name.slice(3) : hyphenate(name.slice(2))
    return [event, options]
}
let cachedNow = 0
const p = /* @__PURE__ */ Promise.resolve()
const getNow = () =>
    cachedNow || (p.then(() => (cachedNow = 0)), (cachedNow = Date.now()))
function createInvoker(initialValue, instance) {
    const invoker = (e) => {
        if (!e._vts) {
            e._vts = Date.now()
        } else if (e._vts <= invoker.attached) {
            return
        }
        callWithAsyncErrorHandling(
            patchStopImmediatePropagation(e, invoker.value),
            instance,
            5,
            [e]
        )
    }
    invoker.value = initialValue
    invoker.attached = getNow()
    return invoker
}
function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
        const originalStop = e.stopImmediatePropagation
        e.stopImmediatePropagation = () => {
            originalStop.call(e)
            e._stopped = true
        }
        return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2))
    } else {
        return value
    }
}
const nativeOnRE = /^on[a-z]/
const patchProp = (
    el,
    key,
    prevValue,
    nextValue,
    isSVG = false,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren
) => {
    if (key === 'class') {
        patchClass(el, nextValue, isSVG)
    } else if (key === 'style') {
        patchStyle(el, prevValue, nextValue)
    } else if (isOn(key)) {
        if (!isModelListener(key)) {
            patchEvent(el, key, prevValue, nextValue, parentComponent)
        }
    } else if (
        key[0] === '.'
            ? ((key = key.slice(1)), true)
            : key[0] === '^'
            ? ((key = key.slice(1)), false)
            : shouldSetAsProp(el, key, nextValue, isSVG)
    ) {
        patchDOMProp(
            el,
            key,
            nextValue,
            prevChildren,
            parentComponent,
            parentSuspense,
            unmountChildren
        )
    } else {
        if (key === 'true-value') {
            el._trueValue = nextValue
        } else if (key === 'false-value') {
            el._falseValue = nextValue
        }
        patchAttr(el, key, nextValue, isSVG)
    }
}
function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
        if (key === 'innerHTML' || key === 'textContent') {
            return true
        }
        if (key in el && nativeOnRE.test(key) && isFunction(value)) {
            return true
        }
        return false
    }
    if (key === 'spellcheck' || key === 'draggable' || key === 'translate') {
        return false
    }
    if (key === 'form') {
        return false
    }
    if (key === 'list' && el.tagName === 'INPUT') {
        return false
    }
    if (key === 'type' && el.tagName === 'TEXTAREA') {
        return false
    }
    if (nativeOnRE.test(key) && isString(value)) {
        return false
    }
    return key in el
}
const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: true,
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
}
/* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators)
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps)
let renderer
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions))
}
const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args)
    const { mount } = app
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return
        const component = app._component
        if (
            !isFunction(component) &&
            !component.render &&
            !component.template
        ) {
            component.template = container.innerHTML
        }
        container.innerHTML = ''
        const proxy = mount(container, false, container instanceof SVGElement)
        if (container instanceof Element) {
            container.removeAttribute('v-cloak')
            container.setAttribute('data-v-app', '')
        }
        return proxy
    }
    return app
}
function normalizeContainer(container) {
    if (isString(container)) {
        const res = document.querySelector(container)
        return res
    }
    return container
}
createApp(App).mount('#vueapp')
