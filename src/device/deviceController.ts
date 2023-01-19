import { Request, Response, Router } from 'express';

import { ActionServices } from '../action';
import { ActionTypeService } from '../actionType';
import { ActionTypes, GardenInformation } from '../entity';
import { GardenInformationServices } from '../gardenInformation';

const gardenInformationService = new GardenInformationServices();
const actionService = new ActionServices();
const actionTypeService = new ActionTypeService();

export const deviceController = Router();

deviceController.post('/data', async (req: Request, res: Response) => {
  const { temperatura, humedad, luz } = req.body;

  console.log({temperatura, humedad, luz});

  const wateringActionType = await actionTypeService.findByType(
    ActionTypes.WATERING
  );

  const pendingWateringActions = await actionService.findByActionTypePending(
    wateringActionType.id
  );

  const watering = pendingWateringActions.length > 0;

  await Promise.all(
    pendingWateringActions.map(async (action) => {
      if (temperatura < action.garden.min_temperature) {
        actionService.createActionWithActionType(
          action.garden,
          ActionTypes.LOW_TEMPERTURE
        );
      };

      if (temperatura > action.garden.max_temperature) {
        actionService.createActionWithActionType(
          action.garden,
          ActionTypes.HIGH_TEMPERTURE
        );
      };

      if (humedad > action.garden.water_levels) {
        actionService.createActionWithActionType(
          action.garden,
          ActionTypes.HIGH_TEMPERTURE
        );
      };

      console.log('Creating garden information...');
      const gardenInformation = new GardenInformation();
      gardenInformation.name = 'test';
      gardenInformation.humidity = humedad;
      gardenInformation.temperature = temperatura;
      gardenInformation.sun_level = luz;
      gardenInformation.garden = action.garden;

      await gardenInformationService.createGardenInformation(gardenInformation);

      action.pending = false;
      await actionService.editAAction(action.id, action);
    })
  );

  res.json({ watering });
});
