/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        // Declare properties that will reference:
        // - the visual control (host)
        // - each of the D3 (SVG) elements
        private host: IVisualHost;
        private svg: d3.Selection<SVGElement>;
        private container: d3.Selection<SVGElement>;
        private circle: d3.Selection<SVGElement>;
        private textValue: d3.Selection<SVGElement>;
        private textLabel: d3.Selection<SVGElement>;

        constructor(options: VisualConstructorOptions) {
            // Add an SVG group inside the visual
            this.svg = d3.select(options.element)
                .append('svg')
                .classed('circleCard', true);
            this.container = this.svg.append("g")
                .classed('container', true);
            // Add elements into the SVG group:
            // - 1 circle
            // - 2 text elements
            this.circle = this.container.append("circle")
                .classed('circle', true);
            this.textValue = this.container.append("text")
                .classed("textValue", true);
            this.textLabel = this.container.append("text")
                .classed("textLabel", true);
        }

        public update(options: VisualUpdateOptions) {
            // Assign dataview to a variable for easy access by:
            // - declare a variable
            // - set the variable to reference the dataview object
            let dataView: DataView = options.dataViews[0];
            // Set width and height of the visual
            let width: number = options.viewport.width;
            let height: number = options.viewport.height;
            this.svg.attr({
                width: width,
                height: height
            });
            // Initialise the attributes and styles of the visual elements
            let radius: number = Math.min(width, height) / 2.2;
            this.circle
                .style("fill", "white")
                .style("fill-opacity", 0.5)
                .style("stroke", "black")
                .style("stroke-width", 2)
                .attr({
                    r: radius,
                    cx: width / 2,
                    cy: height / 2
                });
            let fontSizeValue: number = Math.min(width, height) / 5;
            this.textValue
                .text(dataView.single.value as string)
                .attr({
                    x: "50%",
                    y: "50%",
                    dy: "0.35em",
                    "text-anchor": "middle"
                }).style("font-size", fontSizeValue + "px");
            let fontSizeLabel: number = fontSizeValue / 4;
            this.textLabel
                .text(dataView.metadata.columns[0].displayName)
                .attr({
                    x: "50%",
                    y: height / 2,
                    dy: fontSizeValue / 1.2,
                    "text-anchor": "middle"
                })
                .style("font-size", fontSizeLabel + "px");
        }
    }
}