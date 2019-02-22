import proxyPolyfill from 'proxy-polyfill/src/proxy.js';

const glob = Function('return this')();

function safeProxy(target, handler) {

    if (!glob.Proxy) {
        const ProxyPolyfill = proxyPolyfill();
        return new ProxyPolyfill(target, handler);
    }

    return new Proxy(target, handler);
}

export default safeProxy;