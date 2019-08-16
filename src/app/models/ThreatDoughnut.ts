export interface Center {
  x: number;
  y: number;
}

export interface Dims {
  height: number;
  width: number;
  radius: number;
}

export interface Threat {
  name: string;
  code: string;
  value: number;
}

export interface ThreatId extends Threat {
  id: string;
  type: string;
}
