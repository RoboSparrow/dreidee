// @see https://github.com/mrdoob/three.js/blob/dev/test/unit/src/math/Constants.tests.js
// @see https://github.com/toji/gl-matrix/blob/master/spec/gl-matrix/vec3-spec.js
import { assert } from 'chai';
import { P3 } from '../src/point';

describe('crossProduct', function() {

    const a = P3.p(1, 2, 3);
    const b = P3.p(4, 5, 6);
    const as = a.toString();
    const bs = b.toString();

    const res = P3.crossProduct(a, b);

    const expected = [-3, 6, -3];
    it('should compute values', function() {
        assert.strictEqual(res[0], expected[0], 'x');
        assert.strictEqual(res[1], expected[1], 'y');
        assert.strictEqual(res[2], expected[2], 'z');
    });

    it('not modify submitted points', function() {
        assert.strictEqual(a.toString(), as, 'a.toString()');
        assert.strictEqual(b.toString(), bs, 'b.toString(');
    });

});
