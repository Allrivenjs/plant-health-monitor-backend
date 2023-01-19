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

  console.log({temperaturaMedia, humedadMedia, luzMedia});

  console.log({...req.headers});
  console.log({mac: req.headers['x-mac']});

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


  // if (temperatura < action.garden.min_temperature) {
  //   actionService.createActionWithActionType(
  //     action.garden,
  //     ActionTypes.LOW_TEMPERTURE
  //   );
  // };
  //
  // if (temperatura > action.garden.max_temperature) {
  //   actionService.createActionWithActionType(
  //     action.garden,
  //     ActionTypes.HIGH_TEMPERTURE
  //   );
  // };
  //
  // if (humedad > action.garden.water_levels) {
  //   actionService.createActionWithActionType(
  //     action.garden,
  //     ActionTypes.HIGH_TEMPERTURE
  //   );
  // };
  //
  // console.log('Creating garden information...');
  // const gardenInformation = new GardenInformation();
  // gardenInformation.name = 'test';
  // gardenInformation.humidity = humedadMedia;
  // gardenInformation.temperature = temperaturaMedia;
  // gardenInformation.sun_level = luzMedia;
  // gardenInformation.garden = action.garden;
  //
  // await gardenInformationService.createGardenInformation(gardenInformation);

  io.emit('device-data', {
    temperatura: temperaturaMedia,
    humedad: humedadMedia,
    luz: luzMedia
  });

  res.json({ watering });
});
