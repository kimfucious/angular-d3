import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";
import tip from "d3-tip";
import { FirebaseService } from "../../services/firebase.service";
import { legendColor } from "d3-svg-legend";
import { Subject } from "rxjs";
import { Center } from "../../models/ThreatDoughnut";
import { Dims } from "src/app/models/ThreatDoughnut";
import { ThreatId } from "../../models/ThreatDoughnut";
import "rxjs/add/operator/takeUntil";

@Component({
  selector: "app-graph",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit, OnDestroy {
  arcPath: any;
  center: Center;
  color: any;
  colorScheme: string;
  dims: Dims;
  graph: any;
  legend: any;
  legendGroup: any;
  paths: any;
  pie: any;
  showSpinner: boolean;
  svg: any;
  t: any;
  threats: ThreatId[];
  tooltip: any;
  ngUnsubscribe: Subject<void> = new Subject();
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.showSpinner = true;
    this.colorScheme = "schemeSet3";
    this.color = d3.scaleOrdinal(d3[this.colorScheme]);
    this.dims = { height: 300, width: 300, radius: 150 };
    this.arcPath = d3
      .arc()
      .outerRadius(this.dims.radius)
      .innerRadius(this.dims.radius / 2);
    this.center = { x: this.dims.width / 2 + 5, y: this.dims.height / 2 + 5 };
    this.pie = d3
      .pie()
      .sort(null)
      .value((d: any) => d.value);

    this.createSvg();
    this.firebaseService
      .getThreats()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((threats: ThreatId[]) => {
        this.update(threats);
        this.threats = threats;
        this.showSpinner = false;
      });
    this.t = d3.transition().duration(2000);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Tweens
  arcTweenEnter = (d: any) => {
    const i = d3.interpolate(d.endAngle, d.startAngle);
    return (t: any) => {
      d.startAngle = i(t);
      return this.arcPath(d);
    };
  };

  arcTweenExit = (d: any) => {
    const i = d3.interpolate(d.startAngle, d.endAngle);
    return (t: any) => {
      d.startAngle = i(t);
      return this.arcPath(d);
    };
  };

  arcTweenUpdate = (d: object, idx: number, n: object) => {
    const i: any = d3.interpolate(n[idx]._current, d);
    n[idx]._current = d;
    return (t: any) => {
      return this.arcPath(i(t));
    };
  };

  createSvg(): void {
    this.svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", this.dims.width + 300)
      .attr("height", this.dims.height + 50);

    this.graph = this.svg
      .append("g")
      .attr("transform", `translate(${this.center.x}, ${this.center.y})`);

    this.legendGroup = this.svg
      .append("g")
      .attr("transform", `translate(${this.dims.width + 50}, 20)`);

    this.legend = legendColor()
      .shape("circle")
      .shapePadding(10)
      .scale(this.color);
  }

  // Event Handlers
  handleMouseOver = (d: any, i: any, n: any) => {
    d3.select(n[i])
      .transition("changeSliceFill")
      .duration(300)
      .attr("fill", "#fff");
  };

  handleMouseOut = (d: any, i: any, n: any) => {
    d3.select(n[i])
      .transition("changeSliceFill")
      .duration(300)
      .attr("fill", this.color(d.data.name));
  };

  handleClick = (d: any) => {
    this.firebaseService.deleteThreat(d.data.id);
  };

  // Core Update Function
  update(data: any): void {
    this.color.domain(data.map((d: any) => d.name));
    this.legendGroup.call(this.legend);
    this.paths = this.graph.selectAll("path").data(this.pie(data));

    this.tooltip = tip()
      .attr("class", "tooltip card")
      .html((d: any) => {
        let content = `<div class="name"><strong>Threat: </strong> ${
          d.data.name
        }</div>`;
        content += `<div class="code"><strong>Code: </strong> ${d.data.code.toUpperCase()}</div>`;
        content += `<div class="value"><strong>Incidents: </strong> ${
          d.data.value
        }</div>`;
        content += `<div class="delete">Click slice to delete</div>`;
        return content;
      });
    this.graph.call(this.tooltip);

    this.paths
      .exit()
      .transition(this.t)
      .attrTween("d", this.arcTweenExit)
      .remove();

    // update existing paths
    this.paths
      .attr("d", this.arcPath)
      .transition(this.t)
      .attrTween("d", this.arcTweenUpdate);

    // update new paths
    this.paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("fill", (d: any) => this.color(d.data.name))
      .each(function(d: object, i: number, n: object) {
        this._current = d;
      })
      .transition(this.t)
      .attrTween("d", this.arcTweenEnter);

    // add events to paths
    this.graph
      .selectAll("path")
      .on("mouseover", (d: any, i: any, n: any) => {
        this.tooltip.show(d, n[i]);
        this.handleMouseOver(d, i, n);
      })
      .on("mouseout", (d: any, i: any, n: any) => {
        this.tooltip.hide(d, n[i]);
        this.handleMouseOut(d, i, n);
      })
      .on("click", this.handleClick);
  }
}
