# LINZ Tile Matrix Sets

This repository houses the LINZ's official [Tile Matrix Sets (TMS)](https://www.ogc.org/standards/tms) for [NZTM2000](https://www.linz.govt.nz/data/geodetic-system/datums-projections-and-heights/projections/new-zealand-transverse-mercator-2000) ([EPGS:2193](http://epsg.io/2193))

- [NZTM2000Quad](./raw/NZTM2000Quad.json)
- [NZTM2000](./raw/NZTM2000.json)

## NZTM2000Quad (March 2021 [**Preview**])

The NZTM2000 Quad TMS is new tile matrix set to provide greater interoperability with LINZ's NZTM2000 web services (such as [LINZ's Basemaps](https://basemaps.linz.govt.nz) ) and third parties.
Key Features:

- All zoom scales are from Google's [WebMercatorQuad](https://docs.opengeospatial.org/is/17-083r2/17-083r2.html#62)
- Tile matrix extent and tile extent are the same
- All zoom levels are square to work with techniques like [quad keys](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system#tile-coordinates-and-quadkeys)
- All zoom levels increase by a factor of two
- The map is centered on the beehive
 
![NztmQuad - Zoom 1](./NztmQuadZ1.png)

*Tiles  shown above were generated with [xyz-tile-debug](https://github.com/blacha/xyz-tile-debug), showing Tile x,y offset, Quadkey and zoom level*


LINZ decided to create the NZTM2000Quad based off compatibility issues with the original NZTM2000 TMS and third parties.

### FAQ

#### Why center on the beehive
No particular reason, needed a center point and seemed like a good idea at the time.

#### Why start at zoom 2
Zoom level 0 & 1 are very large and when centering around New Zealand has the opportunity to overflow the bounds of NZTM2000, a number of open source tools had issues working with these large tiles.

#### Does this work in ArcGIS Online with the Eagle/Ersi NZTM Basemaps

From our intiial testing this does appear to work with these other tile matrix sets

## NZTM2000 
LINZ's original tile matrix set, designed for use with cartographic tooling that needs specific carto zoom scales

https://www.linz.govt.nz/data/linz-data-service/guides-and-documentation/nztm2000-map-tile-service-schema


## NPM Package

This repository also houses NPM package that distributes the NZTM tile matrix sets for use in web mapping applications such as OpenLayers

### Installation
```
yarn add @linzjs/tile-matrix-set
```

### Usage
```typescript
import {Nztm2000Quad} from '@linzjs/tile-matrix-set'

Nztm2000Quad.identifier // NZTM2000Quad
```