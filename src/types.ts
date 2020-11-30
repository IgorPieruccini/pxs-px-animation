export type Point = { x: number; y: number };

export interface AnimationProps {
  from: Point;
  to: Point;
  event?(): void;
}

export type AnimationConfigProps = Record<string, AnimationProps>;
