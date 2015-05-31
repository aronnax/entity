
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
    this._entities = this._entities || [];
    this._entities.push(entity);
  },

  update(entity) {
    var collision = false;

    for (let entityCompare of this._entities) {
      if (entityCompare !== entity) {
        if (entity.isRounded) {
          collision = this.roundedIntersects(entity, entityCompare);
        } else {
          collision = this.rectangularIntersects(entity, entityCompare);
          if (collision) {
            entity.emit('collision', {
              intersection: collision,
              area: collision.w * collision.y,
              entityA: entity,
              entityB: entityCompare,
              type: 'rectangular'
            });
          }
        }
      }
    }
  },

  /**
   * Checks when two rectangles intersect and either returns false for when
   * theres no intersection or the x and y coordinates if they do.
   * @param {Entity} entityA One of the entitys to check.
   * @param {Entity} entityB One of the entitys to check.
   * @return {Boolean|Object} Either false or the x/y point of intersection.
   */
  rectangularIntersects(entityA, entityB) {
    var xOverlap,
        yOverlap,
        xa1 = entityA.x,
        ya1 = entityA.y,
        xa2 = entityA.x + entityA.w,
        ya2 = entityA.y + entityA.h,
        xb1 = entityB.x,
        yb1 = entityB.y,
        xb2 = entityB.x + entityB.w,
        yb2 = entityB.y + entityB.h,
        collision = false;

    let ix = Math.max(xa1, xb1);
    let iw = Math.max(0, Math.min(xa2, xb2) - ix);
    let iy = Math.max(ya1, yb1);
    let ih = Math.max(0, Math.min(ya2, yb2) - iy);

    if (iw !== 0 || ih !== 0) {
      collision = {x: ix, y: iy, w: iw, h: ih};
    }

    return collision;
  }
};
