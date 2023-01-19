import { Request, Response, Router } from 'express';

import { ActionServices } from '../action';
import { ActionTypeService } from '../actionType';
import { ActionTypes } from '../entity';
import { GardenInformationServices } from '../gardenInformation';

const gardenInformationService = new GardenInformationServices();
const actionService = new ActionServices();
const actionTypeService = new ActionTypeService();

export const deviceController = Router();

deviceController.post('/data', async (req: Request, res: Response) => {
  const wateringActionType = await actionTypeService.findByType(
    ActionTypes.WATERING
  );

  const pendingWateringActions = await actionService.findByActionTypePending(
    wateringActionType.id
  );

  const watering = pendingWateringActions.length > 0;

  await Promise.all(
    pendingWateringActions.map(async (action) => {
      action.pending = false;
      await actionService.editAAction(action.id, action);
    })
  );

  res.json({ watering });
});
