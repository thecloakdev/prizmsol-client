"use client";
import React, { useRef, useState, useEffect } from "react";
import Globe from 'react-globe.gl';
import { csvParse } from 'd3-dsv';
import { scaleSequentialSqrt } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';

export default function World() {
    const globeEl = useRef<any>(null);
    const [popData, setPopData] = useState([]);

    useEffect(() => {
      // load data
      fetch('./world_pop.csv').then(res => res.text())
        .then(csv => csvParse(csv, ({
            lat, lng, pop }: {
            lat: string | number;
            lng: string | number;
            pop: string | number;
        }) => ({ lat: +lat, lng: +lng, pop: +pop })))
        .then(setPopData as any);
    }, []);

    useEffect(() => {
        // Auto-rotate
        if (globeEl.current?.controls) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.1;
        }
    }, [])

    const weightColor = scaleSequentialSqrt(interpolateYlOrRd)
      .domain([0, 1e7]);

    return <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

      hexBinPointsData={popData}
      hexBinPointWeight="pop"
      hexAltitude={d => d.sumWeight * 6e-8}
      hexBinResolution={4}
      hexTopColor={d => weightColor(d.sumWeight)}
      hexSideColor={d => weightColor(d.sumWeight)}
      hexBinMerge={true}
      enablePointerInteraction={false}
    />;
}
