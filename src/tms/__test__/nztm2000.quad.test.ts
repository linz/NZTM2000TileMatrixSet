import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Nztm2000Quad } from '../nztm2000.quad.js';

describe('NZTM2000Quad', () => {
  /** Floating points need to be within this number to be the same */
  const Eps = 0.0001;
  /** Circumference of the earth */
  const WorldCircumference = 2 * 6378137 * Math.PI;

  /**
   * Magic number to convert pixel scale to meters
   * @see http://docs.opengeospatial.org/is/17-083r2/17-083r2.html#table_2:
   */
  const PixelScaleMagic = 0.28e-3;

  const GoogleZoomScales: number[] = [];
  for (let i = 0; i < 25; i++) {
    const zoomScale = WorldCircumference / 256 / (1 << i) / PixelScaleMagic;
    GoogleZoomScales[i] = zoomScale;
  }

  it('should match google zoom scales', () => {
    for (const matrix of Nztm2000Quad.tileMatrix) {
      const existing = GoogleZoomScales.find((f) => Math.abs(matrix.scaleDenominator - f) < Eps) ?? -1;
      assert.equal(
        Math.abs(existing - matrix.scaleDenominator) < Eps,
        true,
        `Zoom:${matrix.identifier} should match google`,
      );
    }
  });

  it('should be a quad', () => {
    let expectedSize = 1;
    for (const matrix of Nztm2000Quad.tileMatrix) {
      assert.equal(matrix.matrixHeight, expectedSize, `Zoom:${matrix.identifier} should be square`);
      assert.equal(matrix.matrixWidth, expectedSize, `Zoom:${matrix.identifier} should be square`);

      expectedSize *= 2;
    }
  });

  it('should match WMTS extent', () => {
    // NZTM2000 is defined as Yx order not Xy order :(
    const topLeft = { x: Nztm2000Quad.boundingBox.lowerCorner[1], y: Nztm2000Quad.boundingBox.upperCorner[0] };
    const bottomRight = { x: Nztm2000Quad.boundingBox.upperCorner[1], y: Nztm2000Quad.boundingBox.lowerCorner[0] };

    for (const matrix of Nztm2000Quad.tileMatrix) {
      assert.equal(topLeft.x, matrix.topLeftCorner[1]);
      assert.equal(topLeft.y, matrix.topLeftCorner[0]);

      // Validate that the bottom right point is exactly the same as the WMTS extent
      const pixelScale = matrix.scaleDenominator * PixelScaleMagic;
      const pixelCount = matrix.matrixWidth * matrix.tileWidth;

      const matrixBottomRight = {
        x: topLeft.x + pixelCount * pixelScale,
        y: topLeft.y - pixelCount * pixelScale,
      };
      assert.equal(Math.abs(bottomRight.x - matrixBottomRight.x) < Eps, true);
      assert.equal(Math.abs(bottomRight.y - matrixBottomRight.y) < Eps, true);
    }
  });
});
