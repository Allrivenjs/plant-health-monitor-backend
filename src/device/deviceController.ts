import { Request, Response, Router } from 'express';
import { io } from '..';

import { ActionServices } from '../action';
import { ActionTypeService } from '../actionType';
import { ActionTypes, GardenInformation } from '../entity';
import { GardenServices } from '../garden';
import { GardenInformationServices } from '../gardenInformation';

import { meanOfAnArray } from '../utils';

const gardenService = new GardenServices();
const gardenInformationService = new GardenInformationServices();
const actionService = new ActionServices();
const actionTypeService = new ActionTypeService();

export const deviceController = Router();

deviceController.post('/data', async (req: Request, res: Response) => {
  let { temperatura, humedad, luz } = req.body;

  let temperaturaMedia = meanOfAnArray(temperatura);
  let humedadMedia = meanOfAnArray(humedad);
  let luzMedia = meanOfAnArray(luz);

  const mac = req.headers['x-mac'];

  console.log({temperaturaMedia, humedadMedia, luzMedia, mac});

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

  const garden = await gardenService.findByMac(mac as string);


  if (temperaturaMedia < garden.min_temperature) {
    actionService.createActionWithActionType(
      garden,
      ActionTypes.LOW_TEMPERTURE
    );
  };

  if (temperaturaMedia > garden.max_temperature) {
    actionService.createActionWithActionType(
      garden,
      ActionTypes.HIGH_TEMPERTURE
    );
  };

  if (humedad > garden.water_levels) {
    actionService.createActionWithActionType(
      garden,
      ActionTypes.HIGH_TEMPERTURE
    );
  };

  console.log('Creating garden information...');
  const gardenInformation = new GardenInformation();
  gardenInformation.name = 'test';
  gardenInformation.humidity = humedadMedia;
  gardenInformation.temperature = temperaturaMedia;
  gardenInformation.sun_level = luzMedia;
  gardenInformation.garden = garden;

  await gardenInformationService.createGardenInformation(gardenInformation);

  io.emit(`device-data-${mac}`, {
    temperatura: temperaturaMedia,
    humedad: humedadMedia,
    luz: luzMedia
  });

  res.json({ watering });
});
