import React from "react";
import { Container, Graphics } from "@inlet/react-pixi";
import { useAnimation } from "../../src/useAnimation";

const animationConfig = {
  goRight: {
    from: { x: 100, y: 0 },
    to: { x: 200, y: 0 },
  },
  goDown: {
    from: { x: 200, y: 0 },
    to: { x: 200, y: 200 },
  },
  goLeft: {
    from: { x: 200, y: 200 },
    to: { x: 100, y: 200 },
  },
  goUp: {
    from: { x: 100, y: 200 },
    to: { x: 100, y: 0 },
  },
};

export const Example = () => {
  const { start, attributes } = useAnimation(animationConfig);

  return (
    <Container
      interactive
      click={() => start()}
      position={[attributes.x, attributes.y]}
    >
      <Graphics
        draw={(g) => {
          g.beginFill(0xff700b, 1);
          g.drawRect(0, 0, 120, 120);
          g.endFill();
        }}
      />
    </Container>
  );
};
