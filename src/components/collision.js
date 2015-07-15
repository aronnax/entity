
import SAT from 'sat';

/**
 * CollisionEventSchema
 * {
 *   collisionPoint: #Vector,
 *   entityA: #Entity,
 *   entityB: #Entity,
 *   type: String
 * }
 */

export var collision = {

  init(entity, props) {
  },

  checkCollision(entityA, entityB) {
    var response = new SAT.Response(),
        collided = false,
        method;

    if (entityA.isRounded && entityB.isRounded) {
      method = SAT.testCircleCircle;
    } else if (entityA.isRounded) {
      method = SAT.testCirclePolygon;
    } else if (entityB.isRounded) {
      method = SAT.testPolygonCircle;
    } else {
      method = SAT.testPolygonPolygon;
    }

    collision = method(entityA, entityB, response);
    if (collision) {
      return response;
    }

    return false;
  }
};
