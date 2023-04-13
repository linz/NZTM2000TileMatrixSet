import o from 'ospec';
import { Nztm2000Quad } from '../nztm2000.quad.js';

o.spec('NZTM2000Quad', () => {
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

  o('should match google zoom scales', () => {
    for (const matrix of Nztm2000Quad.tileMatrix) {
      const existing = GoogleZoomScales.find((f) => Math.abs(matrix.scaleDenominator - f) < Eps) ?? -1;
      o(Math.abs(existing - matrix.scaleDenominator) < Eps).equals(true)(
        `Zoom:${matrix.identifier} should match google`,
      );
    }
  });

  o('should be a quad', () => {
    let expectedSize = 1;
    for (const matrix of Nztm2000Quad.tileMatrix) {
      o(matrix.matrixHeight).equals(expectedSize)(`Zoom:${matrix.identifier} should be square`);
      o(matrix.matrixWidth).equals(expectedSize)(`Zoom:${matrix.identifier} should be square`);

      expectedSize *= 2;
    }
  });

  o('should match WMTS extent', () => {
    // NZTM2000 is defined as Yx order not Xy order :(
    const topLeft = { x: Nztm2000Quad.boundingBox.lowerCorner[1], y: Nztm2000Quad.boundingBox.upperCorner[0] };
    const bottomRight = { x: Nztm2000Quad.boundingBox.upperCorner[1], y: Nztm2000Quad.boundingBox.lowerCorner[0] };

    for (const matrix of Nztm2000Quad.tileMatrix) {
      o(topLeft.x).equals(matrix.topLeftCorner[1]);
      o(topLeft.y).equals(matrix.topLeftCorner[0]);

      // Validate that the bottom right point is exactly the same as the WMTS extent
      const pixelScale = matrix.scaleDenominator * PixelScaleMagic;
      const pixelCount = matrix.matrixWidth * matrix.tileWidth;

      const matrixBottomRight = {
        x: topLeft.x + pixelCount * pixelScale,
        y: topLeft.y - pixelCount * pixelScale,
      };
      o(Math.abs(bottomRight.x - matrixBottomRight.x) < Eps).equals(true);
      o(Math.abs(bottomRight.y - matrixBottomRight.y) < Eps).equals(true);
    }
  });
});
