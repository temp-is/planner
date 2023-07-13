/* eslint-disable no-unused-vars */
// import '../_shared/shared.js'; // not required, our example styling etc.

// import DragHelper from '../../lib/Core/helper/DragHelper.js';
// import DomHelper from '../../lib/Core/helper/DomHelper.js';
// import Rectangle from '../../lib/Core/helper/util/Rectangle.js';

import {
  DragHelper,
  Scheduler,
  DomHelper,
  Rectangle,
} from '@bryntum/schedulerpro';

export class MyDrag extends DragHelper {
  constructor(private scheduler: Scheduler) {
    super();
  }

  static get defaultConfig() {
    return {
      // Don't drag the actual element, clone it
      cloneTarget: true,
      mode: 'translateXY',
      // Only allow drops on DOM elements with 'b-timeline-subgrid' CSS class specified
      dropTargetSelector: '.b-timeline-subgrid',
      // Only allow dragging elements with the 'draggable' CSS class
      targetSelector: '.draggable',
    };
  }

  override construct(config) {
    super.construct(config);

    this.on({
      dragstart: this.onDragStart,
      drop: this.onDrop,
    });
  }

  override onDragStart = ({ event, context }) => {
    // Here you identify what you are dragging (an image of a user, grid row in an order table etc) and map it to something in your
    // data model. You can store your data on the context object which is available to you in all drag-related events
    context.eventName = context.grabbed.innerText;
  };

  override onDrop = ({ source, context, event }) => {
    debugger;
    if (context.valid) {
      const rect = Rectangle.client(
          context.element,
          DomHelper.up(context.target, source.config.dropTargetSelector)
        ),
        startDate = this.scheduler.getDateFromCoordinate(
          rect.x,
          'round',
          true,
          true
        ),
        endDate = this.scheduler.getDateFromCoordinate(
          rect.right,
          'round',
          true,
          true
        ),
        resource = this.scheduler.resolveResourceRecord(event);

      this.scheduler.eventStore.add({
        name: context.eventName,
        resourceId: resource.id,
        startDate,
        endDate,
      });

      // tell the drag helper the operation is finished
      context.finalize();
    }
  };
}

// new MyDrag();
