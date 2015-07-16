
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
        mentityB = entityB;

    // TODO fix this logic and make less messy.
    if (entityA.isRounded && entityB.isRounded) {
      let origEntityAX = entityA.x;
      let origEntityAY = entityA.y;
      mentityA.x = entityA.x + entityA.r;
      mentityA.y = entityA.y + entityA.r;
      let origEntityBX = entityB.x;
      let origEntityBY = entityB.y;
      mentityB.x = entityB.x + entityB.r;
      mentityB.y = entityB.y + entityB.r;

      collision = SAT.testCircleCircle(mentityA, mentityB, response);
      entityA.x = origEntityAX;
      entityA.y = origEntityAY;
      entityB.x = origEntityBX;
      entityB.y = origEntityBY;
    } else if (entityA.isRounded) {
      let origEntityAX = entityA.x;
      let origEntityAY = entityA.y;
      mentityA.x = entityA.x + entityA.r;
      mentityA.y = entityA.y + entityA.r;
      mentityB = entityB.rectangular.toPolygon.call(entityB);

      collision = SAT.testCirclePolygon(mentityA, mentityB, response);

      entityA.x = origEntityAX;
      entityA.y = origEntityAY;
    } else if (entityB.isRounded) {
      let origEntityBX = entityB.x;
      let origEntityBY = entityB.y;
      mentityB.x = entityB.x + entityB.r;
      mentityB.y = entityB.y + entityB.r;
      mentityA = entityA.rectangular.toPolygon.call(entityA);

      collision = SAT.testPolygonCircle(mentityA, mentityB, response);

      entityB.x = origEntityBX;
      entityB.y = origEntityBY;
    } else {
      mentityA = entityA.rectangular.toPolygon.call(entityA);
      mentityB = entityB.rectangular.toPolygon.call(entityB);

      collision = SAT.testPolygonPolygon(mentityA, mentityB, response);
    }

    if (collision) {
      entityA.emit('collision', response);
      return response;
    }

    return false;
  }
};
