export default function detectCollisionBallRect (ball, rect) {
  let ballRadius = ball.diameter / 2;
  let ballCenter = {
    x: ball.position.x + ballRadius,
    y: ball.position.y + ballRadius,
  };

  let ballLeftSide = ball.position.x;
  let ballRightSide = ball.position.x + ball.diameter;
  let ballTop = ball.position.y;
  let ballBottom = ball.position.y + ball.diameter;

  let rectLeftSide = rect.position.x;
  let rectRightSide = rect.position.x + rect.width;
  let rectTop = rect.position.y;
  let rectBottom = rect.position.y + rect.height;

  if (ballRightSide >= rectLeftSide &&
      ballLeftSide <= rectRightSide &&
      ballTop <= rectBottom &&
      ballBottom >= rectTop)
  {
      return true;
  }
  
  return false;
}