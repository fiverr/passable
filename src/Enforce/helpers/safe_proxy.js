import proxyPolyfill from 'proxy-polyfill/src/proxy.js';
import root from './root';

function safeProxy(target, handler) {

    if (!root.Proxy) {
        const ProxyPolyfill = proxyPolyfill();
        return new ProxyPolyfill(target, handler);
    }

    return new Proxy(target, handler);
}

export default safeProxy;