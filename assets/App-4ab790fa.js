import { _ as _imports_1 } from './vue-f7c70afb.js'
import {
    d as defineComponent,
    c as createElementBlock,
    a as createVNode,
    F as Fragment,
    o as openBlock,
    H as HelloWorld,
    p as pushScopeId,
    b as popScopeId,
    e as createBaseVNode,
    _ as _export_sfc,
} from './HelloWorld-dd61562b.js'
const _imports_0 = '' + new URL('vite-4a748afd.svg', import.meta.url).href
const _withScopeId = (n) => (
    pushScopeId('data-v-d2dfbafa'), (n = n()), popScopeId(), n
)
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() =>
    /* @__PURE__ */ createBaseVNode(
        'div',
        null,
        [
            /* @__PURE__ */ createBaseVNode(
                'a',
                {
                    href: 'https://vitejs.dev',
                    target: '_blank',
                },
                [
                    /* @__PURE__ */ createBaseVNode('img', {
                        src: _imports_0,
                        class: 'logo',
                        alt: 'Vite logo',
                    }),
                ]
            ),
            /* @__PURE__ */ createBaseVNode(
                'a',
                {
                    href: 'https://vuejs.org/',
                    target: '_blank',
                },
                [
                    /* @__PURE__ */ createBaseVNode('img', {
                        src: _imports_1,
                        class: 'logo vue',
                        alt: 'Vue logo',
                    }),
                ]
            ),
        ],
        -1
    )
)
const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: 'App',
    setup(__props) {
        return (_ctx, _cache) => {
            return (
                openBlock(),
                createElementBlock(
                    Fragment,
                    null,
                    [
                        _hoisted_1,
                        createVNode(HelloWorld, { msg: 'Vite + Vue' }),
                    ],
                    64
                )
            )
        }
    },
})
const App_vue_vue_type_style_index_0_scoped_d2dfbafa_lang = ''
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [
    ['__scopeId', 'data-v-d2dfbafa'],
])
export { App as A }
