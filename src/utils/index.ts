import { AnimationConfigProps, AnimationProps, Point } from "../types";

export const getAnimation = (
  animationConfig: AnimationConfigProps,
  index: number
) => Object.values(animationConfig)[index];

export const getAnimationConfigLength = (
  animationConfig: AnimationConfigProps
) => Object.keys(animationConfig).length;

export const normalizeValue = (val: number, max: number, min: number) =>
  (val - min) / (max - min);

export const evaluateByDirection = (
  val: number,
  to: number,
  direction: number
) => {
  if (direction > 0) {
    return val - to < 0;
  }
  if (direction < 0) {
    return val - to > 0;
  }
  return true;
};

export const hasReachTarget = (attribute: Point, to: Point, direction: Point) =>
  evaluateByDirection(attribute.x, to.x, direction.x) &&
  evaluateByDirection(attribute.y, to.y, direction.y);

export const getAnimationDirection = (animation: AnimationProps) => ({
  x: normalizeValue(animation.from.x - animation.to.x, 1, 0),
  y: normalizeValue(animation.from.y - animation.to.y, 1, 0),
});
