/**
 * Verification Script: IP Capture & Numeric Storage
 * This script tests the core logic of the IP-to-numeric conversion.
 */

function ipv4ToNumeric(ip: string): bigint {
    return ip.split('.').reduce((acc, octet) => (acc << 8n) + BigInt(octet), 0n);
}

function ipv6ToNumeric(ip: string): bigint {
    let fullIp = ip;
    if (ip.includes('::')) {
        const parts = ip.split('::');
        const left = parts[0] ? parts[0].split(':') : [];
        const right = parts[1] ? parts[1].split(':') : [];
        const missing = 8 - (left.length + right.length);
        const middle = new Array(missing).fill('0');
        fullIp = [...left, ...middle, ...right].join(':');
    }
    const hexBlocks = fullIp.split(':').map(block => block.padStart(4, '0'));
    return hexBlocks.reduce((acc, hex) => (acc << 16n) + BigInt(`0x${hex}`), 0n);
}

const tests = [
    { type: 'IPv4', ip: '192.168.1.1', expected: '3232235777' },
    { type: 'IPv4', ip: '127.0.0.1', expected: '2130706433' },
    { type: 'IPv6', ip: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', expected: '42540766411282592856903984951653826356' },
    { type: 'IPv6', ip: '::1', expected: '1' },
    { type: 'IPv6', ip: 'fe80::1', expected: '338288524927261089654018896841347694593' }
];

console.log('--- IP TO NUMERIC CONVERSION TESTS ---');
tests.forEach(test => {
    let result;
    try {
        result = test.type === 'IPv4' ? ipv4ToNumeric(test.ip).toString() : ipv6ToNumeric(test.ip).toString();
        const passed = result === test.expected;
        console.log(`[${passed ? 'PASS' : 'FAIL'}] ${test.type} ${test.ip} -> ${result} (Expected: ${test.expected})`);
    } catch (e: any) {
        console.log(`[ERROR] ${test.type} ${test.ip} failed: ${e.message}`);
    }
});
console.log('---------------------------------------');
