import { useTick } from "@inlet/react-pixi";
import { useMemo, useRef, useState } from "react";
import { AnimationConfigProps, Point } from "./types";
import {
  getAnimation,
  getAnimationConfigLength,
  hasReachTarget,
  getAnimationDirection,
} from "./utils";

export const useAnimation = (animationConfig: AnimationConfigProps) => {
  const isRunning = useRef(false);

  const animation = useRef(getAnimation(animationConfig, 0));

  const direction = useRef<Point>(getAnimationDirection(animation.current));

  const attributes = useRef<Point>(getAnimation(animationConfig, 0).from);

  const [att, setAtt] = useState<Point>(attributes.current);

  const step = useRef(0);

  const stepLength = useMemo(() => getAnimationConfigLength(animationConfig), [
    animationConfig,
  ]);

  const evaluateNextStep = () => {
    if (
      hasReachTarget(
        attributes.current,
        animation.current.to,
        direction.current
      )
    ) {
      if (step.current < stepLength) step.current += 1;

      animation.current.event?.();

      if (step.current < stepLength) {
        animation.current = getAnimation(animationConfig, step.current);
        attributes.current = animation.current.from;
        direction.current = getAnimationDirection(animation.current);
      }
    }
  };

  const evaluateCompletion = () => {
    if (step.current === stepLength) {
      step.current = 0;
      animation.current = getAnimation(animationConfig, step.current);
      direction.current = getAnimationDirection(animation.current);
      isRunning.current = false;
    }
  };

  useTick(() => {
    if (isRunning.current) {
      attributes.current = {
        x: attributes.current.x - 0.1 * direction.current.x,
        y: attributes.current.y - 0.1 * direction.current.y,
      };
      evaluateNextStep();
      evaluateCompletion();
      setAtt(attributes.current);
    }
  }, true);

  const start = () => {
    isRunning.current = true;
  };

  return { start, attributes: att } as const;
};
