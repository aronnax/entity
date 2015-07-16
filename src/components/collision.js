
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
  name: 'collision',

  init(entity, props) {
  },

  checkCollision(entityA, entityB) {
    var response = new SAT.Response(),
        collided = false,
        mentityA = entityA,
        mentityB = entityB,
        method;

    if (entityA.isRounded && entityB.isRounded) {
      method = SAT.testCircleCircle;
    } else if (entityA.isRounded) {
      mentityB = entityB.toPolygon();
      method = SAT.testCirclePolygon;
    } else if (entityB.isRounded) {
      mentityA = entityA.toPolygon();
      method = SAT.testPolygonCircle;
    } else {
      mentityA = entityA.toPolygon();
      mentityB = entityB.toPolygon();
      method = SAT.testPolygonPolygon;
    }

    collision = method(mentityA, mentityB, response);
    if (collision) {
      entityA.emit('collision', response);
      return response;
    }

    return false;
  }
};
