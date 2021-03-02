/**
 *  Basic typing for the OSGEo TileMatrixSet JSON standard
 * @see http://schemas.opengis.net/tms/1.0/json/examples/WorldMercatorWGS84Quad.json
 */
export interface TileMatrixSetType {
  type: 'TileMatrixSetType';
  title: string;
  /** Longer description of the tile matrix set */
  abstract?: string;
  /** Unique identifer for this TileMatrixSet */
  identifier: string;

  /**
   * @example "http://www.opengis.net/def/crs/EPSG/0/3395"
   */
  supportedCRS: string;
  /**
   * Reference to well known scale set
   * @example "http://www.opengis.net/d…C/1.0/WorldMercatorWGS84"
   */
  wellKnownScaleSet?: string;
  boundingBox: {
    type: 'BoundingBoxType';
    /**
     * Reference to coordinate reference system for the bounding box
     * @example "http://www.opengis.net/def/crs/EPSG/0/3395"
     */
    crs: string;
    lowerCorner: [number, number];
    upperCorner: [number, number];
  };
  tileMatrix: TileMatrixType[];
}

export interface TileMatrixType {
  type: 'TileMatrixType';
  /**
   * Matrix identifier generally numbers as strings
   * @example "1" or "20"
   */
  identifier: string;
  scaleDenominator: number;
  topLeftCorner: [number, number];
  tileWidth: number;
  tileHeight: number;
  matrixWidth: number;
  matrixHeight: number;
}
